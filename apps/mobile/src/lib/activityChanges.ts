import { useFocusStore, type CompletedSession } from "@/stores/focusStore";
import { useLogStore, type RetroLog } from "@/stores/logStore";
import { useActivityUndoStore } from "@/stores/activityUndoStore";
export function changeSession(
  before: CompletedSession,
  after: CompletedSession | null,
) {
  const store = useFocusStore.getState();
  const index = store.completedSessions.findIndex((s) => s.id === before.id);
  if (!store.replaceSession(before.id, before, after)) return false;
  useActivityUndoStore
    .getState()
    .offer(after ? "Session updated." : "Session removed.", () =>
      useFocusStore.getState().replaceSession(before.id, after, before, index),
    );
  return true;
}
export function changeLog(before: RetroLog, after: RetroLog | null) {
  const store = useLogStore.getState();
  const index = store.retroLogs.findIndex((s) => s.id === before.id);
  if (!store.replaceLog(before.id, before, after)) return false;
  useActivityUndoStore
    .getState()
    .offer(after ? "Log updated." : "Log removed.", () =>
      useLogStore.getState().replaceLog(before.id, after, before, index),
    );
  return true;
}
export function offerSessionUndo(session: CompletedSession) {
  useActivityUndoStore
    .getState()
    .offer("Session recorded.", () =>
      useFocusStore.getState().replaceSession(session.id, session, null),
    );
}

export function offerLogUndo(log: RetroLog) {
  useActivityUndoStore
    .getState()
    .offer("Activity recorded.", () =>
      useLogStore.getState().replaceLog(log.id, log, null),
    );
}
