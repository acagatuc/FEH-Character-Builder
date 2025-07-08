import { Image } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";
import sheet from "./../../assets/sprite_sheet.png";

const DigitComponent = ({ number, x, y, width, height, colorHeight }) => {
  // an array that declares the x values of all numbers
  const numberArray = [520, 555, 590, 624, 656, 692, 725, 759, 793, 828];
  const [sprite_sheet] = useImage(sheet, "Anonymous");
  if (number === undefined || isNaN(number)) {
    return null;
  }
  else {
    return (
      <Image
        image={sprite_sheet}
        x={x}
        y={y}
        cropX={numberArray[number]}
        cropY={colorHeight}
        cropWidth={32}
        cropHeight={40}
        width={width}
        height={height}
      />
    );
  }
};

export { DigitComponent };



  // if (number === undefined || isNaN(number)) {
  //   return null;
  // }
  // if (number.toString().length === 2) {
  //   return (
  //     <Group>
  //       <Image
  //         image={sprite_sheet}
  //         x={x + 14}
  //         y={y}
  //         cropX={numberArray[number.toString().charAt(1)]}
  //         cropY={colorHeight}
  //         cropWidth={32}
  //         cropHeight={40}
  //         width={width}
  //         height={height}
  //       />
  //       <Image
  //         image={sprite_sheet}
  //         x={x}
  //         y={y}
  //         cropX={numberArray[number.toString().charAt(0)]}
  //         cropY={colorHeight}
  //         cropWidth={32}
  //         cropHeight={40}
  //         width={width}
  //         height={height}
  //       />
  //     </Group>
  //   );
  // } else if (number.toString().length === 1) {
  //   return (
  //     <Image
  //       image={sprite_sheet}
  //       x={x}
  //       y={y}
  //       cropX={numberArray[number]}
  //       cropY={colorHeight}
  //       cropWidth={32}
  //       cropHeight={40}
  //       width={width}
  //       height={height}
  //     />
  //   );
  // }