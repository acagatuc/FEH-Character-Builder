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
import df from "./../assets/Item_2.png";
import stars from "./../assets/Summon_Rarity.png";
import sheet from "./../assets/sprite_sheet.png";
import wmsheet from "./../assets/wmsheet.png";
import bg_button from "./../assets/bg_button.png";
import ui from "./../assets/updated ui 2.png";

// redux import
import { useSelector } from "react-redux";

// an array that declares the x values of all numbers
const numberArray = [520, 555, 590, 624, 656, 692, 725, 759, 793, 828];

const BackgroundComponent = ({ image, summonerSupport, width, height }) => {
  if (image === "") {
    image = "normal";
  }
  if (summonerSupport[2] !== "No" && summonerSupport[2] !== null && summonerSupport[2] !== "") {
    image += "_summoner";
  }
  var url = "https://fehportraits.s3.amazonaws.com/bg_" + image + ".png";
  const [imgElement] = useImage(url, "Anonymous");

  return <Image image={imgElement} x={0} y={0} cropX={130} cropY={0} cropWidth={540} cropHeight={900} width={width} height={height} />;
};

const UIComponent = ({ image, width, height }) => {
  const [imgElement] = useImage(ui, "Anonymous");

  return (
    <Group>
      <Image image={imgElement} x={0} y={0} width={width} height={height} />
    </Group>
  );
};

