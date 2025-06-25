import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
  InputAdornment,
  IconButton,
  MenuItem
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import cadastroImage from '../assets/images/cadastro.png';
import logoImage from '../assets/logos/LARANJA.png';

function Cadastro() {
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [tipoEstabelecimento, setTipoEstabelecimento] = useState('');
  const [outroTipo, setOutroTipo] = useState('');
  const [metodoContato, setMetodoContato] = useState('');
  const [contato, setContato] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Empresa:', empresa);
    console.log('CNPJ:', cnpj);
    console.log('Tipo:', tipoEstabelecimento === 'outro' ? outroTipo : tipoEstabelecimento);
    console.log('Contato:', contato);
    console.log('Senha:', senha);
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
          <img src={cadastroImage} alt="Imagem Cadastro" className="max-w-full max-h-full object-contain" />
        </div>

        {/* Formulário */}
        <div className="flex w-full lg:w-1/2 items-start justify-start p-6 sm:p-10 bg-white">
          <div className="w-full max-w-md mx-auto">

            {/* Logo + Nome */}
            <div className="flex items-center mb-4">
              <img src={logoImage} alt="Logo MILO" className="w-8 h-8 mr-2" />
              <Typography variant="h6" className="font-bold text-base">MILO</Typography>
            </div>

            {/* Título */}
            <Typography variant="h5" gutterBottom className="font-bold mb-4 text-gray-800">
              Crie sua conta
            </Typography>

            <form onSubmit={handleSubmit} className="w-full font-sans" style={{ fontFamily: 'Roboto' }}>
              
              {/* Nome da Empresa */}
              <Box mb={3}>
                <Typography variant="body2" className="text-gray-600 mb-1 text-sm font-medium">
                  Nome da Empresa
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Digite o nome da empresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                />
              </Box>

              {/* CNPJ */}
              <Box mb={3}>
                <Typography variant="body2" className="text-gray-600 mb-1 text-sm font-medium">
                  CNPJ
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Digite o CNPJ"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </Box>

              {/* Tipo de Estabelecimento */}
              <Box mb={3}>
                <Typography variant="body2" className="text-gray-600 mb-1 text-sm font-medium">
                  Tipo de Estabelecimento
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={tipoEstabelecimento}
                  onChange={(e) => setTipoEstabelecimento(e.target.value)}
                >
                  <MenuItem value="">Selecione</MenuItem>
                  <MenuItem value="mercado">Mercado</MenuItem>
                  <MenuItem value="farmacia">Farmácia</MenuItem>
                  <MenuItem value="outro">Outro</MenuItem>
                </TextField>
                {tipoEstabelecimento === 'outro' && (
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Especifique o tipo"
                    value={outroTipo}
                    onChange={(e) => setOutroTipo(e.target.value)}
                    className="mt-2"
                  />
                )}
              </Box>

              {/* Método de Contato */}
              <Box mb={3}>
                <Typography variant="body2" className="text-gray-600 mb-1 text-sm font-medium">
                  Método de Contato
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={metodoContato}
                  onChange={(e) => setMetodoContato(e.target.value)}
                >
                  <MenuItem value="">Selecione</MenuItem>
                  <MenuItem value="celular">Celular</MenuItem>
                  <MenuItem value="email">E-mail</MenuItem>
                </TextField>
                {metodoContato && (
                  <TextField
                    fullWidth
                    size="small"
                    placeholder={`Digite seu ${metodoContato}`}
                    value={contato}
                    onChange={(e) => setContato(e.target.value)}
                    className="mt-2"
                  />
                )}
              </Box>

              {/* Senha */}
              <Box mb={3}>
                <Typography variant="body2" className="text-gray-600 mb-1 text-sm font-medium">
                  Senha
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Digite sua senha"
                  type={showPassword ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
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

              {/* Botão Cadastrar */}
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
                  Cadastrar
                </Button>
              </Box>

              {/* Link para Login */}
              <Box className="flex justify-center">
                <Typography variant="body2" className="text-gray-600 text-sm text-center">
                  Já tem uma conta?{' '}
                  <Link
                    href="#"
                    underline="none"
                    className="text-blue-700 text-sm hover:text-orange-500 hover:no-underline transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/');
                    }}
                  >
                    Faça login aqui
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

export default Cadastro;
