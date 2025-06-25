import React, { useState } from 'react';
import Sidebar from '../components/menu-lateral';
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Grid,
  Paper
} from '@mui/material';
import fotoPerfilPadrao from '../assets/images/perfil.png';

function Perfil() {
  const [editMode, setEditMode] = useState(false);
  const [empresa, setEmpresa] = useState('Empresa Exemplo LTDA');
  const [cnpj, setCnpj] = useState('12.345.678/0001-99');
  const [tipo, setTipo] = useState('Mercado');
  const [contatoPrincipal, setContatoPrincipal] = useState('(11) 98765-4321');
  const [contatoSecundario, setContatoSecundario] = useState('empresa@exemplo.com');
  const [fotoPerfil, setFotoPerfil] = useState(fotoPerfilPadrao);

  const handleSave = () => {
    console.log('Informações salvas!');
    setEditMode(false);
  };

  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFotoPerfil(imageUrl);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-0 lg:ml-64 flex items-center justify-center p-6">
        <Paper
          elevation={4}
          className="w-full max-w-3xl p-8 rounded-2xl bg-white"
        >
          {/* Header com foto + botão */}
          <Box className="flex items-center justify-between mb-8">
            <Box className="flex items-center">
              <Avatar src={fotoPerfil} alt="Foto de Perfil" sx={{ width: 60, height: 60, mr: 2 }} />
              <Box>
                <Typography variant="h6" className="font-bold">{empresa}</Typography>
                <Typography variant="body2" className="text-gray-600">{contatoPrincipal}</Typography>
              </Box>
            </Box>

            {editMode ? (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#004B8D',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#F37335' },
                }}
                onClick={handleSave}
              >
                Salvar
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#004B8D',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#F37335' },
                }}
                onClick={() => setEditMode(true)}
              >
                Editar
              </Button>
            )}
          </Box>

          {/* Upload de foto durante a edição */}
          {editMode && (
            <Box className="mb-8">
              <Button
                variant="outlined"
                component="label"
                sx={{
                  textTransform: 'none',
                  borderColor: '#004B8D',
                  color: '#004B8D',
                  '&:hover': {
                    backgroundColor: '#F37335',
                    color: 'white',
                    borderColor: '#F37335',
                  },
                }}
              >
                Escolher nova foto
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFotoChange}
                />
              </Button>
            </Box>
          )}

          {/* Grid - Uma informação por linha */}
          <Grid container spacing={4}>
            {/* Nome Empresa */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }} className="mb-1">Nome da Empresa</Typography>
              {editMode ? (
                <TextField fullWidth size="small" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
              ) : (
                <Typography className="text-gray-700">{empresa}</Typography>
              )}
            </Grid>

            {/* CNPJ */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }} className="mb-1">CNPJ</Typography>
              {editMode ? (
                <TextField fullWidth size="small" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
              ) : (
                <Typography className="text-gray-700">{cnpj}</Typography>
              )}
            </Grid>

            {/* Tipo de Estabelecimento */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }} className="mb-1">Tipo de Estabelecimento</Typography>
              {editMode ? (
                <TextField fullWidth size="small" value={tipo} onChange={(e) => setTipo(e.target.value)} />
              ) : (
                <Typography className="text-gray-700">{tipo}</Typography>
              )}
            </Grid>

            {/* Contato Principal */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }} className="mb-1">Método de Contato Principal</Typography>
              {editMode ? (
                <TextField fullWidth size="small" value={contatoPrincipal} onChange={(e) => setContatoPrincipal(e.target.value)} />
              ) : (
                <Typography className="text-gray-700">{contatoPrincipal}</Typography>
              )}
            </Grid>

            {/* Contato Secundário */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }} className="mb-1">Método de Contato Secundário</Typography>
              {editMode ? (
                <TextField fullWidth size="small" value={contatoSecundario} onChange={(e) => setContatoSecundario(e.target.value)} />
              ) : (
                <Typography className="text-gray-700">{contatoSecundario}</Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default Perfil;
