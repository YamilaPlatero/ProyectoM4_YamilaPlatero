
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TodoForm } from '../../src/components/TodoForm';

describe('TodoForm Component', () => {
  it('renders input and button correctly', () => {
    const handleAdd = vi.fn();
    render(<TodoForm onAgregarTarea={handleAdd} />);

    expect(screen.getByPlaceholderText(/Título de la tarea/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Agregar Tarea/i })).toBeInTheDocument();
  });

  it('calls onAgregarTarea with input values on submit', () => {
    const handleAdd = vi.fn();
    render(<TodoForm onAgregarTarea={handleAdd} />);

    const input = screen.getByPlaceholderText(/Título de la tarea/i);
    fireEvent.change(input, { target: { value: 'Comprar leche' } });
    fireEvent.click(screen.getByRole('button', { name: /Agregar Tarea/i }));

    expect(handleAdd).toHaveBeenCalledWith('Comprar leche', '');
  });
});

export { };
