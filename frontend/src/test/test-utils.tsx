import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { AllTheProviders } from './providers';

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Explicitly export required components from '@testing-library/react'
export {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
  act,
  cleanup,
  within,
  renderHook,
  // Add other exports you use from '@testing-library/react' here
} from '@testing-library/react';
export { customRender as render };
