import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface Props {
  title: string;
  content: string;
  onConfirm: () => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function ActionConfirmation(props: Props) {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // Handle the confirmed action here
    props.onConfirm();
    handleClose();
  };

  //TODO Закрывать попап только на кнопки
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title.toUpperCase()}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
            <br />
            <br />
            Ты уверен, что хочешь это сделать?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
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
