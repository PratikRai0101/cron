import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uid } from '@/lib/id';

export interface TaskItem {
  id: string;
  title: string;
  identityId: string;
  identityName: string;
  identityColor: string;
  estimatedMinutes?: number;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
}

interface TaskState {
  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, 'id' | 'completed' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, patch: Partial<Pick<TaskItem, 'title' | 'identityId' | 'identityName' | 'identityColor' | 'estimatedMinutes' | 'dueDate'>>) => void;
  deleteTask: (id: string) => void;
  getTasksForIdentity: (identityId: string) => TaskItem[];
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (task) =>
        set((state) => {
          const title = task.title.trim();
          const estimateIsValid = task.estimatedMinutes === undefined ||
            (Number.isInteger(task.estimatedMinutes) && task.estimatedMinutes > 0 && task.estimatedMinutes <= 720);
          if (!title || title.length > 100 || !task.identityId || !estimateIsValid) return state;
          return {
            tasks: [
              {
                ...task,
                title,
                id: uid('task-'),
                completed: false,
                createdAt: new Date().toISOString(),
              },
              ...state.tasks,
            ],
          };
        }),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      updateTask: (id, patch) =>
        set((state) => {
          const existing = state.tasks.find((task) => task.id === id);
          if (!existing) return state;
          const title = patch.title === undefined ? existing.title : patch.title.trim();
          const estimate = patch.estimatedMinutes === undefined ? existing.estimatedMinutes : patch.estimatedMinutes;
          const estimateIsValid = estimate === undefined ||
            (Number.isInteger(estimate) && estimate > 0 && estimate <= 720);
          if (!title || title.length > 100 || !estimateIsValid) return state;
          return {
            tasks: state.tasks.map((task) => task.id === id ? { ...task, ...patch, title } : task),
          };
        }),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      getTasksForIdentity: (identityId) =>
        get().tasks.filter((t) => t.identityId === identityId),
    }),
    {
      name: 'monolith-tasks-v2',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
