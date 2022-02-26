import React from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../App.css";

const BackgroundComponent = ({ image }) => {
  const [imgElement] = useImage(image, "Anonymous");

  return <Image image={imgElement} x={0} y={0} width={540} height={960} />;
};

const ImageComponent = ({ image, cropX, cropY, cropWidth, cropHeight }) => {
  if (image === "https://fehportraits.s3.amazonaws.com/.png") {
    image = "https://fehskills.s3.amazonaws.com/default.png";
  }
  const [imgElement] = useImage(image, "Anonymous");
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

const LargeTextComponent = ({ text, color, x, y, width }) => {
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

const MergeComponent = ({ merges }) => {
  if (merges !== 0) {
    if (merges === 10) {
      return (
        <Text
          text={`+${merges}`}
          fontFamily="nintendoP_Skip-D_003"
          fontStyle="bold"
          fontSize={19}
          stroke="black"
          strokeWidth={4}
          lineJoin="round"
          fill={"#82f546"}
          fillAfterStrokeEnabled={true}
          x={123}
          y={559}
          textAlign="left"
          verticalAlign="center"
        />
      );
    }
    return (
      <Text
        text={`+${merges}`}
        fontFamily="nintendoP_Skip-D_003"
        fontStyle="bold"
        fontSize={19}
        stroke="black"
        strokeWidth={4}
        lineJoin="round"
        fill={"white"}
        fillAfterStrokeEnabled={true}
        x={123}
        y={559}
        textAlign="left"
        verticalAlign="center"
      />
    );
  }
  return <Group></Group>;
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

const WMComponent = ({ image, x, y, width, height }) => {
  if (
    image === "https://fehskills.s3.amazonaws.com/normal.png" ||
    "https://fehskills.s3.amazonaws.com/.png"
  ) {
    image = "https://fehskills.s3.amazonaws.com/default.png";
  }
  const [imgElement] = useImage(image, "Anonymous");
  if (image.includes("red")) {
    y = y - 3;
    width = width + 5;
    height = height + 6;
  } else if (image.includes("green")) {
  } else if (image.includes("gray")) {
    y = y - 1;
    width = width + 1;
    height = height + 1;
  }
  return <Image image={imgElement} x={x} y={y} width={width} height={height} />;
};

const WeaponComponent = ({ text, image, x, y, offsetX, offsetY }) => {
  if (image === "https://fehskills.s3.amazonaws.com/.png") {
    image = "https://fehskills.s3.amazonaws.com/default.png";
  }
  const [imgElement] = useImage(image, "Anonymous");
  if (text.includes("Falchion (")) {
    text = "Falchion";
  }
  if (!text.includes(undefined)) {
    return (
      <Group>
        <Image image={imgElement} x={x - 4} y={y - 1} width={33} height={34} />
        <Text
          text={text}
          fontFamily="nintendoP_Skip-D_003"
          fontSize={18}
          stroke="black"
          strokeWidth={4}
          lineJoin="round"
          fill="white"
          fillAfterStrokeEnabled={true}
          x={x + offsetX}
          y={y + offsetY}
          textAlign="left"
        />
      </Group>
    );
  }
  return (
    <Text
      text={text}
      fontFamily="nintendoP_Skip-D_003"
      fontSize={18}
      stroke="black"
      strokeWidth={4}
      lineJoin="round"
      fill="white"
      fillAfterStrokeEnabled={true}
      x={x + offsetX}
      y={y + offsetY}
      textAlign="left"
    />
  );
};

const AssistOrSpecial = ({ text, x, y, offsetX, offsetY }) => {
  return (
    <Text
      text={text}
      fontFamily="nintendoP_Skip-D_003"
      fontSize={18}
      stroke="black"
      strokeWidth={4}
      lineJoin="round"
      fill="white"
      fillAfterStrokeEnabled={true}
      x={x + offsetX}
      y={y + offsetY}
      textAlign="left"
    />
  );
};

const SkillComponent = ({ text, x, y, offsetX, offsetY }) => {
  if (text === "-") {
    url = "default";
  } else {
    var url = text.replace(" ", "+");
    url = url.replace("%20", "+");
    url = url.replace("/", "");
  }
  const [imgElement] = useImage(
    "https://fehskills.s3.amazonaws.com/" + url + ".png",
    "Anonymous"
  );

  if (!text.includes("undefined")) {
    if (imgElement && imgElement.width >= 75) {
      return (
        <Group>
          <Image
            image={imgElement}
            x={x - 4}
            y={y - 3}
            width={39}
            height={40}
          />
          <Text
            text={text}
            fontFamily="nintendoP_Skip-D_003"
            fontSize={18}
            stroke="black"
            strokeWidth={4}
            lineJoin="round"
            fill="white"
            fillAfterStrokeEnabled={true}
            x={x + offsetX}
            y={y + offsetY}
            textAlign="left"
          />
        </Group>
      );
    }
    return (
      <Group>
        <Image image={imgElement} x={x} y={y} width={33} height={34} />
        <Text
          text={text}
          fontFamily="nintendoP_Skip-D_003"
          fontSize={18}
          stroke="black"
          strokeWidth={4}
          lineJoin="round"
          fill="white"
          fillAfterStrokeEnabled={true}
          x={x + offsetX}
          y={y + offsetY}
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
      <div id="wrapper" className="wrapper">
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
              x={54}
              y={471}
              width={214}
            />
            <LargeTextComponent
              text={this.props.title}
              color="white"
              x={12}
              y={412}
              width={260}
            />
            <MergeComponent merges={this.props.merges} />
            <WMComponent
              image={this.props.weapon_type}
              x={14}
              y={558}
              width={20}
              height={21}
            />
            <WMComponent
              image={this.props.move_type}
              x={170}
              y={556}
              width={25}
              height={26}
            />
            <WMComponent
              image={this.props.blessing}
              x={431}
              y={432}
              width={111}
              height={119}
            />
            <TextComponent text={"HP"} color="white" x={85} y={604} />
            <TextComponent text={"Atk"} color="white" x={84} y={641} />
            <TextComponent text={"Spd"} color="white" x={83} y={677} />
            <TextComponent text={"Def"} color="white" x={83} y={715} />
            <TextComponent text={"Res"} color="white" x={83} y={752} />
            <StatComponent
              text={`${this.props.stats[0]}`}
              color="#fffa96"
              x={171}
              y={604}
            />
            <StatComponent
              text={`${this.props.stats[1]}`}
              color="#fffa96"
              x={171}
              y={641}
            />
            <StatComponent
              text={`${this.props.stats[2]}`}
              color="#fffa96"
              x={171}
              y={677}
            />
            <StatComponent
              text={`${this.props.stats[3]}`}
              color="#fffa96"
              x={171}
              y={715}
            />
            <StatComponent
              text={`${this.props.stats[4]}`}
              color="#fffa96"
              x={171}
              y={752}
            />
            <TextComponent
              text={"9999\n\n7000"}
              color="#82f546"
              x={142}
              y={789}
            />
          </Layer>
          <Layer id="skill layer">
            <WeaponComponent
              text={`${this.props.skills.weapon.name}`}
              image={`${this.props.skills.refine.img}`}
              x={280}
              y={596}
              offsetX={33}
              offsetY={8}
            />
            <AssistOrSpecial
              text={`${this.props.skills.assist.name}`}
              x={280}
              y={631}
              offsetX={33}
              offsetY={9}
            />
            <AssistOrSpecial
              text={`${this.props.skills.special.name}`}
              x={278}
              y={671}
              offsetX={35}
              offsetY={7}
            />
            <SkillComponent
              text={`${this.props.skills.aSkill.name}`}
              x={275}
              y={707}
              offsetX={38}
              offsetY={8}
            />
            <SkillComponent
              text={`${this.props.skills.bSkill.name}`}
              x={275}
              y={745}
              offsetX={37}
              offsetY={7}
            />
            <SkillComponent
              text={`${this.props.skills.cSkill.name}`}
              x={275}
              y={781}
              offsetX={38}
              offsetY={8}
            />
          </Layer>
          <Layer id="VA and Artist">
            <Text
              text={`${this.props.va}`}
              x={33}
              y={910}
              fontFamily="nintendoP_Skip-D_003"
              fontSize={16}
              stroke="black"
              strokeWidth={4}
              lineJoin="round"
              fill="white"
              fillAfterStrokeEnabled={true}
            />
            <Text
              text={`${this.props.art}`}
              x={33}
              y={932}
              fontFamily="nintendoP_Skip-D_003"
              fontSize={16}
              stroke="black"
              strokeWidth={4}
              lineJoin="round"
              fill="white"
              fillAfterStrokeEnabled={true}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}
export default HeroCanvas;
