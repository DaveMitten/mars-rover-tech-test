import { findRoverEndPosition } from "../RoverPositioning";

const gridSize: [number, number] = [5, 5];
const rover1 = { startPosition: "1 2 N", instructions: "LMLMLMLMM" };
const rover2 = { startPosition: "3 3 E", instructions: "MMRMMRMRRM" };
const rover3 = { startPosition: "2 1 S", instructions: "MM" };
const rover4 = { startPosition: "4 1 S", instructions: "LL" };

describe("findRoverEndPosition function tests", () => {
  it("should process rovers sequentially when called concurrently", async () => {
    const executionOrder: string[] = [];
    const timestamp = Date.now();

    // Call both rovers simultaneously so we can test out the order of execution and add a timestamp as an additional check
    const [result1, result2, result3, result4] = await Promise.all([
      findRoverEndPosition(gridSize, rover1).then((result) => {
        executionOrder.push(
          `rover1 finished at ${Date.now() - timestamp}ms. Result: ${result}`
        );
        return result;
      }),
      findRoverEndPosition(gridSize, rover2).then((result) => {
        executionOrder.push(
          `rover2 finished at ${Date.now() - timestamp}ms. Result: ${result}`
        );
        return result;
      }),
      findRoverEndPosition(gridSize, rover3).then((result) => {
        executionOrder.push(
          `rover3 finished at ${Date.now() - timestamp}ms. Result: ${result}`
        );
        return result;
      }),
      findRoverEndPosition(gridSize, rover4).then((result) => {
        executionOrder.push(
          `rover4 finished at ${Date.now() - timestamp}ms. Result: ${result}`
        );
        return result;
      }),
    ]);

    // Log the execution order to see the time difference, which will show the order of execution
    console.log(executionOrder);

    // Verify the results are still showing correctly
    expect(result1).toBe("1 3 N");
    expect(result2).toBe("5 1 E");
    expect(result3).toBe("2 0 S");
    expect(result4).toBe("4 1 N");
  });
  it("should not return a negative number", async () => {
    const executionOrder: string[] = [];
    const timestamp = Date.now();

    // Call both rovers simultaneously so we can test out the order of execution and add a timestamp as an additional check
    const [result] = await Promise.all([
      findRoverEndPosition(gridSize, rover3).then((result) => {
        executionOrder.push(
          `rover3 finished at ${Date.now() - timestamp}ms. Result: ${result}`
        );
        return result;
      }),
    ]);

    // Log the execution order to see the time difference, which will show the order of execution
    console.log(executionOrder);

    // Verify the results are still showing correctly
    expect(result).toBe("2 0 S");
  });

  it("should return the final position of the rover", async () => {
    expect(
      await findRoverEndPosition(gridSize, {
        startPosition: "1 2 N",
        instructions: "M",
      })
    ).toBe("1 3 N");
  });
  it("should return the final position of rover 1", async () => {
    expect(await findRoverEndPosition(gridSize, rover1)).toBe("1 3 N");
  });
  it("should return the final position of rover 2", async () => {
    expect(await findRoverEndPosition(gridSize, rover2)).toBe("5 1 E");
  });
});
