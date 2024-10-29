import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/App.module.css";
import RoverCommands from "./features/RoverCommands";
import Grid from "./components/Grid";
import RoverResults from "./features/RoverResults";
import { findRoverEndPosition } from "./𝘂𝘁𝗶𝗹𝘀/RoverPositioning";

function App() {
  const [gridSize, setGridSize] = useState<[number, number]>([5, 5]);
  const [roverCommands, setRoverCommands] = useState<{
    rover1: { startPosition: string; instructions: string };
    rover2: { startPosition: string; instructions: string };
  }>({
    rover1: { startPosition: "0 1 N", instructions: "" },
    rover2: { startPosition: "0 0 N", instructions: "" },
  });

  // Add this ref to mirror the roverCommands state
  const roverCommandsRef = useRef(roverCommands);

  // Update the ref whenever state changes
  useEffect(() => {
    roverCommandsRef.current = roverCommands;
    findRoverEndPosition(gridSize, roverCommands.rover1);
    findRoverEndPosition(gridSize, roverCommands.rover2);
  }, [gridSize, roverCommands]);

  function handleRoverCommands(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    setRoverCommands({
      ...roverCommands,
      rover1: {
        startPosition: (formJson.rover1StartPosition as string) || "0 0 N",
        instructions: (formJson.rover1Instructions as string) || "",
      },
      rover2: {
        startPosition: (formJson.rover2StartPosition as string) || "0 0 N",
        instructions: (formJson.rover2Instructions as string) || "",
      },
    });
    setGridSize([
      parseInt(formJson.GridEndPositionX as string) - 1 || 4,
      parseInt(formJson.GridEndPositionY as string) - 1 || 4,
    ]);
  }

  return (
    <div className={styles.App}>
      <RoverCommands handleRoverCommands={handleRoverCommands} />
      <div className={styles.resultsWrapper}>
        <RoverResults stateRef={roverCommandsRef} />
        <Grid
          rover1={{
            startPosition: roverCommands.rover1.startPosition,
            endPosition: findRoverEndPosition(gridSize, roverCommands.rover1),
          }}
          rover2={{
            startPosition: roverCommands.rover2.startPosition,
            endPosition: findRoverEndPosition(gridSize, roverCommands.rover2),
          }}
          gridSize={gridSize}
        />
      </div>
    </div>
  );
}

export default App;
