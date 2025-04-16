/**
 * Represents the state of the Game of Life board.
 * It's a 2D array where `true` indicates a live cell and `false` indicates a dead cell.
 */
export type Board = boolean[][];

/**
 * Represents the state of a single cell.
 * `true` for alive, `false` for dead.
 */
export type CellState = boolean;
