import "./HeroCanvas.css";
import "./../../App.css";
import { DigitComponent } from './DigitComponent'

const StatComponent = ({ number, x, y, buff, buffColor }) => {
  if (number === undefined || isNaN(number)) {
    return null;
  }
  else {
    const digitsArray = [...String(number)].map(Number);
    return (
      <>
        {digitsArray.map((digit, index) => (
          <DigitComponent
            key={index}
            number={digit}
            x={x += 14}
            y={y}
            width={15}
            height={20}
            colorHeight={0}
          />
        ))}
      </>
    )
  }

  // if (text !== undefined && text !== "") {
  //   if (buff) {
  //     if (buffColor) {
  //       return (
  //         <NumberComponent
  //           number={text}
  //           x={x}
  //           y={y}
  //           width={15}
  //           height={20}
  //           colorHeight={120}
  //         />
  //       );
  //     } else {
  //       return (
  //         <NumberComponent
  //           number={text}
  //           x={x}
  //           y={y}
  //           width={15}
  //           height={20}
  //           colorHeight={80}
  //         />
  //       );
  //     }
  //   } else {
  //     return (
  //       <NumberComponent
  //         number={text}
  //         x={x}
  //         y={y}
  //         width={15}
  //         height={20}
  //         colorHeight={0}
  //       />
  //     );
  //   }
  // }
  // return null;
};

export default StatComponent;