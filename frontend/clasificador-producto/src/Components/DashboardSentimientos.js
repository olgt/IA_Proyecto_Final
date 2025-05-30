import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

const Dashboard = () => {
  const [datos, setDatos] = useState([
    { nombre: 'Positivo', valor: 0 },
    { nombre: 'Negativo', valor: 0 },
    { nombre: 'Neutral', valor: 0 }
  ]);

  useEffect(() => {
    const pos = parseInt(localStorage.getItem('positivo') || 0);
    const neg = parseInt(localStorage.getItem('negativo') || 0);
    const neu = parseInt(localStorage.getItem('neutral') || 0);
    setDatos([
      { nombre: 'Positivo', valor: pos },
      { nombre: 'Negativo', valor: neg },
      { nombre: 'Neutral', valor: neu }
    ]);
  }, []);

  const colores = ['#4caf50', '#f44336', '#ff9800'];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Panel de Resultados de Sentimientos
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Box display="flex" gap={4} flexWrap="wrap" justifyContent="center">
        {/* BARRAS */}
        <Card sx={{ width: 500, boxShadow: 6, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Gráfico de Barras</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="valor" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* PASTEL */}
        <Card sx={{ width: 400, boxShadow: 6, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Gráfico de Pastel</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={datos}
                  dataKey="valor"
                  nameKey="nombre"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {datos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>

      <Box mt={4} display="flex" justifyContent="center" gap={4}>
        <Typography variant="body1" color="success.main">
          <SentimentSatisfiedAltIcon /> Positivo: {datos[0].valor}
        </Typography>
        <Typography variant="body1" color="error.main">
          <SentimentVeryDissatisfiedIcon /> Negativo: {datos[1].valor}
        </Typography>
        <Typography variant="body1" color="warning.main">
          <SentimentNeutralIcon /> Neutral: {datos[2].valor}
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
