// src/Components/ClasificadorSentimiento.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  Typography,
  Card,
  CardContent,
  CardActions,
  Fade,
  Slide
} from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import SendIcon from '@mui/icons-material/Send';

const ClasificadorSentimiento = () => {
  const [texto, setTexto] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const manejarCambio = (e) => setTexto(e.target.value);
  const manejarCierre = () => setOpenSnackbar(false);

  const manejarClasificar = async () => {
    try {
      const resp = await fetch(
        `${process.env.REACT_APP_API_URL}/predict`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ review: texto })
        }
      );

      // Comprueba el status HTTP
      if (resp.status !== 200) {
        const error = await resp.json();
        throw new Error(error.error || `HTTP ${resp.status}`);
      }

      const { sentimiento } = await resp.json();

      // Muestra toast de éxito
      setSnackbarMsg(`✨ Sentimiento: ${sentimiento}`);
      setSnackbarSeverity(
        sentimiento === 'positivo'
          ? 'success'
          : sentimiento === 'negativo'
          ? 'error'
          : 'warning'
      );
      setOpenSnackbar(true);
      setTexto('');
    } catch (err) {
      // Muestra toast de error
      setSnackbarMsg(`❌ Error: ${err.message}`);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Card sx={{ width: 600, p: 2, borderRadius: 4, boxShadow: 6 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <MoodIcon color="primary" fontSize="large" />
              <Typography variant="h5" fontWeight="bold">
                Clasificador de Reseñas
              </Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Escribe tu reseña"
              variant="outlined"
              value={texto}
              onChange={manejarCambio}
            />
          </CardContent>

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={manejarClasificar}
              disabled={!texto.trim()}
            >
              CLASIFICAR
            </Button>
          </CardActions>

          <Slide direction="up" in={openSnackbar} mountOnEnter unmountOnExit>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={4000}
              onClose={manejarCierre}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert
                onClose={manejarCierre}
                severity={snackbarSeverity}
                variant="filled"
              >
                {snackbarMsg}
              </Alert>
            </Snackbar>
          </Slide>
        </Card>
      </Box>
    </Fade>
  );
};

export default ClasificadorSentimiento;
