import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Contacto: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [msj, setMsj] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!nombre.trim() || !correo.trim() || !msj.trim()) {
      setErrorMessage('Por favor completa todos los campos (nombre, correo y mensaje).');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: nombre.trim(),
          subjet: correo.trim(),
          body: msj.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(data.message || '¡Tu mensaje ha sido enviado exitosamente!');
        setNombre('');
        setCorreo('');
        setMsj('');
      } else {
        setErrorMessage(data.error || 'Ocurrió un error al intentar enviar el correo.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Error de conexión con el servicio de correo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container contacto-container">
      <header className="contacto-header">
        <h2>Contacto</h2>
        <p className="contacto-subtitle">
          Envíanos tu consulta. El mensaje será procesado y enviado a través de AWS SES.
        </p>
      </header>

      {successMessage && (
        <div className="alert alert-success">
          <span>✅ {successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger">
          <span>⚠️ {errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contacto-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            id="correo"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="msj">Mensaje</label>
          <textarea
            id="msj"
            rows={5}
            placeholder="Escribe tu mensaje aquí..."
            value={msj}
            onChange={(e) => setMsj(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? 'Enviando correo...' : 'Enviar Mensaje'}
        </button>
      </form>

      <footer className="contacto-footer">
        <Link to="/" className="btn-link">
          ← Volver al Inicio
        </Link>
      </footer>
    </div>
  );
};
