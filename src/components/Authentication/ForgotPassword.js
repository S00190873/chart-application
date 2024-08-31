import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase'; // Import the auth instance
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!', {
        toastId: 'reset-success-toast',
        style: {
          backgroundColor: '#e0f7fa',
          color: '#00796b',
          border: '1px solid #00796b',
        },
      });
      navigate('/login'); // Redirect to login page after successful email send
    } catch (error) {
      toast.error('Error sending password reset email. Please try again.', {
        toastId: 'reset-error-toast',
        style: {
          backgroundColor: '#fff',
          color: '#e57373',
          border: '1px solid #e57373',
        },
      });
      console.error('Error sending password reset email:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Send Reset Link
          </Button>
        </Box>
      </Box>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </Container>
  );
};

export default ForgotPassword;
