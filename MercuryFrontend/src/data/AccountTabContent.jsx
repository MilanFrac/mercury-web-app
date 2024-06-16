import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LockIcon from '@mui/icons-material/Lock';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const AccountTabContent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleChangeName = () => {
    setModalContent('This feature is coming soon.');
    setModalOpen(true);
  };

  const handleChangePassword = () => {
    setModalContent('This feature is coming soon.');
    setModalOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Account Settings
        </Typography>
        <Box component="form" sx={{ width: '100%', maxWidth: 500 }}>
          <Typography variant="h6" gutterBottom>
            Change Name
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangeName}
            startIcon={<LockIcon />}
            sx={{ mb: 4 }}
          >
            Change Name
          </Button>

          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
            sx={{ mb: 4 }}
          >
            Change Password
          </Button>
        </Box>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 24, maxWidth: 400, margin: 'auto', mt: 10 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalContent}
            </Typography>
            <Button onClick={() => setModalOpen(false)} sx={{ mt: 2 }}>Close</Button>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default AccountTabContent;