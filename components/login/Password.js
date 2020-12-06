import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { signInWithEmailPassword } from '../../lib/firebase/auth';
import { unwrapResult } from '@reduxjs/toolkit';
import {
    signInWithEmailPasswordThunk,
    selectStatus,
    selectErrorMessage,
} from '../../lib/store/loginSlice';
import EmailIcon from '@material-ui/icons/Email';
import { useRouter } from 'next/router';

const useSignin = () => {
    const [fields, setFields] = useState({ email: '', password: '' });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFields((f) => ({ ...f, [name]: value }));
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
            const payload = unwrapResult(resultAction);
            router.replace('/');
        } catch (err) {
            console.error('  -- sigin EmailPassword: ', { err });
        }
    };
    return [fields.email, fields.password, changeHandler, submitHandler];
};

const EmailPassword = ({ useHook = useSignin }) => {
    const [email, password, changeHandler, submitHandler] = useHook();
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
            />
            <Box mt={2}>
                <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    type='submit'
                    startIcon={<EmailIcon />}
                >
                    Sign In
                </Button>
            </Box>
        </form>
    );
};
export default EmailPassword;
