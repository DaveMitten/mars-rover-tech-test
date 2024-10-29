import styles from "../styles/Grid.module.css";

// This component is responsible for rendering the grid and the rovers on the grid. not imporatnt i just did this for fun. It doesnt work perfectly and can break the app so be aware, but the test suite shows the function working, this needs work.
const Grid = ({
  gridSize = [4, 4],
  rover1,
  rover2,
}: {
  gridSize: [number, number];
  rover1: { startPosition: string; endPosition: string };
  rover2: {
    startPosition: string;
    endPosition: string;
  };
}) => {
  // Extract coordinates from position strings
  const getRoverCoords = (positionStr: string) => {
    const [x, y] = positionStr.split(" ").map(Number);
    return { x, y };
  };

  // Get coordinates for both rovers
  const rover1Start = `${getRoverCoords(rover1.startPosition).x}-${
    getRoverCoords(rover1.startPosition).y
  }`;
  const rover1End = `${getRoverCoords(rover1.endPosition).x}-${
    getRoverCoords(rover1.endPosition).y
  }`;
  const rover2Start = `${getRoverCoords(rover2.startPosition).x}-${
    getRoverCoords(rover2.startPosition).y
  }`;
  const rover2End = `${getRoverCoords(rover2.endPosition).x}-${
    getRoverCoords(rover2.endPosition).y
  }`;

  const getCellClassName = (cellKey: string) => {
    let className = styles.cell;

    if (cellKey === rover1Start) className += ` ${styles.rover1Start}`;
    if (cellKey === rover1End) className += ` ${styles.rover1End}`;
    if (cellKey === rover2Start) className += ` ${styles.rover2Start}`;
    if (cellKey === rover2End) className += ` ${styles.rover2End}`;

    return className;
  };

  const rows = [];
  //took me a while to get my noggin round this one, it essentially renders a group for each value in the group i.e. 5 is the value, so make 5 groups which iwll be rows ofc.
  //Then inside that group, run through the second gridSize value and loop the amount of times we need to make up the cells of that column.

  //THEN we need to make sure we are going from the bottom left to the top right, so we need to start with the highest y value and work our way down.

  // THEN we need to make sure that we are changing the class for the cell the rover is actually in. Its probably very inefficient with re-rendering but it does sort of work for now.
  for (let y = gridSize[1]; y >= 0; y--) {
    const cells = [];
    for (let x = 0; x <= gridSize[0]; x++) {
      const cellKey = `${x}-${y}`;

      cells.push(
        <div key={cellKey} className={getCellClassName(cellKey)}>
          x: {x} y: {y}
        </div>
      );
    }
    rows.push(
      <div key={y} className={styles.row}>
        {cells}
      </div>
    );
  }

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid}>{rows}</div>
    </div>
  );
};

export default Grid;
