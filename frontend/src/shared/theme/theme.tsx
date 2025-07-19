import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
		].join(','),
	},
});

type MuiThemeProviderProps = {
	children: ReactNode;
}

export function MuiThemeProvider({ children }: MuiThemeProviderProps) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
