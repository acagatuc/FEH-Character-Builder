import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const BadgeComponent = ({ shouldRender, nameOfBadge, d }) => {
  // d stands for dimensions
  // use this for blessings, supports, and ascended floret
  const [imgElement] = useImage(nameOfBadge, "Anonymous");
  if (shouldRender) {
    return (
      <Image image={imgElement} x={d[0]} y={d[1]} width={d[2]} height={d[3]} />
    );
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
    badgeList[0] =
      "https://fehskills.s3.amazonaws.com/" + badgeList[0] + ".png";
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
        heroImage =
          "https://fehskills.s3.amazonaws.com/" + badgeList[1] + ".png";
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
      {renderList[0] ? (
        <BadgeComponent
          shouldRender={true}
          nameOfBadge={badgeList[0]}
          d={dimensions[0]}
        />
      ) : (
        <Group></Group>
      )}
      {renderList[1] ? (
        <BadgeComponent
          shouldRender={true}
          nameOfBadge={heroImage}
          d={dimensions[1]}
        />
      ) : (
        <Group></Group>
      )}
      {renderList[2] ? (
        <BadgeComponent
          shouldRender={true}
          nameOfBadge={summonerImage}
          d={dimensions[2]}
        />
      ) : (
        <Group></Group>
      )}
      {renderList[3] ? (
        <BadgeComponent
          shouldRender={true}
          nameOfBadge={allyImage}
          d={dimensions[3]}
        />
      ) : (
        <Group></Group>
      )}
    </Group>
  );
};

export default {BadgeList, BadgeComponent};