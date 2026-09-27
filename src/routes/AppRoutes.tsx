import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Contacto, Login, Register, Tareas } from '../pages';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/tareas"
        element={
          <ProtectedRoute>
            <Tareas />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
