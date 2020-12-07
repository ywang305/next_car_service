import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';

const AlertIOS = ({ open, children, onClose }) => {
    return (
        <Modal
            disableAutoFocus
            open={open}
            onClose={onClose}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}
        >
            <Slide direction='up' in={open} mountOnEnter unmountOnExit>
                {children}
            </Slide>
        </Modal>
    );
};

export default AlertIOS;
