import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { FeatureCard } from './FeatureCard';
import { Home as HomeIcon } from '@mui/icons-material';

describe('FeatureCard', () => {
	const mockProps = {
		icon: <HomeIcon data-testid="feature-icon" />,
		title: 'Test Feature',
		description: 'This is a test description',
	};

	it('renders with provided title and description', () => {
		render(<FeatureCard {...mockProps} />);

		expect(screen.getByText('Test Feature')).toBeInTheDocument();
		expect(screen.getByText('This is a test description')).toBeInTheDocument();
	});

	it('renders the provided icon', () => {
		render(<FeatureCard {...mockProps} />);

		expect(screen.getByTestId('feature-icon')).toBeInTheDocument();
	});

	it('has correct MUI Card structure', () => {
		const { container } = render(<FeatureCard {...mockProps} />);

		const card = container.querySelector('.MuiCard-root');
		expect(card).toBeInTheDocument();
	});
});
