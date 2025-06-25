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
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import senhaImage from '../assets/images/MUDAR-SENHA.png';
import deletarImage from '../assets/images/deletar.png';

function Configuracoes() {
  const [tabIndex, setTabIndex] = useState(0);
  const [subTab, setSubTab] = useState(0);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [frequenciaRelatorio, setFrequenciaRelatorio] = useState('');
  const [metodoNotificacao, setMetodoNotificacao] = useState('');
  const [estoqueMinimo, setEstoqueMinimo] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => setTabIndex(newValue);
  const handleSubTabChange = (event, newValue) => setSubTab(newValue);

  const handleSalvarSenha = () => {
    if (novaSenha === confirmarSenha) {
      console.log('Senha alterada com sucesso!');
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');
    } else {
      alert('As novas senhas não coincidem.');
    }
  };

  const handleDeletarConta = () => {
    console.log('Conta deletada!');
    navigate('/');
  };

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 lg:ml-64 p-8 font-sans">
        <Typography variant="h4" className="font-bold text-gray-800 mb-16" sx={{ fontSize: '32px' }}>
          Configurações da Conta
        </Typography>

        <Tabs value={tabIndex} onChange={handleTabChange} textColor="primary" indicatorColor="primary" className="mb-8">
          <Tab label="Informações" />
          <Tab label="Mudar Senha" />
          <Tab label="Deletar Conta" />
          <Tab label="Termos de Uso e Privacidade" />
        </Tabs>

        {/* Aba Informações */}
        {tabIndex === 0 && (
          <Box>
            <Tabs value={subTab} onChange={handleSubTabChange} className="mb-8">
              <Tab label="Notificações" />
              <Tab label="Relatórios" />
              <Tab label="Limite de Estoque" />
            </Tabs>

            {/* SubAba Notificações */}
            {subTab === 0 && (
              <Box>
                <Typography variant="body2" className="mb-2 font-bold">Método de Notificação</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={metodoNotificacao}
                  onChange={(e) => setMetodoNotificacao(e.target.value)}
                >
                  <MenuItem value="principal">Método de contato principal</MenuItem>
                  <MenuItem value="secundario">Método de contato secundário</MenuItem>
                  <MenuItem value="nenhum">Não desejo receber notificações</MenuItem>
                </TextField>
              </Box>
            )}

            {/* SubAba Relatórios */}
            {subTab === 1 && (
              <Box>
                <Typography variant="body2" className="mb-8 font-bold">Frequência dos Relatórios</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={frequenciaRelatorio}
                  onChange={(e) => setFrequenciaRelatorio(e.target.value)}
                >
                  <MenuItem value="semanal">Semanal</MenuItem>
                  <MenuItem value="quinzenal">Quinzenal</MenuItem>
                  <MenuItem value="mensal">Mensal</MenuItem>
                  <MenuItem value="nenhum">Não desejo receber relatórios</MenuItem>
                </TextField>

                <Typography variant="body2" className="mt-24 mb-2 font-bold">Histórico de Relatórios</Typography>
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

            {/* SubAba Estoque */}
            {subTab === 2 && (
              <Box>
                <Typography variant="body2" className="mb-2 font-bold">Estoque Mínimo Geral</Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={estoqueMinimo}
                  onChange={(e) => setEstoqueMinimo(e.target.value)}
                  placeholder="Digite o valor mínimo de estoque"
                />
              </Box>
            )}
          </Box>
        )}

        {/* Aba Mudar Senha */}
        {tabIndex === 1 && (
          <Box>
            <img src={senhaImage} alt="Mudar Senha" className="mb-8 mx-auto" style={{ width: '220px' }} />
            <Typography variant="h6" className="font-bold mb-10">
              Alterar Senha
            </Typography>
            <Box mb={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }} className="mb-1">Senha Atual</Typography>
              <TextField fullWidth size="small" type="password" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} />
            </Box>
            <Box mb={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }} className="mb-1">Nova Senha</Typography>
              <TextField fullWidth size="small" type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
            </Box>
            <Box mb={6}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }} className="mb-1">Confirmar Nova Senha</Typography>
              <TextField fullWidth size="small" type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
            </Box>
            <Button variant="contained" sx={{ backgroundColor: '#004B8D', textTransform: 'none', '&:hover': { backgroundColor: '#F37335' } }} onClick={handleSalvarSenha}>
              Salvar Nova Senha
            </Button>
          </Box>
        )}

        {/* Aba Deletar Conta */}
        {tabIndex === 2 && (
          <Box className="text-center">
            <img src={deletarImage} alt="Deletar Conta" className="mb-8 mx-auto" style={{ width: '220px' }} />
            <Typography variant="h6" className="font-bold mb-4">Deletar Conta</Typography>
            <Typography variant="body2" className="text-gray-700 mb-6">
              Ao deletar sua conta, todas as suas informações serão apagadas permanentemente. Essa ação não poderá ser desfeita.
            </Typography>
            <Button variant="contained" color="error" sx={{ textTransform: 'none', backgroundColor: '#d32f2f', '&:hover': { backgroundColor: '#b71c1c' } }} onClick={handleDeletarConta}>
              Deletar Conta
            </Button>
          </Box>
        )}

        {/* Aba Termos */}
        {tabIndex === 3 && (
          <Box>
            <Typography variant="h6" className="font-bold mb-4">Termos de Uso e Privacidade</Typography>
            <Typography variant="body2" className="text-gray-700 whitespace-pre-line">
{`
Bem-vindo à nossa plataforma de gerenciamento de estoque para micro e pequenas empresas!

Coleta de Dados:
Coletamos informações apenas para finalidades operacionais, como cadastro de produtos, controle de rotas e comunicação com o usuário.

Uso de Dados:
Seus dados são utilizados internamente para permitir o funcionamento da plataforma, como exibição de relatórios, tabelas e gráficos de desempenho.

Privacidade:
Não compartilhamos seus dados com terceiros, exceto em casos obrigatórios por lei.

Responsabilidades:
O usuário é responsável pela veracidade das informações cadastradas, incluindo dados de estoque, clientes e motoristas.

Segurança:
Adotamos medidas de segurança para proteger seus dados, mas é importante que o usuário mantenha a confidencialidade de sua senha.

Alterações:
Reservamo-nos o direito de alterar estes termos a qualquer momento. Recomendamos revisá-los periodicamente.

Ao continuar utilizando nossa plataforma, você concorda com estes termos.
`}
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
}

export default Configuracoes;
