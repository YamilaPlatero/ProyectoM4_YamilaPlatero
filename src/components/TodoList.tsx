import React from 'react';
import type { Tarea } from '../types';

interface TodoListProps {
  tareas: Tarea[];
  onDelete: (id: string) => void;
  onEdit: (tarea: Tarea) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ tareas, onDelete, onEdit }) => {
  if (tareas.length === 0) {
    return <p className="empty-message">No hay tareas.</p>;
  }

  return (
    <ul className="todo-list">
      {tareas.map((tarea) => (
        <li key={tarea.id} className="todo-item">
          <div className="todo-info">
            <div className="todo-text">
              <h4>{tarea.title}</h4>
              {tarea.description && <p>{tarea.description}</p>}
            </div>
          </div>
          <div className="todo-actions">
            <button
              onClick={() => onEdit(tarea)}
              className="btn-edit"
              aria-label="Editar tarea"
              title="Editar"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
            <button onClick={() => onDelete(tarea.id)} className="btn-delete">
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};