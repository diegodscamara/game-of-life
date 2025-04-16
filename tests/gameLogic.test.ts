import { getNextGeneration } from '../src/utils/gameLogic';
import type { Board } from '../src/types/cell';


// Helper function to create a board from a string representation
const createBoardFromString = (str: string): Board => {
  const rows = str.trim().split('\n').map(row => row.trim());
  return rows.map(row => row.split('').map(char => char === '*')); // ' * ' represents a live cell
};

describe('Game of Life Logic', () => {

  // --- Testing getNextGeneration (indirectly tests countLiveNeighbors) ---

  describe('getNextGeneration', () => {
    it('should return an empty array for an empty input board', () => {
      expect(getNextGeneration([])).toEqual([]);
    });

    it('should return an empty array for a board with empty rows', () => {
      expect(getNextGeneration([[], []])).toEqual([]);
    });

    // Rule 1: Any live cell with fewer than two live neighbours dies (underpopulation).
    it('should kill live cells with zero neighbours', () => {
      const board = createBoardFromString(`
        ...
        .*.
        ...
      `);
      const expected = createBoardFromString(`
        ...
        ...
        ...
      `);
      expect(getNextGeneration(board)).toEqual(expected);
    });

    it('should kill live cells with one neighbour', () => {
      const board = createBoardFromString(`
        *..
        .*.
        ...
      `);
      const expected = createBoardFromString(`
        ...
        ...
        ...
      `);
      expect(getNextGeneration(board)).toEqual(expected);
    });

    // Rule 2: Any live cell with two or three live neighbours lives on.
    it('should keep alive cells with two neighbours (stable block)', () => {
      const board = createBoardFromString(`
        **.
        **.
        ...
      `);
      const expected = createBoardFromString(`
        **.
        **.
        ...
      `);
      expect(getNextGeneration(board)).toEqual(expected);
    });

    it('should keep alive cells with three neighbours (center of blinker)', () => {
      const board = createBoardFromString(`
        .*.
        .*.
        .*.
      `);
      // Center cell has 2 neighbors, top/bottom have 1 -> dies
      // Side cells next to center become alive (3 neighbors)
      const expected = createBoardFromString(`
        ...
        ***
        ...
      `);
      expect(getNextGeneration(board)).toEqual(expected);
    });

    // Rule 3: Any live cell with more than three live neighbours dies (overpopulation).
    it('should kill live cells with four neighbours', () => {
      // const board = createBoardFromString(` // Unused original example
      //   ***
      //   *.*
      //   ***
      // `);
      // const expected = createBoardFromString(` // Unused original example
      //   *.*.* 
      //   .....
      //   *.*.*
      // `);

      // Refined example below:
      const board2 = createBoardFromString(`
        .**
        ***
        .**
      `);
      // Based on detailed trace:
      // [0,0](.) -> 3 neighbors -> Alive
      // [0,1](*) -> 4 neighbors -> Dead
      // [0,2](*) -> 3 neighbors -> Alive
      // [1,0](*) -> 3 neighbors -> Alive
      // [1,1](*) -> 5 neighbors -> Dead
      // [1,2](*) -> 5 neighbors -> Dead
      // [2,0](.) -> 3 neighbors -> Alive
      // [2,1](*) -> 4 neighbors -> Dead
      // [2,2](*) -> 3 neighbors -> Alive
      const expected2 = createBoardFromString(`
        *.*
        *..
        *.*
      `); // Corrected expected board again
      expect(getNextGeneration(board2)).toEqual(expected2);
    });

    // Rule 4: Any dead cell with exactly three live neighbours becomes a live cell (reproduction).
    it('should revive dead cells with exactly three neighbours (blinker)', () => {
      const board = createBoardFromString(`
        ...
        ***
        ...
      `);
      const expected = createBoardFromString(`
        .*.
        .*.
        .*.
      `);
      expect(getNextGeneration(board)).toEqual(expected);
    });

    // --- Edge Cases ---
    it('should handle board edges correctly (no wrap-around)', () => {
      // A 3x3 corner block
      const board = createBoardFromString(`
        **.
        *..
        ...
      `);
      // Top-left (*): 2 neighbours -> survives
      // Top-right (*): 2 neighbours -> survives
      // Mid-left (*): 2 neighbours -> survives
      // Center (.): 3 neighbours -> becomes alive
      const expected = createBoardFromString(`
        **.
        **.
        ...
      `); // Corrected expected board
       expect(getNextGeneration(board)).toEqual(expected);
    });

    it('should handle an all-dead board', () => {
      const board = createBoardFromString(`
        ...
        ...
        ...
      `);
      const expected = createBoardFromString(`
        ...
        ...
        ...
      `);
      expect(getNextGeneration(board)).toEqual(expected);
    });

    it('should handle an all-live board (becomes mostly dead)', () => {
      const board = createBoardFromString(`
        ***
        ***
        ***
      `);
      // Corners (3 neighbours) -> survive
      // Edges (5 neighbours) -> die
      // Center (8 neighbours) -> die
      const expected = createBoardFromString(`
        *.*
        ...
        *.*
      `);
       expect(getNextGeneration(board)).toEqual(expected);
    });

    // --- Patterns ---
    it('should correctly process a stable block pattern', () => {
      const board = createBoardFromString(`
        ....
        .**. 
        .**. 
        ....
      `);
      const expected = createBoardFromString(`
        ....
        .**. 
        .**. 
        ....
      `);
       expect(getNextGeneration(board)).toEqual(expected);
    });

    it('should correctly process one step of a blinker pattern', () => {
      const board1 = createBoardFromString(`
        .....
        .***.
        .....
        .....
      `);
      const expected1 = createBoardFromString(`
        ..*..
        ..*..
        ..*..
        .....
      `);
       expect(getNextGeneration(board1)).toEqual(expected1);

      const board2 = expected1;
      const expected2 = board1; // Should oscillate back
       expect(getNextGeneration(board2)).toEqual(expected2);
    });

    it('should correctly process one step of a glider pattern', () => {
      const board = createBoardFromString(`
        .....
        ..*..
        ...*.
        .***.
        .....
      `);
      // Manual step calculation for non-wrapping edges:
      // (1,2)* -> 1 neighbor -> dies
      // (2,3)* -> 2 neighbors -> lives
      // (3,1)* -> 1 neighbor -> dies
      // (3,2)* -> 3 neighbors -> lives
      // (3,3)* -> 2 neighbors -> lives
      // (2,1). -> 3 neighbors -> lives
      // (4,2). -> 3 neighbors -> lives
      const expected = createBoardFromString(`
        .....
        .....
        .*.*.
        ..**.
        ..*..
      `);
       expect(getNextGeneration(board)).toEqual(expected);
    });
  });
});
