import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActivity } from "@/hooks/useActivity";
import { useIdentityStore, useTaskStore } from "@/stores";
import type { CompletedSession } from "@/stores/focusStore";
import type { RetroLog } from "@/stores/logStore";
import {
  type ActivityRecord,
  durationLabel,
  validDuration,
} from "@/lib/activityRecords";
import { changeLog, changeSession } from "@/lib/activityChanges";
import { buildStrata } from "@/lib/strata";
import { Specimen } from "@/components/strata/Specimen";
import { MotionPressable } from "@/components/strata/MotionPressable";
import { UndoNotice } from "@/components/strata/UndoNotice";
import { Action } from "@/components/strata/Action";
import { IdentityPill } from "@/components/identity";
import { Input } from "@/components/ui";

type Original =
  | { source: "session"; value: CompletedSession }
  | { source: "log"; value: RetroLog };
const ink = "text-text-primary dark:text-dark-ink";
const muted = "text-text-secondary dark:text-dark-muted";
interface RecordFormProps {
  original: Original;
  onDone: () => void;
}
function RecordForm({ original, onDone }: RecordFormProps) {
  // Freeze the record being edited; save refuses to overwrite a newer version.
  const [baseline] = useState(original);
  const duration =
    baseline.source === "session"
      ? baseline.value.duration
      : baseline.value.minutes * 60;
  const [minutes, setMinutes] = useState(String(Math.floor(duration / 60)));
  const [seconds, setSeconds] = useState(String(duration % 60));
  const [identityId, setIdentityId] = useState(baseline.value.identityId);
  const [error, setError] = useState("");
  const identities = useIdentityStore((s) => s.identities);
  const options = identities.filter(
    (i) => !i.isArchived || i.id === baseline.value.identityId,
  );
  const selected = options.find((i) => i.id === identityId);
  const parsed = validDuration(minutes, seconds, baseline.source === "log");
  const changed =
    parsed !== duration || identityId !== baseline.value.identityId;
  const save = () => {
    if (parsed === null) {
      setError("Enter 1–720 minutes, with seconds from 0–59.");
      return;
    }
    const identity =
      identityId === baseline.value.identityId
        ? {
            id: identityId,
            name: baseline.value.identityName,
            color: baseline.value.identityColor,
          }
        : selected;
    if (!identity) {
      setError("Choose an identity.");
      return;
    }
    const patch = {
      identityId: identity.id,
      identityName: identity.name,
      identityColor: identity.color,
    };
    const saved =
      baseline.source === "session"
        ? changeSession(baseline.value, {
            ...baseline.value,
            ...patch,
            duration: parsed,
          })
        : changeLog(baseline.value, {
            ...baseline.value,
            ...patch,
            minutes: parsed / 60,
          });
    if (saved) onDone();
    else
      setError(
        "This record changed while you were editing. Cancel and reopen it to see the latest version.",
      );
  };
  return (
    <View className="mt-5">
      <View className="flex-row" style={{ gap: 12 }}>
        <View className="flex-1">
          <Input
            label="Minutes"
            accessibilityLabel="Record duration in minutes"
            keyboardType="number-pad"
            value={minutes}
            onChangeText={setMinutes}
            maxLength={3}
          />
        </View>
        {baseline.source === "session" && (
          <View className="flex-1">
            <Input
              label="Seconds"
              accessibilityLabel="Record duration remaining seconds"
              keyboardType="number-pad"
              value={seconds}
              onChangeText={setSeconds}
              maxLength={2}
            />
          </View>
        )}
      </View>
      <Text className={`text-[13px] mt-3 ${muted}`}>
        {baseline.source === "log"
          ? "Manual logs use whole minutes."
          : "1 minute to 12 hours. The recorded date and task stay the same."}
      </Text>
      <Text className={`text-[15px] font-semibold mt-6 mb-3 ${ink}`}>
        Identity
      </Text>
      <View className="flex-row flex-wrap" style={{ gap: 4 }}>
        {options.map((i) => (
          <IdentityPill
            key={i.id}
            name={`${i.name}${i.isArchived ? " (archived)" : ""}`}
            active={identityId === i.id}
            onPress={() => setIdentityId(i.id)}
          />
        ))}
        {!options.some((i) => i.id === baseline.value.identityId) && (
          <IdentityPill
            name={baseline.value.identityName}
            active={identityId === baseline.value.identityId}
            onPress={() => setIdentityId(baseline.value.identityId)}
          />
        )}
      </View>
      {(!!error || parsed === null) && (
        <Text
          accessibilityLiveRegion="polite"
          className="text-[13px] text-error dark:text-[#F2A6A6] mt-4"
        >
          {error || "Enter 1–720 minutes, with seconds from 0–59."}
        </Text>
      )}
      <View className="flex-row mt-7" style={{ gap: 12 }}>
        <Action title="Cancel edit" secondary onPress={onDone} />
        <Action
          title="Save changes"
          disabled={!changed || parsed === null}
          onPress={save}
        />
      </View>
    </View>
  );
}
interface RecordDetailProps {
  record: ActivityRecord;
  original: Original;
  editing: boolean;
  setEditing: (editing: boolean) => void;
}
function RecordDetail({
  record,
  original,
  editing,
  setEditing,
}: RecordDetailProps) {
  const [error, setError] = useState("");
  const tasks = useTaskStore((s) => s.tasks);
  const task = tasks.find((t) => t.id === record.taskId);
  const remove = () => {
    const removed =
      original.source === "session"
        ? changeSession(original.value, null)
        : changeLog(original.value, null);
    if (!removed) setError("The record changed. Reopen it before removing it.");
  };
  return (
    <>
      <Text className={`text-[13px] mt-3 ${muted}`}>
        {record.source === "session" ? "Focus session" : "Manual log"} ·{" "}
        {new Date(`${record.date}T12:00:00`).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </Text>
      {!editing && (
        <>
          <Text
            className={`font-serif text-[64px] leading-[80px] mt-4 ${ink}`}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {durationLabel(record.durationSeconds)}
          </Text>
          <Text className={`text-[20px] mt-3 ${ink}`}>
            {record.identityName}
          </Text>
          <Text className={`text-[15px] mt-3 ${muted}`}>
            {task?.title ??
              (record.source === "session"
                ? "Focused work"
                : "Recorded activity")}
          </Text>
          {record.completedAt && (
            <Text className={`text-[13px] mt-3 ${muted}`}>
              Finished at{" "}
              {new Date(record.completedAt).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          )}
        </>
      )}
      {editing ? (
        <RecordForm original={original} onDone={() => setEditing(false)} />
      ) : (
        <View className="mt-6">
          <View className="flex-row">
            <Action title="Edit record" onPress={() => setEditing(true)} />
          </View>
          <MotionPressable
            accessibilityRole="button"
            accessibilityLabel="Remove this record"
            onPress={remove}
            className="min-h-[48px] justify-center mt-3"
          >
            <Text className="text-[15px] text-error dark:text-[#F2A6A6]">
              Remove record
            </Text>
          </MotionPressable>
          <Text className={`text-[13px] ${muted}`}>
            You can undo removal before another record change.
          </Text>
        </View>
      )}
      {!!error && (
        <Text
          accessibilityLiveRegion="polite"
          className="text-[13px] text-error dark:text-[#F2A6A6] mt-4"
        >
          {error}
        </Text>
      )}
    </>
  );
}
export default function LayerScreen() {
  const { id, identityId, date } = useLocalSearchParams<{
    id?: string;
    identityId?: string;
    date?: string;
  }>();
  const [editing, setEditing] = useState(false);
  const scroll = useRef<ScrollView>(null);
  const select = (layerId: string) => {
    setEditing(false);
    router.setParams({ id: layerId });
  };
  const activity = useActivity();
  const insets = useSafeAreaInsets();
  const scopedStrata = activity.strata.filter(
    (r) =>
      (!identityId || r.identityId === identityId) &&
      (!date || r.date === date),
  );
  const scope = new Set(scopedStrata.map((r) => r.id));
  const older = id === "earlier-work";
  const earlier = new Set(buildStrata(scopedStrata).earlierIds);
  const records = activity.records
    .filter((r) => scope.has(r.id) && (!older || earlier.has(r.id)))
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) ||
        (b.completedAt ?? "").localeCompare(a.completedAt ?? "") ||
        b.id.localeCompare(a.id),
    );
  const record =
    id && !older ? activity.records.find((r) => r.id === id) : undefined;
  const outsideScope = !!record && !scope.has(record.id);
  const detailStrata = outsideScope
    ? activity.strata.filter((r) => r.id === record.id)
    : scopedStrata;
  const session =
    record?.source === "session"
      ? activity.sessions.find((s) => s.id === record.sourceId)
      : undefined;
  const log =
    record?.source === "log"
      ? activity.logs.find((l) => l.id === record.sourceId)
      : undefined;
  const original: Original | undefined = session
    ? { source: "session", value: session }
    : log
      ? { source: "log", value: log }
      : undefined;
  const list = !id || older;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background dark:bg-dark-ground"
    >
      <ScrollView
        ref={scroll}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 32,
        }}
      >
        <View
          className="flex-row flex-wrap items-center justify-between"
          style={{ gap: 8 }}
        >
          <Text className={`text-[28px] font-bold ${ink}`}>
            {editing
              ? "Edit record"
              : older
                ? "Older work"
                : list
                  ? "Recorded layers"
                  : "Layer"}
          </Text>
          <MotionPressable
            accessibilityRole="button"
            accessibilityLabel="Close layer inspector"
            onPress={() =>
              router.canGoBack()
                ? router.back()
                : router.replace("/(tabs)/grid")
            }
            className="min-h-[44px] min-w-[44px] justify-center items-end"
          >
            <Text className="text-[15px] text-accent dark:text-dark-accent">
              Close
            </Text>
          </MotionPressable>
        </View>
        <UndoNotice />
        {list ? (
          <>
            <Text className={`text-[15px] mt-3 mb-4 ${muted}`}>
              {older
                ? "These records share the base of your specimen. Each remains editable."
                : "Choose a record to inspect its layer."}
            </Text>
            <Specimen
              height={160}
              records={scopedStrata}
              selectedLayerId={older ? "earlier-work" : null}
              onSelectLayer={select}
            />
            <Text className={`text-[13px] mt-4 ${muted}`}>
              {records.length} {records.length === 1 ? "record" : "records"}
            </Text>
            {records.map((r) => (
              <MotionPressable
                key={r.id}
                accessibilityRole="button"
                accessibilityLabel={`Inspect ${r.identityName}, ${durationLabel(r.durationSeconds)}, ${r.date}`}
                onPress={() => select(r.id)}
                className="min-h-[72px] py-3 border-b border-border dark:border-dark-rule"
              >
                <View className="flex-row items-center" style={{ gap: 12 }}>
                  <Text className={`flex-1 text-[17px] ${ink}`}>
                    {r.identityName}
                  </Text>
                  <Text className={`text-[15px] ${ink}`}>
                    {durationLabel(r.durationSeconds)}
                  </Text>
                </View>
                <Text className={`text-[13px] mt-1 ${muted}`}>
                  {r.date} ·{" "}
                  {r.source === "session" ? "Focus session" : "Manual log"}
                </Text>
              </MotionPressable>
            ))}
            {!records.length && (
              <Text className={`text-[15px] my-6 ${muted}`}>
                No recorded layers in this selection.
              </Text>
            )}
          </>
        ) : record && original ? (
          <>
            {!editing && (
              <View className="mt-5">
                <Specimen
                  height={160}
                  records={detailStrata}
                  selectedLayerId={
                    earlier.has(record.id) ? "earlier-work" : record.id
                  }
                  onSelectLayer={select}
                />
              </View>
            )}
            {!editing && outsideScope && (
              <Text className={`text-[13px] ${muted}`}>
                This record is now outside your selected identity.
              </Text>
            )}
            {!editing && earlier.has(record.id) && (
              <Text className={`text-[13px] ${muted}`}>
                This record is included in the compressed base.
              </Text>
            )}
            <RecordDetail
              key={record.id}
              record={record}
              original={original}
              editing={editing}
              setEditing={(value) => {
                setEditing(value);
                scroll.current?.scrollTo({ y: 0, animated: false });
              }}
            />
          </>
        ) : (
          <Text className={`text-[15px] my-6 ${muted}`}>
            This record is no longer in your history. Use Undo above to restore
            a removal.
          </Text>
        )}
        {!list && (
          <MotionPressable
            accessibilityRole="button"
            onPress={() => select("")}
            className="min-h-[48px] justify-center mt-5"
          >
            <Text className="text-[15px] text-accent dark:text-dark-accent">
              All layers in this selection
            </Text>
          </MotionPressable>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
