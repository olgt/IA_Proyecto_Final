import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link, useLocation } from 'react-router-dom';
import { ColorModeContext } from '../Context/ColorModeContext';

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colorMode = useContext(ColorModeContext);
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();

  const navLinks = [
    { text: 'Clasificar Sentimiento', path: '/' },
    { text: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <AppBar position="static" sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
        <Toolbar>
           <Tooltip title="Inteligencia Artificial">
            <IconButton edge="start" sx={{ mr: 2, color: '#fff' }}>
              <SmartToyIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Clasificador de Sentimientos{' '}
            <Box
              component="span"
              sx={{
                ml: 1,
                px: 1.5,
                py: 0.5,
                borderRadius: 20,
                bgcolor: '#fff',
                color: '#1565c0',
                fontWeight: '600',
                fontSize: '0.75rem',
                boxShadow: 2,
              }}
            >
              Grupo 6
            </Box>
          </Typography>

          <Tooltip title="Cambiar modo">
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          {isMobile ? (
            <>
              <IconButton onClick={() => setOpenDrawer(true)} color="inherit">
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Box sx={{ width: 250 }}>
                  <List>
                    {navLinks.map((item) => (
                      <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} to={item.path} onClick={() => setOpenDrawer(false)}>
                          <ListItemText primary={item.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              {navLinks.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: location.pathname === item.path ? '#fff' : '#BBDEFB',
                    ml: 1,
                    fontWeight: 'bold',
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ px: { xs: 2, md: 4 }, py: 5 }}>{children}</Box>
    </Box>
  );
};

export default Layout;
