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
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import downloadPlanilha from '../assets/images/download-planilha.png';

function Estoque() {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeButton, setActiveButton] = useState('cadastrar');
  const [formularios, setFormularios] = useState([{ id: 1 }]);
  const [produtos, setProdutos] = useState([
    {
      nome: 'Vinho X',
      tipo: 'Bebida',
      quantidade: 10,
      lote: 'L123',
      precoCusto: 100,
      precoVenda: 134,
      marca: 'Marca A',
      validade: '12/05/2025',
    },
    // Adicione mais exemplos se quiser
  ]);
  const [mostrarOutroTipo, setMostrarOutroTipo] = useState(false);
  const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const adicionarFormulario = () => setFormularios([...formularios, { id: formularios.length + 1 }]);

  const abrirModalDetalhes = (produto) => {
    setProdutoSelecionado(produto);
    setModalDetalhesOpen(true);
  };

  const fecharModalDetalhes = () => setModalDetalhesOpen(false);
    const renderFormulario = (id) => (
    <Box key={id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Nome</Typography>
        <TextField fullWidth size="small" placeholder="Digite o nome do produto" />
      </Box>

      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Quantidade</Typography>
        <TextField fullWidth size="small" placeholder="Digite a quantidade" />
      </Box>

      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Lote</Typography>
        <TextField fullWidth size="small" placeholder="Digite o lote" />
      </Box>

      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Preço de Custo</Typography>
        <TextField fullWidth size="small" placeholder="Digite o preço de custo" />
      </Box>

      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Preço de Venda</Typography>
        <TextField fullWidth size="small" placeholder="Digite o preço de venda" />
      </Box>

      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Marca</Typography>
        <TextField fullWidth size="small" placeholder="Digite a marca" />
      </Box>

      <Box className="md:col-span-2 w-1/2">
        <Typography variant="body2" className="mb-1 font-medium">Tipo</Typography>
        <TextField
          select
          fullWidth
          size="small"
          onChange={(e) => setMostrarOutroTipo(e.target.value === 'Outro')}
          SelectProps={{ native: true }}
          sx={{ minWidth: '200px' }}
        >
          <option value="">Selecione o tipo</option>
          <option value="alimento">Alimento</option>
          <option value="bebida">Bebida</option>
          <option value="limpeza">Limpeza</option>
          <option value="higiene">Higiene</option>
          <option value="Outro">Outro</option>
        </TextField>
        {mostrarOutroTipo && (
          <TextField
            fullWidth
            size="small"
            placeholder="Digite a nova categoria"
            className="mt-2"
          />
        )}
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
              '&:hover': { backgroundColor: activeButton === 'cadastrar' ? '#3590d8' : '#e3f2fd' },
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
              '&:hover': { backgroundColor: activeButton === 'consultar' ? '#3590d8' : '#e3f2fd' },
            }}
            onClick={() => setActiveButton('consultar')}
          >
            Consultar Produtos
          </Button>
        </Box>
          {/* Aba: Cadastro de Produtos */}
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
                      '&:hover': { backgroundColor: '#f0f0f0' },
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
                    '&:hover': { backgroundColor: '#1e90a3' },
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

                <Box className="flex space-x-4 mt-10">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#004B8D',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#F37335' },
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
        {/* Aba: Consulta de Produtos */}
        {activeButton === 'consultar' && (
          <>
            <Typography variant="h4" className="font-bold mb-8 text-gray-800" sx={{ fontSize: '32px' }}>
              Veja todos os seus produtos cadastrados!
            </Typography>

            <div className="mb-8"></div>

            {/* Filtros */}
            <Box className="flex space-x-4 mb-6">
              <TextField
                select
                size="small"
                label="Tipo"
                defaultValue=""
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Alimento">Alimento</MenuItem>
                <MenuItem value="Bebida">Bebida</MenuItem>
                <MenuItem value="Limpeza">Limpeza</MenuItem>
                <MenuItem value="Higiene">Higiene</MenuItem>
              </TextField>

              <TextField
                type="date"
                size="small"
                label="Data de Validade"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                size="small"
                placeholder="Buscar por nome ou tipo..."
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

            {/* Tabela */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Nome</strong></TableCell>
                    <TableCell><strong>Tipo</strong></TableCell>
                    <TableCell><strong>Quantidade</strong></TableCell>
                    <TableCell><strong>Lote</strong></TableCell>
                    <TableCell><strong>Preço de Custo</strong></TableCell>
                    <TableCell><strong>Preço de Venda</strong></TableCell>
                    <TableCell><strong>Marca</strong></TableCell>
                    <TableCell><strong>Ver Detalhes</strong></TableCell>
                    <TableCell><strong>Editar</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {produtos.map((produto, index) => (
                    <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f0f8ff' : 'white' }}>
                      <TableCell>{produto.nome}</TableCell>
                      <TableCell>{produto.tipo}</TableCell>
                      <TableCell>{produto.quantidade}</TableCell>
                      <TableCell>{produto.lote}</TableCell>
                      <TableCell>{produto.precoCusto}</TableCell>
                      <TableCell>{produto.precoVenda}</TableCell>
                      <TableCell>{produto.marca}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          onClick={() => abrirModalDetalhes(produto)}
                          sx={{
                            minWidth: '32px',
                            padding: '4px',
                            color: '#004B8D',
                            '&:hover': { color: '#F37335' },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          sx={{
                            minWidth: '32px',
                            padding: '4px',
                            color: '#004B8D',
                            '&:hover': { color: '#F37335' },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Modal Detalhes */}
            <Modal
              open={modalDetalhesOpen}
              onClose={fecharModalDetalhes}
              aria-labelledby="modal-detalhes-titulo"
              aria-describedby="modal-detalhes-descricao"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography id="modal-detalhes-titulo" variant="h6" className="mb-4 font-bold">
                  Detalhes do Produto
                </Typography>
                {produtoSelecionado && (
                  <Typography id="modal-detalhes-descricao" variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    Nome: {produtoSelecionado.nome}
                    {'\n'}Tipo: {produtoSelecionado.tipo}
                    {'\n'}Quantidade: {produtoSelecionado.quantidade}
                    {'\n'}Lote: {produtoSelecionado.lote}
                    {'\n'}Preço de Custo: {produtoSelecionado.precoCusto}
                    {'\n'}Preço de Venda: {produtoSelecionado.precoVenda}
                    {'\n'}Marca: {produtoSelecionado.marca}
                  </Typography>
                )}
                <Box className="flex justify-end mt-4">
                  <Button
                    onClick={fecharModalDetalhes}
                    sx={{
                      textTransform: 'none',
                      backgroundColor: '#004B8D',
                      color: 'white',
                      '&:hover': { backgroundColor: '#F37335' },
                    }}
                  >
                    Fechar
                  </Button>
                </Box>
              </Box>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

export default Estoque;
