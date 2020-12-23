import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { ClickAwayListener, Tabs, Tab } from '@material-ui/core';
import AirportIcon from '@material-ui/icons/Flight';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import PinIcon from '@material-ui/icons/NotListedLocation';

import { withStyles } from '@material-ui/core/styles';
import TypeIn from './TypeIn';
import PinOnMap from './PinOnMap';
import Airports from './Airports';
import { PanelContext } from './SearchPanel';

export default function SearchBar({ label }) {
    const [value, setValue] = useState(-1); // have to ini -1 in case clickAway not working
    const { completeEditing } = useContext(PanelContext);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const tid = setTimeout(() => setValue(0), 200);
        return () => clearTimeout(tid);
    }, []);

    const clickAwayHandler = () => {
        if ([0, 1].includes(value)) {
            completeEditing();
        }
    };

    return (
        <ClickAwayListener onClickAway={clickAwayHandler}>
            <div>
                {[-1, 0].includes(value) && <TypeIn label={label} />}
                {value === 1 && <Airports label={label} />}
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
        </ClickAwayListener>
    );
}

const InputTab = withStyles({
    root: {
        minWidth: 60,
    },
})(Tab);
