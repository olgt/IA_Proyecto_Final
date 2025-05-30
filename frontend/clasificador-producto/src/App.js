import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClasificadorSentimiento from './Components/ClasificadorSentimiento';
import DashboardSentimientos from './Components/DashboardSentimientos';
import Layout from './Components/Layout';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ClasificadorSentimiento />} />
        <Route path="/dashboard" element={<DashboardSentimientos />} />
      </Routes>
    </Layout>
  );
};

export default App;
