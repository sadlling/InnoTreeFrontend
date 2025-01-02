import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./ChristmasTree.css";
import { Decorations } from "../components/Decorations/Decorations.jsx";
import { DecorationForm } from "../components/DecorationForm/DecorationForm.jsx";

export const ChristmasTree = () => {
  const [decorations, setDecorations] = useState([]);
  const [treeMask, setTreeMask] = useState(null);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  const handleAddDecoration = ({ x, y, decoration, text }) => {
    setDecorations([...decorations, { x, y, decoration, text }]);
  };

  const updateCanvasAndMask = () => {
    console.log("updateCanvasAndMask");
    const img = new Image();
    img.style.backgroundSize = "cover";
    img.src = "/TreeWithoutBackground.png"; // Маска: прозрачный фон, елка — непрозрачная
    console.log(screen.availHeight);
    console.log(screen.availWidth);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = screen.availWidth;
      canvas.height = screen.availHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      // canvas.style.position = "absolute"; // Чтобы можно было позиционировать
      // canvas.style.top = "0"; // Укажите положение
      // canvas.style.left = "0"; // Укажите положение
      // canvas.style.border = "1px solid red"; // Добавьте рамку для наглядности
      // document.body.appendChild(canvas);
      setImgWidth(screen.availWidth);
      setImgHeight(screen.availHeight);
      setTreeMask(
        ctx.getImageData(0, 0, screen.availWidth, screen.availHeight)
      );
    };
  };

  const handleResize = () => {
    // Здесь мы просто обновляем размеры, если контейнер изменился
    const treeElement = document.querySelector(".Tree");
    if (treeElement) {
      setImgWidth(treeElement.offsetWidth);
      setImgHeight(treeElement.offsetHeight);
      updateCanvasAndMask();
    }
  };

  useEffect(() => {
    updateCanvasAndMask();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTreeClick = async (e) => {
    if (!treeMask) return;
    // Получаем размеры контейнера
    const treeElement = e.currentTarget;
    const rect = treeElement.getBoundingClientRect();

    // Вычисляем координаты клика относительно контейнера
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Масштабируем координаты на основе разрешения изображения
    const scaleX = imgWidth / treeElement.offsetWidth;
    const scaleY = imgHeight / treeElement.offsetHeight;

    // Масштабируем координаты клика
    const scaledX = Math.floor(x * scaleX);
    const scaledY = Math.floor(y * scaleY);
    // // Проверяем, находится ли точка внутри непрозрачной области маски
    const index = (scaledY * treeMask.width + scaledX) * 4;
    const alpha = treeMask.data[index + 3];

    if (alpha === 0) {
      Swal.fire({
        title: "Ошибка",
        text: "Нельзя украшать пустое место!",
        icon: "error",
        confirmButtonText: "Ок",
      });
      return;
    }

    const existingDecoration = decorations.find(
      (decoration) =>
        Math.sqrt(
          Math.pow(decoration.x - x, 2) + Math.pow(decoration.y - y, 2)
        ) <= 50
    );

    if (existingDecoration) {
      Swal.fire({
        title: "Поздравление в данной игрушке",
        text:
          existingDecoration.text === ""
            ? "Поздравление отсутствует"
            : existingDecoration.text,
        confirmButtonText: "Ок",
      });
    } else await DecorationForm({ x, y, onSubmit: handleAddDecoration });
  };
  return (
    <div>
      <div className="Tree" onClick={handleTreeClick}>
        <Decorations decorations={decorations} />
      </div>
    </div>
  );
};
