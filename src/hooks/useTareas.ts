import { useState, useEffect } from 'react';
import type { Tarea } from '../types';
import { tareaService } from '../features/tareas';

export const useTareas = (userId?: string) => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) {
      setTareas([]);
      setLoading(false);
      return;
    }

    const loadTareas = async () => {
      setLoading(true);
      try {
        const data = await tareaService.getTareas(userId);
        setTareas(data);
      } finally {
        setLoading(false);
      }
    };

    loadTareas();
  }, [userId]);

  const agregarTarea = async (title: string, description?: string) => {
    if (!userId) return;
    const nuevaTarea = await tareaService.crearTarea(userId, title, description);
    setTareas((prev) => [...prev, nuevaTarea]);
  };

  const toggleTarea = async (id: string, completed: boolean) => {
    await tareaService.toggleTarea(id, completed);
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t))
    );
  };

  const eliminarTarea = async (id: string) => {
    await tareaService.eliminarTarea(id);
    setTareas((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    tareas,
    loading,
    agregarTarea,
    toggleTarea,
    eliminarTarea,
  };
};
