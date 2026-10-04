import { useFocusStore, type CompletedSession } from "@/stores/focusStore";
import { useLogStore, type RetroLog } from "@/stores/logStore";
import { useActivityUndoStore } from "@/stores/activityUndoStore";
import {
  changeLog,
  changeSession,
  offerSessionUndo,
  offerLogUndo,
} from "@/lib/activityChanges";
import { activityRecords, validDuration } from "@/lib/activityRecords";
import { buildStrata } from "@/lib/strata";

jest.mock("@react-native-async-storage/async-storage", () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);
const session: CompletedSession = {
  id: "one",
  duration: 73,
  identityId: "focus",
  identityName: "Focus",
  identityColor: "#fff",
  completedAt: "2026-10-05T12:00:00Z",
  taskId: "task-one",
};
const log: RetroLog = {
  id: "one",
  minutes: 23,
  identityId: "writing",
  identityName: "Writing",
  identityColor: "#eee",
  date: "2026-10-04",
};
beforeEach(() => {
  useFocusStore.setState({ completedSessions: [session], isActive: false });
  useLogStore.setState({ retroLogs: [log] });
  useActivityUndoStore.getState().dismiss();
});

test("editing duration and identity preserves date, task and unrelated history, then undo restores exactly", () => {
  const revised = {
    ...session,
    duration: 181,
    identityId: "writing",
    identityName: "Writing",
    identityColor: "#eee",
  };
  expect(changeSession(session, revised)).toBe(true);
  expect(useFocusStore.getState().completedSessions[0]).toEqual(revised);
  const later = { ...session, id: "later", duration: 120 };
  useFocusStore.getState().logSession(later);
  useActivityUndoStore.getState().restore();
  expect(useFocusStore.getState().completedSessions).toEqual([session, later]);
  expect(useLogStore.getState().retroLogs).toEqual([log]);
});
test("a stale editor and stale undo cannot overwrite a newer record version", () => {
  const revised = { ...session, duration: 180 };
  expect(changeSession(session, revised)).toBe(true);
  const firstUndo = useActivityUndoStore.getState().undo!;
  expect(changeSession(session, { ...session, duration: 300 })).toBe(false);
  const newest = { ...revised, duration: 240 };
  expect(changeSession(revised, newest)).toBe(true);
  expect(firstUndo()).toBe(false);
  expect(useFocusStore.getState().completedSessions).toEqual([newest]);
});
test("removing and undoing keeps the exact original record and order", () => {
  const second = { ...session, id: "second", duration: 123 };
  useFocusStore.setState({ completedSessions: [session, second] });
  expect(changeSession(session, null)).toBe(true);
  expect(useFocusStore.getState().completedSessions).toEqual([second]);
  useActivityUndoStore.getState().restore();
  expect(useFocusStore.getState().completedSessions).toEqual([session, second]);
});
test("manual-log edits and removal can each be undone without changing their day", () => {
  const revised = {
    ...log,
    minutes: 47,
    identityId: "focus",
    identityName: "Focus",
  };
  expect(changeLog(log, revised)).toBe(true);
  useActivityUndoStore.getState().restore();
  expect(useLogStore.getState().retroLogs).toEqual([log]);
  expect(changeLog(log, null)).toBe(true);
  useActivityUndoStore.getState().restore();
  expect(useLogStore.getState().retroLogs).toEqual([log]);
});
test("undoing a just-recorded session removes only that session", () => {
  const second = { ...session, id: "just-saved" };
  useFocusStore.getState().logSession(second);
  offerSessionUndo(second);
  useActivityUndoStore.getState().restore();
  expect(useFocusStore.getState().completedSessions).toEqual([session]);
});
test("undoing a newly recorded manual log preserves all other records", () => {
  const second = { ...log, id: "new-log", minutes: 37 };
  useLogStore.setState({ retroLogs: [log, second] });
  offerLogUndo(second);
  useActivityUndoStore.getState().restore();
  expect(useLogStore.getState().retroLogs).toEqual([log]);
  expect(useFocusStore.getState().completedSessions).toEqual([session]);
});
test("record corrections do not interrupt the active timer", () => {
  useFocusStore.getState().startFocus("another-identity", "live-task");
  const clock = useFocusStore.getState().startTime;
  expect(changeSession(session, { ...session, duration: 180 })).toBe(true);
  const state = useFocusStore.getState();
  expect(state.isActive).toBe(true);
  expect(state.startTime).toBe(clock);
  expect(state.currentTaskId).toBe("live-task");
});
test("session and log IDs remain distinct even when imported raw IDs collide", () => {
  const records = activityRecords([session], [log]);
  expect(records.map((r) => r.id)).toEqual(["session:one", "log:one"]);
  expect(records.map((r) => r.durationSeconds)).toEqual([73, 1380]);
});
test("duration validation preserves seconds and rejects overflow, fractions and malformed input", () => {
  expect(validDuration("1", "13")).toBe(73);
  expect(validDuration("720", "0")).toBe(43200);
  for (const [m, s] of [
    ["0", "59"],
    ["720", "1"],
    ["2", "60"],
    ["1.5", "0"],
    ["-1", "0"],
    ["", "0"],
    ["2", "NaN"],
  ])
    expect(validDuration(m, s)).toBeNull();
  expect(validDuration("2", "1", true)).toBeNull();
  expect(validDuration("2", "0", true)).toBe(120);
  expect(changeSession(session, { ...session, duration: Number.NaN })).toBe(
    false,
  );
  expect(changeLog(log, { ...log, minutes: 721 })).toBe(false);
});
test("the compressed base exposes the exact older records for inspection", () => {
  const records = Array.from({ length: 10 }, (_, n) => ({
    id: `session:${n}`,
    minutes: n + 1,
    date: "2026-10-05",
    identityId: "focus",
    recordedAt: n,
  }));
  const rock = buildStrata(records);
  expect(rock.earlierIds).toEqual(["session:0", "session:1", "session:2"]);
  expect(rock.layers[0].minutes).toBe(6);
  expect(records).toHaveLength(10);
});
