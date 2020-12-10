import React, { useState, useEffect } from 'react';
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
import { selectIsLogin, signOutThunk } from '../../lib/store/loginSlice';
import { useSelector, useDispatch } from 'react-redux';
import LogoutItem from './LogoutItem';
import { auth } from '../../lib/firebase/firebase_app';
import Image from 'next/image';

const UserPhoto = () => {
    const [name, setName] = useState(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                if (user.displayName) {
                    setName(user.displayName.slice(0, 2));
                } else if (user.email) {
                    setName(user.email.slice(0, 1));
                }
            }
        });

        return unsubscribe();
    }, []);
    return <Avatar>{name ? name : <Face />}</Avatar>;
};

const data = [
    {
        label: 'Login',
        icon: <AccountCircleOutlined />,
        to: '/login',
    },
    {
        label: 'Profile',
        icon: <UserPhoto />,
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

export const WebNavLinks = ({ mobile = false }) => {
    const isLogin = useSelector(selectIsLogin);

    return data
        .filter((d) =>
            isLogin
                ? d.label !== 'Login'
                : !['Profile', 'Logout'].some((label) => label === d.label)
        )
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
