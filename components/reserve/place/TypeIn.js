import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getPlaceSuggests, getPlace } from '../mapbox/mbx-config';
import { MapContext } from '../mapbox/Map';
import {
    pickupAction,
    dropoffAction,
    selectPickup,
    selectDropoff,
} from '../../../lib/store/reserveSlice';
import { Marker, Popup } from 'mapbox-gl';
import OptionItem from './OptionItem';

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
            <p>${JSON.stringify(pickup.center)}</p>`
        )
    );
}
function createDoMarker(dropoff, color = '#ff0000') {
    return createPuMarker(dropoff, color);
}

const INPUT_SRC = 'TYPE_IN';

const useValue = (isPickup) => {
    // value is the addrObj
    const pickup = useSelector(selectPickup);
    const dropoff = useSelector(selectDropoff);
    const value = isPickup ? pickup : dropoff;

    const dispatch = useDispatch();
    const saveToStore = (event, newValue) => {
        dispatch(
            isPickup
                ? pickupAction(newValue, INPUT_SRC)
                : dropoffAction(newValue, INPUT_SRC)
        );
    };

    return [value, saveToStore];
};

export default function TypeIn({ label }) {
    const isPickup = /pick/i.test(label);
    const [inputValue, setInputValue, options] = useOptions();
    const [value, saveToStore] = useValue(isPickup);

    return (
        <Autocomplete
            value={value}
            onChange={saveToStore}
            inputValue={inputValue || getPlacePrimary(value?.place_name)}
            onInputChange={(event, newInputValue, reason) => {
                setInputValue(newInputValue);
            }}
            options={options}
            getOptionLabel={(option) => {
                return getPlacePrimary(option.place_name);
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
    );
}

export const getPlacePrimary = (place_name) => {
    return place_name?.split(',').slice(0, 2).join(',');
};
