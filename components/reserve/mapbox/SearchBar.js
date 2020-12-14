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

// TODO search bar logic
const useOptions = () => {
    const [options, setOptions] = useState([]);
    const [value, setValue] = React.useState(options[0]);
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

                            const splitIndex = place_name.indexOf(',');
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

const useStore = (label) => {
    const pickup = useSelector(selectPickup);
    const dropoff = useSelector(selectDropoff);
    const isPickup = /pick up/i.test(label);
    const address = isPickup ? pickup : dropoff;

    const dispatch = useDispatch();
    const submitHandler = (newAddress) => {
        dispatch(
            isPickup ? pickupAction(newAddress) : dropoffAction(newAddress)
        );
    };

    return [address, submitHandler];
};

export default function SearchBar({ label }) {
    const [value, inputValue, setValue, setInputValue, options] = useOptions();
    const [address, submitHandler] = useStore(label);

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                submitHandler(newValue);
            }}
            inputValue={inputValue || address}
            onInputChange={async (event, newInputValue) => {
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
