import React, { useState } from "react";

import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from "react-papaparse";

const GREY = "#CCC";
const GREY_LIGHT = "rgba(255, 255, 255, 0.4)";
const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = "#686868";

const styles = {
  zone: {
    alignItems: "center",
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    padding: 20,
  },
  file: {
    background: "linear-gradient(to bottom, #EEE, #DDD)",
    borderRadius: 20,
    display: "flex",
    height: 120,
    width: 120,
    position: "relative",
    zIndex: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  info: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
  },
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: "0.5em",
    justifyContent: "center",
    display: "flex",
  },
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: "0.5em",
  },
  progressBar: {
    bottom: 14,
    position: "absolute",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  zoneHover: {
    borderColor: GREY_DIM,
  },
  default: {
    borderColor: GREY,
  },
  remove: {
    height: 23,
    position: "absolute",
    right: 6,
    top: 6,
    width: 23,
  },
};

async function createNewHeroes(heroes) {
  var index = 1; //to ignore header

  while (index < 775) {
    // create hero json
    const data = {
      name: heroes.data[index][1],
      title: heroes.data[index][2],
      move_type: heroes.data[index][3],
      weapon_type: heroes.data[index][4],
      hp: heroes.data[index][5],
      atk: heroes.data[index][6],
      spd: heroes.data[index][7],
      def: heroes.data[index][8],
      res: heroes.data[index][9],
      superboon: heroes.data[index][10],
      superbane: heroes.data[index][11],
      weapons: heroes.data[index][12],
      assists: heroes.data[index][13],
      specials: heroes.data[index][14],
      passives: heroes.data[index][15],
      recommended: heroes.data[index][16],
      hero_type: heroes.data[index][17],
      single_name: heroes.data[index][18],
      eVA: heroes.data[index][19],
      jVA: heroes.data[index][20],
      Artist: heroes.data[index][21],
    };
    if (heroes.data[index][1] !== "") {
      console.log("adding " + data.name + " to database");

      await fetch("http://localhost:5000/Heroes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    index += 1;
  }
}

export default function CSVReader() {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );

  return (
    <div>
      <CSVReader
        onUploadAccepted={(results: any) => {
          console.log("---------------------------");
          console.log(results);
          console.log("---------------------------");
          setZoneHover(false);

          // add to db
          createNewHeroes(results);
        }}
        onDragOver={(event: DragEvent) => {
          event.preventDefault();
          setZoneHover(true);
        }}
        onDragLeave={(event: DragEvent) => {
          event.preventDefault();
          setZoneHover(false);
        }}
        noDrag
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
          Remove,
        }: any) => (
          <>
            <div
              {...getRootProps()}
              style={Object.assign(
                {},
                styles.zone,
                zoneHover && styles.zoneHover
              )}
            >
              {acceptedFile ? (
                <>
                  <div style={styles.file}>
                    <div style={styles.info}>
                      <span style={styles.size}>
                        {formatFileSize(acceptedFile.size)}
                      </span>
                      <span style={styles.name}>{acceptedFile.name}</span>
                    </div>
                    <div style={styles.progressBar}>
                      <ProgressBar />
                    </div>
                    <div
                      {...getRemoveFileProps()}
                      style={styles.remove}
                      onMouseOver={(event: Event) => {
                        event.preventDefault();
                        setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                      }}
                      onMouseOut={(event: Event) => {
                        event.preventDefault();
                        setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                      }}
                    >
                      <Remove color={removeHoverColor} />
                    </div>
                  </div>
                </>
              ) : (
                "Click to upload heroes to DB"
              )}
            </div>
          </>
        )}
      </CSVReader>
    </div>
  );
}
