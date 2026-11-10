import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { isValidEmail, isValidPassword } from '../utils';

// Quita cualquier espacio que se escriba o se pegue
const sinEspacios = (valor: string) => valor.replace(/\s/g, '');

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Por favor ingresa un email válido.');
      return;
    }
    if (!isValidPassword(password)) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    try {
      setError(null);
      await login(email, password);
      navigate('/tareas');
    } catch (err: any) {
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password'
      ) {
        setError('El correo o la contraseña son incorrectos.');
        return;
      }

      if (err.code === 'auth/user-not-found') {
        setError('No existe una cuenta con este correo.');
        return;
      }
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="page-container auth-page">
      <h2>Iniciar Sesión</h2>
      {error && <div className="alert-error">{error}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(sinEspacios(e.target.value))}
          required
        />

        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(sinEspacios(e.target.value))}
            placeholder="Contraseña"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button type="submit">Ingresar</button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        ¿No tienes cuenta?{' '}
        <Link
          to="/register"
          style={{
            color: 'var(--primary)',
            textDecoration: 'underline',
          }}
        >
          Registrarse aquí
        </Link>
      </p>
    </div>
  );
};