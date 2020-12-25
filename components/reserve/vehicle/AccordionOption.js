import React, { useEffect, useRef, useState, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Box,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function AccordionOption({ summary, options }) {
    const { root, AccordionDetailsRoot } = useStyles();
    return (
        <Accordion className={root}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='summary-content'
            >
                {summary}
            </AccordionSummary>
            <Divider />
            <AccordionDetails className={AccordionDetailsRoot}>
                {options}
            </AccordionDetails>
        </Accordion>
    );
}

const useStyles = makeStyles({
    root: {
        //backgroundColor: 'rgba(255, 255, 233, 0.8)',
    },
    AccordionDetailsRoot: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        maxHeight: '40vh',
        overflowY: 'scroll',
    },
});
