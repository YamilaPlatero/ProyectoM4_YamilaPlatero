import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

export const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="page-container home-container">
      <header className="home-hero">
        <h2>Bienvenido al Gestor de Tareas</h2>
        <p className="home-description">
          Administra tus actividades diarias de forma organizada y segura.
        </p>
      </header>

      {user ? (
        <div className="home-user-welcome">
          <p>
            Has iniciado sesión como <strong>{user.email}</strong>.
          </p>
          <Link to="/tareas" className="feature-link">
            Ir a Mis Tareas → 📋
          </Link>
        </div>
      ) : (
        <div className="home-auth-actions">
          <p className="home-auth-text">
            Inicia sesión o regístrate para gestionar tus tareas personales.
          </p>
          <div className="home-buttons-group">
            <Link to="/login" className="btn-primary-link">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="btn-secondary-link">
              Registrarse
            </Link>
          </div>
        </div>
      )}

      <section className="home-features">
        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>Tareas</h3>
          <p>Crea, marca como completadas,elimina y organiza tus tareas.</p>
          <Link to="/tareas" className="feature-link">
            Ver Tareas →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">✉️</div>
          <h3>Contacto </h3>
          <p>Envía mensajes y consultas.</p>
          <Link to="/contacto" className="feature-link">
            Ir a Contacto →
          </Link>
        </div>
      </section>
    </div>
  );
};
