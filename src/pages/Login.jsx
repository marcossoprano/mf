import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  FormControlLabel,
  Checkbox,
  Link,
  IconButton,
  InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import loginImage from '../assets/images/login.png';
import logoImage from '../assets/logos/LARANJA.png';

function LoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', login);
    console.log('Senha:', password);
    navigate('/pagina-inicial');
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans bg-gradient-to-br from-green-100 via-blue-100 to-blue-200 p-4">
      <Paper
        elevation={6}
        className="flex flex-col lg:flex-row rounded-2xl overflow-hidden w-full max-w-5xl shadow-2xl backdrop-blur-sm"
      >
        {/* Imagem lateral */}
        <div className="hidden lg:flex w-1/2 bg-white items-center justify-center p-8">
          <img src={loginImage} alt="Imagem de Login" className="max-w-full max-h-full object-contain" />
        </div>

        {/* Formulário */}
        <div className="flex w-full lg:w-1/2 items-start justify-start p-6 sm:p-10 bg-white">
          <div className="w-full max-w-md mx-auto">
            {/* Logo + Nome */}
            <div className="flex items-center mb-4">
              <img src={logoImage} alt="Logo MILO" className="w-8 h-8 mr-2" />
              <Typography variant="h6" className="font-bold text-base">MILO</Typography>
            </div>

            {/* Espaço entre logo e título */}
            <div className="mb-4"></div>

            {/* Título */}
            <Typography variant="h5" gutterBottom className="font-bold mb-4 text-gray-800">
              Bom te ver novamente!
            </Typography>

            {/* Espaço entre título e formulário */}
            <div className="mb-4"></div>

            <form onSubmit={handleSubmit} className="w-full font-sans" style={{ fontFamily: 'Roboto' }}>
              {/* Campo Login */}
              <Box mb={3}>
                <Typography variant="body2" className="text-gray-600 mb-1 text-sm font-medium">
                  E-mail ou número de telefone
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Digite seu e-mail ou número de telefone"
                  variant="outlined"
                  size="small"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  InputProps={{ style: { fontSize: '0.85rem', fontFamily: 'Roboto' } }}
                />
              </Box>

              {/* Campo Senha */}
              <Box mb={3}>
                <Typography variant="body2" className="text-gray-600 mb-1 text-sm font-medium">
                  Senha
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Digite sua senha"
                  variant="outlined"
                  size="small"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: { fontSize: '0.85rem', fontFamily: 'Roboto' }
                  }}
                />
              </Box>

              {/* Lembrar-me e Esqueceu Senha */}
              <Box className="flex items-center justify-between mb-5">
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={<Typography variant="body2" className="text-gray-600 text-xs">Lembrar-me</Typography>}
                />
                <Link
                  href="#"
                  underline="none"
                  className="text-xs text-blue-700 hover:text-orange-500 hover:no-underline transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/recuperar-senha');
                  }}
                >
                  Esqueceu a senha?
                </Link>
              </Box>

              {/* Botão Entrar */}
              <Box className="flex justify-center mb-4">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#004B8D',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    paddingX: '1.5rem',
                    paddingY: '0.4rem',
                    minWidth: '140px',
                    fontFamily: 'Roboto',
                    '&:hover': {
                      backgroundColor: '#F37335',
                    },
                  }}
                >
                  Entrar
                </Button>
              </Box>

              {/* Criar Conta */}
              <Box className="flex justify-center">
                <Typography variant="body2" className="text-gray-600 text-sm text-center">
                  Não tem uma conta?{' '}
                  <Link
                    href="#"
                    underline="none"
                    className="text-blue-700 text-sm hover:text-orange-500 hover:no-underline transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/cadastro');
                    }}
                  >
                    Cadastre-se
                  </Link>
                </Typography>
              </Box>
            </form>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default LoginPage;
