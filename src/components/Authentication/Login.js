import React from 'react';
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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignIn() {
  const [errors, setErrors] = React.useState({});
  const [rememberMe, setRememberMe] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');

    if (savedEmail && savedPassword) {
      document.getElementById('email').value = savedEmail;
      document.getElementById('password').value = savedPassword;
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = Object.fromEntries(data.entries());
    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length === 0) {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User signed in:', user);

          if (rememberMe) {
            localStorage.setItem('userEmail', formData.email);
            localStorage.setItem('userPassword', formData.password); // Note: Storing passwords is not secure
          } else {
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userPassword');
          }

          toast.success('Successfully signed in!', {
            toastId: 'success-toast',
            style: {
              backgroundColor: '#e0f7fa',
              color: '#00796b',
              border: '1px solid #00796b',
            },
          });
          navigate('/'); // Redirect to home page or desired route
        })
        .catch((error) => {
          const errorCode = error.code;
          let errorMessage = 'An error occurred. Please try again.';

          switch (errorCode) {
            case 'auth/invalid-email':
              errorMessage = 'Invalid email address. Please check your email and try again.';
              break;
            case 'auth/user-not-found':
              errorMessage = 'No user found with this email. Please check and try again.';
              break;
            case 'auth/wrong-password':
              errorMessage = 'Incorrect password. Please try again.';
              break;
            case 'auth/network-request-failed':
              errorMessage = 'Network error. Please check your connection and try again.';
              break;
            case 'auth/invalid-credential':
              errorMessage = 'The credentials provided are invalid. Please ensure that your email and password are correct.';
              break;
            default:
              errorMessage = 'An unexpected error occurred. Please try again later.';
          }

          toast.error(errorMessage, {
            toastId: 'firebase-error-toast',
            style: {
              backgroundColor: '#fff',
              color: '#e57373',
              border: '1px solid #e57373',
            },
          });
          console.error('Firebase authentication error:', errorCode, error.message);
        });
    } else {
      let errorMessage = '';
      if (formErrors.email && formErrors.password) {
        errorMessage = `${formErrors.email} & ${formErrors.password}`;
      } else {
        errorMessage = formErrors.email || formErrors.password;
      }
      toast.error(errorMessage, {
        toastId: 'form-error-toast',
        style: {
          backgroundColor: '#fff',
          color: '#e57373',
          border: '1px solid #e57373',
        },
      });
      setErrors(formErrors);
    }
  };

  const validateForm = (values) => {
    const errors = {};
    const isValidEmail = /\S+@\S+\.\S+/.test(values.email);
    const isNotEmptyEmail = !!values.email;
    const isNotEmptyPassword = !!values.password;
    const isPasswordLengthValid = values.password.length >= 6;

    if (!isNotEmptyEmail) {
      errors.email = 'Email address is required';
    } else if (!isValidEmail) {
      errors.email = 'Email address must be valid';
    }

    if (!isNotEmptyPassword) {
      errors.password = 'Password is required';
    } else if (!isPasswordLengthValid) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
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
            Log in
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
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer position="bottom-center" autoClose={3000} />
        <Box sx={{ flexGrow: 1 }} />
      </Container>
    </ThemeProvider>
  );
}
