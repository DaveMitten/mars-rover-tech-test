import React from "react";

type RoverPosition = {
  startPosition: string;
  instructions: string;
};

type Props = {
  stateRef: React.MutableRefObject<{
    rover1: RoverPosition;
    rover2: RoverPosition;
  }>;
};

const RoverResults = ({ stateRef }: Props) => {
  return (
    <div>
      <h3>Rover 1</h3>
      <p>
        Start Position: <span> {stateRef.current.rover1.startPosition}</span>
      </p>
      <p>
        Instructions: <span> {stateRef.current.rover1.instructions}</span>
      </p>

      <h3>Rover 2</h3>
      <p>
        Start Position: <span> {stateRef.current.rover2.startPosition}</span>
      </p>
      <p>
        Instructions: <span> {stateRef.current.rover2.instructions}</span>
      </p>
    </div>
  );
};

export default RoverResults;
