import React, { useState } from 'react';
import {
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Box,
    Button,
    DialogContent,
    DialogContentText,
    CircularProgress,
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { signOutThunk, selectIsLoading } from '../../lib/store/loginSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import AlertIOS from '../alert/AlertIOS';
import AlertDialog from '../alert/AlertDialog';

export default function LogoutItem({ mobile, icon, label }) {
    const [open, setOpen] = useState(false);
    const [srvError, setSrvError] = useState(null);
    const toggleOpen = () => setOpen((t) => !t);
    const dispatch = useDispatch();
    const router = useRouter();
    const signOut = async () => {
        const resultAction = await dispatch(signOutThunk());
        if (resultAction.error) {
            setSrvError(resultAction.error);
        } else {
            toggleOpen();
            router.replace('/');
        }
    };

    const isLoading = useSelector(selectIsLoading);

    if (mobile) {
        return (
            <div>
                <ListItem button onClick={toggleOpen}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={label} />
                </ListItem>
                <AlertIOS
                    open={open}
                    onClose={toggleOpen}
                    buttons={[
                        <RiskButton
                            key={1}
                            fullWidth
                            onClick={signOut}
                            startIcon={
                                isLoading && <CircularProgress size={32} />
                            }
                            disabled={isLoading}
                        >
                            Sign Out
                        </RiskButton>,
                        <Button key={2} fullWidth onClick={toggleOpen}>
                            Cancel
                        </Button>,
                    ]}
                    content={
                        srvError && (
                            <ErrorContent>{srvError?.message}</ErrorContent>
                        )
                    }
                />
            </div>
        );
    }

    return (
        <div>
            <Tooltip title={label}>
                <IconButton
                    color='inherit'
                    aria-label={label}
                    onClick={toggleOpen}
                >
                    {icon}
                </IconButton>
            </Tooltip>
            <AlertDialog
                open={open}
                onClose={toggleOpen}
                title='Sign Out?'
                content={
                    srvError && <ErrorContent>{srvError?.message}</ErrorContent>
                }
                buttons={[
                    <Button key='cancel' onClick={toggleOpen} color='inherit'>
                        Cancel
                    </Button>,
                    <Button
                        key='confirm'
                        onClick={signOut}
                        color='primary'
                        autoFocus
                        startIcon={isLoading && <CircularProgress size={32} />}
                        disabled={isLoading}
                    >
                        Confirm
                    </Button>,
                ]}
            />
        </div>
    );
}

const RiskButton = withStyles((theme) => ({
    label: {
        color: theme.palette.error.main,
    },
}))(Button);
const ErrorContent = withStyles((theme) => ({
    root: {
        color: theme.palette.error.main,
    },
}))(DialogContentText);
