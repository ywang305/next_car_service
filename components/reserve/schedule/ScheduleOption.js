import React, { useEffect, useRef, useState, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Divider, ListItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectSchedule,
    scheduleAction,
} from '../../../lib/store/reserveSlice';
import Schedule from './Schedule';
import AccordionOption from '../vehicle/AccordionOption';
import DateTimePickers from './DateTimePickers';

export default function ScheduleOption() {
    const { sid, dtmStr } = useSelector(selectSchedule);
    const dispatch = useDispatch();

    const selectHandler = (sid, offset) => () => {
        dispatch(scheduleAction(sid, offset));
    };
    const summaryDisplay = new Date(dtmStr || Date.now()).toLocaleString();

    const options = schedules.map((item) => {
        const selected = item.sid === sid;
        const display = item.sid;
        return (
            <ListItem
                button
                divider
                selected={selected}
                key={item.sid}
                onClick={selectHandler(item.sid, item.offset)}
                style={{ marginTop: 4 }}
            >
                <Schedule
                    display={display}
                    color={selected ? 'text.primary' : 'text.secondary'}
                />
            </ListItem>
        );
    });
    options.push(<DateTimePickers />);

    return (
        <AccordionOption
            summary={<Schedule color='info.main' display={summaryDisplay} />}
            options={options}
        />
    );
}

const schedules = [
    { sid: 'Now', offset: 0 },
    { sid: '20 Min', offset: 20 * 60 * 1000 },
    { sid: '1 Hour', offset: 60 * 60 * 1000 },
    { sid: '2 Hour', offset: 2 * 3600 * 1000 },
];
