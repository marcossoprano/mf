import React, { useState } from 'react';
import Sidebar from '../components/menu-lateral';
import {
  Box,
  Button,
  Tabs,
  Tab,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery
} from '@mui/material';
import relatorioImage from '../assets/images/relatorio.png';

function Relatorio() {
  const [tabIndex, setTabIndex] = useState(0);
  const [frequenciaNumero, setFrequenciaNumero] = useState('');
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleTabChange = (e, newValue) => setTabIndex(newValue);

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 lg:ml-64 p-6 sm:p-8 font-sans w-full">
        <Typography variant="h4" className="font-bold text-gray-800 mb-12" sx={{ fontSize: '32px' }}>
          Relatórios
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          variant={isMobile ? 'scrollable' : 'standard'}
          sx={{ mb: 6 }}
        >
          <Tab label="Frequência de Relatórios" />
          <Tab label="Histórico de Relatórios" />
        </Tabs>

        {tabIndex === 0 && (
          <Box>
            <Box display="flex" justifyContent="center" mb={6}>
              <img src={relatorioImage} alt="Relatório" style={{ width: isMobile ? '180px' : '220px' }} />
            </Box>
            <Typography variant="h6" className="font-bold mb-8 text-center">
              Escolha quando quer receber seus relatórios!
            </Typography>

            <Typography variant="body2" className="mb-2 font-bold">
              Frequência
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={frequenciaNumero}
              onChange={(e) => setFrequenciaNumero(e.target.value)}
              placeholder="Digite um número"
            />
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            <Typography variant="body2" className="mb-4 font-bold">
              Histórico de Relatórios
            </Typography>
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
          </Box>
        )}
      </div>
    </div>
  );
}

export default Relatorio;
