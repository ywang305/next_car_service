import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Container,
    Divider,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import Layout from '../../components/layout';
import Link from 'next/link';
import { signUpThunk, selectIsLoading } from '../../lib/store/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Alert, AlertTitle } from '@material-ui/lab';

const useSignup = () => {
    const [fields, setFields] = useState({
        email: '',
        password: '',
        cfmPassword: '',
    });
    const [srvError, setSrvError] = useState(null);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFields((f) => ({ ...f, [name]: value }));
    };

    const dispatch = useDispatch();
    const router = useRouter();
    const submitHandler = async (e) => {
        e.preventDefault();
        const { email, password, cfmPassword } = fields;
        if (password !== cfmPassword) {
            return;
        }
        const resultAction = await dispatch(signUpThunk({ email, password }));
        if (resultAction.error) {
            // to see use unwrappedResult, check Password component
            setSrvError(resultAction.error);
        } else {
            router.replace('/');
        }
    };
    return [
        fields.email,
        fields.password,
        fields.cfmPassword,
        changeHandler,
        submitHandler,
        srvError,
    ];
};

export default function SignUp() {
    const [
        email,
        password,
        cfmPassword,
        changeHandler,
        submitHandler,
        srvError,
    ] = useSignup();
    const isLoading = useSelector(selectIsLoading);

    const matched = password.startsWith(cfmPassword);

    return (
        <Layout>
            <Container maxWidth='xs'>
                {srvError && (
                    <Alert severity='error'>
                        <AlertTitle>{srvError.code}</AlertTitle>
                        {srvError.message}
                    </Alert>
                )}
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
                        margin='normal'
                        value={password}
                        required
                        fullWidth
                    />
                    <TextField
                        error={!matched}
                        helperText={matched ? '' : 'not matched'}
                        name='cfmPassword'
                        label='Confirm Password'
                        type='password'
                        margin='normal'
                        value={cfmPassword}
                        required
                        fullWidth
                    />
                    <Box mt={2}>
                        <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            type='submit'
                            startIcon={isLoading && <CircularProgress />}
                            disabled={isLoading}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </form>
                <br />
                <Divider />
                <Typography color='textSecondary'>
                    Alreday has account? <Link href='/login'> Sign In </Link>
                </Typography>
            </Container>
        </Layout>
    );
}
