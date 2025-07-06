import { Text } from "react-konva";
import "./HeroCanvas.css";
import "./../../App.css";

const LargeTextComponent = ({ text, x, y, width }) => {
  console.log(text)
  return (
    <Text
      text={text}
      fontFamily="nintendoP_Skip-D_003"
      fontStyle="bold"
      fontSize={26}
      fill={"white"}
      stroke="black"
      strokeWidth={4}
      lineJoin="miter"
      miterLimit={1}
      fillAfterStrokeEnabled={true}
      x={x}
      y={y}
      width={width}
      height={50}
      align="center"
      verticalAlign="middle"
    />
  );
};

const TextComponent = ({ text, color, x, y }) => {
  return (
    <Text
      text={text}
      fontFamily="nintendoP_Skip-D_003"
      fontStyle="bold"
      fontSize={18}
      stroke="black"
      strokeWidth={4}
      lineJoin="round"
      fill={color}
      fillAfterStrokeEnabled={true}
      x={x}
      y={y}
      textAlign="left"
    />
  );
};

export { LargeTextComponent, TextComponent };
