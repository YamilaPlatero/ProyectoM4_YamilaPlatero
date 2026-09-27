import React from 'react';
import type { Tarea } from '../types';

interface TodoListProps {
  tareas: Tarea[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ tareas, onToggle, onDelete }) => {
  if (tareas.length === 0) {
    return <p className="empty-message">No hay tareas pendientes.</p>;
  }

  return (
    <ul className="todo-list">
      {tareas.map((tarea) => (
        <li key={tarea.id} className={`todo-item ${tarea.completed ? 'completed' : ''}`}>
          <div className="todo-info">
            <input
              type="checkbox"
              checked={tarea.completed}
              onChange={(e) => onToggle(tarea.id, e.target.checked)}
            />
            <div className="todo-text">
              <h4>{tarea.title}</h4>
              {tarea.description && <p>{tarea.description}</p>}
            </div>
          </div>
          <button onClick={() => onDelete(tarea.id)} className="btn-delete">
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};
