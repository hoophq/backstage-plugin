import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ConnectionsList } from './components/Connections/ConnectionList';

export const Router = () => (
  <Routes>
    <Route path='/' element={<ConnectionsList />} />
  </Routes>
);
