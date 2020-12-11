import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from '../../lib/store/loginSlice';
import EmailIcon from '@material-ui/icons/Email';
import { useRouter } from 'next/router';
import { sendLinkToEmail, signInWithEmailLink } from '../../lib/firebase/auth';

export const Icon = EmailIcon;

const useSignin = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const changeHandler = (e) => {
        const { value } = e.target;
        setEmail(value);
        if (error) {
            setError(null);
        }
    };

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const result = await signInWithEmailLink();
            if (result?.user) {
                dispatch(login());
                router.replace('/');
            }
        })();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        await sendLinkToEmail(email);
        // const resultAction = await dispatch(
        //     thunk
        // );
        // try {
        //     // usually its return const {error, payload} = resultAction,
        //     // if need exception style, use unwrapResult helper
        //     const payload = unwrapResult(resultAction);
        //     router.replace('/');
        // } catch (err) {
        //     // unwrapResult is used to throw exception, otherwise, payload is null without exception if not using wunwrapResult
        //     setError(err);
        // }
    };
    return [email, changeHandler, submitHandler, error];
};

const Email = ({ useHook = useSignin }) => {
    const [email, changeHandler, submitHandler, error] = useHook();
    const isLoading = false; // useSelector(selectIsLoading);
    const isSrvError = Boolean(error);

    return (
        <form onSubmit={submitHandler} onChange={changeHandler}>
            <TextField
                type='email'
                name='email'
                label='Email'
                placeholder=''
                margin='normal'
                value={email}
                required
                fullWidth
                error={isSrvError}
                helperText={isSrvError && error?.message}
            />
            <Box mt={2}>
                <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    type='submit'
                    startIcon={isLoading ? <CircularProgress /> : <EmailIcon />}
                    disabled={isLoading}
                >
                    Send Link To Email
                </Button>
            </Box>
        </form>
    );
};
export default Email;
