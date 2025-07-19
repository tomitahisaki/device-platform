import { Button, type ButtonProps } from '@mui/material';
import type { ReactNode } from 'react';

interface CommonButtonProps extends Omit<ButtonProps, 'children'> {
	children: ReactNode;
	loading?: boolean;
}

export function CommonButton({
	children,
	loading = false,
	disabled,
	...props
}: CommonButtonProps) {
	return (
		<Button
			{...props}
			disabled={disabled || loading}
			sx={{
				textTransform: 'none',
				fontWeight: 600,
				...props.sx,
			}}
		>
			{loading ? 'Loading...' : children}
		</Button>
	);
}
