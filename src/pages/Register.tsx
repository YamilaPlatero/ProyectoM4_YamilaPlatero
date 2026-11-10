import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { isValidEmail, isValidPassword } from '../utils';

// Quita cualquier espacio que se escriba o se pegue
const sinEspacios = (valor: string) => valor.replace(/\s/g, '');

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    try {
      setError(null);
      await register(email, password);
      navigate('/tareas');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Ya existe una cuenta registrada con este correo.');
        return;
      }

      setError('Ocurrió un error al registrar usuario.');
    }
  };

  return (
    <div className="page-container auth-page">
      <h2>Crear Cuenta</h2>
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
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <div className="password-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(sinEspacios(e.target.value))}
            placeholder="Confirmar contraseña"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={
              showConfirmPassword
                ? 'Ocultar confirmación de contraseña'
                : 'Mostrar confirmación de contraseña'
            }
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button type="submit">Registrarse</button>
      </form>

      <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        ¿Ya tienes una cuenta?{' '}
        <Link
          to="/login"
          style={{
            color: 'var(--primary)',
            textDecoration: 'underline',
          }}
        >
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
};