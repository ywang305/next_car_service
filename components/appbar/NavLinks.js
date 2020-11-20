import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
	Button,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from '@material-ui/core';
import {
	AccountCircleOutlined,
	ReplayOutlined,
	Payment,
	HelpOutlineOutlined,
	ErrorOutlineOutlined,
	ChatBubbleOutlineOutlined,
	ExpandLess,
	ExpandMore,
	Face,
	ListOutlined,
	DepartureBoard,
	ExitToAppOutlined,
	LocalAtmOutlined,
} from '@material-ui/icons';

const data = [
	{
		label: 'Login',
		icon: <AccountCircleOutlined />,
		to: '/login',
	},
	{
		label: 'New Ride',
		icon: <ReplayOutlined />,
		to: '/reservation',
	},
	{
		label: 'Payment',
		icon: <LocalAtmOutlined />,
		to: '/payment',
	},
	{
		label: 'Trip List',
		icon: <ListOutlined />,
		to: '/trips',
	},
	{
		label: 'Logout',
		icon: <ExitToAppOutlined />,
		to: '/logout',
	},
];

export const WebNavLinks = () => {
	return data.map(({ label, icon, to }) => (
		<Link href={to} key={to}>
			<Tooltip title={label}>
				<IconButton color='inherit' aria-label={label}>
					{icon}
				</IconButton>
			</Tooltip>
		</Link>
	));
};

export const MobileNavLinks = () => {
	return data.map(({ label, icon, to }) => (
		<Link href={to} key={to}>
			<a>
				<ListItem button>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText primary={label} />
				</ListItem>
			</a>
		</Link>
	));
};
