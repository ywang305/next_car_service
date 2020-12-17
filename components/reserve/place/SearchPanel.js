import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@material-ui/core';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { MapContext } from '../mapbox/Map';
import {
    pickupAction,
    dropoffAction,
    selectPickup,
    selectDropoff,
} from '../../../lib/store/reserveSlice';
import { Marker, Popup } from 'mapbox-gl';

const LabelPU = 'Pick Up';
const LabelDO = 'Drop Off';

// TODO: build a display block that show place, and trigger different "tab" once clicked, using along with isUSing state
export default function SearchPanel() {
    const [isUsing, setIsUsing] = useState({}); // using which searchbar(label), which tab
    usePickupDropoffDrawOnMap(isUsing);

    return (
        <Box
            position='absolute'
            top={16}
            left={16}
            display='flex'
            flexWrap='wrap'
            flexDirection='column'
            width={350}
        >
            <Box
                p={1}
                boxShadow={2}
                borderRadius={16}
                style={{ backgroundColor: 'rgba(221, 219, 255, 0.6)' }}
            >
                <SearchBar
                    label={LabelPU}
                    isUsing={isUsing}
                    setIsUsing={setIsUsing}
                />
            </Box>

            <Box
                p={1}
                mt={2}
                boxShadow={2}
                borderRadius={16}
                style={{ backgroundColor: 'rgba(255, 219, 221, 0.6)' }}
            >
                <SearchBar
                    label={LabelDO}
                    isUsing={isUsing}
                    setIsUsing={setIsUsing}
                />
            </Box>
        </Box>
    );
}

const usePickupDropoffDrawOnMap = (isUsing) => {
    // value is the addrObj
    const pickup = useSelector(selectPickup);
    const dropoff = useSelector(selectDropoff);

    const map = useContext(MapContext);
    useEffect(() => {
        let puMarker, doMarker;
        if (isUsing.tab !== 2) {
            if (pickup && dropoff) {
                puMarker = createPuMarker(pickup).addTo(map);
                doMarker = createDoMarker(dropoff).addTo(map);
                const { lng: lngPu, lat: latPu } = pickup.center;
                const { lng: lngDo, lat: latDo } = dropoff.center;
                const sw = [Math.min(lngPu, lngDo), Math.min(latPu, latDo)];
                const ne = [Math.max(lngPu, lngDo), Math.max(latPu, latDo)];
                map.fitBounds([sw, ne], { padding: 64 });
            } else if (pickup) {
                puMarker = createPuMarker(pickup).addTo(map);
                map.flyTo({ center: pickup.center, zoom: 13 });
            } else if (dropoff) {
                doMarker = createDoMarker(dropoff).addTo(map);
                map.flyTo({ center: dropoff.center, zoom: 13 });
            }
        }

        return () => {
            puMarker?.remove();
            doMarker?.remove();
        };
    }, [pickup, dropoff, isUsing.tab]);

    return [];
};

function createPuMarker(pickup, color = '#0000ff') {
    return new Marker({ color }).setLngLat(pickup.center).setPopup(
        new Popup().setHTML(
            `<p>${pickup.place_name}</p>
            <p>${JSON.stringify(pickup.center)}</p>`
        )
    );
}
function createDoMarker(dropoff, color = '#ff0000') {
    return createPuMarker(dropoff, color);
}
