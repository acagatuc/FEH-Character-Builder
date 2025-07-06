import { Image } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const UIComponent = ({ width, height }) => {
  const [image] = useImage('assets/base ui.png');
  return <Image image={image} x={0} y={0} width={width} height={height} />;
};
export default UIComponent;
