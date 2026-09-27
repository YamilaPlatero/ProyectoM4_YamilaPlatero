import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../services/firebase';
import type { Tarea } from '../../types';

const COLLECTION_NAME = 'tareas';

export const tareaService = {
  async getTareas(userId: string): Promise<Tarea[]> {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Tarea, 'id'>),
    }));
  },

  async crearTarea(userId: string, title: string, description?: string): Promise<Tarea> {
    const nuevaData = {
      title,
      description: description || '',
      completed: false,
      userId,
      createdAt: serverTimestamp() as unknown as Tarea['createdAt'],
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), nuevaData);

    return {
      id: docRef.id,
      ...nuevaData,
    };
  },

  async toggleTarea(tareaId: string, completed: boolean): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, tareaId);
    await updateDoc(docRef, {
      completed,
      updatedAt: Date.now(),
    });
  },

  async eliminarTarea(tareaId: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, tareaId);
    await deleteDoc(docRef);
  },
};
