import React, { useState, useRef, useMemo } from 'react';
import { Box, Button, TextField, CircularProgress } from '@material-ui/core';
import Phone_Icon from '@material-ui/icons/Phone';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RecaptchaVerifier } from '../../lib/firebase/firebase_app';
import { signInWithPhone, requestVerifyCode } from '../../lib/firebase/auth';
import {
    signInWithVerifyCodeThunk,
    selectIsLoading,
} from '../../lib/store/loginSlice';

export const PhoneIcon = Phone_Icon;

const Phone = () => {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [phoneStatus, setPhoneStatus] = useState({
        loading: false,
        error: '',
    });
    const [verifyError, setVerifyError] = useState(null);

    const buttonRef = useRef(null);

    const recaptchaVerifier = useMemo(() => {
        if (buttonRef.current) {
            return new RecaptchaVerifier(buttonRef.current, {
                size: 'invisible',
            });
        }
    }, [buttonRef.current]);

    const requestCode = async () => {
        setConfirmationResult(null);
        const phoneNum = ('+1' + phone).slice(-12);
        try {
            setPhoneStatus({ loading: true, error: '' });
            const confirmationResult = await signInWithPhone(
                phoneNum,
                recaptchaVerifier
            );
            if (confirmationResult) {
                setConfirmationResult(confirmationResult);
            }
        } catch (err) {
            const { code, message } = err;
            setPhoneStatus({ loading: false, error: code + ' ' + message });
        } finally {
            setPhoneStatus((p) => ({ ...p, loading: false }));
        }
    };
    const router = useRouter();
    const dispatch = useDispatch();
    const verifyCode = async () => {
        const resultAction = await dispatch(
            signInWithVerifyCodeThunk({ confirmationResult, code })
        );
        if (resultAction.error) {
            // to see use unwrappedResult, check Password component
            setVerifyError(resultAction.error);
        } else {
            router.replace('/');
        }
    };

    const isVerifyLoading = useSelector(selectIsLoading);

    return (
        <div>
            <Box display='flex' flexWrap='wrap'>
                <TextField
                    label='Enter Phone Number'
                    type='tel'
                    placeholder=''
                    margin='normal'
                    value={phone}
                    onChange={(e) => {
                        const { value } = e.target;
                        setPhone(value);
                        setPhoneStatus((s) => ({ ...s, error: '' }));
                    }}
                    required
                    fullWidth
                    helperText={phoneStatus.error}
                    error={Boolean(phoneStatus.error)}
                />
                <Button
                    color='primary'
                    variant='outlined'
                    ref={buttonRef}
                    startIcon={
                        phoneStatus.loading ? (
                            <CircularProgress color='secondary' />
                        ) : (
                            <PhoneIcon />
                        )
                    }
                    onClick={requestCode}
                    disabled={phoneStatus.loading}
                >
                    Get Code
                </Button>
            </Box>
            <Box display='flex' flexWrap='wrap'>
                <TextField
                    label='Enter SMS Code'
                    placeholder=''
                    margin='normal'
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                        if (verifyError) {
                            setVerifyError(null);
                        }
                    }}
                    required
                    fullWidth
                    disabled={!confirmationResult}
                    error={verifyError}
                    helperText={verifyError?.message}
                />
                <Button
                    color='primary'
                    variant='contained'
                    startIcon={<VerifiedUserIcon />}
                    onClick={verifyCode}
                    disabled={!confirmationResult || isVerifyLoading}
                >
                    Sign In with SMS Code
                </Button>
            </Box>
        </div>
    );
};

export default Phone;
