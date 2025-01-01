import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./ChristmasTree.css";
import { Decorations } from "../components/Decorations/Decorations.jsx";
import { DecorationForm } from "../components/DecorationForm/DecorationForm.jsx";

export const ChristmasTree = () => {
  const [decorations, setDecorations] = useState([]);
  const [treeMask, setTreeMask] = useState(null);

  useEffect(() => {
    const img = new Image();

    img.src = "/TreeWithoutBackground.png"; // Маска: прозрачный фон, елка — непрозрачная
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      setTreeMask(ctx.getImageData(0, 0, img.width, img.height));
    };
  }, []);

  const handleAddDecoration = ({ x, y, decoration, text }) => {
    setDecorations([...decorations, { x, y, decoration, text }]);
  };

  const handleTreeClick = async (e) => {
    if (!treeMask) return;
    const x = e.pageX;
    const y = e.pageY;
    // // Проверяем, находится ли точка внутри непрозрачной области маски
    const index = (Math.floor(y) * treeMask.width + Math.floor(x)) * 4;
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
