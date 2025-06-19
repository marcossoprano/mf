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
  InputAdornment,
  Modal
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import downloadPlanilha from '../assets/images/download-planilha.png';

function Estoque() {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeButton, setActiveButton] = useState('cadastrar');
  const [formularios, setFormularios] = useState([{ id: 1 }]);
  const [openModal, setOpenModal] = useState(false);

  const handleTabChange = (event, newValue) => setTabIndex(newValue);
  const adicionarFormulario = () => setFormularios([...formularios, { id: formularios.length + 1 }]);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const produtos = [
    { nome: 'Vinho X', tipo: 'Bebida', valor: 134, codigo: '18271821998212891', validade: '12/05/2025' },
    { nome: 'Vegetal Y', tipo: 'Vegetais', valor: 12, codigo: '29103189731289719', validade: '10/09/2025' },
    { nome: 'Brigadeiro da Vó', tipo: 'Doces', valor: 20, codigo: '917328378198219271', validade: '11/09/2026' },
    { nome: 'Festinha Z', tipo: 'Salgados', valor: 25, codigo: '2817318973192719921', validade: '29/08/2027' },
    { nome: 'Enlatado G', tipo: 'Enlatado', valor: 35, codigo: '1983791873913782738', validade: '25/09/2024' },
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

      <Box className="md:col-span-2 w-full md:w-1/2">
        <Typography variant="body2" className="mb-1 font-medium">Tipo</Typography>
        <TextField
          select
          fullWidth
          size="small"
          SelectProps={{ native: true }}
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
    <div className="flex flex-row">
      <Sidebar />

      <div className="flex-1 ml-0 lg:ml-64 p-4 sm:p-8 font-sans">
        {/* Botões Superiores */}
        <Box className="flex flex-col sm:flex-row sm:space-x-4 mb-12">
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

        {/* Aba Cadastrar */}
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

            {/* Aba Manual */}
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

            {/* Aba Importar Planilha */}
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

                <Box className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
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
                    onClick={handleOpenModal}
                  >
                    Ver modelo de planilha
                  </Button>
                </Box>

                {/* Modal */}
                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '90%',
                      maxWidth: 400,
                      bgcolor: 'background.paper',
                      boxShadow: 24,
                      p: 4,
                      borderRadius: 2,
                    }}
                  >
                    <Box className="flex justify-between items-center mb-4">
                      <Typography id="modal-title" variant="h6" component="h2" className="font-bold">
                        Modelo de Planilha
                      </Typography>
                      <CloseIcon
                        onClick={handleCloseModal}
                        className="cursor-pointer"
                        sx={{ color: '#999' }}
                      />
                    </Box>

                    <Typography id="modal-description" sx={{ fontSize: 14, marginBottom: 2 }}>
                      Apenas arquivos de planilha são permitidos (CSV, XLS, XLSX).
                    </Typography>

                    <Typography sx={{ fontSize: 14 }}>
                      A planilha precisa ter obrigatoriamente as seguintes colunas:
                    </Typography>

                    <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                      <li>Nome</li>
                      <li>Tipo</li>
                      <li>Valor</li>
                      <li>Código de Barras</li>
                      <li>Validade</li>
                    </ul>
                  </Box>
                </Modal>
              </Box>
            )}
          </>
        )}

        {/* Aba Consultar */}
        {activeButton === 'consultar' && (
          <>
            <Typography variant="h4" className="font-bold mb-8 text-gray-800" sx={{ fontSize: '32px' }}>
              Veja todos os seus produtos cadastrados!
            </Typography>

            <div className="mb-8"></div>

            <Box className="flex flex-col md:flex-row md:space-x-4 mb-6">
              <TextField
                select
                size="small"
                label="Filtrar"
                defaultValue=""
                sx={{ minWidth: 120, marginBottom: { xs: 2, md: 0 } }}
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
