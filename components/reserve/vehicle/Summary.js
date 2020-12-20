import React, { useEffect, useRef, useState, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Box,
    Divider,
    Accordion,
    AccordionActions,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@material-ui/core';
import { getPlace } from '../mapbox/mbx-config';
import { useDispatch, useSelector } from 'react-redux';
import { selectPickup, selectDropoff } from '../../../lib/store/reserveSlice';
import { blue, red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Details, { PsgLugWrapper, Cost } from './Details';

export default function Summary({ src, alt }) {
    return (
        <Box display='flex' alignItems='center'>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                mr={2}
            >
                <img src={src} alt={alt} width={80} height={42} />
                <Typography variant='caption' color='primary'>
                    {alt}
                </Typography>
            </Box>
            <PsgLugWrapper />
            <Box ml={2}>
                <Cost />
            </Box>
        </Box>
    );
}
