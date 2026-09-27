import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import { useAuth } from './hooks';
import './index.css';

export const App: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/" className="brand-title">
          <h1>Gestor de Tareas</h1>
        </Link>
      </header>

      <nav className="app-nav">
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Inicio
          </Link>
          <Link
            to="/tareas"
            className={`nav-link ${location.pathname === '/tareas' ? 'active' : ''}`}
          >
            Tareas
          </Link>
          <Link
            to="/contacto"
            className={`nav-link ${location.pathname === '/contacto' ? 'active' : ''}`}
          >
            Contacto
          </Link>
        </div>

        <div className="nav-auth">
          {user ? (
            <div className="nav-user-info">
              <span className="user-email-badge" title={user.email || ''}>
                {user.email}
              </span>
              <button onClick={logout} className="btn-nav-logout">
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="nav-auth-links">
              <Link
                to="/login"
                className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>

      <main className="app-main">
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
