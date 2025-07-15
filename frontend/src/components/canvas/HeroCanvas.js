import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";
// import floret from "./../../assets/ascendant_floret.png";
// import Summoner_C from "./../../assets/Summoner_C.png";
// import Summoner_B from "./../../assets/Summoner_B.png";
// import Summoner_A from "./../../assets/Summoner_A.png";
// import Summoner_S from "./../../assets/Summoner_S.png";
// import Ally_C from "./../../assets/Ally_C.png";
// import Ally_B from "./../../assets/Ally_B.png";
// import Ally_A from "./../../assets/Ally_A.png";
// import Ally_S from "./../../assets/Ally_S.png";
// import harmonic from "./../../assets/harmonic.png";
// import duo from "./../../assets/duo.png";
// import ascended from "./../../assets/ascended.png";
// import rearmed from "./../../assets/rearmed.png";
// import df from "./../../assets/Item_2.png";
// import stars from "./../../assets/Summon_Rarity.png";
// import sheet from "./../../assets/sprite_sheet.png";
// import wmsheet from "./../../assets/wmsheet.png";
// import bg_button from "./../../assets/bg_button.png";
// import ui from "./../../assets/updated ui 2.png";

// redux import
import { useSelector } from "react-redux";

import ImageComponent from "./ImageComponent";
import UIComponent from "./UIComponent";
import BackgroundComponent from "./BackgroundComponent";
import { LargeTextComponent, TextComponent } from "./TextComponent";
import StatComponent from "./StatComponent";
import WMComponent from "./WMComponent";

// an array that declares the x values of all numbers
const numberArray = [520, 555, 590, 624, 656, 692, 725, 759, 793, 828];

// const RarityComponent = ({ rarity }) => {
//   const [imgElement] = useImage(stars, "Anonymous");

//   return (
//     <Group>
//       {/* <Image image={imgElement} x={0} y={0} cropX={0} cropY={390} cropWidth={90} cropHeight={90} width={50} height={50} /> 1 star
//       <Image image={imgElement} x={30} y={0} cropX={90} cropY={390} cropWidth={90} cropHeight={90} width={50} height={50} /> 2 star
//       <Image image={imgElement} x={60} y={0} cropX={180} cropY={390} cropWidth={90} cropHeight={90} width={50} height={50} /> 3 star
//       <Image image={imgElement} x={90} y={0} cropX={270} cropY={390} cropWidth={90} cropHeight={90} width={50} height={50} /> 4 star*/}
//       <Image
//         image={imgElement}
//         x={44}
//         y={375}
//         cropX={360}
//         cropY={390}
//         cropWidth={90}
//         cropHeight={90}
//         width={45}
//         height={45}
//       />
//       <Image
//         image={imgElement}
//         x={72}
//         y={375}
//         cropX={360}
//         cropY={390}
//         cropWidth={90}
//         cropHeight={90}
//         width={45}
//         height={45}
//       />
//       <Image
//         image={imgElement}
//         x={100}
//         y={375}
//         cropX={360}
//         cropY={390}
//         cropWidth={90}
//         cropHeight={90}
//         width={45}
//         height={45}
//       />
//       <Image
//         image={imgElement}
//         x={128}
//         y={375}
//         cropX={360}
//         cropY={390}
//         cropWidth={90}
//         cropHeight={90}
//         width={45}
//         height={45}
//       />
//       <Image
//         image={imgElement}
//         x={156}
//         y={375}
//         cropX={360}
//         cropY={390}
//         cropWidth={90}
//         cropHeight={90}
//         width={45}
//         height={45}
//       />
//       {/* <Image image={imgElement} x={156} y={375} cropX={450} cropY={390} cropWidth={90} cropHeight={90} width={45} height={45} /> forma star*/}
//     </Group>
//   );
// };

// const ResplendentComponent = ({ shouldRender }) => {
//   const [imgElement] = useImage(sheet, "Anonymous");
//   if (shouldRender) {
//     return (
//       <Image
//         image={imgElement}
//         x={200}
//         y={374}
//         cropX={1170}
//         cropY={274}
//         cropWidth={78}
//         cropHeight={74}
//         width={60}
//         height={55}
//       />
//     );
//   }
//   return null;
// };

