import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
    Box,
    TextField,
    ListItem,
    ListItemIcon,
    ListItemText,
    InputAdornment,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getPlaceSuggests, getPlace } from './mbx-config';
import { MapContext } from './Map';
import PlaceIcon from '@material-ui/icons/Public';
import AddressIcon from '@material-ui/icons/LocationOn';
import AirportIcon from '@material-ui/icons/Flight';
import {
    pickupAction,
    dropoffAction,
    selectPickup,
    selectDropoff,
} from '../../../lib/store/reserveSlice';
import { Marker, Popup } from 'mapbox-gl';

// TODO search bar logic
const useOptions = () => {
    const [options, setOptions] = useState([]);
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const map = useContext(MapContext);

    useEffect(() => {
        let tID;
        if (inputValue?.length > 2 && map) {
            const query = async () => {
                const data = await getPlaceSuggests(
                    inputValue,
                    map.getCenter()
                );
                setOptions(
                    data?.features?.map(
                        ({ place_name, center, place_type, properties }) => {
                            switch (place_type[0]) {
                                case 'address':
                                    place_type = 'address';
                                    break;
                                case 'poi': {
                                    if (properties.category === 'airport')
                                        place_type = 'airport';
                                    else place_type = 'place';
                                    break;
                                }
                                default:
                                    place_type = 'place'; // country, region, post, neighberhood...
                            }
                            const arr = place_name.split(',');
                            const primary = arr[0];
                            const secondary = arr.slice(1).join(',');

                            return {
                                place_name,
                                primary,
                                secondary,
                                center: { lng: center[0], lat: center[1] },
                                place_type,
                            };
                        }
                    ) ?? []
                );
            };
            tID = setTimeout(query, 200);
        }

        return () => clearTimeout(tID);
    }, [inputValue]);

    return [value, inputValue, setValue, setInputValue, options];
};

function createPuMarker(pickup, color = '#0000ff') {
    return new Marker({ color }).setLngLat(pickup.center).setPopup(
        new Popup().setHTML(
            `<p>${pickup.place_name}</p>
            <p>GPS:${JSON.stringify(pickup.center)}</p>`
        )
    );
}
function createDoMarker(dropoff, color = '#ff0000') {
    return createPuMarker(dropoff, color);
}

const useStore = (label) => {
    const pickup = useSelector(selectPickup);
    const dropoff = useSelector(selectDropoff);
    const isPickup = /pick up/i.test(label);
    const addrObj = isPickup ? pickup : dropoff;

    const map = useContext(MapContext);
    useEffect(() => {
        let puMarker, doMarker;
        if (pickup?.center && !dropoff?.center) {
            const center = pickup.center;

            puMarker = createPuMarker(pickup).addTo(map);
            map.flyTo({ center, zoom: 13 });
        } else if (!pickup?.center && dropoff?.center) {
            const center = dropoff.center;
            doMarker = createDoMarker(dropoff).addTo(map);

            map.flyTo({ center, zoom: 13 });
        } else if (pickup?.center && dropoff?.center) {
            puMarker = createPuMarker(pickup).addTo(map);
            doMarker = createDoMarker(dropoff).addTo(map);

            const { lng: lngPu, lat: latPu } = pickup.center;
            const { lng: lngDo, lat: latDo } = dropoff.center;
            const sw = [Math.min(lngPu, lngDo), Math.min(latPu, latDo)];
            const ne = [Math.max(lngPu, lngDo), Math.max(latPu, latDo)];
            map.fitBounds([sw, ne], { padding: 64 });
        }

        return () => {
            puMarker?.remove();
            doMarker?.remove();
        };
    }, [pickup, dropoff]);

    const dispatch = useDispatch();
    const saveToStore = (newAddress) => {
        dispatch(
            isPickup ? pickupAction(newAddress) : dropoffAction(newAddress)
        );
    };

    return [addrObj?.primary, saveToStore];
};

export default function SearchBar({ label }) {
    const [value, inputValue, setValue, setInputValue, options] = useOptions();
    const [address, saveToStore] = useStore(label);

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                saveToStore(newValue);
            }}
            inputValue={inputValue || address}
            onInputChange={async (event, newInputValue, reason) => {
                setInputValue(newInputValue);
            }}
            options={options}
            getOptionLabel={(option) => {
                return option.primary;
            }}
            style={{
                backgroundColor: 'white',
                minWidth: 300,
            }}
            renderInput={(params) => (
                <TextField {...params} label={label} variant='outlined' />
            )}
            filterOptions={(opt) => opt}
            renderOption={({
                place_name,
                primary,
                secondary,
                place_type,
                center,
            }) => {
                console.log(place_name);
                return (
                    <OptionItem
                        primary={primary}
                        secondary={secondary}
                        place_type={place_type}
                    />
                );
            }}
        />
    );
}

const OptionItem = ({ place_type, primary = '', secondary = '' }) => {
    return (
        <ListItem>
            <ListItemIcon>
                {(/address/i.test(place_type) && <AddressIcon />) ||
                    (/airport/i.test(place_type) && <AirportIcon />) || (
                        <PlaceIcon />
                    )}
            </ListItemIcon>
            <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
    );
};
