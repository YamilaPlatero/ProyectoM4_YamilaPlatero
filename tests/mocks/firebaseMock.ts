// Mocks para servicios de Firebase Auth & Firestore

export const mockUser = {
  uid: 'mock_uid_123',
  email: 'user@test.com',
  displayName: 'Test User',
};

export const mockAuth = {
  currentUser: mockUser,
  signInWithEmailAndPassword: async () => ({ user: mockUser }),
  createUserWithEmailAndPassword: async () => ({ user: mockUser }),
  signOut: async () => {},
  onAuthStateChanged: (cb: (u: typeof mockUser | null) => void) => {
    cb(mockUser);
    return () => {};
  },
};

export const mockFirestore = {
  collection: () => ({}),
  doc: () => ({}),
  getDocs: async () => ({ docs: [] }),
  addDoc: async () => ({ id: 'new_doc_id' }),
  updateDoc: async () => {},
  deleteDoc: async () => {},
};
