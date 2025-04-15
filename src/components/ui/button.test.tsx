import { render, screen } from '@testing-library/react';
import { Button } from './button'; // Assuming Button component is in the same directory
import { cn } from '@/lib/utils'; // Import cn if needed for complex class assertions, though likely not needed for simple tests

// Mock the cn function if it causes issues in tests, though usually not necessary with identity-obj-proxy
// jest.mock('@/lib/utils', () => ({
//   cn: (...args: any[]) => args.filter(Boolean).join(' ')
// }));

describe('Button Component (cva version)', () => {
  test('renders button with children', () => {
    render(<Button>Click Me Test</Button>);
    // Find by role and accessible name
    const buttonElement = screen.getByRole('button', { name: /click me test/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('applies default variant and size classes', () => {
    render(<Button>Default Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /default button/i });
    // Check for one distinct class from the default variant
    expect(buttonElement).toHaveClass('bg-primary');
    // Check for one distinct class from the default size
    expect(buttonElement).toHaveClass('h-9');
  });

  test('applies specified variant classes (e.g., destructive)', () => {
    render(<Button variant="destructive">Delete</Button>);
    const buttonElement = screen.getByRole('button', { name: /delete/i });
    // Check for one distinct class from the destructive variant
    expect(buttonElement).toHaveClass('bg-destructive');
    // Ensure a default class is NOT present
    expect(buttonElement).not.toHaveClass('bg-primary');
  });

  test('applies specified size classes (e.g., lg)', () => {
    render(<Button size="lg">Large Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /large button/i });
    // Check for one distinct class from the lg size
    expect(buttonElement).toHaveClass('h-10');
    // Ensure a default class is NOT present
    expect(buttonElement).not.toHaveClass('h-9');
  });

  test('renders as disabled when disabled prop is passed', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /disabled button/i });
    expect(buttonElement).toBeDisabled();
    // Check for the opacity class applied by the base cva styles for disabled
    expect(buttonElement).toHaveClass('disabled:opacity-50');
  });
}); 