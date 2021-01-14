import React, { useEffect, useRef, useState, useContext } from 'react';
import { Box, TextField, InputAdornment, Button } from '@material-ui/core';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LockIcon from '@material-ui/icons/Lock';

export default function Detail() {
    return (
        <Box display='flex' alignItems='center' style={{ overflow: 'visible' }}>
            <form>
                <TextField
                    variant='outlined'
                    placeholder='Card Number'
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <CreditCardIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    style={{ marginTop: 8 }}
                    variant='outlined'
                    placeholder='Name On Card'
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <AccountBoxIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Box my={1} display='flex'>
                    <TextField
                        variant='outlined'
                        placeholder='MM/YY'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <CalendarTodayIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        style={{ marginLeft: 8 }}
                        variant='outlined'
                        placeholder='CVC'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Button variant='contained' color='primary' fullWidth>
                    PAY NOW
                </Button>
            </form>
        </Box>
    );
}
