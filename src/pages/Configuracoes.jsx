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
  useMediaQuery
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
  const [metodoNotificacao, setMetodoNotificacao] = useState('');
  const [estoqueMinimo, setEstoqueMinimo] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleTabChange = (e, newValue) => setTabIndex(newValue);
  const handleSubTabChange = (e, newValue) => setSubTab(newValue);

  const handleSalvarSenha = () => {
    if (novaSenha === confirmarSenha) {
      alert('Senha alterada com sucesso!');
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');
    } else {
      alert('As novas senhas não coincidem.');
    }
  };

  const handleDeletarConta = () => {
    navigate('/');
  };

  const handleSalvarEstoque = () => {
    alert('Informações salvas com sucesso!');
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-0 lg:ml-64 p-6 sm:p-8 font-sans bg-white min-h-screen w-full">
        <Typography variant="h4" sx={{ fontSize: '32px', fontWeight: 'bold', color: '#333', mb: 8 }}>
          Configurações da Conta
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 6 }}
          variant={isMobile ? 'scrollable' : 'standard'}
        >
          <Tab label="Informações" />
          <Tab label="Mudar Senha" />
          <Tab label="Deletar Conta" />
          <Tab label="Termos de Uso e Privacidade" />
        </Tabs>

        {/* Aba Informações */}
        {tabIndex === 0 && (
          <Box>
            <Tabs
              value={subTab}
              onChange={handleSubTabChange}
              sx={{ mb: 6 }}
              variant={isMobile ? 'scrollable' : 'standard'}
            >
              <Tab label="Notificações" />
              <Tab label="Limite de Estoque" />
            </Tabs>

            {/* SubAba Notificações */}
            {subTab === 0 && (
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Método de Notificação
                </Typography>
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

            {/* SubAba Estoque */}
            {subTab === 1 && (
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Escolha o produto
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={produtoSelecionado}
                  onChange={(e) => setProdutoSelecionado(e.target.value)}
                  sx={{ mb: 4 }}
                >
                  <MenuItem value="Arroz">Arroz</MenuItem>
                  <MenuItem value="Feijão">Feijão</MenuItem>
                  <MenuItem value="Macarrão">Macarrão</MenuItem>
                  <MenuItem value="Óleo">Óleo</MenuItem>
                  <MenuItem value="Sabonete">Sabonete</MenuItem>
                </TextField>

                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Estoque Mínimo
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={estoqueMinimo}
                  onChange={(e) => setEstoqueMinimo(e.target.value)}
                  placeholder="Digite o valor mínimo"
                  sx={{ mb: 6 }}
                />

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#004B8D',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#F37335' }
                  }}
                  onClick={handleSalvarEstoque}
                >
                  Salvar
                </Button>
              </Box>
            )}
          </Box>
        )}

        {/* Aba Mudar Senha */}
        {tabIndex === 1 && (
          <Box>
            <Box display="flex" justifyContent="center" mb={8}>
              <img src={senhaImage} alt="Mudar Senha" style={{ width: isMobile ? '180px' : '220px' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 8 }}>
              Alterar Senha
            </Typography>
            <Box mb={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Senha Atual</Typography>
              <TextField fullWidth size="small" type="password" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} />
            </Box>
            <Box mb={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Nova Senha</Typography>
              <TextField fullWidth size="small" type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
            </Box>
            <Box mb={6}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Confirmar Nova Senha</Typography>
              <TextField fullWidth size="small" type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#004B8D',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#F37335' }
              }}
              onClick={handleSalvarSenha}
            >
              Salvar Nova Senha
            </Button>
          </Box>
        )}

        {/* Aba Deletar Conta */}
        {tabIndex === 2 && (
          <Box textAlign="center" mt={isMobile ? 6 : 0}>
            <Box display="flex" justifyContent="center" mb={6}>
              <img src={deletarImage} alt="Deletar Conta" style={{ width: isMobile ? '200px' : '240px' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 4 }}>
              Deletar Conta
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', mb: 6 }}>
              Ao deletar sua conta, todas as suas informações serão apagadas permanentemente.
              <br />Essa ação não poderá ser desfeita.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#d32f2f',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#b71c1c' }
              }}
              onClick={handleDeletarConta}
            >
              Deletar Conta
            </Button>
          </Box>
        )}

        {/* Aba Termos */}
        {tabIndex === 3 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 4 }}>
              Termos de Uso e Privacidade
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', whiteSpace: 'pre-line' }}>
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
