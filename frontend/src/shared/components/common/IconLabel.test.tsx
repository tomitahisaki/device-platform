import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { IconLabel } from './IconLabel';
import { Home as HomeIcon } from '@mui/icons-material';

describe('IconLabel', () => {
	const mockIcon = <HomeIcon data-testid="test-icon" />;

	it('renders icon and label correctly', () => {
		render(<IconLabel icon={mockIcon} label="Test Label" />);

		expect(screen.getByTestId('test-icon')).toBeInTheDocument();
		expect(screen.getByText('Test Label')).toBeInTheDocument();
	});

	it('renders with default variant', () => {
		render(<IconLabel icon={mockIcon} label="Test Label" />);

		const typography = screen.getByText('Test Label');
		expect(typography).toHaveClass('MuiTypography-subtitle2');
	});

	it('renders with custom variant', () => {
		render(<IconLabel icon={mockIcon} label="Test Label" variant="h6" />);

		const typography = screen.getByText('Test Label');
		expect(typography).toHaveClass('MuiTypography-h6');
	});

	it('has correct flex layout structure', () => {
		const { container } = render(<IconLabel icon={mockIcon} label="Test Label" />);

		const box = container.firstChild as HTMLElement;
		expect(box).toHaveStyle({
			display: 'flex',
			alignItems: 'center',
		});
	});

	it('applies custom gap when provided', () => {
		const { container } = render(<IconLabel icon={mockIcon} label="Test Label" gap={2} />);

		const box = container.firstChild as HTMLElement;
		const computedStyle = window.getComputedStyle(box);
		expect(computedStyle.gap).toBe('16px'); // MUI theme spacing(2) = 16px
	});
});
