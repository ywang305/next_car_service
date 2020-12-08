import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';

export default function AlertDialog({
    open,
    onClose,
    title = '',
    content = null,
    buttons = [],
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            {title && (
                <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
            )}
            {content && <DialogContent>{content}</DialogContent>}
            <DialogActions>{buttons}</DialogActions>
        </Dialog>
    );
}
