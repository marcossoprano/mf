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
  Modal
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import downloadPlanilha from '../assets/images/download-planilha.png';

function Estoque() {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeButton, setActiveButton] = useState('cadastrar');
  const [formularios, setFormularios] = useState([{ id: 1 }]);
  const [mostrarOutroTipo, setMostrarOutroTipo] = useState(false);
  const [produtos, setProdutos] = useState([
    { nome: 'Vinho X', tipo: 'Bebida', quantidade: 10, lote: 'L123', precoCusto: 100, precoVenda: 134, marca: 'Marca A', validade: '12/05/2025' },
    { nome: 'Macarrão Y', tipo: 'Alimento', quantidade: 50, lote: 'L456', precoCusto: 5, precoVenda: 7, marca: 'Marca B', validade: '30/08/2025' },
  ]);

  const [tipoFiltro, setTipoFiltro] = useState('');
  const [nomeFiltro, setNomeFiltro] = useState('');
  const [loteFiltro, setLoteFiltro] = useState('');
  const [marcaFiltro, setMarcaFiltro] = useState('');
  const [ordenarPrecoCusto, setOrdenarPrecoCusto] = useState('');
  const [ordenarPrecoVenda, setOrdenarPrecoVenda] = useState('');

  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  const handleAbrirModalEditar = (produto) => {
    setProdutoEditando({ ...produto });
    setModalEditarOpen(true);
  };

  const handleFecharModalEditar = () => setModalEditarOpen(false);

  const handleSalvarEdicao = () => {
    setProdutos(produtos.map(p => p.lote === produtoEditando.lote ? produtoEditando : p));
    handleFecharModalEditar();
  };

  const adicionarFormulario = () => setFormularios([...formularios, { id: formularios.length + 1 }]);

  const produtosFiltrados = produtos
    .filter(p =>
      (!nomeFiltro || p.nome.toLowerCase().includes(nomeFiltro.toLowerCase())) &&
      (!loteFiltro || p.lote.toLowerCase().includes(loteFiltro.toLowerCase())) &&
      (!marcaFiltro || p.marca.toLowerCase().includes(marcaFiltro.toLowerCase())) &&
      (!tipoFiltro || p.tipo === tipoFiltro)
    )
    .sort((a, b) => {
      if (ordenarPrecoCusto) return ordenarPrecoCusto === 'maiorPreco' ? b.precoCusto - a.precoCusto : a.precoCusto - b.precoCusto;
      if (ordenarPrecoVenda) return ordenarPrecoVenda === 'maiorPreco' ? b.precoVenda - a.precoVenda : a.precoVenda - b.precoVenda;
      return 0;
    });

  const renderFormulario = (id) => (
    <Box key={id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Box><Typography variant="body2" className="mb-1 font-medium">Nome</Typography><TextField fullWidth size="small" placeholder="Digite o nome do produto" /></Box>
      <Box><Typography variant="body2" className="mb-1 font-medium">Quantidade</Typography><TextField fullWidth size="small" placeholder="Digite a quantidade" /></Box>
      <Box><Typography variant="body2" className="mb-1 font-medium">Lote</Typography><TextField fullWidth size="small" placeholder="Digite o lote" /></Box>
      <Box><Typography variant="body2" className="mb-1 font-medium">Preço de Custo</Typography><TextField fullWidth size="small" placeholder="Digite o preço de custo" /></Box>
      <Box><Typography variant="body2" className="mb-1 font-medium">Preço de Venda</Typography><TextField fullWidth size="small" placeholder="Digite o preço de venda" /></Box>
      <Box><Typography variant="body2" className="mb-1 font-medium">Marca</Typography><TextField fullWidth size="small" placeholder="Digite a marca" /></Box>
      <Box className="md:col-span-2 w-1/2">
        <Typography variant="body2" className="mb-1 font-medium">Tipo</Typography>
        <TextField select fullWidth size="small" onChange={(e) => setMostrarOutroTipo(e.target.value === 'Outro')} SelectProps={{ native: true }}>
          <option value="">Selecione o tipo</option>
          <option value="Alimento">Alimento</option>
          <option value="Bebida">Bebida</option>
          <option value="Limpeza">Limpeza</option>
          <option value="Higiene">Higiene</option>
          <option value="Outro">Outro</option>
        </TextField>
        {mostrarOutroTipo && <TextField fullWidth size="small" placeholder="Digite a nova categoria" className="mt-2" />}
      </Box>
    </Box>
  );

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 lg:ml-64 p-8 font-sans">
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
          >Cadastrar Produtos</Button>
          <Button
            variant={activeButton === 'consultar' ? 'contained' : 'text'}
            sx={{
              backgroundColor: activeButton === 'consultar' ? '#4BA9F7' : 'transparent',
              color: activeButton === 'consultar' ? 'white' : '#4BA9F7',
              textTransform: 'none',
              '&:hover': { backgroundColor: activeButton === 'consultar' ? '#3590d8' : '#e3f2fd' },
            }}
            onClick={() => setActiveButton('consultar')}
          >Consultar Produtos</Button>
        </Box>

        {activeButton === 'cadastrar' && (
          <>
            <Typography variant="h4" className="font-bold mb-8 text-gray-800" sx={{ fontSize: '32px' }}>Adicione novos produtos!</Typography>
            <Tabs value={tabIndex} onChange={(e,v)=>setTabIndex(v)} textColor="primary" indicatorColor="primary" className="mb-6">
              <Tab label="Manual" /><Tab label="Importar Planilha" />
            </Tabs>
            {tabIndex === 0 && (
              <Box>
                {formularios.map((form) => renderFormulario(form.id))}
                <Box className="flex items-center mb-6">
                  <Button variant="outlined" startIcon={<span>＋</span>} onClick={adicionarFormulario}
                    sx={{ textTransform: 'none', borderColor: '#c2c2c2', color: '#4B4B4B', '&:hover': { backgroundColor: '#f0f0f0' } }}>
                    Adicione mais um produto
                  </Button>
                </Box>
                <Button variant="contained" sx={{ backgroundColor: '#25AABF', textTransform: 'none', '&:hover': { backgroundColor: '#1e90a3' } }}>Cadastrar</Button>
              </Box>
            )}
            {tabIndex === 1 && (
              <Box className="flex flex-col items-center">
                <img src={downloadPlanilha} alt="Download Planilha" className="mb-4 max-w-xs" />
                <Typography variant="body1" className="text-center text-gray-700 mb-16">
                  Envie sua planilha para cadastrar vários produtos ao mesmo tempo!
                </Typography>
                <input type="file" accept=".csv, .xls, .xlsx" id="file-upload" style={{ display: 'none' }} onChange={(e)=>console.log(e.target.files[0]?.name)} />
                <Box className="flex space-x-4 mt-10">
                  <Button variant="contained" sx={{ backgroundColor: '#004B8D', textTransform: 'none', '&:hover': { backgroundColor: '#F37335' } }}
                    onClick={()=>document.getElementById('file-upload').click()}>Enviar Planilha</Button>
                  <Button variant="outlined" sx={{ textTransform: 'none', borderColor: '#004B8D', color: '#004B8D', '&:hover': { backgroundColor: '#F37335', color:'white', borderColor:'#F37335' } }}>
                    Ver modelo de planilha</Button>
                </Box>
              </Box>
            )}
          </>
        )}

        {activeButton === 'consultar' && (
          <>
            <Typography variant="h4" className="font-bold mb-12 text-gray-800" sx={{ fontSize: '32px' }}>
              Veja todos os seus produtos cadastrados!
            </Typography>

            <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <TextField label="Nome" size="small" value={nomeFiltro} onChange={(e) => setNomeFiltro(e.target.value)} />
              <TextField label="Lote" size="small" value={loteFiltro} onChange={(e) => setLoteFiltro(e.target.value)} />
              <TextField label="Marca" size="small" value={marcaFiltro} onChange={(e) => setMarcaFiltro(e.target.value)} />
              <TextField select label="Tipo" size="small" value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Alimento">Alimento</MenuItem>
                <MenuItem value="Bebida">Bebida</MenuItem>
                <MenuItem value="Limpeza">Limpeza</MenuItem>
                <MenuItem value="Higiene">Higiene</MenuItem>
              </TextField>
              <TextField select label="Preço Custo" size="small" value={ordenarPrecoCusto} onChange={(e) => setOrdenarPrecoCusto(e.target.value)}>
                <MenuItem value="maiorPreco">Maior preço</MenuItem>
                <MenuItem value="menorPreco">Menor preço</MenuItem>
              </TextField>
              <TextField select label="Preço Venda" size="small" value={ordenarPrecoVenda} onChange={(e) => setOrdenarPrecoVenda(e.target.value)}>
                <MenuItem value="maiorPreco">Maior preço</MenuItem>
                <MenuItem value="menorPreco">Menor preço</MenuItem>
              </TextField>
              <Button variant="contained" sx={{ backgroundColor: '#004B8D', textTransform: 'none', '&:hover': { backgroundColor: '#F37335' } }}>Buscar</Button>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead><TableRow>
                  <TableCell><strong>Nome</strong></TableCell><TableCell><strong>Tipo</strong></TableCell><TableCell><strong>Quantidade</strong></TableCell>
                  <TableCell><strong>Lote</strong></TableCell><TableCell><strong>Preço de Custo</strong></TableCell><TableCell><strong>Preço de Venda</strong></TableCell>
                  <TableCell><strong>Marca</strong></TableCell><TableCell><strong>Editar</strong></TableCell>
                </TableRow></TableHead>
                <TableBody>
                  {produtosFiltrados.map((produto, idx)=>(
                    <TableRow key={idx}>
                      <TableCell>{produto.nome}</TableCell><TableCell>{produto.tipo}</TableCell><TableCell>{produto.quantidade}</TableCell>
                      <TableCell>{produto.lote}</TableCell><TableCell>{produto.precoCusto}</TableCell><TableCell>{produto.precoVenda}</TableCell><TableCell>{produto.marca}</TableCell>
                      <TableCell>
                        <Button size="small" onClick={()=>handleAbrirModalEditar(produto)} sx={{ minWidth:'32px', p:'4px', color:'#004B8D','&:hover':{color:'#F37335'} }}><EditIcon fontSize="small"/></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Modal open={modalEditarOpen} onClose={handleFecharModalEditar}>
              <Box sx={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:400, bgcolor:'background.paper', p:4, borderRadius:2 }}>
                <Typography variant="h6" className="mb-4 font-bold">Editar Produto</Typography>
                {produtoEditando && <>
                  <TextField fullWidth size="small" label="Nome" className="mb-3" value={produtoEditando.nome} onChange={(e)=>setProdutoEditando({...produtoEditando, nome:e.target.value})}/>
                  <TextField fullWidth size="small" label="Tipo" className="mb-3" value={produtoEditando.tipo} onChange={(e)=>setProdutoEditando({...produtoEditando, tipo:e.target.value})}/>
                  <TextField fullWidth size="small" label="Quantidade" className="mb-3" value={produtoEditando.quantidade} onChange={(e)=>setProdutoEditando({...produtoEditando, quantidade:e.target.value})}/>
                  <TextField fullWidth size="small" label="Lote" className="mb-3" value={produtoEditando.lote} onChange={(e)=>setProdutoEditando({...produtoEditando, lote:e.target.value})}/>
                  <TextField fullWidth size="small" label="Preço Custo" className="mb-3" value={produtoEditando.precoCusto} onChange={(e)=>setProdutoEditando({...produtoEditando, precoCusto:e.target.value})}/>
                  <TextField fullWidth size="small" label="Preço Venda" className="mb-3" value={produtoEditando.precoVenda} onChange={(e)=>setProdutoEditando({...produtoEditando, precoVenda:e.target.value})}/>
                  <TextField fullWidth size="small" label="Marca" className="mb-3" value={produtoEditando.marca} onChange={(e)=>setProdutoEditando({...produtoEditando, marca:e.target.value})}/>
                </>}
                <Box className="flex justify-end mt-4">
                  <Button onClick={handleSalvarEdicao} sx={{ backgroundColor:'#004B8D', color:'white', textTransform:'none','&:hover':{backgroundColor:'#F37335'} }}>Salvar</Button>
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
