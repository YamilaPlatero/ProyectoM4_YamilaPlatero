import React, { useState } from 'react';

interface TodoFormProps {
  onAgregarTarea: (title: string, description?: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAgregarTarea }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAgregarTarea(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h3>Nueva Tarea</h3>
      <label>Título de la tarea</label>

      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Descripción</label>
      <textarea
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};
