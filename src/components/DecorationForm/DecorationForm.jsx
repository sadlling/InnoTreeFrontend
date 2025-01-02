import Swal from "sweetalert2";
import "./DecorationForm.css";

export const DecorationForm = async ({ x, y, onSubmit }) => {
  const options = [
    { name: "train", text: "Поезд", image: "/decorations/train.png" },
    { name: "ball", text: "Шар", image: "/decorations/ball.png" },
    { name: "star", text: "Звезда", image: "/decorations/star.png" },
    { name: "penguin", text: "Пингвин", image: "/decorations/penguin.png" },
    { name: "bear", text: "Медведь", image: "/decorations/bear.png" },
    { name: "tree", text: "Елка", image: "/decorations/tree.png" },
  ]; // Получение данных из API, если требуется.

  const formHtml = `
    <div class="decoration-form-container">
      <img id="decorationPreview" src="${
        options[0].image
      }" class="decoration-preview" />
      <select id="decorationType" class="decoration-select">
        ${options
          .map(
            (option) => `<option value="${option.name}">${option.text}</option>`
          )
          .join("")}
      </select>
      <textarea id="decorationText" placeholder="Ваше поздравление" class="decoration-text"></textarea>
    </div>
  `;

  const result = await Swal.fire({
    title: "Добавьте украшение",
    html: formHtml,
    showCancelButton: true,
    confirmButtonText: "Добавить",
    focusConfirm: false,
    didOpen: () => {
      const decorationSelect = document.getElementById("decorationType");
      const decorationPreview = document.getElementById("decorationPreview");

      decorationSelect.addEventListener("change", (event) => {
        const selectedOption = options.find(
          (o) => o.name === event.target.value
        );
        decorationPreview.src = selectedOption.image;
      });
    },
  });

  if (result.isConfirmed) {
    const name = document.getElementById("decorationType").value;
    const message = document.getElementById("decorationText").value;
    const decorationSelect = document.getElementById("decorationType");
    const selectedOption =
      decorationSelect.options[decorationSelect.selectedIndex];
    const image = options.find(
      (option) => option.name === selectedOption.value
    ).image;
    onSubmit({ name, message, image, x, y });
  }
};
