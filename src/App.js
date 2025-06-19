import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import PaginaInicial from './pages/Pagina-Inicial';
import RecuperarSenha from './pages/Recuperar-Senha';
import Cadastro from './pages/Cadastro';
import Estoque from './pages/Estoque';
import Rotas from './pages/Rotas';
import Perfil from './pages/Perfil';
import Configuracoes from './pages/Configuracoes';

function App() {
  return (
    <Router basename="/teste-frontend-MILO">
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/pagina-inicial" element={<PaginaInicial />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/rotas" element={<Rotas />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </Router>
  );
}

export default App;
