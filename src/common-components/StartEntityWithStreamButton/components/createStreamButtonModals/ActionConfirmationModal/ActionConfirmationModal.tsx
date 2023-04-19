import React, { memo } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { ActionConfirmationModalPropsType } from '../../../types';

export const ActionConfirmationModal = memo(
  (props: ActionConfirmationModalPropsType) => {
    const { open, setOpen } = props;

    const handleClose = (_event: Object, reason: string) => {
      if (reason !== 'backdropClick') {
        setOpen(false);
      }
    };

    const handleConfirm = () => {
      // Handle the confirmed action here
      props.onConfirm();
      setOpen(false);
    };

    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEscapeKeyDown={true}
        >
          <DialogTitle id="alert-dialog-title">
            {props.title.toUpperCase()}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.currentAction === 'start' && (
                <>
                  Прежде чем нажать &quot;OK&quot; активируй IT-INCUBATOR
                  STUDENTS BOT
                  <br />
                  <br />
                </>
              )}
              {props.content}
              <br />
              <br />
              Ты уверен, что хочешь это сделать?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              color="primary"
              sx={{ fontSize: '1rem' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              color="primary"
              sx={{ fontSize: '1rem' }}
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
);
