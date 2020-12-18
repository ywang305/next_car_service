import React, { useState, useEffect, useContext, createContext } from 'react';
import { Box } from '@material-ui/core';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid, unwrapResult } from '@reduxjs/toolkit';
import { MapContext } from '../mapbox/Map';
import {
    pickupAction,
    dropoffAction,
    selectPickup,
    selectDropoff,
} from '../../../lib/store/reserveSlice';
import { createPuMarker, createDoMarker } from './utils';
import PlaceBar from './PlaceBar';
import { getRoute } from '../mapbox/mbx-config';

const LabelPU = 'Pick Up';
const LabelDO = 'Drop Off';

export const PanelContext = createContext();

export default function SearchPanel() {
    const [editingLabel, setEditingLabel] = useState('');
    const completeEditing = () => {
        setEditingLabel('');
    };
    usePickupDropoffDrawOnMap(editingLabel);

    return (
        <PanelContext.Provider value={{ editingLabel, completeEditing }}>
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
                    onClick={() => setEditingLabel(LabelPU)}
                >
                    {editingLabel === LabelPU ? (
                        <SearchBar label={LabelPU} />
                    ) : (
                        <PlaceBar label={LabelPU} />
                    )}
                </Box>

                <Box
                    p={1}
                    mt={2}
                    boxShadow={2}
                    borderRadius={16}
                    style={{ backgroundColor: 'rgba(255, 219, 221, 0.6)' }}
                    onClick={() => setEditingLabel(LabelDO)}
                >
                    {editingLabel === LabelDO ? (
                        <SearchBar label={LabelDO} />
                    ) : (
                        <PlaceBar label={LabelDO} />
                    )}
                </Box>
            </Box>
        </PanelContext.Provider>
    );
}

const usePickupDropoffDrawOnMap = (editingLabel) => {
    // value is the addrObj
    const pickup = useSelector(selectPickup);
    const dropoff = useSelector(selectDropoff);

    const map = useContext(MapContext);

    const [source, setSource] = useState(null);

    useEffect(() => {
        let puMarker, doMarker;
        if (!editingLabel) {
            if (pickup && dropoff) {
                puMarker = createPuMarker(pickup).addTo(map);
                doMarker = createDoMarker(dropoff).addTo(map);
                const { lng: lngPu, lat: latPu } = pickup.center;
                const { lng: lngDo, lat: latDo } = dropoff.center;
                const sw = [Math.min(lngPu, lngDo), Math.min(latPu, latDo)];
                const ne = [Math.max(lngPu, lngDo), Math.max(latPu, latDo)];
                map.fitBounds([sw, ne], { padding: 64 });

                (async () => {
                    const respData = await getRoute(
                        pickup.center,
                        dropoff.center
                    );
                    const trip = respData?.trips?.[0] ?? {};
                    const { geometry, distance, duration } = trip;

                    setSource({
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry,
                        },
                    });
                })();
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
    }, [pickup, dropoff, editingLabel]);

    useEffect(() => {
        let id = nanoid();
        if (source && map) {
            map?.addLayer({
                id,
                type: 'line',
                source,
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#268a19',
                    'line-opacity': 0.5,
                    'line-width': 13,
                    'line-blur': 0.5,
                },
            });
        }

        return () => {
            try {
                if (map?.getSource(id)) {
                    map.removeSource(id);
                    map.removeLayer(id);
                }
            } catch (err) {
                // ok
            }
        };
    }, [source, map]);

    return [];
};

const drawRoute = (map, geometry) => {
    map.addLayer({
        id: 'route',
        type: 'line',
        source: {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry,
            },
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
        },
        paint: {
            'line-color': '#cccccc',
            'line-opacity': 0.5,
            'line-width': 8,
            'line-blur': 0.5,
        },
    });
};
const removeRoute = (map) => {
    if (map?.getSource('route')) {
        map?.removeSource('route');
        map?.removeLayer('route');
    }
};
