import React from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../App.css";

const BackgroundComponent = ({ image }) => {
  var ratio = 1600 / 1920;
  var width = 540;
  var height = width * ratio;
  const [imgElement] = useImage(image);
  return <Image image={imgElement} x={0} y={0} width={540} height={960} />;
};

const ImageComponent = ({ image, cropX, cropY, cropWidth, cropHeight }) => {
  var ratio = 1600 / 1920;
  var width = 540;
  var height = width * ratio;
  const [imgElement] = useImage(image);
  return (
    <Image
      image={imgElement}
      x={0}
      y={0}
      cropX={cropX}
      cropY={cropY}
      cropWidth={869}
      cropHeight={1530}
      width={540}
      height={960}
    />
  );
};

const LargeTextComponent = ({ text, color, x, y }) => {
  return (
    <Text
      text={text}
      fontFamily="nintendoP_Skip-D_003"
      fontStyle="bold"
      fontSize={25}
      fill={color}
      stroke="black"
      strokeWidth={4}
      lineJoin="miter"
      miterLimit={1}
      fillAfterStrokeEnabled={true}
      x={x}
      y={y}
      textAlign="center"
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

const StatComponent = ({ text, color, x, y }) => {
  if (!text.includes("undefined")) {
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
  }
  return <Group></Group>;
};

const SkillComponent = ({ image, text, x, y, cropX, cropY }) => {
  var ratio = 1600 / 1920;
  var width = 540;
  var height = width * ratio;
  const [imgElement] = useImage(image); // get higher quality images and use this ratio
  if (!text.includes("undefined")) {
    return (
      <Group>
        <Image image={imgElement} x={x} y={y} cropX={cropX} cropY={cropY} />
        <Text
          text={text}
          fontFamily="nintendoP_Skip-D_003"
          fontStyle="bold"
          fontSize={18}
          stroke="black"
          strokeWidth={4}
          lineJoin="round"
          fill="white"
          fillAfterStrokeEnabled={true}
          x={x + 36}
          y={y + 8}
          textAlign="left"
        />
      </Group>
    );
  }
  return <Group></Group>;
};

class HeroCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.handleExport = this.handleExport.bind(this);
    this.downloadURI = this.downloadURI.bind(this);
  }

  handleExport() {
    const uri = this.refs.stage.toDataURL({ pixelRatio: 2 });
    this.downloadURI(uri, "FEH Builder - " + this.props.name + ".png");
  }
  downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render() {
    return (
      <div
        id="wrapper"
        className="wrapper"
        style={{ border: "1px solid black" }}
      >
        <Stage width={540} height={960} ref="stage" onClick={this.handleExport}>
          <Layer id="img layer">
            <BackgroundComponent image={this.props.background} />
            <ImageComponent
              image={this.props.image}
              cropX={365}
              cropY={0}
              cropWidth={869}
              cropHeight={1530}
            />
            <BackgroundComponent image={this.props.ui} />
          </Layer>
          <Layer id="stat layer">
            <LargeTextComponent
              text={this.props.name}
              color="white"
              stroke="black"
              x={125}
              y={480}
            />
            <LargeTextComponent
              text={this.props.title}
              color="white"
              x={30}
              y={426}
            />
            <TextComponent
              text={"HP\n\nAtk\n\nSpd\n\nDef\n\nRes"}
              color="white"
              x={90}
              y={605}
            />
            <StatComponent
              text={`${this.props.stats[0]}\n\n${this.props.stats[1]}\n\n${this.props.stats[2]}\n\n${this.props.stats[3]}\n\n${this.props.stats[4]}`}
              color="#fffa96"
              x={172}
              y={605}
            />
            <TextComponent
              text={"9999\n\n7000"}
              color="#82f546"
              x={142}
              y={789}
            />
          </Layer>
          <Layer id="skill layer">
            <SkillComponent
              text={`${this.props.skills.weapon.name}`}
              x={280}
              y={596}
            />
            <SkillComponent
              text={`${this.props.skills.assist.name}`}
              x={280}
              y={631}
            />
            <SkillComponent
              text={`${this.props.skills.special.name}`}
              x={278}
              y={671}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}
export default HeroCanvas;
