import { useState, useCallback, useRef, useEffect } from 'react';
import type { Board } from '../types/cell';
import { getNextGeneration } from '../utils/gameLogic'; 

/**
 * Calculates the next state of the board based on Conway's rules.
 * @param board The current board state.
 * @returns The next board state.
 * @todo Move this function to src/utils/gameLogic.ts and implement the actual rules.
 */

interface UseGameOfLifeProps {
  /** Initial number of rows for the grid. */
  initialRows: number;
  /** Initial number of columns for the grid. */
  initialCols: number;
  /** Simulation speed in milliseconds. Defaults to 500ms. */
  intervalMs?: number;
}

/**
 * Custom hook to manage the state and logic of Conway's Game of Life.
 */
export const useGameOfLife = ({
  initialRows,
  initialCols,
  intervalMs = 500,
}: UseGameOfLifeProps) => {
  /** Creates an empty board with the specified dimensions. */
  const createEmptyBoard = useCallback(
    (rows: number, cols: number): Board => // Use imported Board type
      Array.from({ length: rows }, () => Array(cols).fill(false)),
    []
  );

  const [board, setBoard] = useState<Board>(() => // Use imported Board type
    createEmptyBoard(initialRows, initialCols)
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the interval ID

  /** Toggles the state (alive/dead) of a specific cell. */
  const toggleCell = useCallback(
    (row: number, col: number) => {
      // Prevent modification while playing for simplicity, or clone board if needed
      if (isPlaying) return;

      // Ensure coordinates are valid
      if (
        row < 0 ||
        row >= board.length ||
        col < 0 ||
        col >= (board[0]?.length ?? 0)
      ) {
        console.error('Invalid cell coordinates:', row, col);
        return;
      }

      // Use functional update to ensure we work with the latest state
      setBoard((prevBoard) => {
        // Create a deep copy to avoid direct state mutation
        const newBoard: Board = prevBoard.map((r) => [...r]); // Use imported Board type
        newBoard[row][col] = !newBoard[row][col];
        return newBoard;
      });
    },
    [isPlaying, board] // Include dependencies
  );

  /** Advances the simulation by one generation. */
  const step = useCallback(() => {
    setBoard((prevBoard) => {
      const nextGenBoard = getNextGeneration(prevBoard);
      
      // Create a completely new reference by deep-copying the array
      return nextGenBoard.map(row => [...row]);
    });
  }, []);

  /** Starts or stops the automatic simulation. */
  const playPause = useCallback(() => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  }, []);

  /** Handles the simulation interval. */
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        step();
      }, intervalMs);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Cleanup function to clear interval on unmount or when isPlaying changes to false
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, intervalMs, step]); // Re-run effect if isPlaying, intervalMs, or step changes

  /** Advances the simulation by a specified number of steps. */
  const advanceX = useCallback(
    (steps: number) => {
      if (isPlaying || steps <= 0) return; // Do nothing if playing or steps is not positive

      setBoard((currentBoard) => {
        let tempBoard = currentBoard;
        for (let i = 0; i < steps; i++) {
          tempBoard = getNextGeneration(tempBoard);
        }
        return tempBoard;
      });
    },
    [isPlaying] // Depends on isPlaying
  );

  /** Resets the board to an empty state with initial dimensions. */
  const resetBoard = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false); // Stop simulation before resetting
    }
    setBoard(createEmptyBoard(initialRows, initialCols));
  }, [isPlaying, initialRows, initialCols, createEmptyBoard]); // Dependencies

  return {
    board,
    isPlaying,
    toggleCell,
    step,
    playPause,
    advanceX,
    resetBoard,
    setBoard, // Expose setBoard for potential direct manipulation (e.g., loading presets)
  };
};
