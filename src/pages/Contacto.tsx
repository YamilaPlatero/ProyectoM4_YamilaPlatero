import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useTareas } from '../hooks';

export const Contacto: React.FC = () => {
  const { user } = useAuth();
  const { tareas, loading: cargandoTareas } = useTareas(user?.uid);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [msj, setMsj] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Arma el mensaje final: lo que escribió la persona + sus tareas pendientes y completadas
  const armarMensaje = () => {
    const mensaje = msj.trim();
    if (!user) return mensaje;

    const formatear = (t: { title: string; description?: string }) =>
      `- ${t.title}${t.description ? `: ${t.description}` : ''}`;

    const pendientes = tareas.filter((t) => !t.completed).map(formatear);
    const completadas = tareas.filter((t) => t.completed).map(formatear);

    return (
      `${mensaje}\n\n` +
      `Tareas pendientes:\n${pendientes.length ? pendientes.join('\n') : 'Ninguna.'}\n\n` +
      `Tareas completadas:\n${completadas.length ? completadas.join('\n') : 'Ninguna.'}`
    );
  };

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
          nombre: nombre.trim(),
          correo: correo.trim(),
          msj: armarMensaje(),
        }),
      });

      const texto = await response.text();
      const data = texto ? JSON.parse(texto) : {};

      if (response.ok && data.success) {
        setSuccessMessage(data.message || '¡Tu mensaje ha sido enviado exitosamente!');
        setNombre('');
        setCorreo('');
        setMsj('');
      } else {
        setErrorMessage(
          data.error || `Ocurrió un error al intentar enviar el correo (error ${response.status}).`
        );
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
          Envíanos tu consulta.
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

        <button type="submit" disabled={loading || cargandoTareas} className="btn-submit">
          {loading ? 'Enviando correo...' : 'Enviar Mensaje ✉️'}
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