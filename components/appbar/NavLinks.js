import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    Button,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Avatar,
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
import { selectIsLogin } from '../../lib/store/loginSlice';
import { useSelector } from 'react-redux';

const data = [
    {
        label: 'Login',
        icon: <AccountCircleOutlined />,
        to: '/login',
    },
    {
        label: 'Profile',
        icon: (
            <Avatar>
                <Face />
            </Avatar>
        ),
        to: '/profile',
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

export const WebNavLinks = ({ mobile = false }) => {
    const isLogin = useSelector(selectIsLogin);

    return data
        .filter((d) => (isLogin ? d.to !== '/login' : d.to !== '/profile'))
        .map(({ label, icon, to }) => (
            <Link href={to} key={to}>
                {!mobile ? (
                    <Tooltip title={label}>
                        <IconButton color='inherit' aria-label={label}>
                            {icon}
                        </IconButton>
                    </Tooltip>
                ) : (
                    <ListItem button>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={label} />
                    </ListItem>
                )}
            </Link>
        ));
};

export const MobileNavLinks = () => {
    return <WebNavLinks mobile />;
};
