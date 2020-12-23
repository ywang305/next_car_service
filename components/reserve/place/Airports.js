import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Box, Divider, Typography } from '@material-ui/core';
import { getPlaceSuggests, getPlace } from '../mapbox/mbx-config';
import { MapContext } from '../mapbox/Map';
import { pickupAction, dropoffAction } from '../../../lib/store/reserveSlice';
import OptionItem from './OptionItem';
import { PanelContext } from './SearchPanel';

async function searchAirports({ lng, lat }) {
    const data = await getPlaceSuggests('airport', { lng, lat }, 10);
    const airports = data?.features
        ?.filter(
            ({ place_name, center, place_type, properties }) =>
                place_type[0] === 'poi' && properties.category === 'airport'
        )
        .map(({ place_name, center, place_type, properties }) => {
            return {
                place_name,
                center: { lng: center[0], lat: center[1] },
                place_type: 'airport',
            };
        });

    return airports;
}

const useAirorts = () => {
    const map = useContext(MapContext);

    const [center, setCenter] = useState(map.getCenter());
    const [airports, setAirports] = useState([]);
    useEffect(() => {
        const listener = () => {
            setCenter(map.getCenter());
        };
        map.on('moveend', listener);

        return () => map.off('moveend', listener);
    }, [map]);

    useEffect(() => {
        (async () => {
            if (center) {
                const { lng, lat } = center;
                const aps = await searchAirports({ lng, lat });
                setAirports(aps);
            }
        })();
    }, [center]);

    return [airports];
};

export default function Airports({ label }) {
    const isPickup = /pick/i.test(label);
    const [airports] = useAirorts();
    const { completeEditing } = useContext(PanelContext);
    const dispatch = useDispatch();
    const clickHandler = (option) => (e) => {
        e.stopPropagation();
        dispatch(
            isPickup
                ? pickupAction(option, INPUT_SRC)
                : dropoffAction(option, INPUT_SRC)
        );
        completeEditing();
    };

    return (
        <Box width={1} py={1}>
            <Typography gutterBottom color='textSecondary'>
                Select Airport Nearby
            </Typography>
            <Divider />

            <Box
                maxHeight='40vh'
                style={{ overflowY: 'scroll', backgroundColor: 'white' }}
            >
                {airports.map((option) => (
                    <div key={option.place_name} onClick={clickHandler(option)}>
                        <OptionItem
                            place_name={option.place_name}
                            place_type={option.place_type}
                        />
                    </div>
                ))}
            </Box>
        </Box>
    );
}
const INPUT_SRC = 'AIRPORT';
