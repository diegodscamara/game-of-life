import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('<App /> Integration Tests', () => {
    it('renders the main application title and components', () => {
        render(<App />);
        expect(screen.getByRole('heading', { name: /conway's game of life/i })).toBeInTheDocument();
        expect(screen.getByRole('toolbar', { name: /game controls/i })).toBeInTheDocument();
        expect(screen.getByRole('grid', { name: /game of life board/i })).toBeInTheDocument();
    });

    it('toggles a cell state when clicked', async () => {
        render(<App />);
        const cells = screen.getAllByRole('gridcell');
        const firstCell = cells[0];

        // Verify initial state (assuming it starts dead)
        expect(firstCell).toHaveAttribute('aria-selected', 'false');
        expect(firstCell).toHaveClass('bg-white'); // Or dark:bg-gray-800 depending on theme

        // Click the cell
        await userEvent.click(firstCell);

        // Verify toggled state (should be alive)
        // Note: We query again as the component re-renders
        const updatedFirstCell = screen.getAllByRole('gridcell')[0];
        expect(updatedFirstCell).toHaveAttribute('aria-selected', 'true');
        expect(updatedFirstCell).toHaveClass('bg-black'); // Or dark:bg-white

        // Click again to toggle back
        await userEvent.click(updatedFirstCell);
        const finalFirstCell = screen.getAllByRole('gridcell')[0];
        expect(finalFirstCell).toHaveAttribute('aria-selected', 'false');
    });

    it('toggles play/pause button state and text', async () => {
        render(<App />);
        const playButton = screen.getByRole('button', { name: /play simulation/i });

        expect(playButton).toHaveTextContent(/play/i);
        expect(playButton).toHaveAttribute('aria-pressed', 'false');

        // Click Play
        await userEvent.click(playButton);

        const pauseButton = screen.getByRole('button', { name: /pause simulation/i });
        expect(pauseButton).toHaveTextContent(/pause/i);
        expect(pauseButton).toHaveAttribute('aria-pressed', 'true');

        // Click Pause
        await userEvent.click(pauseButton);

        const finalPlayButton = screen.getByRole('button', { name: /play simulation/i });
        expect(finalPlayButton).toHaveTextContent(/play/i);
        expect(finalPlayButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('disables step and advance buttons when playing', async () => {
        render(<App />);
        const playButton = screen.getByRole('button', { name: /play simulation/i });
        const stepButton = screen.getByRole('button', { name: /advance one generation/i });
        const advanceButton = screen.getByRole('button', { name: /^advance \d+ generation/i }); // Match variations
        const advanceInput = screen.getByLabelText(/number of steps to advance/i);

        expect(stepButton).toBeEnabled();
        expect(advanceButton).toBeEnabled();
        expect(advanceInput).toBeEnabled();

        // Click Play
        await userEvent.click(playButton);

        expect(stepButton).toBeDisabled();
        expect(advanceButton).toBeDisabled();
        expect(advanceInput).toBeDisabled();

        // Click Pause
        const pauseButton = screen.getByRole('button', { name: /pause simulation/i });
        await userEvent.click(pauseButton);

        expect(stepButton).toBeEnabled();
        expect(advanceButton).toBeEnabled();
        expect(advanceInput).toBeEnabled();
    });

    it('resets the board when reset button is clicked', async () => {
        render(<App />);
        const cells = screen.getAllByRole('gridcell');
        const firstCell = cells[0];

        // Make a cell alive
        await userEvent.click(firstCell);
        expect(screen.getAllByRole('gridcell')[0]).toHaveAttribute('aria-selected', 'true');

        // Click Reset
        const resetButton = screen.getByRole('button', { name: /reset board/i });
        await userEvent.click(resetButton);

        // Verify cell is dead again
        expect(screen.getAllByRole('gridcell')[0]).toHaveAttribute('aria-selected', 'false');
        // Verify all cells are dead (optional, check a few or count live ones)
        const liveCellsAfterReset = screen.queryAllByRole('gridcell', { selected: true });
        expect(liveCellsAfterReset.length).toBe(0);
    });

    it('advances by X steps when advance button is clicked with valid input', async () => {
        render(<App />);
        const advanceInput = screen.getByLabelText(/number of steps to advance/i);
        const advanceButton = screen.getByRole('button', { name: /^advance \d+ generation/i });

        // Change input value (default is 10)
        await userEvent.clear(advanceInput);
        await userEvent.type(advanceInput, '5');
        expect(advanceInput).toHaveValue(5);

        // Click Advance (we can't easily verify the state change without mocks/visuals,
        // but we ensure the button is clickable and doesn't crash)
        expect(advanceButton).toBeEnabled();
        await userEvent.click(advanceButton);
    });

    it('shows an error message for invalid input in advance steps', async () => {
        render(<App />);
        const advanceInput = screen.getByLabelText(/number of steps to advance/i);
        const advanceButton = screen.getByRole('button', { name: /^advance \d+ generation/i });

        // Enter invalid input
        await userEvent.clear(advanceInput);
        await userEvent.type(advanceInput, '-5');

        // Check for error indication on input (might need direct value check)
        expect(advanceInput).toHaveAttribute('aria-invalid', 'true');
        // Check for error message (assuming role="alert" is used)
        expect(screen.getByRole('alert')).toHaveTextContent(/please enter a positive number/i);

        // Button should be disabled
        expect(advanceButton).toBeDisabled();

        // Enter valid input again
        await userEvent.clear(advanceInput);
        await userEvent.type(advanceInput, '3');
        expect(advanceInput).toHaveValue(3);
        // Check that aria-invalid is specifically set to "false" for valid input
        expect(advanceInput).toHaveAttribute('aria-invalid', 'false');
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        expect(advanceButton).toBeEnabled();

    });

    it('allows advancing by hitting Enter in the input field', async () => {
        render(<App />);
        const advanceInput = screen.getByLabelText(/number of steps to advance/i);

        await userEvent.clear(advanceInput);
        await userEvent.type(advanceInput, '7{Enter}');
    });

}); 