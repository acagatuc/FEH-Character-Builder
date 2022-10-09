import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../App.css";
import floret from "./../assets/ascendant_floret.png";
import Summoner_C from "./../assets/Summoner_C.png";
import Summoner_B from "./../assets/Summoner_B.png";
import Summoner_A from "./../assets/Summoner_A.png";
import Summoner_S from "./../assets/Summoner_S.png";
import Ally_C from "./../assets/Ally_C.png";
import Ally_B from "./../assets/Ally_B.png";
import Ally_A from "./../assets/Ally_A.png";
import Ally_S from "./../assets/Ally_S.png";
import harmonic from "./../assets/harmonic.png";
import duo from "./../assets/duo.png";
import ascended from "./../assets/ascended.png";
import rearmed from "./../assets/rearmed.png";
import flower from "./../assets/flower.png";
import df from "./../assets/Item_2.png";
import stars from "./../assets/Summon_Rarity.png";
import sheet from "./../assets/sprite_sheet.png";
import bg_button from "./../assets/bg_button.png";

const BackgroundComponent = ({ image, summonerSupport, width, height }) => {
  if (summonerSupport[2] !== "No" && summonerSupport[2] !== null && summonerSupport[2] !== "") {
    image += "_summoner";
  }
  var url = "https://fehportraits.s3.amazonaws.com/bg_" + image + ".png";
  const [imgElement] = useImage(url, "Anonymous");

  return <Image image={imgElement} x={0} y={0} cropX={130} cropY={0} cropWidth={540} cropHeight={900} width={width} height={height} />;
};

const UIComponent = ({ image, width, height }) => {
  const [imgElement] = useImage(image, "Anonymous");

  return <Image image={imgElement} x={0} y={0} width={width} height={height} />;
};

const ButtonsComponent = ({ duo }) => {
  // if duo/harmonic, contains convo button, else does not
  const [imgElement] = useImage(sheet, "Anonymous");
  const [bgButton] = useImage(bg_button, "Anonymous");
  return (
    <Group>
      <Image image={imgElement} x={-5} y={8} width={80} height={80} cropX={0} cropY={0} cropWidth={107} cropHeight={108} />
      <Image image={imgElement} x={1} y={90} width={70} height={70} cropX={0} cropY={110} cropWidth={92} cropHeight={95} />
      <Image image={bgButton} x={0} y={229} width={71} height={71} cropX={0} cropY={0} cropWidth={144} cropHeight={146} />
      {duo ? <Image image={imgElement} x={1} y={301} width={69} height={70} cropX={0} cropY={592} cropWidth={92} cropHeight={95} /> : null}
      <Image image={imgElement} x={367} y={15} width={165} height={35} cropX={219} cropY={162} cropWidth={222} cropHeight={47} />
    </Group>
  );
};

const BadgeComponent = ({ shouldRender, nameOfBadge, d }) => {
  // d stands for dimensions
  // use this for blessings, supports, and ascended floret
  const [imgElement] = useImage(nameOfBadge, "Anonymous");
  if (shouldRender) {
    return <Image image={imgElement} x={d[0]} y={d[1]} width={d[2]} height={d[3]} />;
  } else {
    return null;
  }
};

