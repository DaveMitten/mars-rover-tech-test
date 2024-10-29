import {
  DIRECTION,
  DIRECTION_TO_MOVE,
  COMPASS_DIRECTION,
} from "../constants/roverPositioning";

// Rover position state
let currentPosition: [number, number] = [0, 0];

// Rover direction state
let currentDirection: keyof typeof DIRECTION = "N";

// Modify to use a single promise-based queue, i think this is the best way right now to handle the rovers. Implementing the PromiseJobs from the javascript event loop.
let processingPromise: Promise<void> = Promise.resolve();

export async function findRoverEndPosition(
  gridSize: [number, number],
  rover: {
    startPosition: string;
    instructions: string;
  }
): Promise<string> {
  // Wait for previous rover to finish before processing the next one
  return new Promise((resolve) => {
    processingPromise = processingPromise.then(async () => {
      try {
        // Starting position
        const foundStartingFace = findStartingFace(rover.startPosition) ?? "N";
        const roverCoords = findStartingCoordinates(rover);

        // Set the rovers starting position
        currentPosition = roverCoords;
        currentDirection = foundStartingFace as keyof typeof DIRECTION;

        // Execute the instructions, after splitting the string into an array of characters for easy looped execution
        const roverInstructions = rover.instructions.split("");
        for (const direction of roverInstructions) {
          moveRover(direction.toLowerCase());
          // Add a small delay to simulate movement
          await new Promise((r) => setTimeout(r, 100));
        }

        if (
          currentPosition[0] > gridSize[0] ||
          currentPosition[1] > gridSize[1]
        ) {
          //if the rover is out of bounds, throw an error, moves you to the catch block
          throw new Error("Rover fell off the grid!");
        }
        //succesful resolution of the promise
        resolve(
          `${currentPosition[0]} ${currentPosition[1]} ${currentDirection}`
        );
      } catch (error) {
        resolve(rover.startPosition);
      }
    });
  });
}

function findStartingFace(startPosition: string): string | undefined {
  //This regex will parse the starting position of the rovers, it will match the NSWE direction in the string.
  //probably need to ensure that when inputs are done that it enters the direction correctly, a select option or drop down would make more sense
  //That goes for the coordinates too, the less freedom the user has, the more control we do and we can ensure a better outcome
  const directionRegex = /[NSEW]/;
  //match here will return the initial input and the matched direction
  const roverStartingFace = startPosition.match(directionRegex)?.[0];
  if (!roverStartingFace) {
    throw new Error("Invalid direction: must be N, S, E, or W");
  }
  return roverStartingFace;
}

function findStartingCoordinates(rover: {
  startPosition: string;
}): [number, number] {
  const coords = rover.startPosition
    .replace(/[a-z]/gi, " ")
    .trim()
    .split(/\s+/)
    .map(Number);
  // makes sure the return is numbers in the array.

  if (coords.length !== 2) {
    throw new Error("Invalid coordinates: exactly 2 numbers required");
  }
  //making sure we return proper coordinates since we are passed a string.
  return [coords[0], coords[1]];
}

function moveRover(direction: string) {
  //turn left or right
  if (direction === "l" || direction === "r") {
    // Get the array of directions in clockwise order

    // Find current index
    const currentIndex = COMPASS_DIRECTION.indexOf(currentDirection);
    // Calculate new index based on turn direction
    const newIndex =
      direction === "l"
        ? (currentIndex - 1 + 4) % 4
        : // Add 4 before modulo to handle negative numbers, like a compass or clock face. Using modulo prevents erroring from negative numbers or numbers that overflow
          (currentIndex + 1) % 4;
    currentDirection = COMPASS_DIRECTION[newIndex] as keyof typeof DIRECTION;
  }

  //move forward
  if (direction === "m") {
    const movement = DIRECTION_TO_MOVE[currentDirection];

    currentPosition = [
      currentPosition[0] + movement[0],
      currentPosition[1] + movement[1],
    ];
    //  making sure the robot cannot falloff the grid, does a comparison with Math.max, if the coord is less than 0, it will be set to 0, since the grid is 0 based and 0 would be the "max"

    currentPosition = currentPosition.map((coord): number =>
      Math.max(0, coord)
    ) as [number, number];

    return currentPosition;
  }
}
