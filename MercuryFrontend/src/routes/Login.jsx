import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import BlobAnimation from '../components/BlobAnimation';

const LoginPage = () => {
  const [formData, setFormData] = React.useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    console.log('Dane logowania:', formData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        position: 'relative',
      }}
    >
      <BlobAnimation />

      <Typography variant="h4" gutterBottom>
        Logowanie
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        sx={{
          height: '400px',
          maxWidth: '400px',
          width: '200%',
          '& .MuiTextField-root': { mb: 2 },
          backgroundColor: '#4D4949',
          padding: '50px',
          borderRadius: '10px',
          '& .Mui-focused': { // Dodaj styl dla stanu aktywnego (focused)
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)', // Dostosuj kolor boxShadow
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
          }}
          name="username"
          label="Nazwa użytkownika"
          variant="outlined"
          fullWidth
          value={formData.username}
          onChange={handleInputChange}
        />
        <TextField
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
          }}
          name="password"
          label="Hasło"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          Zaloguj się
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
