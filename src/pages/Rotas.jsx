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
  useMediaQuery
} from '@mui/material';
import rotaImage from '../assets/images/rota.png';

function Rotas() {
  const [view, setView] = useState('gerenciar'); // 'gerenciar' | 'consultar'
  const [tabIndex, setTabIndex] = useState(0);
  const [formularios, setFormularios] = useState([{ id: 1 }]);
  const [destinosCadastro, setDestinosCadastro] = useState(['']);
  const [destinosSugestao, setDestinosSugestao] = useState(['']);
  const isMobile = useMediaQuery('(max-width:768px)');

  const adicionarFormulario = () => setFormularios([...formularios, { id: formularios.length + 1 }]);
  const adicionarDestinoCadastro = () => setDestinosCadastro([...destinosCadastro, '']);
  const handleDestinoCadastroChange = (index, value) => {
    const novos = [...destinosCadastro];
    novos[index] = value;
    setDestinosCadastro(novos);
  };
  const adicionarDestinoSugestao = () => setDestinosSugestao([...destinosSugestao, '']);
  const handleDestinoSugestaoChange = (index, value) => {
    const novos = [...destinosSugestao];
    novos[index] = value;
    setDestinosSugestao(novos);
  };

  const renderFormularioCadastro = (id) => (
    <Box key={id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Previsão de tempo</Typography>
        <TextField fullWidth size="small" placeholder="Ex: 2h" />
      </Box>
      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Nome do Motorista</Typography>
        <TextField fullWidth size="small" placeholder="Digite o nome do motorista" />
      </Box>
      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Local de Partida</Typography>
        <TextField fullWidth size="small" placeholder="Ex: Mercadinho do José" />
      </Box>
      <Box className="md:col-span-2">
        <Typography variant="body2" className="mb-1 font-medium">Destinos</Typography>
        {destinosCadastro.map((dest, index) => (
          <TextField
            key={index}
            fullWidth
            size="small"
            placeholder={`Digite o endereço do destino ${index + 1}`}
            value={dest}
            onChange={(e) => handleDestinoCadastroChange(index, e.target.value)}
            className="mb-2"
          />
        ))}
        <Button
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none',
            mt: 1,
            borderColor: '#c2c2c2',
            color: '#4B4B4B',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
          onClick={adicionarDestinoCadastro}
        >
          Adicionar outro destino
        </Button>
      </Box>
      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Gasto com Gasolina</Typography>
        <TextField fullWidth size="small" placeholder="Ex: R$ 50,00" />
      </Box>
      <Box>
        <Typography variant="body2" className="mb-1 font-medium">Status</Typography>
        <TextField fullWidth size="small" placeholder="Ex: Em andamento" />
      </Box>
    </Box>
  );

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 lg:ml-64 p-8 font-sans">
        <Typography variant="h4" className="font-bold mb-16 text-gray-800" sx={{ fontSize: '32px' }}>
          Rotas
        </Typography>

        {/* Botões no topo no estilo Estoque */}
        <Box className="flex space-x-8 mb-12">
          <Button
            variant={view === 'gerenciar' ? 'contained' : 'text'}
            sx={{
              backgroundColor: view === 'gerenciar' ? '#4BA9F7' : 'transparent',
              color: view === 'gerenciar' ? 'white' : '#4BA9F7',
              fontWeight: view === 'gerenciar' ? 'bold' : 'normal',
              textTransform: 'none',
              '&:hover': view === 'gerenciar' ? { backgroundColor: '#3590d8' } : { backgroundColor: 'transparent' },
            }}
            onClick={() => setView('gerenciar')}
          >
            Gerenciar Rotas
          </Button>

          <Button
            variant={view === 'consultar' ? 'contained' : 'text'}
            sx={{
              backgroundColor: view === 'consultar' ? '#4BA9F7' : 'transparent',
              color: view === 'consultar' ? 'white' : '#4BA9F7',
              fontWeight: view === 'consultar' ? 'bold' : 'normal',
              textTransform: 'none',
              '&:hover': view === 'consultar' ? { backgroundColor: '#3590d8' } : { backgroundColor: 'transparent' },
            }}
            onClick={() => setView('consultar')}
          >
            Consultar Rotas
          </Button>
        </Box>

        {/* GERENCIAR */}
        {view === 'gerenciar' && (
          <>
            <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} textColor="primary" indicatorColor="primary" className="mb-6">
              <Tab label="Gerar rota automaticamente" />
              <Tab label="Cadastrar rota manualmente" />
            </Tabs>

            {tabIndex === 0 && (
              <Box className="flex flex-col items-center mt-8">
                <img src={rotaImage} alt="Imagem Rota" className="mb-8 max-w-xs" />
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-6">
                  <Box>
                    <Typography variant="body2" className="mb-1 font-medium">Local de Partida</Typography>
                    <TextField fullWidth size="small" placeholder="Digite o local de partida" />
                  </Box>
                  <Box>
                    <Typography variant="body2" className="mb-1 font-medium">Nome do Motorista</Typography>
                    <TextField fullWidth size="small" placeholder="Digite o nome do motorista" />
                  </Box>
                  <Box className="md:col-span-2">
                    <Typography variant="body2" className="mb-1 font-medium">Destinos</Typography>
                    {destinosSugestao.map((dest, index) => (
                      <TextField
                        key={index}
                        fullWidth
                        size="small"
                        placeholder={`Digite o endereço do destino ${index + 1}`}
                        value={dest}
                        onChange={(e) => handleDestinoSugestaoChange(index, e.target.value)}
                        className="mb-2"
                      />
                    ))}
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        mt: 1,
                        borderColor: '#c2c2c2',
                        color: '#4B4B4B',
                        '&:hover': { backgroundColor: '#f0f0f0' },
                      }}
                      onClick={adicionarDestinoSugestao}
                    >
                      Adicionar outro destino
                    </Button>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#25AABF',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#F37335' },
                  }}
                >
                  Gerar Rota
                </Button>
              </Box>
            )}

            {tabIndex === 1 && (
              <Box>
                {formularios.map((form) => renderFormularioCadastro(form.id))}
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
                    Adicione mais uma rota
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
          </>
        )}

        {/* CONSULTAR */}
        {view === 'consultar' && (
          <>
            <Typography variant="h4" className="font-bold mb-8 text-gray-800" sx={{ fontSize: '32px' }}>
              Veja todas as suas rotas!
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell><strong>Motorista</strong></TableCell>
                    <TableCell><strong>Gasto – Combustível</strong></TableCell>
                    <TableCell><strong>Tempo</strong></TableCell>
                    <TableCell><strong>Data</strong></TableCell>
                    <TableCell><strong>Copiar Link</strong></TableCell>
                    <TableCell><strong>Número de Clientes</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { id: '123243', motorista: 'João Santos', gasto: 30, tempo: '2h', data: '12/05/2025', clientes: 3 },
                    { id: '1212434', motorista: 'André Oliveira', gasto: 12, tempo: '30min', data: '12/08/2025', clientes: 1 },
                    { id: '1298912', motorista: 'Manoel Ferreira', gasto: 20, tempo: '1h', data: '11/09/2026', clientes: 2 },
                    { id: '242385', motorista: 'José Antonio', gasto: 25, tempo: '55min', data: '29/08/2027', clientes: 4 },
                    { id: '1387284', motorista: 'André Ferreira', gasto: 35, tempo: '25min', data: '25/09/2024', clientes: 2 },
                  ].map((rota, index) => (
                    <TableRow key={rota.id} sx={{ backgroundColor: index % 2 === 0 ? '#f0f8ff' : 'white' }}>
                      <TableCell>{rota.id}</TableCell>
                      <TableCell>{rota.motorista}</TableCell>
                      <TableCell>{rota.gasto}</TableCell>
                      <TableCell>{rota.tempo}</TableCell>
                      <TableCell>{rota.data}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            textTransform: 'none',
                            color: '#004B8D',
                            borderColor: '#004B8D',
                            '&:hover': { backgroundColor: '#F37335', color: 'white', borderColor: '#F37335' },
                          }}
                          onClick={() => navigator.clipboard.writeText('iajdaijdajau')}
                        >
                          Copiar
                        </Button>
                      </TableCell>
                      <TableCell>{rota.clientes}</TableCell>
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

export default Rotas;
