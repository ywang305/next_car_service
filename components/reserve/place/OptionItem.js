import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PlaceIcon from '@material-ui/icons/Public';
import AddressIcon from '@material-ui/icons/LocationOn';
import AirportIcon from '@material-ui/icons/Flight';

export default function OptionItem({ place_name, place_type }) {
    const parts = place_name.split(',');
    const primary = parts[0];
    const secondary = parts.slice(1).join(',');
    return (
        <ListItem button>
            <ListItemIcon>
                {(/address/i.test(place_type) && <AddressIcon />) ||
                    (/airport/i.test(place_type) && <AirportIcon />) || (
                        <PlaceIcon />
                    )}
            </ListItemIcon>
            <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
    );
}
