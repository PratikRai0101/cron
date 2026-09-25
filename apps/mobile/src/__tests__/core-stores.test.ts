jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import { useFocusStore } from '@/stores/focusStore';
import { useIdentityStore } from '@/stores/identityStore';
import { useTaskStore } from '@/stores/taskStore';

const identityDefaults = {
  identities: [],
};

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2026-09-25T12:00:00.000Z'));
  useFocusStore.setState({
    isActive: false,
    isPaused: false,
    elapsedSeconds: 0,
    currentIdentityId: null,
    currentTaskId: null,
    startTime: null,
    accumulatedSeconds: 0,
    completedSessions: [],
  });
  useIdentityStore.setState(identityDefaults);
  useTaskStore.setState({ tasks: [] });
});

afterEach(() => {
  jest.useRealTimers();
});

describe('task store', () => {
  test('a caller can create, edit, complete, and delete a task', () => {
    const tasks = useTaskStore.getState();
    tasks.addTask({
      title: '  Review pull requests  ',
      identityId: 'identity-code',
      identityName: 'Code',
      identityColor: '#ffffff',
      estimatedMinutes: 30,
      dueDate: '2026-09-25',
    });

    let [task] = useTaskStore.getState().tasks;
    expect(task.title).toBe('  Review pull requests  ');
    expect(task.completed).toBe(false);
    expect(task.dueDate).toBe('2026-09-25');

    tasks.updateTask(task.id, { title: '  Merge pull requests  ', estimatedMinutes: 45 });
    task = useTaskStore.getState().tasks[0];
    expect(task.title).toBe('Merge pull requests');
    expect(task.estimatedMinutes).toBe(45);

    tasks.toggleTask(task.id);
    expect(useTaskStore.getState().tasks[0].completed).toBe(true);

    tasks.deleteTask(task.id);
    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });
});

describe('identity store', () => {
  test('identity names are trimmed and active names cannot be duplicated case-insensitively', () => {
    const identities = useIdentityStore.getState();
    identities.addIdentity({ name: '  Code ', color: '#ffffff' });
    identities.addIdentity({ name: 'code', color: '#ff0000' });

    const saved = useIdentityStore.getState().identities;
    expect(saved).toHaveLength(1);
    expect(saved[0].name).toBe('Code');
  });

  test('archiving hides an identity without deleting it, and it can be restored', () => {
    const identities = useIdentityStore.getState();
    identities.addIdentity({ name: 'Writing', color: '#ffffff' });
    const [created] = useIdentityStore.getState().identities;

    identities.archiveIdentity(created.id);
    expect(useIdentityStore.getState().identities[0].isArchived).toBe(true);

    identities.restoreIdentity(created.id);
    expect(useIdentityStore.getState().identities[0].isArchived).toBe(false);
  });
});

describe('focus store', () => {
  test('saved duration excludes time spent paused', () => {
    const focus = useFocusStore.getState();
    focus.startFocus('identity-code', 'task-1');
    jest.advanceTimersByTime(90_000);
    useFocusStore.getState().pauseFocus();
    jest.advanceTimersByTime(10 * 60_000);
    useFocusStore.getState().resumeFocus();
    jest.advanceTimersByTime(30_000);

    const result = useFocusStore.getState().stopFocus();
    expect(result).toEqual({ duration: 120, identityId: 'identity-code', taskId: 'task-1' });
  });

  test('a focus session is capped at twelve hours', () => {
    useFocusStore.getState().startFocus('identity-code');
    jest.advanceTimersByTime(13 * 60 * 60_000);

    expect(useFocusStore.getState().stopFocus()?.duration).toBe(12 * 60 * 60);
  });

  test('cancelling a focus session discards it', () => {
    useFocusStore.getState().startFocus('identity-code');
    jest.advanceTimersByTime(5 * 60_000);
    useFocusStore.getState().cancelFocus();

    expect(useFocusStore.getState().stopFocus()).toBeNull();
    expect(useFocusStore.getState().completedSessions).toHaveLength(0);
  });
});
