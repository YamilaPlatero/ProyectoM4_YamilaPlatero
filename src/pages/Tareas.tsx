import React from 'react';
import { useAuth, useTareas } from '../hooks';
import { TodoForm, TodoList } from '../components';

export const Tareas: React.FC = () => {
  const { user, } = useAuth();
  const { tareas, loading, agregarTarea, toggleTarea, eliminarTarea } = useTareas(user?.uid);

  return (
    <div className="page-container tareas-page">
      <header className="tareas-header">
        <h2>Mis Tareas</h2>

      </header>

      <main className="tareas-content">
        <TodoForm onAgregarTarea={agregarTarea} />
        {loading ? (
          <p>Cargando tareas...</p>
        ) : (
          <TodoList tareas={tareas} onToggle={toggleTarea} onDelete={eliminarTarea} />
        )}
      </main>
    </div>
  );
};
