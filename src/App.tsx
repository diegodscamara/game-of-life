import { useGameOfLife } from './hooks/useGameOfLife';
import Grid from './components/Grid';
import Controls from './components/Controls';

// Use a smaller grid size for better visibility
const INITIAL_ROWS = 20;
const INITIAL_COLS = 30;
const SIMULATION_SPEED_MS = 200; // Faster speed

function App() {
  const {
    board,
    isPlaying,
    toggleCell,
    step,
    playPause,
    advanceX,
    resetBoard,
  } = useGameOfLife({
    initialRows: INITIAL_ROWS,
    initialCols: INITIAL_COLS,
    intervalMs: SIMULATION_SPEED_MS,
  });

  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-gray-100 dark:bg-gray-900 p-4 min-h-screen">
      <h1 className="font-bold text-gray-800 dark:text-gray-100 text-3xl text-center">
        Conway's Game of Life
      </h1>
      <div className="flex md:flex-row flex-col items-center gap-4">
        <Controls
          isPlaying={isPlaying}
          onPlayPause={playPause}
          onStep={step}
          onAdvanceX={advanceX}
          onReset={resetBoard}
        />
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4 border-4 border-gray-300 dark:border-gray-700 rounded-lg">
        <Grid
          board={board}
          onCellClick={toggleCell}
        />
      </div>
      <footer className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
        Click cells to toggle state. Use controls to run the simulation.
      </footer>
    </div>
  );
}

export default App;
