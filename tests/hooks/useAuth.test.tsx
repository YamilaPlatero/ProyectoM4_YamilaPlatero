import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';

import { useAuth } from '../../src/hooks/useAuth';
import { AuthProvider } from '../../src/context/AuthContext';
import { authService } from '../../src/features/auth/authService';

vi.mock('../../src/features/auth/authService', () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
  },
  signInWithGoogle: vi.fn(),
}));

const wrapper = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

describe('useAuth hook', () => {

  it('initializes with null user', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    expect(result.current.user).toBeNull();
  });

  it('updates state upon login', async () => {

    const mockUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
    };

    vi.mocked(authService.login).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    await act(async () => {
      await result.current.login(
        'test@example.com',
        'password123'
      );
    });

    expect(result.current.user?.email).toBe('test@example.com');
    expect(result.current.isAuthenticated).toBe(true);
  });

});