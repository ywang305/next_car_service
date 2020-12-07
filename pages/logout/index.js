import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import Alert from '../../components/alert/AlertIOS';

const ButtonWrapper = ({ children, ...rest }) => (
    <Box
        boxShadow={1}
        bgcolor='background.paper'
        borderRadius={8}
        width={270}
        mt={2}
        ml={2}
    >
        <Button fullWidth>
            <Box component='span' textAlign='center' width={1} {...rest}>
                {children}
            </Box>
        </Button>
    </Box>
);

export default function LogoutIndex() {
    const [open, setOpen] = useState(true);
    const signOut = () => {};

    return (
        <Alert open={open} onClose={() => setOpen((o) => !o)}>
            <Box
                m={2}
                width={1}
                maxWidth={600}
                display='flex'
                flexWrap='wrap'
                justifyContent='space-evenly'
            >
                <ButtonWrapper color='error.main' onClick={signOut}>
                    Sign Out
                </ButtonWrapper>
                <ButtonWrapper onClick={() => setOpen((o) => !o)}>
                    Cancel
                </ButtonWrapper>
            </Box>
        </Alert>
    );
}
