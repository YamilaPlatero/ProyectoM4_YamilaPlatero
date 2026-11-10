import React, { useState } from 'react';
import { useAuth, useTareas } from '../hooks';
import { TodoForm, TodoList } from '../components';
import type { Tarea } from '../types';

export const Tareas: React.FC = () => {
  const { user } = useAuth();
  const { tareas, loading, agregarTarea, eliminarTarea, editarTarea } =
    useTareas(user?.uid);

  const [tareaEditando, setTareaEditando] = useState<Tarea | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [exitoMail, setExitoMail] = useState<string | null>(null);
  const [errorMail, setErrorMail] = useState<string | null>(null);

  const handleGuardar = async (title: string, description?: string) => {
    if (tareaEditando) {
      await editarTarea(tareaEditando.id, title, description);
      setTareaEditando(null);
    } else {
      await agregarTarea(title, description);
    }
  };

  const handleEnviarMail = async () => {
    if (!user?.email || tareas.length === 0) return;

    setExitoMail(null);
    setErrorMail(null);
    setEnviando(true);

    const lista = tareas
      .map((t) => `- ${t.title}${t.description ? `: ${t.description}` : ''}`)
      .join('\n');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: user.email,
          correo: user.email,
          msj: `Tareas:\n${lista}`,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setExitoMail('¡Tus tareas fueron enviadas por mail!');
      } else {
        setErrorMail(data.error || 'No se pudo enviar el mail.');
      }
    } catch (error: any) {
      setErrorMail(error.message || 'Error de conexión con el servicio de correo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="page-container tareas-page">
      <header className="tareas-header">
        <h2>Mis Tareas</h2>
      </header>

      <main className="tareas-content">
        <TodoForm
          onAgregarTarea={handleGuardar}
          tareaInicial={tareaEditando}
          onCancelar={() => setTareaEditando(null)}
        />
        {loading ? (
          <p>Cargando tareas...</p>
        ) : (
          <TodoList
            tareas={tareas}
            onDelete={eliminarTarea}
            onEdit={setTareaEditando}
          />
        )}

        {!loading && tareas.length > 0 && (
          <div className="tareas-enviar">
            {exitoMail && (
              <div className="alert alert-success">
                <span>✅ {exitoMail}</span>
              </div>
            )}
            {errorMail && (
              <div className="alert alert-danger">
                <span>⚠️ {errorMail}</span>
              </div>
            )}
            <button type="button" onClick={handleEnviarMail} disabled={enviando}>
              {enviando ? 'Enviando...' : 'Enviar tareas por mail ✉️'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};