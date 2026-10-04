import { useActivityUndoStore } from "@/stores/activityUndoStore";
import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, Input } from "@/components/ui";
import {
  useAppStore,
  useFocusStore,
  useIdentityStore,
  useLogStore,
  useTaskStore,
  useUserStore,
} from "@/stores";
import { File, Paths } from "expo-file-system";
import { isAvailableAsync, shareAsync } from "expo-sharing";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function SettingsScreen() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const insets = useSafeAreaInsets();
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountEmail, setAccountEmail] = useState<string | null>(null);
  const dailyGoalMinutes = useUserStore((s) => s.dailyGoalMinutes);
  const setDailyGoal = useUserStore((s) => s.setDailyGoal);
  const adjustGoal = (delta: number) =>
    setDailyGoal(Math.max(15, Math.min(240, dailyGoalMinutes + delta)));

  useEffect(() => {
    if (!supabase) return;
    supabase.auth
      .getSession()
      .then(({ data }) => setAccountEmail(data.session?.user.email ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccountEmail(session?.user.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const authenticate = async (mode: "signIn" | "signUp") => {
    if (!supabase || busy) return;
    setBusy(true);
    try {
      const result =
        mode === "signIn"
          ? await supabase.auth.signInWithPassword({
              email: email.trim(),
              password,
            })
          : await supabase.auth.signUp({ email: email.trim(), password });
      if (result.error) throw result.error;
      if (mode === "signUp" && !result.data.session) {
        Alert.alert(
          "Check your email",
          "Confirm your email address, then sign in to sync your Monolith data.",
        );
      }
      setPassword("");
    } catch (error) {
      Alert.alert(
        mode === "signIn" ? "Sign in failed" : "Account creation failed",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const exportData = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const payload = {
        format: "monolith-export-v1",
        exportedAt: new Date().toISOString(),
        dailyGoalMinutes: useUserStore.getState().dailyGoalMinutes,
        identities: useIdentityStore.getState().identities,
        tasks: useTaskStore.getState().tasks,
        focusSessions: useFocusStore.getState().completedSessions,
        retroLogs: useLogStore.getState().retroLogs,
      };
      const file = new File(Paths.cache, `monolith-export-${Date.now()}.json`);
      file.create({ overwrite: true });
      file.write(JSON.stringify(payload, null, 2));
      if (!(await isAvailableAsync()))
        throw new Error("File sharing is unavailable on this device.");
      await shareAsync(file.uri, {
        mimeType: "application/json",
        UTI: "public.json",
        dialogTitle: "Export Monolith data",
      });
    } catch (error) {
      Alert.alert(
        "Export failed",
        error instanceof Error
          ? error.message
          : "Your data could not be exported.",
      );
    } finally {
      setBusy(false);
    }
  };

  const confirmDeleteData = () =>
    Alert.alert(
      "Delete all local data?",
      "This permanently removes your identities, tasks, focus sessions, logs, and settings from this device.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete all data",
          style: "destructive",
          onPress: () => {
            useActivityUndoStore.getState().dismiss();
            useIdentityStore.setState({ identities: [] });
            useTaskStore.setState({ tasks: [] });
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
            useLogStore.setState({ retroLogs: [] });
            useUserStore.getState().clearUser();
            setDailyGoal(60);
            useAppStore.getState().setOnboarded(false);
            router.replace("/onboarding");
          },
        },
      ],
    );

  return (
    <View className="flex-1 bg-background dark:bg-dark-ground">
      <ScrollView
        className="px-5"
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 32,
        }}
      >
        <Text className="text-h2 text-text-primary dark:text-dark-ink  mb-6">
          Settings
        </Text>
        <View className="border-b border-border dark:border-dark-rule pb-5 mb-5">
          <Text className="text-h3 text-text-primary dark:text-dark-ink mb-3">
            Appearance
          </Text>
          <View className="flex-row " style={{ gap: 8 }}>
            {(["system", "light", "dark"] as const).map((mode) => (
              <Pressable
                key={mode}
                accessibilityRole="button"
                accessibilityLabel={`${mode} appearance`}
                accessibilityState={{ selected: theme === mode }}
                onPress={() => setTheme(mode)}
                className={`min-h-[44px] flex-1 rounded-full items-center justify-center ${theme === mode ? "bg-accent dark:bg-dark-accent" : "bg-surface dark:bg-dark-surface"}`}
              >
                <Text
                  className={
                    theme === mode
                      ? "text-text-inverse dark:text-dark-on-accent"
                      : "text-text-primary dark:text-dark-ink"
                  }
                >
                  {mode[0].toUpperCase() + mode.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Card className="p-4 mb-4">
          <Text className="text-h3 text-text-primary dark:text-dark-ink  mb-3">
            Account
          </Text>
          {!isSupabaseConfigured ? (
            <Text className="text-body-sm text-text-secondary dark:text-dark-muted ">
              Email sign-in is unavailable until Supabase is configured. Your
              local data remains available.
            </Text>
          ) : accountEmail ? (
            <>
              <Text className="text-body-sm text-text-secondary dark:text-dark-muted ">
                Signed in as {accountEmail}
              </Text>
              <Text className="text-caption text-text-tertiary dark:text-dark-tertiary  mt-2">
                Cloud data sync is being set up. Your local data remains on this
                device.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  void supabase?.auth.signOut();
                }}
                className="py-3 mt-2"
              >
                <Text className="text-body text-text-primary dark:text-dark-ink ">
                  Sign out
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              <View className="mt-3">
                <Input
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                />
              </View>
              <View className="flex-row  mt-4" style={{ gap: 12 }}>
                <Pressable
                  accessibilityRole="button"
                  disabled={busy || !email.trim() || password.length < 8}
                  onPress={() => void authenticate("signIn")}
                  className="flex-1 py-3 rounded-monolith border border-border dark:border-dark-rule items-center"
                >
                  <Text className="text-body-sm text-text-primary dark:text-dark-ink ">
                    Sign in
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  disabled={busy || !email.trim() || password.length < 8}
                  onPress={() => void authenticate("signUp")}
                  className="flex-1 py-3 rounded-monolith bg-accent dark:bg-dark-accent items-center"
                >
                  <Text className="text-body-sm text-text-inverse dark:text-dark-on-accent ">
                    Create account
                  </Text>
                </Pressable>
              </View>
              <Text className="text-caption text-text-tertiary dark:text-dark-tertiary  mt-2">
                Use at least 8 characters. Your existing local data is not
                uploaded yet.
              </Text>
            </>
          )}
        </Card>
        <Card className="p-4 mb-4">
          <Text className="text-h3 text-text-primary dark:text-dark-ink  mb-4">
            Daily Goal
          </Text>
          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={() => adjustGoal(-15)}
              disabled={dailyGoalMinutes <= 15}
              accessibilityRole="button"
              accessibilityLabel="Decrease daily goal"
              className="w-11 h-11 rounded-full border border-border dark:border-dark-rule items-center justify-center"
            >
              <Text className="text-text-primary dark:text-dark-ink text-lg ">
                −
              </Text>
            </Pressable>
            <View className="items-center">
              <Text className="text-display text-text-primary dark:text-dark-ink ">
                {dailyGoalMinutes}
              </Text>
              <Text className="text-caption text-text-tertiary dark:text-dark-tertiary uppercase ">
                minutes / day
              </Text>
            </View>
            <Pressable
              onPress={() => adjustGoal(15)}
              disabled={dailyGoalMinutes >= 240}
              accessibilityRole="button"
              accessibilityLabel="Increase daily goal"
              className="w-11 h-11 rounded-full border border-border dark:border-dark-rule items-center justify-center"
            >
              <Text className="text-text-primary dark:text-dark-ink text-lg ">
                +
              </Text>
            </Pressable>
          </View>
        </Card>
        <Card className="mb-4">
          <Text className="text-h3 text-text-primary dark:text-dark-ink  mb-3">
            Data
          </Text>
          <Pressable
            onPress={exportData}
            disabled={busy}
            accessibilityRole="button"
            accessibilityLabel="Export local data as JSON"
            className="py-3 border-b border-border-subtle dark:border-dark-rule"
          >
            <Text className="text-body text-text-primary dark:text-dark-ink ">
              {busy ? "Preparing export…" : "Export data as JSON"}
            </Text>
            <Text className="text-body-sm text-text-secondary dark:text-dark-muted  mt-1">
              Share a copy of your identities, tasks, sessions, and logs.
            </Text>
          </Pressable>
          <Pressable
            onPress={confirmDeleteData}
            accessibilityRole="button"
            accessibilityLabel="Delete all local data"
            className="py-3"
          >
            <Text className="text-body text-error ">Delete all local data</Text>
          </Pressable>
        </Card>
        <Card className="mb-8">
          <Text className="text-h3 text-text-primary dark:text-dark-ink  mb-2">
            About
          </Text>
          <View className="flex-row items-center justify-between py-1">
            <Text className="text-body-sm text-text-secondary dark:text-dark-muted ">
              Version
            </Text>
            <Text className="text-body-sm text-text-primary dark:text-dark-ink ">
              0.1.0
            </Text>
          </View>
          <Text className="text-body-sm text-text-secondary dark:text-dark-muted  mt-3">
            Your activity is stored on this device. Cloud sync is not available
            yet.
          </Text>
        </Card>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Close settings"
          className="py-3 rounded-monolith border border-border dark:border-dark-rule items-center"
        >
          <Text className="text-text-primary dark:text-dark-ink  font-semibold">
            Close
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
