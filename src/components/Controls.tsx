import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  FastForward,
  ArrowClockwise,
} from '@phosphor-icons/react';

interface ControlsProps {
  /** Indicates if the simulation is currently running. */
  isPlaying: boolean;
  /** Function to toggle the play/pause state of the simulation. */
  onPlayPause: () => void;
  /** Function to advance the simulation by one step. */
  onStep: () => void;
  /** Function to advance the simulation by a specified number of steps. */
  onAdvanceX: (steps: number) => void;
  /** Function to reset the game board to its initial state or clear it. */
  onReset: () => void;
  /** Optional CSS class name for custom styling. */
  className?: string;
}

/**
 * Provides UI controls for the Game of Life simulation.
 */
const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onPlayPause,
  onStep,
  onAdvanceX,
  onReset,
  className = '',
}) => {
  const [advanceSteps, setAdvanceSteps] = useState<number>(10); // Default steps to advance
  const [inputError, setInputError] = useState<string | null>(null);

  const handleAdvanceInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    // Allow empty input temporarily or positive integers
    if (value === '' || /^[1-9]\d*$/.test(value)) {
      setAdvanceSteps(value === '' ? 0 : parseInt(value, 10)); // Store 0 if empty, otherwise parse
      setInputError(null); // Clear error on valid input
    } else {
      setInputError('Please enter a positive number.');
      // Optionally keep the last valid value or set to a default, e.g., 1
      // setAdvanceSteps(1);
    }
  };

  const handleAdvanceXClick = () => {
    if (advanceSteps > 0) {
      onAdvanceX(advanceSteps);
      setInputError(null); // Clear error on successful submission
    } else {
      setInputError('Please enter a number greater than 0.');
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAdvanceXClick();
    }
  };

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-4 p-4 ${className}`}
      role="toolbar"
      aria-label="Game Controls"
    >
      {/* Play/Pause Button */}
      <button
        type="button"
        onClick={onPlayPause}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-white transition-colors"
        aria-label={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
        aria-pressed={isPlaying}
      >
        {isPlaying ? (
          <Pause size={20} weight="fill" aria-hidden="true" />
        ) : (
          <Play size={20} weight="fill" aria-hidden="true" />
        )}
        <span>{isPlaying ? 'Pause' : 'Play'}</span>
      </button>

      {/* Step Forward Button */}
      <button
        type="button"
        onClick={onStep}
        disabled={isPlaying} // Disable stepping while playing
        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 disabled:opacity-50 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-white transition-colors disabled:cursor-not-allowed"
        aria-label="Advance one generation"
        aria-disabled={isPlaying}
      >
        <SkipForward size={20} weight="fill" aria-hidden="true" />
        <span>Step</span>
      </button>

      {/* Advance X Section */}
      <div className="flex items-center gap-2">
        <label htmlFor="advance-steps-input" className="sr-only">
          Number of steps to advance
        </label>
        <input
          id="advance-steps-input"
          type="number"
          min="1" // HTML5 validation
          value={advanceSteps === 0 ? '' : advanceSteps} // Show empty string if 0
          onChange={handleAdvanceInputChange}
          onKeyDown={handleInputKeyDown}
          disabled={isPlaying} // Disable while playing
          className={`w-20 rounded border p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            inputError
              ? 'border-red-500 ring-2 ring-red-300'
              : 'border-gray-300 dark:border-gray-600'
          } disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-white`}
          placeholder="Steps"
          aria-label="Number of steps to advance"
          aria-invalid={!!inputError}
          aria-describedby={inputError ? 'advance-error' : undefined}
        />
        <button
          type="button"
          onClick={handleAdvanceXClick}
          disabled={isPlaying || advanceSteps <= 0} // Disable if playing or invalid input
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 dark:bg-green-800 dark:hover:bg-green-900 disabled:opacity-50 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 text-white transition-colors disabled:cursor-not-allowed"
          aria-label={`Advance ${advanceSteps} generation${
            advanceSteps !== 1 ? 's' : ''
          }`}
          aria-disabled={isPlaying || advanceSteps <= 0}
        >
          <FastForward size={20} weight="fill" aria-hidden="true" />
          <span>Advance</span>
        </button>
      </div>
      {inputError && (
        <p
          id="advance-error"
          className="w-full text-red-600 dark:text-red-400 text-sm text-center"
          role="alert"
        >
          {inputError}
        </p>
      )}

      {/* Reset Button */}
      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 text-white transition-colors"
        aria-label="Reset Board"
      >
        <ArrowClockwise size={20} weight="bold" aria-hidden="true" />
        <span>Reset</span>
      </button>
    </div>
  );
};

export default Controls;
