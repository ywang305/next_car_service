import React, { useState, useRef, useMemo } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { RecaptchaVerifier } from '../../lib/firebase/firebase_app';
import { signInWithPhone, requestVerifyCode } from '../../lib/firebase/auth';

const Phone = () => {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const confirm = useRef(null);
    const containerRef = useRef(null);

    const recaptchaVerifier = useMemo(() => {
        if (containerRef.current) {
            return new RecaptchaVerifier(containerRef.current, {
                size: 'invisible',
                // other options
            });
        }
    }, [containerRef.current]);

    // TODO: use Rect-Query with ajax status here
    const requestCode = async () => {
        const normalPhoneNum = ('+' + ('1' + phone).slice(-11)).slice(-12);
        const confirmationResult = await signInWithPhone(
            normalPhoneNum,
            recaptchaVerifier
        );
        if (confirmationResult) {
            confirm.current = confirmationResult;
        }
    };
    const verifyCode = async () => {
        console.log('siginWithCode: ', confirm.current, code);
        if (!confirm.current) return;
        const user = await requestVerifyCode(confirm.current, code);
        console.log('sigin done with code: ', user);
    };

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
                        setPhone(e.target.value);
                    }}
                    required
                    fullWidth
                />
                <Button
                    color='primary'
                    variant='outlined'
                    ref={containerRef}
                    startIcon={<PhoneIcon />}
                    onClick={requestCode}
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
                    onChange={(e) => setCode(e.target.value)}
                    required
                    fullWidth
                    disabled={phone?.length < 10}
                />
                <Button
                    color='primary'
                    variant='contained'
                    startIcon={<VerifiedUserIcon />}
                    onClick={verifyCode}
                    disabled={phone?.length < 10}
                >
                    Sign In with SMS Code
                </Button>
            </Box>
        </div>
    );
};

export default Phone;
