import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../App.css";

const BackgroundComponent = ({ image, width, height }) => {
  const [imgElement] = useImage(image, "Anonymous");

  return <Image image={imgElement} x={0} y={0} width={width} height={height} />;
};

const ImageComponent = ({ image, cropX, cropY, cropWidth, cropHeight, width, height }) => {
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
      width={width}
      height={height}
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
  if (image.includes("normal")) {
    image = "https://fehskills.s3.amazonaws.com/default.png";
  }
  if (image.includes("https://fehskills.s3.amazonaws.com/.png")) {
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
  var url = "";
  if (text === "") {
    url = "default";
  } else {
    url = text.replace("+", "%2B");
    url = url.replace(" ", "+");
    url = url.replace("%20", "+");
    url = url.replace("/", "");
  }
  const [imgElement] = useImage("https://fehskills.s3.amazonaws.com/" + url + ".png", "Anonymous");

  if (!text.includes("undefined")) {
    if (imgElement && imgElement.width >= 75) {
      return (
        <Group>
          <Image image={imgElement} x={x - 4} y={y - 3} width={39} height={40} />
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

export default function HeroCanvas(props) {
  const stageRef = React.useRef();
  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState((960 / 540) * window.innerWidth);

  const handleExport = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    downloadURI(uri, "FEH Builder - " + props.name + ".png");
  };

  const downloadURI = (uri, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (window.innerWidth > 768) {
      var aspectRatio = 960 / 540;
      setStageWidth(window.innerWidth / 3);
      setStageHeight(aspectRatio * stageWidth);
    }
    props.sendWidth(stageWidth);
  }, [stageWidth]);

  return (
    <div id="wrapper" className="wrapper">
      <Stage
        width={stageWidth}
        height={stageHeight}
        ref={stageRef}
        onClick={handleExport}
        scaleX={stageWidth / 540}
        scaleY={stageHeight / 960}
      >
        <Layer id="img layer">
          <BackgroundComponent image={props.background} width={540} height={960} />
          <ImageComponent
            image={props.image}
            cropX={365}
            cropY={0}
            cropWidth={869}
            cropHeight={1530}
            width={540}
            height={960}
          />
          <BackgroundComponent image={props.ui} width={540} height={960} />
        </Layer>
        <Layer id="stat layer">
          <LargeTextComponent
            text={props.name}
            color="white"
            stroke="black"
            x={50}
            y={469}
            width={214}
          />
          <LargeTextComponent text={props.title} color="white" x={10} y={410} width={260} />
          <MergeComponent merges={props.merges} />
          <WMComponent image={props.weapon_type} x={14} y={558} width={20} height={21} />
          <WMComponent image={props.move_type} x={170} y={556} width={25} height={26} />
          <WMComponent image={props.blessing} x={431} y={432} width={111} height={119} />
          <TextComponent text={"HP"} color={props.statColorArray[0]} x={85} y={604} />
          <TextComponent text={"Atk"} color={props.statColorArray[1]} x={84} y={641} />
          <TextComponent text={"Spd"} color={props.statColorArray[2]} x={83} y={677} />
          <TextComponent text={"Def"} color={props.statColorArray[3]} x={83} y={715} />
          <TextComponent text={"Res"} color={props.statColorArray[4]} x={83} y={752} />
          <StatComponent text={`${props.stats[0]}`} color="#fffa96" x={171} y={604} />
          <StatComponent text={`${props.stats[1]}`} color="#fffa96" x={171} y={641} />
          <StatComponent text={`${props.stats[2]}`} color="#fffa96" x={171} y={677} />
          <StatComponent text={`${props.stats[3]}`} color="#fffa96" x={171} y={715} />
          <StatComponent text={`${props.stats[4]}`} color="#fffa96" x={171} y={752} />
          <TextComponent text={"9999\n\n7000"} color="#82f546" x={142} y={789} />
        </Layer>
        <Layer id="skill layer">
          <WeaponComponent
            text={`${props.weapon}`}
            image={`${props.refine}`}
            x={280}
            y={596}
            offsetX={33}
            offsetY={8}
          />
          <AssistOrSpecial text={`${props.assist}`} x={280} y={631} offsetX={33} offsetY={9} />
          <AssistOrSpecial text={`${props.special}`} x={278} y={671} offsetX={35} offsetY={7} />
          <SkillComponent text={`${props.aSkill}`} x={275} y={707} offsetX={38} offsetY={8} />
          <SkillComponent text={`${props.bSkill}`} x={275} y={745} offsetX={37} offsetY={7} />
          <SkillComponent text={`${props.cSkill}`} x={275} y={781} offsetX={38} offsetY={8} />
        </Layer>
        <Layer id="VA and Artist">
          <Text
            text={`${props.va}`}
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
            text={`${props.art}`}
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
