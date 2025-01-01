import Swal from "sweetalert2";
import "./DecorationForm.css";

export const DecorationForm = async ({ x, y, onSubmit }) => {
  const options = [
    { value: "train", text: "Поезд", image: "/decorations/train.png" },
    { value: "ball", text: "Шар", image: "/decorations/ball.png" },
    { value: "star", text: "Звезда", image: "/decorations/star.png" },
    { value: "penguin", text: "Пингвин", image: "/decorations/penguin.png" },
    { value: "bear", text: "Медведь", image: "/decorations/bear.png" },
    { value: "tree", text: "Елка", image: "/decorations/tree.png" },
  ]; // Получение данных из API, если требуется.

  const formHtml = `
    <div class="decoration-form-container">
      <img id="decorationPreview" src="${
        options[0].image
      }" class="decoration-preview" />
      <select id="decorationType" class="decoration-select">
        ${options
          .map(
            (option) =>
              `<option value="${option.value}">${option.text}</option>`
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
          (o) => o.value === event.target.value
        );
        decorationPreview.src = selectedOption.image;
      });
    },
  });

  if (result.isConfirmed) {
    const decorationType = document.getElementById("decorationType").value;
    const text = document.getElementById("decorationText").value;

    onSubmit({ x, y, decoration: decorationType, text });
  }
};
