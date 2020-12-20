import React, { useEffect, useRef, useState, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Box,
    Divider,
    Accordion,
    AccordionActions,
    AccordionSummary,
    AccordionDetails,
    ListItem,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectVehicldeId,
    vehicleIdAction,
} from '../../../lib/store/reserveSlice';
import { blue, red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Details from './Details';

export default function SelectVehicle() {
    const [expanded, setExpanded] = useState(false);
    const changeHandler = (event, isExpanded) => {
        setExpanded((e) => !e);
    };
    const storedVid = useSelector(selectVehicldeId);
    const dispatch = useDispatch();

    const selectHandler = (vid) => () => {
        dispatch(vehicleIdAction(vid));
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
                    <Details
                        {...vehicles.find((v) => v.vid === storedVid)}
                        imgWidth={70}
                        imgHeight={36}
                        color='info.main'
                    />
                </AccordionSummary>
                <Divider />
                <AccordionDetails class={AccordionDetailsRoot}>
                    {vehicles.map((v) => {
                        const selected = storedVid === v.vid;
                        return (
                            <ListItem
                                button
                                divider
                                selected={selected}
                                key={v.vid}
                                onClick={selectHandler(v.vid)}
                            >
                                <Details
                                    {...v}
                                    color={
                                        selected
                                            ? 'text.primary'
                                            : 'text.secondary'
                                    }
                                />
                            </ListItem>
                        );
                    })}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

const useStyles = makeStyles({
    root: {
        backgroundColor: 'rgba(255, 255, 233, 0.8)',
    },
    AccordionDetailsRoot: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        maxHeight: '60vh',
        overflowY: 'scroll',
    },
});

const vehicles = [
    {
        vid: 'BMW iR',
        src: '/BMW-iR.webp',
        passengers: 1,
        luggages: 0,
        price: 20,
        ev: true,
        accessible: false,
        wifi: false,
        bed: false,
        coffee: false,
    },
    {
        vid: 'Cybertruck',
        src: '/Cybertruck.webp',
        passengers: 4,
        luggages: 10,
        price: 60,
        ev: true,
    },
    {
        vid: 'Faraday FF91',
        src: '/Faraday-FF91.webp',
        passengers: 3,
        luggages: 2,
        price: 110,
        ev: true,
        wifi: true,
        bed: true,
        coffee: true,
    },
    {
        vid: 'Kawa Ninja',
        src: '/Kawa-Ninja.webp',
        passengers: 1,
        luggages: 0,
        price: 23,
    },
    {
        vid: 'Maserati Ghibli',
        src: '/Maserati-Ghibli.webp',
        passengers: 3,
        luggages: 2,
        price: 13,
    },
    {
        vid: 'Tesla X',
        src: '/Tesla-X.webp',
        passengers: 4,
        luggages: 4,
        price: 19,
        ev: true,
    },
    {
        vid: 'Tesla Bus',
        src: '/Tesla-Bus.webp',
        passengers: 10,
        luggages: 10,
        price: 260,
        ev: true,
        accessible: true,
        wifi: true,
        bed: true,
        coffee: true,
    },
    {
        vid: 'Zoox',
        src: '/Zoox.webp',
        passengers: 6,
        luggages: 4,
        price: 90,
        ev: true,
        accessible: true,
        wifi: true,
    },
]
    .map((v) => {
        v.src = '/vehicles' + v.src;
        return v;
    })
    .sort((a, b) => {
        const dffPassengers = a.passengers - b.passengers;
        const dffLuggages = a.luggages - b.luggages;
        return dffPassengers ? dffPassengers : dffLuggages;
    });
