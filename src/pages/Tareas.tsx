import React, { useState } from 'react';
import { useAuth, useTareas } from '../hooks';
import { TodoForm, TodoList } from '../components';
import type { Tarea } from '../types';

export const Tareas: React.FC = () => {
  const { user } = useAuth();
  const { tareas, loading, agregarTarea, toggleTarea, eliminarTarea, editarTarea } =
    useTareas(user?.uid);

  const [tareaEditando, setTareaEditando] = useState<Tarea | null>(null);

  const handleGuardar = async (title: string, description?: string) => {
    if (tareaEditando) {
      await editarTarea(tareaEditando.id, title, description);
      setTareaEditando(null);
    } else {
      await agregarTarea(title, description);
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
            onToggle={toggleTarea}
            onDelete={eliminarTarea}
            onEdit={setTareaEditando}
          />
        )}
      </main>
    </div>
  );
};