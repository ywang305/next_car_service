import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {
    selectSchedule,
    scheduleAction,
} from '../../../lib/store/reserveSlice';
import { useDispatch } from 'react-redux';

export default function DateTimePickers() {
    const [value, setValue] = useState(dtmFormatter());

    const dispatch = useDispatch();
    const changeHandler = (e) => {
        const value = e.target.value;
        dispatch(scheduleAction('pick', value));
        setValue(value);
    };
    return (
        <TextField
            id='datetime-local'
            label='Next Car Appointment'
            type='datetime-local'
            defaultValue={value}
            InputLabelProps={{
                shrink: true,
            }}
            value={value}
            onChange={changeHandler}
        />
    );
}

const dtmFormatter = (d = new Date(Date.now() + 600 * 1000)) => {
    d.getFullYear() +
        '-' +
        (d.getMonth() + 1) +
        '-' +
        d.getDate() +
        'T' +
        d.getHours() +
        ':' +
        d.getMinutes();
};