const ButtonsComponent = ({ duo, fav }) => {
  // if duo/harmonic, contains convo button, else does not
  const [imgElement] = useImage(sheet, "Anonymous");
  const [bgButton] = useImage(bg_button, "Anonymous");

  var x = 98;
  var y = 112;

  if (fav % 2 !== 0 && fav !== 0) {
    x = 2;
  }

  switch (fav) {
    case 1:
    case 2:
      y = 208;
      break;
    case 3:
    case 4:
      y = 304;
      break;
    case 5:
    case 6:
      y = 400;
      break;
    case 7:
    case 8:
      y = 496;
      break;
    default:
      break;
  }
  return (
    <Group>
      <Image image={imgElement} x={-5} y={8} width={80} height={80} cropX={0} cropY={0} cropWidth={107} cropHeight={108} />
      <Image image={imgElement} x={1} y={90} width={70} height={70} cropX={0} cropY={110} cropWidth={92} cropHeight={95} />
      <Image image={imgElement} x={1} y={160} width={70} height={71} cropX={x} cropY={y} cropWidth={92} cropHeight={95} />
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

const TopRowComponent = ({ move_type, count }) => {
  // add accessories to this component later
  var expBar = 0;
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
      image = "";
      break;
  }
  const [imgElement] = useImage(image, "Anonymous");
  const [sprite_sheet] = useImage(sheet, "Anonymous");
  if (count !== 0 && count !== "") {
    expBar = 315;
  } else {
    expBar = 205;
  }
  return (
    <Group>
      <Image image={sprite_sheet} x={5} y={550} cropWidth={268} cropHeight={49} cropX={222} cropY={4} width={201} height={38} />
      {count !== 0 && count !== "" ? (
        <Group>
          <Image image={sprite_sheet} x={205} y={550} cropWidth={146} cropHeight={49} cropX={222} cropY={474} width={110} height={36} />
          <Image image={imgElement} x={214} y={545} cropWidth={275} cropHeight={300} cropX={cropx} cropY={cropy} width={45} height={45} />
          <Text
            text={"+"}
            fontFamily="nintendoP_Skip-D_003"
            fontStyle="bold"
            fontSize={20}
            stroke="black"
            strokeWidth={4}
            lineJoin="round"
            fill={"white"}
            fillAfterStrokeEnabled={true}
            x={259}
            y={555}
            textAlign="left"
          />
          <NumberComponent number={count} x={273} y={558} width={15} height={20} colorHeight={40} />
        </Group>
      ) : null}
      <Image image={sprite_sheet} x={expBar} y={550} cropWidth={268} cropHeight={49} cropX={222} cropY={111} width={201} height={36} />
    </Group>
  );
};

const NumberComponent = ({ number, x, y, width, height, colorHeight }) => {
  const [sprite_sheet] = useImage(sheet, "Anonymous");
  if (number === undefined) {
    return null;
  }
  if (number.toString().length === 2) {
    return (
      <Group>
        <Image
          image={sprite_sheet}
          x={x + 14}
          y={y}
          cropX={numberArray[number.toString().charAt(1)]}
          cropY={colorHeight}
          cropWidth={32}
          cropHeight={40}
          width={width}
          height={height}
        />
        <Image
          image={sprite_sheet}
          x={x}
          y={y}
          cropX={numberArray[number.toString().charAt(0)]}
          cropY={colorHeight}
          cropWidth={32}
          cropHeight={40}
          width={width}
          height={height}
        />
      </Group>
    );
  } else if (number.toString().length === 1) {
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

const ResplendentComponent = ({ shouldRender }) => {
  const [imgElement] = useImage(sheet, "Anonymous");
  if (shouldRender) {
    return <Image image={imgElement} x={200} y={374} cropX={1170} cropY={274} cropWidth={78} cropHeight={74} width={60} height={55} />;
  }
  return null;
};

const ImageComponent = ({ image, cropX, cropY, cropWidth, cropHeight, width, height }) => {
  if (image === "https://fehportraits.s3.amazonaws.com/.png") {
    image = "";
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
  var index;
  switch (text) {
    case "HP":
      index = 0;
      break;
    case "Atk":
      index = 1;
      break;
    case "Spd":
      index = 2;
      break;
    case "Def":
      index = 3;
      break;
    case "Res":
      index = 4;
      break;
    default:
      index = -1;
  }
  if (index !== -1 && color !== undefined) {
    if (color[index] === 0 || color[index] === 1 || color[index] === 2) {
      if (color[index] === 0) {
        color = "#E9A3BB";
      } else if (color[index] === 2) {
        color = "#B6E6F0";
      } else {
        color = "white";
      }
    }
  }
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
  var [imgElement] = useImage(sheet, "Anonymous");
  if (merges !== 0) {
    if (merges === 10) {
      return (
        <Group>
          <Image image={imgElement} x={122} y={557} cropX={896} cropY={160} cropWidth={32} cropHeight={40} width={15} height={20} />
          <Image image={imgElement} x={136} y={557} cropX={numberArray[1]} cropY={160} cropWidth={32} cropHeight={40} width={15} height={20} />
          <Image image={imgElement} x={149} y={557} cropX={numberArray[0]} cropY={160} cropWidth={32} cropHeight={40} width={15} height={20} />
        </Group>
      );
    }
    return (
      <Group>
        <Image image={imgElement} x={122} y={557} cropX={896} cropY={40} cropWidth={32} cropHeight={40} width={15} height={20} />
        <Image image={imgElement} x={136} y={557} cropX={numberArray[merges]} cropY={40} cropWidth={32} cropHeight={40} width={15} height={20} />
      </Group>
    );
  }
  return null;
};

const StatComponent = ({ text, x, y }) => {
  if (text !== undefined && text !== "") {
    return <NumberComponent number={text} x={x} y={y} width={15} height={20} colorHeight={0} />;
  }
  return null;
};

const WMComponent = ({ weapon, movement }) => {
  // i think something in this method is adding shadows to the ui left of lv.
  // replace all of this for weapon types from the sprite sheet
  const [imgElement] = useImage(wmsheet, "Anonymous");
  var weaponX = 0;
  var weaponY = 0;
  var moveX = 0;

  if (weapon !== undefined) {
    weapon = weapon.split(" ");
  } else {
    weapon = ["", ""];
  }

  switch (weapon[0]) {
    case "Red":
      weaponX = 0;
      break;
    case "Blue":
      weaponX = 72;
      break;
    case "Green":
      weaponX = 141;
      break;
    case "Gray":
      weaponX = 213;
      break;
    case "":
      weaponX = -72;
      break;
    default:
      break;
  }
  switch (weapon[1]) {
    case "Tome":
      weaponY = 73;
      break;
    case "Bow":
      weaponY = 146;
      break;
    case "Dragon":
      weaponY = 219;
      break;
    case "Dagger":
      weaponY = 292;
      break;
    case "Staff":
      weaponY = 370;
      break;
    case "Beast":
      weaponY = 438;
      break;
    case "":
      weaponY = -73;
      break;
    default:
      weaponY = 0;
      break;
  }

  switch (movement) {
    case "infantry":
      moveX = 1;
      break;
    case "armored":
      moveX = 53;
      break;
    case "cavalry":
      moveX = 105;
      break;
    case "flying":
      moveX = 157;
      break;
    default:
      moveX = -50;
      break;
  }

  return (
    <Group>
      <Image image={imgElement} x={13} y={554} cropX={weaponX} cropY={weaponY} cropWidth={75} cropHeight={72} width={27} height={27} />
      <Image image={imgElement} x={170} y={555} cropX={moveX} cropY={525} cropWidth={50} cropHeight={50} width={27} height={27} />
    </Group>
  );
};

const WeaponComponent = ({ text, image, x, y, offsetX, offsetY }) => {
  if (image === "https://fehskills.s3.amazonaws.com/.png") {
    image = "";
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

  // global redux state
  // const global = useSelector((state) => state.tabList.tabList[state.tabList.tabValue]);
  const hero = useSelector((state) => state.tabList.tabList[state.tabList.tabValue].hero);
  const merges = useSelector((state) => state.tabList.tabList[state.tabList.tabValue].merges);
  const levels = useSelector((state) => state.tabList.tabList[state.tabList.tabValue].levels);
  const dragonflowers = useSelector((state) => state.tabList.tabList[state.tabList.tabValue].dragonflowers);
  const stats = useSelector((state) => state.tabList.tabList[state.tabList.tabValue].stats);
  const skills = useSelector((state) => state.tabList.tabList[state.tabList.tabValue].skills);
  const resplendent = useSelector((state) => state.tabList.tabList[state.tabList.tabValue].resplendent);
  const ss = useSelector((state) => state.tabList.tabList[state.tabList.tabValue].summonerSupport);
  const as = useSelector((state) => state.tabList.tabList[state.tabList.tabValue].allySupport);
  const background = useSelector((state) => state.tabList.tabList[state.tabList.tabValue].background);
  const blessing = useSelector((state) => state.tabList.tabList[state.tabList.tabValue].blessing);
  const fav = useSelector((state) => state.tabList.tabList[state.tabList.tabValue].favorite);
  var badgeList = [blessing, hero.hero_type, ss, as];
  const [statColor, setStatColor] = useState(["white", "white", "white", "white", "white"]);

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
          <BackgroundComponent image={background} summonerSupport={[blessing, hero.hero_type, ss, as]} width={540} height={960} />
          <ImageComponent
            image={
              resplendent
                ? "https://fehportraits.s3.amazonaws.com/Resplendent " + hero.name + ".png"
                : "https://fehportraits.s3.amazonaws.com/" + hero.name + ".png"
            }
            cropX={368}
            cropY={0}
            cropWidth={865}
            cropHeight={1538}
            width={540}
            height={960}
          />
          <UIComponent image={"https://fehportraits.s3.amazonaws.com/updated ui 2.png"} width={540} height={960} />
          <ButtonsComponent duo={hero.hero_type === "duo" || hero.hero_type === "harmonic"} fav={fav} />
          <BadgeComponent shouldRender={props.ascended_trait} nameOfBadge={floret} d={[5, 375, 45, 45]} />
          <BadgeList badgeList={[blessing, hero.hero_type, ss, as]} />
          <TopRowComponent move_type={hero.moveType} count={dragonflowers} />
          <RarityComponent rarity={5} />
          <ResplendentComponent shouldRender={resplendent} />
        </Layer>
        <Layer id="stat layer">
          <LargeTextComponent text={hero.name} color="white" stroke="black" x={58} y={470} width={214} />
          <LargeTextComponent text={hero.title} color="white" x={15} y={412} width={260} />
          <MergeComponent merges={merges} />
          <WMComponent weapon={hero.weaponType} movement={hero.moveType} />
          <TextComponent text={"HP"} color={levels} x={88} y={604} />
          <TextComponent text={"Atk"} color={levels} x={87} y={641} />
          <TextComponent text={"Spd"} color={levels} x={85} y={678} />
          <TextComponent text={"Def"} color={levels} x={86} y={715} />
          <TextComponent text={"Res"} color={levels} x={86} y={752} />
          <StatComponent text={`${stats[0]}`} x={172} y={603} />
          <StatComponent text={`${stats[1]}`} x={172} y={640} />
          <StatComponent text={`${stats[2]}`} x={172} y={677} />
          <StatComponent text={`${stats[3]}`} x={172} y={714} />
          <StatComponent text={`${stats[4]}`} x={172} y={751} />
          <TextComponent text={"9999\n\n7000"} color="#82f546" x={142} y={789} />
          <Text
            text={`${hero.VA}`}
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
            text={resplendent ? `${hero.artist[1]}` : `${hero.artist[0]}`}
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
          <WeaponComponent text={`${skills.weapon}`} image={`${props.refine}`} x={280} y={596} offsetX={33} offsetY={8} />
          <AssistOrSpecial text={`${skills.assist}`} x={280} y={631} offsetX={33} offsetY={9} />
          <AssistOrSpecial text={`${skills.special}`} x={278} y={671} offsetX={35} offsetY={7} />
          <SkillComponent text={`${skills.aSkill}`} x={275} y={707} offsetX={38} offsetY={8} />
          <SkillComponent text={`${skills.bSkill}`} x={275} y={745} offsetX={37} offsetY={7} />
          <SkillComponent text={`${skills.cSkill}`} x={275} y={781} offsetX={38} offsetY={8} />
        </Layer>
      </Stage>
    </div>
  );
}
