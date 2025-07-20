import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import type { ReactNode } from 'react';

const theme = createTheme({
	palette: {
		primary: {
			main: '#2c3e50',
		},
		secondary: {
			main: '#3498db',
		},
		background: {
			default: '#f8f9fa',
		},
	},
});

interface AllTheProvidersProps {
	children: ReactNode;
}

export function AllTheProviders({ children }: AllTheProvidersProps) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
