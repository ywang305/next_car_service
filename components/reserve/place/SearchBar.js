import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Box, Tabs, Tab } from '@material-ui/core';
import AirportIcon from '@material-ui/icons/Flight';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import PinIcon from '@material-ui/icons/NotListedLocation';

import { withStyles } from '@material-ui/core/styles';
import TypeIn from './TypeIn';
import PinOnMap from './PinOnMap';

export default function SearchBar({ label, isUsing, setIsUsing }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setIsUsing?.({ label, tab: newValue });
    };

    useEffect(() => {
        if (value === 2 && isUsing?.label != label) {
            setValue(0);
        }
    }, [value, isUsing?.label]);

    return (
        <div>
            {value === 0 && <TypeIn label={label} />}
            {value === 1 && <div> airport </div>}
            {value === 2 && <PinOnMap label={label} />}
            <Tabs
                value={value}
                onChange={handleChange}
                variant='fullWidth'
                indicatorColor='secondary'
                textColor='secondary'
            >
                <InputTab icon={<KeyboardIcon />} />
                <InputTab icon={<AirportIcon />} />
                <InputTab icon={<PinIcon />} />
            </Tabs>
        </div>
    );
}

const InputTab = withStyles({
    root: {
        minWidth: 60,
    },
})(Tab);
