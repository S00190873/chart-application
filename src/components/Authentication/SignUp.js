import * as React from 'react';
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

function CustomTextField({ name, label, error, ...rest }) {
  return (
    <TextField
      required
      fullWidth
      id={name}
      name={name}
      label={label}
      autoComplete={name}
      error={error} // Add error prop
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

function validateForm(values) {
  const errors = {};

  const hasFirstName = values.firstName && values.firstName.trim() !== '';
  const hasLastName = values.lastName && values.lastName.trim() !== '';
  const hasEmail = values.email && /\S+@\S+\.\S+/.test(values.email);
  const hasValidPassword = values.password && values.password.length >= 6;

  if (!hasFirstName) {
    errors.firstName = 'First name is required';
  }
  if (!hasLastName) {
    errors.lastName = 'Last name is required';
  }
  if (!hasEmail) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!hasValidPassword) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}

const defaultTheme = createTheme();

export default function SignUp() {
  const [formErrors, setFormErrors] = React.useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = Object.fromEntries(data.entries());
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted successfully:', formData);
      // You can proceed with form submission logic here
    } else {
      console.log('Form has errors:', errors);
      const errorMessage = Object.keys(errors)
        .map((key) => {
          if (errors[key].includes('required')) {
            return `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
          }
          return `${errors[key]}`;
        })
        .join('\n'); // Concatenate errors into one string
      toast.error(errorMessage, { // Display a single toast message with all errors
        toastId: 'form-error-toast',
        style: {
          backgroundColor: '#fff', // White background
          color: '#e57373', // Red text
          border: '1px solid #e57373', // Red border
        }
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
                <CustomTextField name="firstName" label="First Name" error={!!formErrors.firstName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField name="lastName" label="Last Name" error={!!formErrors.lastName} />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField name="email" label="Email Address" error={!!formErrors.email} />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField name="password" label="Password" type="password" error={!!formErrors.password} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
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