const BadgeList = (badgeList) => {
  var length = badgeList.badgeList.filter((n) => n).length;
  badgeList = badgeList.badgeList;
  var renderList = [false, true, false, false];
  var heroImage = null;
  var summonerImage = null;
  var allyImage = null;
  var dimensions1 = [
    [[431, 432, 111, 119]],
    [
      [430, 431, 110, 118],
      [335, 431, 110, 118],
    ],
    [
      [445, 443, 88, 97],
      [370, 443, 88, 96],
      [293, 443, 88, 97],
    ],
    [
      [447, 453, 88, 97],
      [372, 453, 88, 95],
      [410, 370, 88, 97],
      [335, 370, 88, 97],
    ],
  ];
  var dimensions = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // if the hero is blessed (i.e. not a legendary or mythic hero)
  if (badgeList[0] !== "" && badgeList[0] !== undefined) {
    renderList[0] = true;
    badgeList[0] = "https://fehskills.s3.amazonaws.com/" + badgeList[0] + ".png";
  }

  // if the hero is a normal hero, do not render a hero type badge
  // this is used to render duo/harmonic/legendary/mythic badges
  if (badgeList[1] === "normal" || badgeList[1] === "") {
    renderList[1] = false;

    // reduces length because there is no hero type to render (ensures that length === 3 is the highest number for normal/legendary heroes)
    length = length - 1;
  } else {
    switch (badgeList[1]) {
      case "duo":
        heroImage = duo;
        break;
      case "harmonic":
        heroImage = harmonic;
        break;
      case "ascended":
        heroImage = ascended;
        break;
      case "rearmed":
        heroImage = rearmed;
        break;
      default:
        heroImage = "https://fehskills.s3.amazonaws.com/" + badgeList[1] + ".png";
    }
  }

  // if the hero is summoner supported
  if (badgeList[2] === "No") {
    length -= 1;
  } else if (badgeList[2] !== "" && badgeList[2] !== undefined) {
    renderList[2] = true;

    switch (badgeList[2]) {
      case "C":
        summonerImage = Summoner_C;
        break;
      case "B":
        summonerImage = Summoner_B;
        break;
      case "A":
        summonerImage = Summoner_A;
        break;
      case "S":
        summonerImage = Summoner_S;
        break;
      default:
        break;
    }
  }

  // if the hero is ally supported
  if (badgeList[3] === "No") {
    length -= 1;
  } else if (badgeList[3] !== "" && badgeList[3] !== undefined) {
    renderList[3] = true;
    switch (badgeList[3]) {
      case "C":
        allyImage = Ally_C;
        break;
      case "B":
        allyImage = Ally_B;
        break;
      case "A":
        allyImage = Ally_A;
        break;
      case "S":
        allyImage = Ally_S;
        break;
      default:
        break;
    }
  }
  var secondIndex = 0;
  for (var i = 0; i < 4; i++) {
    if (renderList[i]) {
      dimensions[i] = dimensions1[length - 1][secondIndex];
      secondIndex++;
    }
  }

  // use this space to calculate badge x and y based on length of badge list
  return (
    <Group>
      {renderList[0] ? <BadgeComponent shouldRender={true} nameOfBadge={badgeList[0]} d={dimensions[0]} /> : <Group></Group>}
      {renderList[1] ? <BadgeComponent shouldRender={true} nameOfBadge={heroImage} d={dimensions[1]} /> : <Group></Group>}
      {renderList[2] ? <BadgeComponent shouldRender={true} nameOfBadge={summonerImage} d={dimensions[2]} /> : <Group></Group>}
      {renderList[3] ? <BadgeComponent shouldRender={true} nameOfBadge={allyImage} d={dimensions[3]} /> : <Group></Group>}
    </Group>
  );
};

const FlowerComponent = ({ move_type, count }) => {
  var image = df;
  var cropx = 0;
  var cropy = 0;
  switch (move_type) {
    case "infantry":
      cropx = 0;
      cropy = 604;
      break;
    case "armored":
      cropx = 0;
      cropy = 302;
      break;
    case "cavalry":
      cropx = 291;
      cropy = 0;
      break;
    case "flying":
      cropx = 0;
      cropy = 0;
      break;
    default:
      image = "https://fehskills.s3.amazonaws.com/default.png";
      break;
  }
  const [imgElement] = useImage(image, "Anonymous");
  const [flowerUI] = useImage(flower, "Anonymous");
  return (
    <Group>
      <Image image={flowerUI} x={203} y={548} width={100} height={53} />
      <Image image={imgElement} x={203} y={548} cropWidth={275} cropHeight={300} cropX={cropx} cropY={cropy} width={100} height={100} />
      <TextComponent text={count} color={"white"} x={200} y={200} />
    </Group>
  );
};

