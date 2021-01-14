import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { vehicles } from '../vehicle/VehicleOption';
import {
    selectVehicldeId,
    selectDistance,
} from '../../../lib/store/reserveSlice';
import { Box, Button } from '@material-ui/core';
import { Cost } from '../vehicle/Details';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Detail from './Detail';

import AccordionOption from '../vehicle/AccordionOption';

export default function PaySummary() {
    const storedVid = useSelector(selectVehicldeId);
    const { price, src, vid } = vehicles.find((v) => v.vid === storedVid);
    const distance = useSelector(selectDistance);

    const cost = parseInt(price * distance * 0.00062);

    const options = [<Detail key='form' />];

    return (
        <AccordionOption
            summary={
                <Box display='flex' alignItems='center' color='info.main'>
                    <CreditCardIcon />
                    <Box ml={4}>
                        <Cost cost={cost} />
                    </Box>
                </Box>
            }
            options={options}
        />
    );
}
