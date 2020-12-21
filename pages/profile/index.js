import React, { useState, useEffect, useMemo } from 'react';
import {
    Container,
    Box,
    IconButton,
    Button,
    TextField,
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import Layout from '../../components/layout';
import {
    getUserProfile,
    updateProfile,
    updatePassword,
    userStateChanged,
} from '../../lib/firebase/auth';
import { auth } from '../../lib/firebase/firebase_app';
import EditIcon from '@material-ui/icons/Edit';

const useProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth?.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });

        return unsubscribe?.();
    }, [auth]);
    useEffect(() => {
        setDisplayName(user?.displayName);
        setPhotoURL(user?.photoURL);
    }, [user]);

    //displayName, email, photoURL, emailVerified, uid
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    const [password, setPassword] = useState('');

    const changeName = (e) => setDisplayName(e.target.value);
    const changePhoto = (e) => setPhotoURL(e.target.value);
    const changePassword = (e) => setPassword(e.target.value);

    return [
        user?.email,
        displayName,
        photoURL,
        password,
        changeName,
        changePhoto,
        changePassword,
        user,
    ];
};

export default function Profile() {
    const [
        email,
        displayName,
        photoURL,
        password,
        changeName,
        changePhoto,
        changePassword,
        user,
    ] = useProfile();

    const nameChanged = displayName && user?.displayName !== displayName;
    const photoChanged = photoURL && user?.photoURL !== photoURL;
    const passwordChanged = Boolean(password);

    const clickHanndler = async (e) => {
        if (nameChanged || photoChanged) {
            await updateProfile(displayName, photoURL);
        }
        if (passwordChanged) {
            await updatePassword(password);
        }
    };

    return (
        <Layout>
            <Container maxWidth='xs' style={{ paddingTop: '4rem' }}>
                <TextField
                    label='Email'
                    type='email'
                    value={email}
                    disabled
                    fullWidth
                />
                <EditItem
                    label='Display Name'
                    value={displayName}
                    onChange={changeName}
                />
                <EditItem
                    label='Photo URL'
                    value={photoURL}
                    onChange={changePhoto}
                />
                <EditItem
                    label='Password'
                    type='password'
                    value={password}
                    onChange={changePassword}
                />
                <br />
                <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    disabled={!nameChanged && !photoChanged && !passwordChanged}
                    onClick={clickHanndler}
                >
                    Update Profile
                </Button>
            </Container>
        </Layout>
    );
}

const EditItem = ({ label, ...rest }) => {
    const [on, setOn] = useState(false);
    if (on) label = 'Update ' + label;
    return (
        <Box display='flex' alignItems='flex-end'>
            <TextField
                placeholder=''
                fullWidth
                disabled={!on}
                label={label}
                {...rest}
            />
            <Box ml={1}>
                <IconButton onClick={() => setOn((i) => !i)}>
                    <EditIcon color={on ? 'primary' : 'inherit'} />
                </IconButton>
            </Box>
        </Box>
    );
};
