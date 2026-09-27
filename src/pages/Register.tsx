import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { isValidEmail, isValidPassword } from '../utils';

export const Register: React.FC = () => {
  const { register, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGoogleRegister = async () => {
    try {
      setError(null);
      await signInWithGoogle();
      navigate('/tareas');
    } catch (err: any) {
      setError(err.message || 'Error al registrarse con Google');
    }
  };

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
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
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
      <div>
        <button type="button" onClick={handleGoogleRegister}>
          Continuar con Google
        </button>
      </div>
    </div>
  );
};
