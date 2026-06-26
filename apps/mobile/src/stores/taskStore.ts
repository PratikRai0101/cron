import { create } from 'zustand';

export interface TaskItem {
  id: string;
  title: string;
  identityId: string;
  identityName: string;
  identityColor: string;
  estimatedMinutes?: number;
  completed: boolean;
  createdAt: string;
}

interface TaskState {
  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, 'id' | 'completed' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  getTasksForIdentity: (identityId: string) => TaskItem[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  addTask: (task) =>
    set((state) => ({
      tasks: [
        {
          ...task,
          id: Date.now().toString(),
          completed: false,
          createdAt: new Date().toISOString(),
        },
        ...state.tasks,
      ],
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  getTasksForIdentity: (identityId) =>
    get().tasks.filter((t) => t.identityId === identityId),
}));
