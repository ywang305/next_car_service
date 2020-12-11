import React, { useState, useEffect, useContext } from 'react';

import { Box, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getPlaceSuggests, getPlace } from './mbx-config';
import { MapContext } from './Map';

// TODO: search bar logic
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
                    data?.features?.map(({ place_name, place_types }) => ({
                        place_name,
                        place_types,
                    })) ?? []
                );
            };

            tID = setTimeout(query, 200);
        }

        return () => clearTimeout(tID);
    }, [inputValue]);

    return [value, inputValue, setValue, setInputValue, options];
};

export default function SearchBar() {
    const [value, inputValue, setValue, setInputValue, options] = useOptions();

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={async (event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            id='combo-box-demo'
            options={options}
            getOptionLabel={(option) => option.place_name}
            style={{ width: 300 }}
            renderInput={(params) => (
                <TextField {...params} label='Combo box' variant='outlined' />
            )}
        />
    );
}
