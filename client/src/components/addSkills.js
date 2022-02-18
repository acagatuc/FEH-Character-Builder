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

async function createASkills(skills) {
  var index = 1; //to ignore header

  while (index < 311) {
    // create skill json
    const data = {
      name: skills.data[index][1],
      img: skills.data[index][2],
      description: skills.data[index][3],
      visibleStats: skills.data[index][4],
      unique: skills.data[index][5],
      restrictions: skills.data[index][6],
    };
    if (skills.data[index][1] !== "") {
      console.log("adding " + data.name + " to database");

      await fetch("http://localhost:5000/A_Slot/add", {
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

async function createBSkills(skills) {
  var index = 1; //to ignore header

  while (index < 394) {
    // create skill json
    const data = {
      name: skills.data[index][1],
      img: skills.data[index][2],
      description: skills.data[index][3],
    };
    if (skills.data[index][1] !== "") {
      console.log("adding " + data.name + " to database");

      await fetch("http://localhost:5000/B_Slot/add", {
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

async function createCSkills(skills) {
  var index = 1; //to ignore header

  while (index < 439) {
    // create skill json
    const data = {
      name: skills.data[index][1],
      img: skills.data[index][2],
      description: skills.data[index][3],
    };
    if (skills.data[index][1] !== "") {
      console.log("adding " + data.name + " to database");

      await fetch("http://localhost:5000/C_Slot/add", {
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

async function createPWeapons(weapons) {
  var index = 1; //to ignore header

  while (index < 1129) {
    // create skill json
    const data = {
      name: weapons.data[index][1],
      description: weapons.data[index][2],
      type: weapons.data[index][3],
      might: weapons.data[index][4],
      visibleStats: weapons.data[index][5],
      sp: weapons.data[index][6],
      refine: weapons.data[index][7],
      heroesList: weapons.data[index][8],
    };
    if (weapons.data[index][1] !== "") {
      console.log("adding " + data.name + " to database");

      await fetch("http://localhost:5000/PrefWeapons/add", {
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

async function createGWeapons(weapons) {
  var index = 1; //to ignore header

  while (index < 1129) {
    // create skill json
    const data = {
      name: weapons.data[index][1],
      description: weapons.data[index][2],
      type: weapons.data[index][3],
      might: weapons.data[index][4],
      visibleStats: weapons.data[index][5],
      sp: weapons.data[index][6],
      refine: weapons.data[index][7],
      maxSkill: weapons.data[index][8],
    };
    if (weapons.data[index][1] !== "") {
      console.log("adding " + data.name + " to database");

      await fetch("http://localhost:5000/GenericWeapons/add", {
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

async function createRefines(weapons) {
  var index = 1; //to ignore header

  while (index < 1129) {
    // create skill json
    const data = {
      name: weapons.data[index][1],
      description: weapons.data[index][2],
      type: weapons.data[index][3],
      uniqueRefine: weapons.data[index][4],
      genericRefine: weapons.data[index][5],
      img: weapons.data[index][6],
    };
    if (weapons.data[index][1] !== "") {
      console.log("adding " + data.heroesList + " to database");

      await fetch("http://localhost:5000/Refines/add", {
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

async function createAssists(assists) {
  var index = 1; //to ignore header

  while (index < 1129) {
    // create skill json
    const data = {
      name: assists.data[index][1],
      description: assists.data[index][2],
      sp: assists.data[index][3],
      maxSkill: assists.data[index][4],
      staffOnly: assists.data[index][5],
      unique: assists.data[index][6],
      heroesList: assists.data[index][7],
    };
    if (assists.data[index][1] !== "") {
      console.log("adding " + data.name + " to database");

      await fetch("http://localhost:5000/Assist/add", {
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

async function createSpecials(specials) {
  var index = 1; //to ignore header

  while (index < 1129) {
    // create skill json
    const data = {
      name: specials.data[index][1],
      description: specials.data[index][2],
      sp: specials.data[index][3],
      cd: specials.data[4],
      maxSkill: specials.data[index][5],
      staffOnly: specials.data[index][6],
      unique: specials.data[index][7],
      heroesList: specials.data[index][8],
    };
    if (specials.data[index][1] !== "") {
      console.log("adding " + data.name + " to database");

      await fetch("http://localhost:5000/Specials/add", {
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
          createPWeapons(results);
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
                "Click to upload pref Weapons"
              )}
            </div>
          </>
        )}
      </CSVReader>
      <CSVReader
        onUploadAccepted={(results: any) => {
          console.log("---------------------------");
          console.log(results);
          console.log("---------------------------");
          setZoneHover(false);

          // add to db
          createGWeapons(results);
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
                "Click to upload generic Weapons"
              )}
            </div>
          </>
        )}
      </CSVReader>
      <CSVReader
        onUploadAccepted={(results: any) => {
          console.log("---------------------------");
          console.log(results);
          console.log("---------------------------");
          setZoneHover(false);

          // add to db
          createRefines(results);
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
                "Click to upload refines"
              )}
            </div>
          </>
        )}
      </CSVReader>
      <CSVReader
        onUploadAccepted={(results: any) => {
          console.log("---------------------------");
          console.log(results);
          console.log("---------------------------");
          setZoneHover(false);

          // add to db
          createAssists(results);
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
                "Click to upload Assists"
              )}
            </div>
          </>
        )}
      </CSVReader>
      <CSVReader
        onUploadAccepted={(results: any) => {
          console.log("---------------------------");
          console.log(results);
          console.log("---------------------------");
          setZoneHover(false);

          // add to db
          createSpecials(results);
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
                "Click to upload specials"
              )}
            </div>
          </>
        )}
      </CSVReader>
      <CSVReader
        onUploadAccepted={(results: any) => {
          console.log("---------------------------");
          console.log(results);
          console.log("---------------------------");
          setZoneHover(false);

          // add to db
          createASkills(results);
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
                "Click to upload A Skills"
              )}
            </div>
          </>
        )}
      </CSVReader>

      <CSVReader
        onUploadAccepted={(results: any) => {
          console.log("---------------------------");
          console.log(results);
          console.log("---------------------------");
          setZoneHover(false);

          // add to db
          createBSkills(results);
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
                "Click to upload B Skills"
              )}
            </div>
          </>
        )}
      </CSVReader>

      <CSVReader
        onUploadAccepted={(results: any) => {
          console.log("---------------------------");
          console.log(results);
          console.log("---------------------------");
          setZoneHover(false);

          // add to db
          createCSkills(results);
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
                "Click to upload cskills"
              )}
            </div>
          </>
        )}
      </CSVReader>
    </div>
  );
}
