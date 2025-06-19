import React, { useState } from 'react';
import Sidebar from '../components/menu-lateral';
import {
  Box,
  Button,
  Tabs,
  Tab,
  Typography,
  TextField,
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PaginaInicial() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const historico = [
    { id: 1, tipo: 'Cadastro de Produto', horario: '14:00', data: '17/06/2025' },
    { id: 2, tipo: 'Edição de Rota', horario: '09:30', data: '16/06/2025' },
    { id: 3, tipo: 'Cadastro de Cliente', horario: '11:15', data: '15/06/2025' },
  ];

  const dadosLucro = [
    { mes: 'Janeiro', lucro: 3000 },
    { mes: 'Fevereiro', lucro: 4500 },
    { mes: 'Março', lucro: 5000 },
    { mes: 'Abril', lucro: 7000 },
  ];

  const dadosProdutos = [
    { produto: 'Arroz', vendas: 150 },
    { produto: 'Feijão', vendas: 100 },
    { produto: 'Macarrão', vendas: 80 },
    { produto: 'Óleo', vendas: 50 },
  ];

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-0 lg:ml-64 p-8 font-sans">
        {/* Título */}
        <Typography variant="h4" className="font-bold mb-8 text-gray-800" sx={{ fontSize: '32px' }}>
          Painel Geral
        </Typography>

        <div className="mb-8"></div>

        {/* Tabs */}
        <Tabs value={tabIndex} onChange={handleTabChange} textColor="primary" indicatorColor="primary" className="mb-6">
          <Tab label="Gráficos" />
          <Tab label="Histórico" />
        </Tabs>

        {/* Aba 1 - Gráficos */}
        {tabIndex === 0 && (
          <>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#25AABF',
                textTransform: 'none',
                marginBottom: 4,
                '&:hover': {
                  backgroundColor: '#F37335',
                },
              }}
            >
              Gerar Relatórios
            </Button>

            {/* Gráfico 1 - Lucro do Mês */}
            <Typography variant="h6" className="font-bold mb-4 mt-8">Lucro do Mês</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosLucro}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="lucro" fill="#004B8D" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mb-12"></div>

            {/* Filtro de mês + Gráfico 2 */}
            <Box className="flex items-center space-x-4 mb-4">
              <Typography variant="h6" className="font-bold">Produtos Vendidos</Typography>
              <TextField
                select
                size="small"
                label="Mês"
                defaultValue=""
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Janeiro">Janeiro</MenuItem>
                <MenuItem value="Fevereiro">Fevereiro</MenuItem>
                <MenuItem value="Março">Março</MenuItem>
                <MenuItem value="Abril">Abril</MenuItem>
              </TextField>
            </Box>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosProdutos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="produto" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="vendas" fill="#F37335" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {/* Aba 2 - Histórico */}
        {tabIndex === 1 && (
          <>
            <Typography variant="h6" className="font-bold mb-4 text-gray-800" sx={{ fontSize: '24px' }}>
              Veja todas suas movimentações!
            </Typography>

            <div className="mb-8"></div>

            {/* Filtro + Pesquisa */}
            <Box className="flex space-x-4 mb-6">
              <TextField
                select
                size="small"
                label="Filtrar por"
                defaultValue=""
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Cadastro de Produto">Cadastro de Produto</MenuItem>
                <MenuItem value="Edição de Rota">Edição de Rota</MenuItem>
                <MenuItem value="Cadastro de Cliente">Cadastro de Cliente</MenuItem>
              </TextField>

              <TextField
                size="small"
                placeholder="Buscar por tipo ou ID..."
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
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell><strong>Tipo</strong></TableCell>
                    <TableCell><strong>Horário</strong></TableCell>
                    <TableCell><strong>Data</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historico.map((item, index) => (
                    <TableRow key={item.id} sx={{ backgroundColor: index % 2 === 0 ? '#f0f8ff' : 'white' }}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.tipo}</TableCell>
                      <TableCell>{item.horario}</TableCell>
                      <TableCell>{item.data}</TableCell>
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

export default PaginaInicial;
