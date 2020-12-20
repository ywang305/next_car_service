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
import { useDispatch, useSelector } from 'react-redux';
import { selectPickup, selectDropoff } from '../../../lib/store/reserveSlice';
import { blue, red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Details from './Details';
import Summary from './Summary';

export default function SelectVehicle() {
    const [expanded, setExpanded] = useState(false);
    const changeHandler = (event, isExpanded) => {
        setExpanded((e) => !e);
    };

    const { root, AccordionDetailsRoot } = useStyles();
    return (
        <Box
            position='absolute'
            left={16}
            bottom={16}
            width={350}
            boxShadow={3}
        >
            <Accordion
                expanded={expanded}
                onChange={changeHandler}
                className={root}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='vehicle-summary-content'
                >
                    <Summary {...vehicles[0]} />
                </AccordionSummary>
                <Divider />
                <AccordionDetails class={AccordionDetailsRoot}>
                    {vehicles.map((v) => {
                        return (
                            <Box key={v.alt} mb={1}>
                                <Details {...v} />
                            </Box>
                        );
                    })}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

const useStyles = makeStyles({
    root: {
        backgroundColor: 'rgba(255, 255, 233, 0.6)',
    },
    AccordionDetailsRoot: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        maxHeight: '60vh',
        overflowY: 'scroll',
        padding: 8,
    },
});

const vehicles = [
    { src: '/BMW-iR.webp', passengers: 1, luggages: 0, price: 20 },
    { src: '/Cybertruck.webp', passengers: 4, luggages: 10, price: 60 },
    { src: '/Faraday-FF91.webp', passengers: 3, luggages: 2, price: 110 },
    { src: '/Kawa-Ninja.webp', passengers: 1, luggages: 0, price: 23 },
    { src: '/Maserati-Ghibli.webp', passengers: 3, luggages: 2, price: 13 },
    { src: '/Tesla-X.webp', passengers: 4, luggages: 4, price: 19 },
    { src: '/Tesla-Bus.webp', passengers: 10, luggages: 10, price: 260 },
    { src: '/Zoox.webp', passengers: 6, luggages: 4, price: 90 },
]
    .map(function AddProperty(v) {
        v.alt = v.src.slice(1).split('.')[0].replace('-', ' ');
        v.src = '/vehicles' + v.src;
        return v;
    })
    .sort((a, b) => {
        const dffPassengers = a.passengers - b.passengers;
        const dffLuggages = a.luggages - b.luggages;
        return dffPassengers ? dffPassengers : dffLuggages;
    });
