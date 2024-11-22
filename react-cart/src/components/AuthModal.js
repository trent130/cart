import React from 'react';
import { Modal, Box } from '@mui/material';
import Login from './Login';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="auth-modal"
      aria-describedby="authentication-modal"
    >
      <Box sx={style}>
        <Login onClose={onClose} />
      </Box>
    </Modal>
  );
};

export default AuthModal; 