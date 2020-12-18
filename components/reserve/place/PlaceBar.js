import React, { useEffect, useRef, useState, useContext } from 'react';
import mapboxgl, { Popup } from 'mapbox-gl';
import { MapContext } from '../mapbox/Map';
import { Box, Divider, Fab } from '@material-ui/core';
import { getPlace } from '../mapbox/mbx-config';
import { useDispatch, useSelector } from 'react-redux';
import { selectPickup, selectDropoff } from '../../../lib/store/reserveSlice';
import { getPlacePrimary } from './utils';
import LocationIcon from '@material-ui/icons/LocationOn';
import { blue, red } from '@material-ui/core/colors';

const useStorePlace = (isPickup) => {
    const pickup = useSelector(selectPickup);
    const dropoff = useSelector(selectDropoff);
    const addrObj = isPickup ? pickup : dropoff;

    return [addrObj];
};

export default function PlaceBar({ label }) {
    const isPickup = /pick/i.test(label);
    const [addrObj] = useStorePlace(isPickup);
    return (
        <Box
            py={1}
            display='flex'
            alignItems='center'
            styles={{ cursor: 'pointer' }}
        >
            <LocationIcon
                style={{
                    fontSize: 20,
                    marginRight: 4,
                    color: (isPickup ? blue : red)[500],
                }}
            />
            {getPlacePrimary(addrObj?.place_name) ?? label + '?'}
        </Box>
    );
}
