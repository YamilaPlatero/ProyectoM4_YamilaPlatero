import React, { useState, useEffect } from 'react';
import type { Tarea } from '../types';

interface TodoFormProps {
  onAgregarTarea: (title: string, description?: string) => void;
  tareaInicial?: Tarea | null;
  onCancelar?: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAgregarTarea, tareaInicial, onCancelar }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(tareaInicial?.title ?? '');
    setDescription(tareaInicial?.description ?? '');
  }, [tareaInicial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAgregarTarea(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h3>{tareaInicial ? 'Editar Tarea' : 'Nueva Tarea'}</h3>

      <label htmlFor="title">Título de la tarea</label>
      <input
        id="title"
        type="text"
        placeholder="Ejemplo: Crear contenido del blog"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="description">Descripción</label>
      <textarea
        id="description"
        placeholder="Ejemplo: Planificar post para el blog"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">{tareaInicial ? 'Guardar cambios' : 'Agregar Tarea'}</button>
      {tareaInicial && (
        <button type="button" onClick={onCancelar}>Cancelar</button>
      )}
    </form>
  );
};