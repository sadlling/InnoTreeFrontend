import "./Decorations.css";

export const Decorations = ({ decorations }) => {
  return decorations.map(({ x, y, decoration, text }, index) => (
    <div
      className="decorations"
      key={index}
      style={{
        top: y,
        left: x,
      }}
      title={text}
    >
      <img
        className="decorations-img"
        src={"/decorations/" + decoration + ".png"}
        alt={decoration}
      />
    </div>
  ));
};
