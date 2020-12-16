import React, { useEffect, useRef, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapContext } from './Map';
import PinIcon from '@material-ui/icons/NotListedLocation';
import { IconButton, Badge, Tooltip } from '@material-ui/core';
import { getPlace } from '../mapbox/mbx-config';
import { useDispatch } from 'react-redux';
import { pickupAction, dropoffAction } from '../../../lib/store/reserveSlice';

export default function CentralMarker({ isPickup }) {
    const map = useContext(MapContext);
    const el = useRef(null);

    const [addrObj, setAddrObj] = useState(null);
    const dispatch = useDispatch();

    function userActStartHandler() {
        setAddrObj(null);
    }
    async function userActEndHandler() {
        const data = await getPlace(map.getCenter());
        const bestAddrObj = data?.features?.[0];
        setAddrObj(bestAddrObj);
        dispatch(
            isPickup ? pickupAction(bestAddrObj) : dropoffAction(bestAddrObj)
        );
    }

    useEffect(() => {
        let marker;
        if (map) {
            marker = new mapboxgl.Marker(el.current)
                .setLngLat(map.getCenter())
                .addTo(map);
            map.on('dragstart', userActStartHandler)
                .on('zoomstart', userActStartHandler)
                .on('move', () => marker.setLngLat(map.getCenter()))
                .on('zoomend', userActEndHandler)
                .on('dragend', userActEndHandler);
        }
        return marker?.remove;
    }, [map]);

    const [tip, setTip] = useState(true);
    const open = tip && addrObj;
    return (
        <Tooltip
            ref={el}
            arrow
            placement='top'
            open={open}
            onClose={() => {}}
            onOpen={() => {}}
            title={addrObj?.place_name || addrObj?.center}
        >
            <IconButton
                style={{ transform: 'translateY(-50%)' }}
                onClick={() => setTip((t) => !t)}
            >
                <PinIcon
                    color={open ? 'secondary' : 'primary'}
                    style={{ fontSize: 60 }}
                />
            </IconButton>
        </Tooltip>
    );
}
