import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailPassword } from '../../lib/firebase/auth';
import { unwrapResult } from '@reduxjs/toolkit';
import {
    signInWithEmailPasswordThunk,
    selectStatus,
} from '../../lib/store/loginSlice';
import EmailIcon from '@material-ui/icons/Email';
import { useRouter } from 'next/router';

const useSignin = () => {
    const [fields, setFields] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFields((f) => ({ ...f, [name]: value }));
        if (error) {
            setError(null);
        }
    };

    const router = useRouter();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        const { email, password } = fields;
        const resultAction = await dispatch(
            signInWithEmailPasswordThunk({ email, password })
        );
        try {
            // usually its return const {error, payload} = resultAction,
            // if need exception style, use unwrapResult helper
            const payload = unwrapResult(resultAction);
            router.replace('/');
        } catch (err) {
            // unwrapResult is used to throw exception, otherwise, payload is null without exception if not using wunwrapResult
            setError(err);
        }
    };
    return [fields.email, fields.password, changeHandler, submitHandler, error];
};

const EmailPassword = ({ useHook = useSignin }) => {
    const [email, password, changeHandler, submitHandler, error] = useHook();
    const isLoading = useSelector(selectStatus) === 'loading';
    const isPassError = error && /password/i.test(error.code);
    const isEmailError = error && !isPassError;

    return (
        <form onSubmit={submitHandler} onChange={changeHandler}>
            <TextField
                name='email'
                label='Email'
                placeholder=''
                margin='normal'
                value={email}
                required
                fullWidth
                error={isEmailError}
                helperText={isEmailError && error?.message}
            />
            <TextField
                name='password'
                label='Password'
                type='password'
                autoComplete='current-password'
                margin='normal'
                value={password}
                required
                fullWidth
                error={isPassError}
                helperText={isPassError && error?.message}
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
                    Sign In
                </Button>
            </Box>
        </form>
    );
};
export default EmailPassword;
