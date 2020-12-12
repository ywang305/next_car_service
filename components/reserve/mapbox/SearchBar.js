import React, { useState, useEffect, useContext } from 'react';

import {
    Box,
    TextField,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getPlaceSuggests, getPlace } from './mbx-config';
import { MapContext } from './Map';
import PlaceIcon from '@material-ui/icons/Public';
import AddressIcon from '@material-ui/icons/LocationOn';
import AirportIcon from '@material-ui/icons/Flight';
import { PlaceTwoTone } from '@material-ui/icons';

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
            renderOption={(option) => {
                //const {type, addressString, osmPlaceId, details, source, geoSrc, primaryPart, secondaryPart} = option;
                return <OptionItem {...option} />;
            }}
        />
    );
}

const OptionItem = ({ place_type, place_name }) => {
    const splitIndex = place_name.indexOf(',');
    let primaryPart = place_name;
    let secondaryPart = '';
    if (splitIndex !== -1) {
        primaryPart = place_name.slice(0, splitIndex);
        secondaryPart = place_name.slice(splitIndex + 1);
    }
    return (
        <ListItem button>
            <ListItemIcon>
                {(/address/i.test(place_type) && <AddressIcon />) ||
                    (/airport/i.test(place_type) && <AirportIcon />) || (
                        <PlaceIcon />
                    )}
            </ListItemIcon>
            <ListItemText primary={primaryPart} secondary={secondaryPart} />
        </ListItem>
    );
};
