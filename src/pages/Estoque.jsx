import React, { useState } from 'react';
import Sidebar from '../components/menu-lateral';
import {
  Box,
  Button,
  Tabs,
  Tab,
  TextField,
  Typography,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import downloadPlanilha from '../assets/images/download-planilha.png';

function Estoque() {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeButton, setActiveButton] = useState('cadastrar');
  const [formularios, setFormularios] = useState([{ id: 1 }]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const adicionarFormulario = () => {
    setFormularios([...formularios, { id: formularios.length + 1 }]);
  };

  const produtos = [
    { nome: 'Vinho X', tipo: 'Bebida', valor: 134, codigo: '18271821998212891', validade: '12/05/2025' },
    { nome: 'Vegetal Y', tipo: 'Vegetais', valor: 12, codigo: '29103189731289719', validade: '10/09/2025' },
    { nome: 'Brigadeiro da Vó', tipo: 'Doces', valor: 20, codigo: '917328378198219271', validade: '11/09/2026' },
    { nome: 'Festinha Z', tipo: 'Salgados', valor: 25, codigo: '2817318973192719921', validade: '29/08/2027' },
    { nome: 'Enlatado G', tipo: 'Enlatado', valor: 35, codigo: '1983791873913782738', validade: '25/09/2024' },
    // Adicione mais conforme quiser
  ];

  const renderFormulario = (id) => (
    <Box key={id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Nome</Typography>
        <TextField fullWidth size="small" placeholder="Digite o nome do produto" />
      </Box>

      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Validade</Typography>
        <TextField fullWidth size="small" placeholder="Digite a validade" />
      </Box>

      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Código de Barras</Typography>
        <TextField fullWidth size="small" placeholder="Digite o código de barras" />
      </Box>

      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Valor</Typography>
        <TextField fullWidth size="small" placeholder="Digite o valor" />
      </Box>

      <Box className="md:col-span-2 w-1/2">
        <Typography variant="body2" className="mb-1 font-medium">Tipo</Typography>
        <TextField
          select
          fullWidth
          size="small"
          SelectProps={{ native: true }}
          sx={{ minWidth: '200px' }}
        >
          <option value="">Selecione o tipo</option>
          <option value="alimento">Alimento</option>
          <option value="bebida">Bebida</option>
          <option value="limpeza">Limpeza</option>
          <option value="higiene">Higiene</option>
        </TextField>
      </Box>
    </Box>
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-0 lg:ml-64 p-8 font-sans">
        {/* Botões Superiores */}
        <Box className="flex space-x-4 mb-12">
          <Button
            variant={activeButton === 'cadastrar' ? 'contained' : 'text'}
            sx={{
              backgroundColor: activeButton === 'cadastrar' ? '#4BA9F7' : 'transparent',
              color: activeButton === 'cadastrar' ? 'white' : '#4BA9F7',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: activeButton === 'cadastrar' ? '#3590d8' : '#e3f2fd',
              },
            }}
            onClick={() => setActiveButton('cadastrar')}
          >
            Cadastrar Produtos
          </Button>

          <Button
            variant={activeButton === 'consultar' ? 'contained' : 'text'}
            sx={{
              backgroundColor: activeButton === 'consultar' ? '#4BA9F7' : 'transparent',
              color: activeButton === 'consultar' ? 'white' : '#4BA9F7',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: activeButton === 'consultar' ? '#3590d8' : '#e3f2fd',
              },
            }}
            onClick={() => setActiveButton('consultar')}
          >
            Consultar Produtos
          </Button>
        </Box>

        {/* Conteúdo: Cadastro de Produtos */}
        {activeButton === 'cadastrar' && (
          <>
            <Typography variant="h4" className="font-bold mb-8 text-gray-800" sx={{ fontSize: '32px' }}>
              Adicione novos produtos!
            </Typography>

            <div className="mb-8"></div>

            <Tabs value={tabIndex} onChange={handleTabChange} textColor="primary" indicatorColor="primary" className="mb-6">
              <Tab label="Manual" />
              <Tab label="Importar Planilha" />
            </Tabs>

            {tabIndex === 0 && (
              <Box>
                {formularios.map((form) => renderFormulario(form.id))}

                <Box className="flex items-center mb-6">
                  <Button
                    variant="outlined"
                    startIcon={<span>＋</span>}
                    onClick={adicionarFormulario}
                    sx={{
                      textTransform: 'none',
                      borderColor: '#c2c2c2',
                      color: '#4B4B4B',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      },
                    }}
                  >
                    Adicione mais um produto
                  </Button>
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#25AABF',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#1e90a3',
                    },
                  }}
                >
                  Cadastrar
                </Button>
              </Box>
            )}

            {tabIndex === 1 && (
              <Box className="flex flex-col items-center">
                <img
                  src={downloadPlanilha}
                  alt="Download Planilha"
                  className="mb-4 max-w-xs"
                />
                <Typography variant="body1" className="text-center text-gray-700 mb-16">
                  Envie sua planilha para cadastrar vários produtos ao mesmo tempo!
                </Typography>

                {/* Input invisível */}
                <input
                  type="file"
                  accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  id="file-upload"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      console.log('Arquivo selecionado:', file.name);
                    }
                  }}
                />

                <Box className="flex space-x-4 mt-10">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#004B8D',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#F37335',
                      },
                    }}
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    Enviar Planilha
                  </Button>

                  <Button
                    variant="outlined"
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
                    Ver modelo de planilha
                  </Button>
                </Box>
              </Box>
            )}
          </>
        )}

        {/* Conteúdo: Consulta de Produtos */}
        {activeButton === 'consultar' && (
          <>
          {/* Título da página de consulta */}
            <Typography variant="h4" className="font-bold mb-8 text-gray-800" sx={{ fontSize: '32px' }}>
            Veja todos os seus produtos cadastrados!
            </Typography>

            {/* Espaçamento entre título e filtro */}
            <div className="mb-8"></div>

            <Box className="flex space-x-4 mb-6">
              <TextField
                select
                size="small"
                label="Filtrar"
                defaultValue=""
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Bebida">Bebida</MenuItem>
                <MenuItem value="Vegetais">Vegetais</MenuItem>
                <MenuItem value="Doces">Doces</MenuItem>
              </TextField>

              <TextField
                size="small"
                placeholder="Digite o nome ou tipo de produto que você quer acessar..."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Nome</strong></TableCell>
                    <TableCell><strong>Tipo</strong></TableCell>
                    <TableCell><strong>Valor</strong></TableCell>
                    <TableCell><strong>Código de Barras</strong></TableCell>
                    <TableCell><strong>Validade</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {produtos.map((produto, index) => (
                    <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f0f8ff' : 'white' }}>
                      <TableCell>{produto.nome}</TableCell>
                      <TableCell>{produto.tipo}</TableCell>
                      <TableCell>{produto.valor}</TableCell>
                      <TableCell>{produto.codigo}</TableCell>
                      <TableCell>{produto.validade}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </div>
  );
}

export default Estoque;
