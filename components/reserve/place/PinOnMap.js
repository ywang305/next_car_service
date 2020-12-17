import React, { useEffect, useRef, useState, useContext } from 'react';
import mapboxgl, { Popup } from 'mapbox-gl';
import { MapContext } from '../mapbox/Map';
import { Box, Divider, Fab } from '@material-ui/core';
import { getPlace } from '../mapbox/mbx-config';
import { useDispatch, useSelector } from 'react-redux';
import {
    pickupAction,
    dropoffAction,
    selectPickup,
    selectDropoff,
} from '../../../lib/store/reserveSlice';
import { getPlacePrimary } from './TypeIn';
import CheckIcon from '@material-ui/icons/Check';
import { red } from '@material-ui/core/colors';

const usePinMap = (label) => {
    const isPickup = /pick/i.test(label);
    const map = useContext(MapContext);

    const [addrObj, setAddrObj] = useState(null);
    const dispatch = useDispatch();
    function saveToRedux() {
        if (addrObj) {
            dispatch(
                isPickup
                    ? pickupAction(addrObj, INPUT_SRC)
                    : dropoffAction(addrObj, INPUT_SRC)
            );
        }
    }

    async function queryPlace(marker) {
        const data = await getPlace(map.getCenter());
        const bestAddrObj = data?.features?.[0];
        const [lng, lat] = bestAddrObj?.center;
        bestAddrObj.center = { lng, lat };
        marker.setRotation(0).getPopup().setHTML(popupHTML(bestAddrObj, label));
        setAddrObj(bestAddrObj);
    }

    useEffect(() => {
        let marker;

        marker = new mapboxgl.Marker({
            scale: 1.6,
            color: isPickup ? '#000099' : '#991f00',
        })
            .setLngLat(map.getCenter())
            .setPopup(
                new Popup({ closeOnMove: true, closeButton: false }).setHTML(
                    popupHTML(addrObj, label)
                )
            )
            .addTo(map);
        queryPlace(marker);

        map.on('movestart', () => {
            setAddrObj(null);
        })
            .on('move', () => {
                marker.setLngLat(map.getCenter()).setRotation(15);
            })
            .on('moveend', () => queryPlace(marker));

        return () => marker?.remove();
    }, [map]);

    return [addrObj, saveToRedux, isPickup];
};

export default function PinOnMap({ label = '' }) {
    const [addrObj, saveToRedux, isPickup] = usePinMap(label);
    const pickup = useSelector(selectPickup);
    const dropoff = useSelector(selectDropoff);
    const disabled =
        (isPickup ? pickup : dropoff)?.place_name === addrObj?.place_name;
    return (
        <>
            <Box
                py={1}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
            >
                {getPlacePrimary(addrObj?.place_name) ??
                    (addrObj?.center || label + '?')}{' '}
                <Fab
                    color='secondary'
                    size='small'
                    aria-label='check'
                    onClick={saveToRedux}
                    style={{ flexShrink: 0 }}
                    disabled={disabled}
                >
                    <CheckIcon style={{ color: red[50] }} />
                </Fab>
            </Box>
            <Divider />
        </>
    );
}
const INPUT_SRC = 'PIN_ON_MAP';

const popupHTML = (addrObj, label) => {
    return `<h3>${addrObj?.place_name ?? label}</h3>`;
};
