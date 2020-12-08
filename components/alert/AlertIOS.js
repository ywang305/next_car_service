import React from 'react';
import {
    Modal,
    Box,
    DialogContent,
    DialogContentText,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const AlertIOS = ({
    open = false,
    onClose = null,
    buttons = [],
    content = null,
}) => {
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
                <div>
                    {content && <DialogContent>{content}</DialogContent>}

                    <Box
                        m={2}
                        width={1}
                        maxWidth={600}
                        display='flex'
                        flexWrap='wrap'
                        justifyContent='space-evenly'
                    >
                        {buttons?.map((btn, i) => (
                            <Box
                                key={i}
                                boxShadow={1}
                                bgcolor='background.paper'
                                borderRadius={8}
                                width={270}
                                mb={2}
                                mx={1}
                            >
                                {btn}
                            </Box>
                        ))}
                    </Box>
                </div>
            </Slide>
        </Modal>
    );
};

export default AlertIOS;
