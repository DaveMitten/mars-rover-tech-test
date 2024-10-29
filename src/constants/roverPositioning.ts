// m = move forward 1 grid square
// l = turn left 90 degrees from current facing position i.e. facing north, left 90 makes it facing west
// r = turn right 90 degrees from current facing position i.e. facing north, right 90 makes it facing east

interface Direction {
  N: number;
  E: number;
  S: number;
  W: number;
}
type CompassDirection = keyof Direction;

//This order is important for the rover to know which direction to move in, if we change the order we need to update the DIRECTION_TO_MOVE constant to work differently
export const COMPASS_DIRECTION: CompassDirection[] = ["N", "E", "S", "W"];

// Using const object
export const DIRECTION: Direction = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
};

interface DirectionToMove {
  N: [number, number];
  E: [number, number];
  S: [number, number];
  W: [number, number];
}

export const DIRECTION_TO_MOVE: DirectionToMove = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0],
};

interface LeftRightMovement {
  l: string;
  r: string;
}

// Enum to store the left and right movement values
export const LEFT_RIGHT_MOVEMENT: LeftRightMovement = {
  l: "-",
  r: "+",
} as const;
