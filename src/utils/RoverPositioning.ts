// Add a queue to manage pending operations
let processingQueue: (() => void)[] = [];
let isProcessing = false;

export async function findRoverEndPosition(
  gridSize: [number, number],
  rover: {
    startPosition: string;
    instructions: string;
  }
): Promise<string> {
  // Create a promise that will resolve when it's this call's turn
  return new Promise((resolve) => {
    const processRover = () => {
      try {
        //Starting position
        const foundStartingFace = findStartingFace(rover.startPosition) ?? "N";
        const roverCoords = findStartingCoordinates(rover);

        //set the rovers starting position
        currentPosition = roverCoords;
        currentDirection = foundStartingFace as keyof typeof DIRECTION;

        //execute the instructions
        const roverInstructions = rover.instructions.split("");
        roverInstructions.forEach((direction) => {
          moveRover(direction.toLowerCase());
        });

        if (
          currentPosition[0] > gridSize[0] ||
          currentPosition[1] > gridSize[1]
        ) {
          resolve(`${rover.startPosition}`);
        } else {
          resolve(
            `${currentPosition[0]} ${currentPosition[1]} ${currentDirection}`
          );
        }
      } catch (error) {
        resolve(rover.startPosition); // Return starting position on error
      } finally {
        isProcessing = false;
        processNextInQueue(); // Process next item in queue
      }
    };

    // Add to queue
    processingQueue.push(processRover);

    // Start processing if not already processing
    if (!isProcessing) {
      processNextInQueue();
    }
  });
}

// Helper function to process the next item in queue
function processNextInQueue() {
  if (processingQueue.length > 0 && !isProcessing) {
    isProcessing = true;
    const nextProcess = processingQueue.shift();
    if (nextProcess) {
      nextProcess();
    }
  }
}
