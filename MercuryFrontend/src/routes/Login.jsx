// LoginPage.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import BlobAnimation from '../Components/BlobAnimation';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (formData.username === '1' && formData.password === '1') {
      console.log('Użytkownik zalogowany:', formData.username);

      // Przekieruj użytkownika do kalendarza
      navigate('/calendar');
    } else {
      // Wyświetl informację o błędnym logowaniu
      console.log('Błędne dane logowania');
    }
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
        onSubmit={handleLogin}
        sx={{
          height: '452px',
          maxWidth: '400px',
          width: '100%',
          '& .MuiTextField-root': { mb: 2 },
          backgroundColor: '#4D4949',
          padding: '50px',
          borderRadius: '10px',
          '& .Mui-focused': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
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
          sx={{ mt: 2, backgroundColor: '#333333' }}
        >
          Zaloguj się
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
