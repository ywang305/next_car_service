import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
    Box,
    TextField,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tabs,
    Tab,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getPlaceSuggests, getPlace } from './mbx-config';
import { MapContext } from './Map';
import PlaceIcon from '@material-ui/icons/Public';
import AddressIcon from '@material-ui/icons/LocationOn';
import AirportIcon from '@material-ui/icons/Flight';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import PinIcon from '@material-ui/icons/NotListedLocation';
import {
    pickupAction,
    dropoffAction,
    selectPickup,
    selectDropoff,
} from '../../../lib/store/reserveSlice';
import { Marker, Popup } from 'mapbox-gl';

const useOptions = () => {
    const [options, setOptions] = useState([]);
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

                            return {
                                place_name,
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

    return [inputValue, setInputValue, options];
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

const useValue = (isPickup) => {
    const pickup = useSelector(selectPickup);
    const dropoff = useSelector(selectDropoff);
    const value = isPickup ? pickup : dropoff;

    const map = useContext(MapContext);
    useEffect(() => {
        let marker;
        if (value) {
            if (isPickup) {
                marker = createPuMarker(value).addTo(map);
            } else {
                marker = createDoMarker(value).addTo(map);
            }

            if ((isPickup && !dropoff) || (!isPickup && !pickup)) {
                map.flyTo({ center: value.center, zoom: 13 });
            } else {
                const { lng: lngPu, lat: latPu } = pickup.center;
                const { lng: lngDo, lat: latDo } = dropoff.center;
                const sw = [Math.min(lngPu, lngDo), Math.min(latPu, latDo)];
                const ne = [Math.max(lngPu, lngDo), Math.max(latPu, latDo)];
                map.fitBounds([sw, ne], { padding: 64 });
            }
        }

        return marker?.remove;
    }, [value]);

    const dispatch = useDispatch();
    const saveToStore = (event, newValue) => {
        dispatch(isPickup ? pickupAction(newValue) : dropoffAction(newValue));
    };

    return [value, saveToStore];
};

export default function SearchBar({ label }) {
    const isPickup = /pick/i.test(label);
    const [inputValue, setInputValue, options] = useOptions();
    const [value, saveToStore] = useValue(isPickup);

    return (
        <div>
            <Autocomplete
                value={value}
                onChange={saveToStore}
                inputValue={inputValue || value?.place_name?.split(',')[0]}
                onInputChange={async (event, newInputValue, reason) => {
                    setInputValue(newInputValue);
                }}
                options={options}
                getOptionLabel={(option) => {
                    return option.place_name.split(',')[0];
                }}
                style={{
                    minWidth: 300,
                }}
                renderInput={(params) => (
                    <TextField {...params} label={label} variant='standard' />
                )}
                filterOptions={(opt) => opt}
                renderOption={({ place_name, place_type, center }) => {
                    return (
                        <OptionItem
                            place_name={place_name}
                            place_type={place_type}
                        />
                    );
                }}
            />
            {/*  TODO: how to make pin on map to select address?  {open && <CentralMarker isPickup={isPickup} />} */}
            {/*  TODO: need split Searchbar to 3 components :  Typing, AP, Map */}
            <Tabs
                value={value}
                onChange={() => {}}
                // variant='fullWidth'
                indicatorColor='secondary'
                textColor='secondary'
                aria-label='icon label tabs example'
            >
                <Tab icon={<KeyboardIcon />} />
                <Tab icon={<AirportIcon />} />
                <Tab icon={<PinIcon />} />
            </Tabs>
        </div>
    );
}

const OptionItem = ({ place_type, place_name }) => {
    const parts = place_name.split(',');
    const primary = parts[0];
    const secondary = parts.slice(1).join(',');
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
