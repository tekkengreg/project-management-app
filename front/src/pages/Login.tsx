import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Button,
} from '@mui/material';

function Login() {
  const [email, setEmail] = useState('toto@email.com');
  const [password, setPassword] = useState('tatata');

  const authContext = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authContext.login(email, password);
  };

  return (
    <Box
      component={'div'}
      className="content-center"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box sx={{ zIndex: 1, maxWidth: '500px' }}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            variant="standard"
            autoFocus
            fullWidth
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            label="Email"
            sx={{ mb: 4 }}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="auth-login-password">Mot de passe</InputLabel>
            <Input
              value={password}
              id="auth-login-password"
              name="password"
              onChange={handlePasswordChange}
              type={'password'}
            />
          </FormControl>
          <Box
            component={'div'}
            sx={{
              m: 4,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          ></Box>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ mb: 7 }}
          >
            S'authentifier
          </Button>
          <Box
            component={'div'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          ></Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
