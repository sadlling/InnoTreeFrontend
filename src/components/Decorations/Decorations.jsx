import "./Decorations.css";

export const Decorations = ({ decorations }) => {
  return decorations.map(({ name, message, image, x, y }, index) => (
    <div
      className="decorations"
      key={index}
      style={{
        top: y,
        left: x,
      }}
      title={message}
    >
      <img className="decorations-img" src={image} alt={name} />
    </div>
  ));
};
