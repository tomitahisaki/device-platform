import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test/test-utils';
import { CommonButton } from './CommonButton';

describe('CommonButton', () => {
	it('renders with children text', () => {
		render(<CommonButton>Click me</CommonButton>);

		expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
	});

	it('calls onClick when clicked', () => {
		const handleClick = vi.fn();
		render(<CommonButton onClick={handleClick}>Click me</CommonButton>);

		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('is disabled when disabled prop is true', () => {
		render(<CommonButton disabled>Click me</CommonButton>);

		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('is disabled when loading is true', () => {
		render(<CommonButton loading>Click me</CommonButton>);

		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('applies custom color variant', () => {
		render(<CommonButton color="secondary" variant="outlined">Click me</CommonButton>);

		const button = screen.getByRole('button');
		expect(button).toHaveClass('MuiButton-outlinedSecondary');
	});
});
