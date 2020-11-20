import React, { useMemo, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import {
	Box,
	Button,
	IconButton,
	Divider,
	Typography,
	Toolbar,
	AppBar,
	useTheme,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Avatar,
} from '@material-ui/core';
import useDevice from '../../lib/hooks/useDevice';
import { WebNavLinks, MobileNavLinks } from './NavLinks';

const useUserId = () => {
	const userId = useSelector((state) => state.login.userId);
	return [userId];
};

const useDrawer = () => {
	const [open, setOpen] = useState(false);
	const toggleDrawer = useCallback((event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		setOpen((o) => !o);
	}, []);

	return [open, toggleDrawer];
};

export function Appbar() {
	const [width, height, isXS] = useDevice();
	const [open, toggleDrawer] = useDrawer();

	const brand = 'Next Car Service';

	return (
		<>
			<AppBar position='static'>
				<Toolbar>
					<Box ml={2}>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='menu'
							onClick={toggleDrawer}
						>
							<MenuIcon />
						</IconButton>
					</Box>
					<Link href='/' replace>
						<Typography
							variant='h6'
							style={{ cursor: 'pointer', marginLeft: 16 }}
						>
							{brand}
						</Typography>
					</Link>
					<Box style={{ flexGrow: 1 }} />
					{!isXS && <WebNavLinks />}
				</Toolbar>
			</AppBar>

			<Drawer anchor='left' open={open} onClose={toggleDrawer}>
				<Box
					bgcolor='primary.main'
					color='info.contrastText'
					p={2}
					display='flex'
					alignItems='center'
				>
					<Avatar alt='HadesFlower' src='/logo.jpg' />
					<Box ml={1}>
						<Typography variant='h6'>{brand}</Typography>
					</Box>
				</Box>

				<List onClick={toggleDrawer}>
					<MobileNavLinks />
				</List>
			</Drawer>
		</>
	);
}

export default Appbar;