const RarityComponent = ({ rarity }) => {
  const [imgElement] = useImage(stars, "Anonymous");

  return (
    <Group>
      {/* <Image image={imgElement} x={0} y={0} cropX={0} cropY={390} cropWidth={90} cropHeight={90} width={50} height={50} /> 1 star
      <Image image={imgElement} x={30} y={0} cropX={90} cropY={390} cropWidth={90} cropHeight={90} width={50} height={50} /> 2 star
      <Image image={imgElement} x={60} y={0} cropX={180} cropY={390} cropWidth={90} cropHeight={90} width={50} height={50} /> 3 star
      <Image image={imgElement} x={90} y={0} cropX={270} cropY={390} cropWidth={90} cropHeight={90} width={50} height={50} /> 4 star*/}
      <Image image={imgElement} x={44} y={375} cropX={360} cropY={390} cropWidth={90} cropHeight={90} width={45} height={45} />
      <Image image={imgElement} x={72} y={375} cropX={360} cropY={390} cropWidth={90} cropHeight={90} width={45} height={45} />
      <Image image={imgElement} x={100} y={375} cropX={360} cropY={390} cropWidth={90} cropHeight={90} width={45} height={45} />
      <Image image={imgElement} x={128} y={375} cropX={360} cropY={390} cropWidth={90} cropHeight={90} width={45} height={45} />
      <Image image={imgElement} x={156} y={375} cropX={360} cropY={390} cropWidth={90} cropHeight={90} width={45} height={45} />
      {/* <Image image={imgElement} x={156} y={375} cropX={450} cropY={390} cropWidth={90} cropHeight={90} width={45} height={45} /> forma star*/}
    </Group>
  );
};

const ImageComponent = ({ image, cropX, cropY, cropWidth, cropHeight, width, height }) => {
  if (image === "https://fehportraits.s3.amazonaws.com/.png") {
    image = "https://fehskills.s3.amazonaws.com/default.png";
  }
  const [imgElement] = useImage(image, "Anonymous");
  return (
    <Image image={imgElement} x={0} y={0} cropX={cropX} cropY={cropY} cropWidth={cropWidth} cropHeight={cropHeight} width={width} height={height} />
  );
};

const LargeTextComponent = ({ text, color, x, y, width }) => {
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
  return null;
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
  return null;
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
  return null;
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
    if (window.innerWidth >= 768) {
      var aspectRatio = 960 / 540;
      setStageWidth(window.innerWidth / 3);
      setStageHeight(aspectRatio * stageWidth);
    }
    props.sendWidth(stageWidth);
  }, [stageWidth]);

  return (
    <div id="wrapper" className="wrapper">
      <Stage width={stageWidth} height={stageHeight} ref={stageRef} onClick={handleExport} scaleX={stageWidth / 540} scaleY={stageHeight / 960}>
        <Layer id="img layer">
          <BackgroundComponent image={props.background} summonerSupport={props.badgeList} width={540} height={960} />
          <ImageComponent image={props.image} cropX={368} cropY={0} cropWidth={865} cropHeight={1538} width={540} height={960} />
          <UIComponent image={props.ui} width={540} height={960} />
          <ButtonsComponent duo={props.badgeList[1] === "duo" || props.badgeList[1] === "harmonic"} />
          <BadgeComponent shouldRender={props.ascended_trait} nameOfBadge={floret} d={[85, 300, 100, 100]} />
          <BadgeList badgeList={props.badgeList} />
          <FlowerComponent move_type={props.move_type} count={props.dragonflowers} />
          <RarityComponent rarity={5} />
        </Layer>
        <Layer id="stat layer">
          <LargeTextComponent text={props.name} color="white" stroke="black" x={58} y={470} width={214} />
          <LargeTextComponent text={props.title} color="white" x={15} y={412} width={260} />
          <MergeComponent merges={props.merges} />
          <WMComponent image={props.weapon_type} x={14} y={558} width={20} height={21} />
          <WMComponent image={"https://fehskills.s3.amazonaws.com/" + props.move_type + ".png"} x={170} y={556} width={25} height={26} />
          {/* <WMComponent image={props.blessing} x={431} y={432} width={111} height={119} /> */}
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
          <Text
            text={`${props.va}`}
            x={34}
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
            x={34}
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
        <Layer id="skill layer">
          <WeaponComponent text={`${props.weapon}`} image={`${props.refine}`} x={280} y={596} offsetX={33} offsetY={8} />
          <AssistOrSpecial text={`${props.assist}`} x={280} y={631} offsetX={33} offsetY={9} />
          <AssistOrSpecial text={`${props.special}`} x={278} y={671} offsetX={35} offsetY={7} />
          <SkillComponent text={`${props.aSkill}`} x={275} y={707} offsetX={38} offsetY={8} />
          <SkillComponent text={`${props.bSkill}`} x={275} y={745} offsetX={37} offsetY={7} />
          <SkillComponent text={`${props.cSkill}`} x={275} y={781} offsetX={38} offsetY={8} />
        </Layer>
      </Stage>
    </div>
  );
}
