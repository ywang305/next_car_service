import React, { useEffect, useRef, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';

export default function Schedule({ color, display }) {
    return (
        <Box
            display='flex'
            alignItems='center'
            style={{ overflow: 'visible' }}
            color={color}
        >
            <ScheduleIcon />
            <Box ml={2}>{display}</Box>
        </Box>
    );
}
