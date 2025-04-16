import React, { memo } from 'react';

interface GridProps {
  /** The current state of the game board. */
  board: boolean[][];
  /** Callback function triggered when a cell is clicked. */
  onCellClick: (row: number, col: number) => void;
}

/**
 * Renders the Game of Life grid.
 * Each cell is clickable to toggle its state.
 */
const GridComponent: React.FC<GridProps> = ({ board, onCellClick }) => {
  if (!board || board.length === 0 || board[0].length === 0) {
    // Handle empty or invalid board state gracefully
    return <div className="text-red-500 text-center">Invalid board data.</div>;
  }

  const numCols = board[0].length;
  
  return (
    <div
      className="grid border border-gray-300 dark:border-gray-700 max-w-full overflow-auto"
      style={{
        gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
        width: 'fit-content', // Adjust grid size to content
        margin: 'auto', // Center the grid
      }}
      role="grid"
      aria-label="Game of Life Board"
    >
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="contents" role="row">
          {row.map((isAlive, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              type="button" // Explicitly type as button for semantics and accessibility
              className={`w-4 h-4 md:w-6 md:h-6 aspect-square border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                isAlive
                  ? 'bg-black dark:bg-white'
                  : 'bg-white dark:bg-gray-800'
              } transition-colors duration-100 ease-in-out`}
              onClick={() => onCellClick(rowIndex, colIndex)}
              aria-label={`Cell at row ${rowIndex + 1}, column ${
                colIndex + 1
              } is ${isAlive ? 'alive' : 'dead'}. Click to toggle.`}
              role="gridcell"
              aria-selected={isAlive} // Indicates the state visually
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Wrap the component with React.memo for performance optimization
const Grid = memo(GridComponent);

export default Grid;
