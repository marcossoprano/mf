import React, { useState } from 'react';
import Sidebar from '../components/menu-lateral';
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

function Relatorio() {
  const [frequenciaRelatorio, setFrequenciaRelatorio] = useState('');

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 lg:ml-64 p-8 font-sans">
        <Typography variant="h4" className="font-bold text-gray-800 mb-16" sx={{ fontSize: '32px' }}>
          Relatórios
        </Typography>

        <Typography variant="body2" className="mb-2 font-bold">Frequência dos Relatórios</Typography>
        <TextField
          select
          fullWidth
          size="small"
          value={frequenciaRelatorio}
          onChange={(e) => setFrequenciaRelatorio(e.target.value)}
          className="mb-12"
        >
          <MenuItem value="semanal">Semanal</MenuItem>
          <MenuItem value="quinzenal">Quinzenal</MenuItem>
          <MenuItem value="mensal">Mensal</MenuItem>
          <MenuItem value="nenhum">Não desejo receber relatórios</MenuItem>
        </TextField>

        <Typography variant="body2" className="mb-2 font-bold">Histórico de Relatórios</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Baixar Relatório</TableCell>
                <TableCell>Data de Produção</TableCell>
                <TableCell>Período</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3].map((id) => (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#004B8D',
                        '&:hover': { backgroundColor: '#F37335' },
                        textTransform: 'none'
                      }}
                    >
                      Download
                    </Button>
                  </TableCell>
                  <TableCell>01/06/2025</TableCell>
                  <TableCell>Mensal</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Relatorio;
