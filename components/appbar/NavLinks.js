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
import LogoutAlert from '../alert/LogoutAlert';
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
        to: null,
    },
];

const LogoutItem = ({ mobile, icon, label }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((t) => !t);

    return (
        <div>
            {mobile ? (
                <ListItem button onClick={toggleOpen}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={label} />
                </ListItem>
            ) : (
                <Tooltip title={label}>
                    <IconButton
                        color='inherit'
                        aria-label={label}
                        onClick={toggleOpen}
                    >
                        {icon}
                    </IconButton>
                </Tooltip>
            )}
            <LogoutAlert open={open} toggleOpen={toggleOpen} signOut={null} />
        </div>
    );
};

export const WebNavLinks = ({ mobile = false }) => {
    const isLogin = useSelector(selectIsLogin);

    return data
        .filter((d) => (isLogin ? d.to !== '/login' : d.to !== '/profile'))
        .map((props) => {
            const { label, icon, to } = props;
            if (label === 'Logout') {
                return <LogoutItem mobile={mobile} key={label} {...props} />;
            }
            return (
                <Link href={to} key={label}>
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
            );
        });
};

export const MobileNavLinks = () => {
    return <WebNavLinks mobile />;
};
