import React, { useEffect, useRef, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectDistance } from '../../../lib/store/reserveSlice';
import PassengerIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LuggageIcon from '@material-ui/icons/Work';
import BatteryIcon from '@material-ui/icons/BatteryCharging90';
import AccessibleIcon from '@material-ui/icons/Accessible';
import AirlineSeatIcon from '@material-ui/icons/AirlineSeatFlatAngled';
import WifiIcon from '@material-ui/icons/Wifi';
import CoffeeIcon from '@material-ui/icons/LocalCafe';
// import Image from 'next/image';  // depdending sharp module not support for mac m1 yet

export default function Details(props) {
    const distance = useSelector(selectDistance);
    const { src, vid, price, color } = props;
    const cost = distance
        ? parseInt(price * distance * 0.00062)
        : price + '/mile';

    return (
        <Box
            display='flex'
            alignItems='center'
            style={{ overflow: 'visible' }}
            color={color}
        >
            <Box display='flex' flexDirection='column' alignItems='center'>
                <img
                    src={src}
                    alt={vid}
                    width={props.imgWidth || 100}
                    height={props.imgHeight || 54}
                />
                <Typography variant='caption'>{vid}</Typography>
            </Box>

            <Box mx={2}>
                <PsgLugWrapper {...props} />
            </Box>

            <Box>
                <Cost cost={cost} />
                <Box pt={1}>
                    {props.ev && <BatteryIcon fontSize='small' />}
                    {props.accessible && <AccessibleIcon fontSize='small' />}
                    {props.wifi && <WifiIcon fontSize='small' />}
                    {props.bed && <AirlineSeatIcon fontSize='small' />}
                    {props.coffee && <CoffeeIcon fontSize='small' />}
                </Box>
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
    return <IconNumBox_ Icon={AttachMoneyIcon} num={cost} />;
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
