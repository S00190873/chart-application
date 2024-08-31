import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase'; // Import the auth instance
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the Firebase method

// Custom components for TextField, Button, and Link
function CustomTextField({ name, label, type = 'text', error, ...rest }) {
  return (
    <TextField
      required
      fullWidth
      id={name}
      name={name}
      label={label}
      type={type}
      autoComplete={name}
      error={error}
      {...rest}
    />
  );
}

function CustomButton({ children, ...rest }) {
  return (
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} {...rest}>
      {children}
    </Button>
  );
}

function CustomLink({ href, children }) {
  return (
    <Link href={href} variant="body2">
      {children}
    </Link>
  );
}

// Form validation function
function validateForm(values) {
  const errors = [];

  const hasFirstName = values.firstName && values.firstName.trim() !== '';
  const hasLastName = values.lastName && values.lastName.trim() !== '';
  const hasEmail = values.email && /\S+@\S+\.\S+/.test(values.email);
  const hasValidPassword = values.password && values.password.length >= 6;
  const passwordsMatch = values.password === values.confirmPassword;

  if (!hasFirstName) {
    errors.push('First name is required');
  }
  if (!hasLastName) {
    errors.push('Last name is required');
  }
  if (!hasEmail) {
    errors.push('Email address is required');
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.push('Invalid email address');
  }
  if (!hasValidPassword) {
    errors.push('Password must be at least 6 characters');
  }
  if (!passwordsMatch) {
    errors.push('Passwords do not match');
  }

  return errors;
}

const defaultTheme = createTheme();

export default function SignUp() {
  const [formErrors, setFormErrors] = useState([]);
  const [optIn, setOptIn] = useState(false); // State for the opt-in checkbox
  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = Object.fromEntries(data.entries());
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (errors.length === 0) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        console.log('User created successfully:', userCredential.user);

        // Handle opt-in logic (store preference in a database or other storage if necessary)
        // Example: You can save the preference in a user profile or a separate collection if needed

        toast.success('Account created successfully!', {
          toastId: 'success-toast',
          style: {
            backgroundColor: '#e0f7fa',
            color: '#00796b',
            border: '1px solid #00796b',
          },
        });
        navigate('/'); // Redirect to the dashboard after signup
      } catch (error) {
        console.error('Error creating user:', error);
        let errorMessage = '';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Email address is already in use.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address.';
        } else if (error.code === 'auth/operation-not-allowed') {
          errorMessage = 'Email/password accounts are not enabled.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak.';
        } else {
          errorMessage = 'Error creating user. Please try again later.';
        }
        toast.error(<span>{errorMessage}</span>, {
          toastId: 'firebase-error-toast',
          style: {
            backgroundColor: '#fff',
            color: '#e57373',
            border: '1px solid #e57373',
          },
        });
      }
    } else {
      const errorMessage = errors.map((err, index) => <div key={index}>{err}</div>);
      toast.error(<div>{errorMessage}</div>, {
        toastId: 'form-error-toast',
        style: {
          backgroundColor: '#fff',
          color: '#e57373',
          border: '1px solid #e57373',
        },
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomTextField name="firstName" label="First Name" error={formErrors.includes('First name is required')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField name="lastName" label="Last Name" error={formErrors.includes('Last name is required')} />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField name="email" label="Email Address" error={formErrors.includes('Email address is required') || formErrors.includes('Invalid email address')} />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField name="password" label="Password" type="password" error={formErrors.includes('Password must be at least 6 characters')} />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField name="confirmPassword" label="Confirm Password" type="password" error={formErrors.includes('Passwords do not match')} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={optIn} onChange={(e) => setOptIn(e.target.checked)} color="primary" />}
                  label="I want to receive marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <CustomButton>Sign Up</CustomButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <CustomLink href="/login">Already have an account? Sign in</CustomLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer position="bottom-center" autoClose={5000} />
      </Container>
    </ThemeProvider>
  );
}
