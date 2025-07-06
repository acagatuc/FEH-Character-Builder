import { Image } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";
import bg from "./../../assets/og_background.webp"

const BackgroundComponent = ({ width, height }) => {
  // if (image.label === "" || image === "" || image === undefined) {
  //   image = "normal";
  // } else {
  //   image = image.value;
  // }
  // if (
  //   summonerSupport !== "No" &&
  //   summonerSupport !== null &&
  //   summonerSupport !== ""
  // ) {
  //   image += "_summoner";
  // }
  // var url = "https://fehportraits.s3.amazonaws.com/bg_" + image + ".png";
  
  const [image] = useImage(bg);
  return (
    <Image
      image={image}
      x={0}
      y={0}
      cropX={130}
      cropY={0}
      cropWidth={540}
      cropHeight={900}
      width={width}
      height={height}
    />
  );
};

export default BackgroundComponent;