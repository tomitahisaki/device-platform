import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { CommonCard } from './CommonCard';
import { CommonButton } from './CommonButton';

describe('CommonCard', () => {
	it('renders with title and content', () => {
		render(
			<CommonCard
				title="Test Card"
				content={<span>Test content</span>}
			/>
		);

		expect(screen.getByText('Test Card')).toBeInTheDocument();
		expect(screen.getByText('Test content')).toBeInTheDocument();
	});

	it('renders with actions when provided', () => {
		const actions = <CommonButton>Action Button</CommonButton>;
		
		render(
			<CommonCard
				title="Test Card"
				content={<span>Test content</span>}
				actions={actions}
			/>
		);

		expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
	});

	it('renders without actions when not provided', () => {
		render(
			<CommonCard
				title="Test Card"
				content={<span>Test content</span>}
			/>
		);

		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	it('applies custom elevation', () => {
		const { container } = render(
			<CommonCard
				title="Test Card"
				content={<span>Test content</span>}
				elevation={5}
			/>
		);

		const card = container.querySelector('.MuiCard-root');
		expect(card).toHaveClass('MuiPaper-elevation5');
	});
});
