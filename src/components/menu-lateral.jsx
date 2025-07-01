import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Typography,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import MapIcon from '@mui/icons-material/Map';
import AssessmentIcon from '@mui/icons-material/Assessment'; // Novo ícone para relatórios
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Início', icon: <HomeIcon />, path: '/pagina-inicial' },
    { text: 'Estoque', icon: <InventoryIcon />, path: '/estoque' },
    { text: 'Rotas', icon: <MapIcon />, path: '/rotas' },
    { text: 'Relatórios', icon: <AssessmentIcon />, path: '/relatorio' }, // substitui o antigo Perfil
    { text: 'Configurações', icon: <SettingsIcon />, path: '/configuracoes' },
    { text: 'Sair', icon: <LogoutIcon />, path: '/sair' },
  ];

  const drawerContent = (
    <div className="flex flex-col h-full bg-blue-900 text-white">
      {/* Perfil */}
      <div
        className="flex flex-col items-center py-6 cursor-pointer"
        onClick={() => navigate('/perfil')}
      >
        <Avatar
          src="/caminho/para/imagem-do-perfil.jpg"
          alt="Perfil"
          sx={{ width: 60, height: 60, mb: 1 }}
        />
        <Typography variant="subtitle1" className="font-bold">Nome do Usuário</Typography>
      </div>

      <Divider className="bg-gray-600" />

      {/* Menu */}
      <List>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              button
              key={index}
              onClick={() => navigate(item.path)}
              className={`
                flex items-center justify-start transition-colors duration-200
                ${isActive ? 'bg-blue-400' : 'hover:bg-blue-400'}
              `}
              sx={{
                '& .MuiListItemIcon-root': { color: 'white' },
              }}
            >
              <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <div>
      {/* Botão hamburguer - Mobile */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className="lg:hidden text-white m-2"
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar Fixa - Desktop */}
      <div className="hidden lg:flex w-64 h-screen fixed top-0 left-0">
        {drawerContent}
      </div>

      {/* Drawer Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        classes={{ paper: 'w-64 bg-blue-900 text-white' }}
      >
        {drawerContent}
      </Drawer>
    </div>
  );
}

export default Sidebar;