// const ImageComponent2 = ({
//   image,
//   cropX,
//   cropY,
//   cropWidth,
//   cropHeight,
//   width,
//   height,
// }) => {
//   const [imageUrl, setImageUrl] = useState(null);
//   useEffect(() => {
//     if (image.name?.length > 0 && image.name) {
//       const safeName = image.name.replace(":", "_");
//       const url = `http://localhost:5000/api/heroes/heroImage/${safeName}.png`;
//       setImageUrl(url);
//     }
//   }, [image]);
//   const [imgElement] = useImage(imageUrl, "Anonymous");
//   return (
//     <Image
//       image={imgElement}
//       x={0}
//       y={0}
//       cropX={cropX}
//       cropY={cropY}
//       cropWidth={cropWidth}
//       cropHeight={cropHeight}
//       width={width}
//       height={height}
//     />
//   );
// };

export default function HeroCanvas(props) {
  const stageRef = React.useRef();
  const [stageWidth, setStageWidth] = useState(props.stageWidth);
  const [stageHeight, setStageHeight] = useState(
    (1920 / 1080) * props.stageWidth
  );

  // global redux state
  const hero = useSelector((state) => state.hero.heroes[state.tabs.currentTab]);

  return (
    <div id="wrapper" className="wrapper">
      <Stage
        width={stageWidth}
        height={stageHeight}
        ref={stageRef}
        scaleX={stageWidth / 540}
        scaleY={stageHeight / 960}
      >
        <Layer id="hero layer">
          <BackgroundComponent
            width={540}
            height={960}
          />
          <ImageComponent
            image={hero}
            cropX={368}
            cropY={0}
            cropWidth={865}
            cropHeight={1538}
            width={540}
            height={960}
          />
          <UIComponent width={540} height={960} />
        </Layer>
        <Layer id="stat layer">
          <LargeTextComponent
            text={hero.name.split(':')[1] || ""}
            color="white"
            stroke="black"
            x={58}
            y={470}
            width={214}
          />
          <LargeTextComponent
            text={hero.name.split(":")[0] || ""}
            color="white"
            x={15}
            y={412}
            width={260}
          />
          <WMComponent weapon={hero.weaponType || "empty"} movement={hero.movementType || "empty"} />
          <TextComponent
            text={"HP"}
            color={"white"} // change this to a helper function later
            x={88}
            y={604}
          />
          <TextComponent
            text={"Atk"}
            color={"white"}
            x={87}
            y={641}
          />
          <TextComponent
            text={"Spd"}
            color={"white"}
            x={85}
            y={678}
          />
          <TextComponent
            text={"Def"}
            color={"white"}
            x={86}
            y={715}
          />
          <TextComponent
            text={"Res"}
            color={"white"}
            x={86}
            y={752}
          />
          <StatComponent number={`${hero.calculatedStats[0]}`} x={158} y={603} buff={false} />
          <StatComponent
            number={`${hero.calculatedStats[1]}`}
            x={158}
            y={640}
            buff={hero.buffs[0] !== 0}
            buffColor={hero.buffs[0] < 0}
          />
          <StatComponent
            number={`${hero.calculatedStats[2]}`}
            x={158}
            y={677}
            buff={hero.buffs[1] !== 0}
            buffColor={hero.buffs[1] < 0}
          />
          <StatComponent
            number={`${hero.calculatedStats[3]}`}
            x={158}
            y={714}
            buff={hero.buffs[2] !== 0}
            buffColor={hero.buffs[2] < 0}
          />
          <StatComponent
            number={`${hero.calculatedStats[4]}`}
            x={158}
            y={751}
            buff={hero.buffs[3] !== 0}
            buffColor={hero.buffs[3] < 0}
          />
        </Layer>
      </Stage>
    </div>
  );

  // export default function HeroCanvas(props) {
  //   const stageRef = React.useRef();
  //   const [stageWidth, setStageWidth] = useState(props.stageWidth);
  //   const [stageHeight, setStageHeight] = useState(
  //     (1920 / 1080) * props.stageWidth
  //   );

  //   // global redux state
  //   const hero = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].hero
  //   );
  //   const merges = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].merges
  //   );
  //   const levels = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].levels
  //   );
  //   const dragonflowers = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].dragonflowers
  //   );
  //   const hp = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].hp
  //   );
  //   const atk = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].atk
  //   );
  //   const spd = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].spd
  //   );
  //   const def = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].def
  //   );
  //   const res = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].res
  //   );
  //   const weapon = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].weapon
  //   );
  //   const refine = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].refine
  //   );
  //   const assist = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].assist
  //   );
  //   const special = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].special
  //   );
  //   const aSkill = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].aSkill
  //   );
  //   const bSkill = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].bSkill
  //   );
  //   const cSkill = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].cSkill
  //   );
  //   const sSkill = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].sSkill
  //   );
  //   // const resplendent = useSelector((state) => state.tabList.tabList[state.tabList.tabValue].resplendent);
  //   const ss = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].summonerSupport
  //   );
  //   const as = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].allySupport
  //   );
  //   const buff = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].buffStats
  //   );
  //   const background = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].background
  //   );
  //   const blessing = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].blessing
  //   );
  //   const fav = useSelector(
  //     (state) => state.tabList.tabList[state.tabList.tabValue].favorite
  //   );

  //   const handleExport = () => {
  //     const uri = stageRef.current.toDataURL({ pixelRatio: 4 });
  //     downloadURI(uri, "FEH Builder - " + hero.name + ".png");
  //   };

  //   const downloadURI = (uri, name) => {
  //     var link = document.createElement("a");
  //     link.download = name;
  //     link.href = uri;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   };

  //   useEffect(() => {
  //     function resizeCanvas() {
  //       if (window.innerWidth <= 500) {
  //         console.log("hit with " + window.innerWidth);

  //         setStageWidth(window.innerWidth);
  //         setStageHeight((1920 / 1080) * window.innerWidth);
  //       }
  //     }

  //     window.addEventListener("resize", resizeCanvas());
  //   });

  //   return (
  //     <div id="wrapper" className="wrapper">
  //       <Stage
  //         width={stageWidth}
  //         height={stageHeight}
  //         ref={stageRef}
  //         onClick={handleExport}
  //         scaleX={stageWidth / 540}
  //         scaleY={stageHeight / 960}
  //       >
  //         <Layer id="img layer">
  //           <BackgroundComponent
  //             image={background}
  //             summonerSupport={ss}
  //             width={540}
  //             height={960}
  //           />
  //           {/* <ImageComponent
  //             image={
  //               resplendent
  //                 ? "Resplendent " + hero.name
  //                 : hero.name
  //             }
  //             cropX={368}
  //             cropY={0}
  //             cropWidth={865}
  //             cropHeight={1538}
  //             width={540}
  //             height={960}
  //           /> */}
  //           <ImageComponent
  //             image={hero}
  //             cropX={368}
  //             cropY={0}
  //             cropWidth={865}
  //             cropHeight={1538}
  //             width={540}
  //             height={960}
  //           />
  //           <UIComponent
  //             image={"https://fehportraits.s3.amazonaws.com/updated ui 2.png"}
  //             width={540}
  //             height={960}
  //           />
  //           <ButtonsComponent
  //             duo={hero.hero_type === "duo" || hero.hero_type === "harmonic"}
  //             fav={fav}
  //           />
  //           <BadgeComponent
  //             shouldRender={props.ascended_trait}
  //             nameOfBadge={floret}
  //             d={[5, 375, 45, 45]}
  //           />
  //           {/* <BadgeList badgeList={[blessing, hero.hero_type, ss, as]} /> */}
  //           <TopRowComponent move_type={hero.move_type} count={dragonflowers} />
  //           <RarityComponent rarity={5} />
  //           {/* <ResplendentComponent shouldRender={resplendent} /> */}
  //         </Layer>
  //         <Layer id="stat layer">
  //           <LargeTextComponent
  //             text={hero.single_name}
  //             color="white"
  //             stroke="black"
  //             x={58}
  //             y={470}
  //             width={214}
  //           />
  //           <LargeTextComponent
  //             text={hero.title}
  //             color="white"
  //             x={15}
  //             y={412}
  //             width={260}
  //           />
  //           <MergeComponent merges={merges} />
  //           <WMComponent weapon={hero.weapon_type} movement={hero.move_type} />
  //           <TextComponent
  //             text={"HP"}
  //             color={levels}
  //             merges={merges}
  //             x={88}
  //             y={604}
  //           />
  //           <TextComponent
  //             text={"Atk"}
  //             color={levels}
  //             merges={merges}
  //             x={87}
  //             y={641}
  //           />
  //           <TextComponent
  //             text={"Spd"}
  //             color={levels}
  //             merges={merges}
  //             x={85}
  //             y={678}
  //           />
  //           <TextComponent
  //             text={"Def"}
  //             color={levels}
  //             merges={merges}
  //             x={86}
  //             y={715}
  //           />
  //           <TextComponent
  //             text={"Res"}
  //             color={levels}
  //             merges={merges}
  //             x={86}
  //             y={752}
  //           />
  //           <StatComponent text={`${hp}`} x={172} y={603} buff={false} />
  //           <StatComponent
  //             text={`${atk}`}
  //             x={172}
  //             y={640}
  //             buff={buff[0] !== 0}
  //             buffColor={buff[0] < 0}
  //           />
  //           <StatComponent
  //             text={`${spd}`}
  //             x={172}
  //             y={677}
  //             buff={buff[1] !== 0}
  //             buffColor={buff[1] < 0}
  //           />
  //           <StatComponent
  //             text={`${def}`}
  //             x={172}
  //             y={714}
  //             buff={buff[2] !== 0}
  //             buffColor={buff[2] < 0}
  //           />
  //           <StatComponent
  //             text={`${res}`}
  //             x={172}
  //             y={751}
  //             buff={buff[3] !== 0}
  //             buffColor={buff[3] < 0}
  //           />
  //           <TextComponent
  //             text={"9999\n\n7000"}
  //             color="#82f546"
  //             x={142}
  //             y={789}
  //           />
  //           <Text
  //             text={hero.VA === undefined ? "" : `${hero.VA}`}
  //             x={34}
  //             y={910}
  //             fontFamily="nintendoP_Skip-D_003"
  //             fontSize={16}
  //             stroke="black"
  //             strokeWidth={4}
  //             lineJoin="round"
  //             fill="white"
  //             fillAfterStrokeEnabled={true}
  //           />
  //           {/* <Text
  //             text={
  //               resplendent
  //                 ? `${hero.artist[1]}`
  //                 : hero.artist[0] !== undefined
  //                 ? `${hero.artist[0]}`
  //                 : ""
  //             }
  //             x={34}
  //             y={932}
  //             fontFamily="nintendoP_Skip-D_003"
  //             fontSize={16}
  //             stroke="black"
  //             strokeWidth={4}
  //             lineJoin="round"
  //             fill="white"
  //             fillAfterStrokeEnabled={true}
  //           /> */}
  //         </Layer>
  //         <Layer id="skill layer">
  //           <WeaponComponent
  //             text={`${weapon.name}`}
  //             image={`${refine.img}`}
  //             x={280}
  //             y={596}
  //             offsetX={33}
  //             offsetY={8}
  //           />
  //           <AssistOrSpecial
  //             text={`${assist.name}`}
  //             x={280}
  //             y={631}
  //             offsetX={33}
  //             offsetY={9}
  //           />
  //           <AssistOrSpecial
  //             text={`${special.name}`}
  //             x={278}
  //             y={671}
  //             offsetX={35}
  //             offsetY={7}
  //           />
  //           <SkillComponent
  //             text={`${aSkill.name}`}
  //             x={275}
  //             y={707}
  //             offsetX={38}
  //             offsetY={8}
  //           />
  //           <SkillComponent
  //             text={`${bSkill.name}`}
  //             x={275}
  //             y={745}
  //             offsetX={37}
  //             offsetY={7}
  //           />
  //           <SkillComponent
  //             text={`${cSkill.name}`}
  //             x={275}
  //             y={781}
  //             offsetX={38}
  //             offsetY={8}
  //           />
  //           <SkillComponent
  //             text={`${sSkill.name}`}
  //             x={275}
  //             y={819}
  //             offsetX={38}
  //             offsetY={8}
  //           />
  //         </Layer>
  //       </Stage>
  //     </div>
  //   );
}
