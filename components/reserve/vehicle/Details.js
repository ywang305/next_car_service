import React, { useEffect, useRef, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';
import { getPlace } from '../mapbox/mbx-config';
import { useDispatch, useSelector } from 'react-redux';
import { selectPickup, selectDropoff } from '../../../lib/store/reserveSlice';
import { blue, red } from '@material-ui/core/colors';
import PassengerIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LuggageIcon from '@material-ui/icons/Work';
// import Image from 'next/image';  // depdending sharp module not support for mac m1 yet

export default function Details({ src, alt, passengers, luggages, price }) {
    const cost = price * 100;

    return (
        <Box
            display='flex'
            alignItems='center'
            style={{ overflow: 'visible' }}
            py={1}
        >
            <Box display='flex' flexDirection='column' alignItems='center'>
                <img src={src} alt={alt} width={120} height={65} />
                <Typography variant='subtitle1' color='primary'>
                    {alt}
                </Typography>
            </Box>

            <Box ml={2}>
                <PsgLugWrapper passengers={passengers} luggages={luggages} />
                <Box my={1}>
                    <Divider light />
                </Box>

                <Cost cost={cost} />
            </Box>
        </Box>
    );
}

export function Passengers({ passengers }) {
    return <IconNumBox_ Icon={PassengerIcon} num={passengers} />;
}
export function Luggages({ luggages }) {
    return <IconNumBox_ Icon={LuggageIcon} num={luggages} />;
}
export function Cost({ cost }) {
    return <IconNumBox_ Icon={AttachMoneyIcon} num={cost} color='info.main' />;
}

export function PsgLugWrapper({ passengers, luggages }) {
    return (
        <div>
            <Passengers passengers={passengers} />
            <Luggages luggages={luggages} />
        </div>
    );
}

const IconNumBox_ = ({ Icon, num, ...rest }) => {
    return (
        <Box display='flex' {...rest}>
            <Icon fontSize='small' />
            <Box pl={0.5} fontSize='body2.fontSize'>
                {num}
            </Box>
        </Box>
    );
};
