import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import {
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { router } from "expo-router";
import { Specimen } from "@/components/strata/Specimen";
import { Icon } from "@/components/strata/Icon";
import { useColors } from "@/theme/ThemeContext";
import { formatDate, formatMinutes } from "@monolith/shared";
import { useActivity } from "@/hooks/useActivity";
import { useIdentityStore, useUserStore } from "@/stores";

export default function IdentityScreen() {
  const insets = useSafeAreaInsets();
  const identities = useIdentityStore((s) => s.identities);
  const archiveIdentity = useIdentityStore((s) => s.archiveIdentity);
  const restoreIdentity = useIdentityStore((s) => s.restoreIdentity);
  const tier = useUserStore((s) => s.subscriptionTier);
  const { byIdentity, byIdentityDate } = useActivity();
  const last30 = new Date();
  last30.setDate(last30.getDate() - 29);
  const start = formatDate(last30);
  const activeIdentities = identities.filter(
    (identity) => !identity.isArchived,
  );
  const archivedIdentities = identities.filter(
    (identity) => identity.isArchived,
  );

  const addIdentity = () => {
    if (tier === "free" && activeIdentities.length >= 1) {
      Alert.alert(
        "Identity limit reached",
        "The Free plan supports one active identity. Identity upgrades are not available yet.",
      );
      return;
    }
    router.push("/modals/add-identity");
  };

  const handleRestore = (id: string) => {
    if (tier === "free" && activeIdentities.length >= 1) {
      Alert.alert(
        "Identity limit reached",
        "Archive your active identity first. The Free plan supports one active identity.",
      );
      return;
    }
    restoreIdentity(id);
  };

  const c = useColors();
  const total = activeIdentities.reduce(
    (sum, i) => sum + (byIdentity[i.id] ?? 0),
    0,
  );
  const today = formatDate(new Date());
  const manage = (identity: (typeof identities)[number]) =>
    Alert.alert(identity.name, "Manage this identity", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Edit",
        onPress: () =>
          router.push({
            pathname: "/modals/add-identity",
            params: { id: identity.id },
          }),
      },
      {
        text: "Archive",
        style: "destructive",
        onPress: () => archiveIdentity(identity.id),
      },
    ]);
  return (
    <View className="flex-1 bg-background dark:bg-dark-ground">
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop:
            Math.max(insets.top, initialWindowMetrics?.insets.top ?? 0) + 16,
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 112,
        }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-[28px] font-bold text-text-primary dark:text-dark-ink">
            Identities
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add identity"
            onPress={addIdentity}
            className="min-h-[44px] justify-center"
          >
            <Text className="text-[13px] font-semibold text-accent dark:text-dark-accent">
              Add
            </Text>
          </Pressable>
        </View>
        <View className="flex-row items-center  mt-6 mb-5" style={{ gap: 16 }}>
          <Text className="font-serif text-[76px] leading-[80px] text-text-primary dark:text-dark-ink">
            {activeIdentities.length}
          </Text>
          <View className="flex-1">
            <Text className="text-[13px] text-text-secondary dark:text-dark-muted">
              active identities
            </Text>
            <Text className="text-[13px] text-text-secondary dark:text-dark-muted mt-1">
              {formatMinutes(total)} of work
            </Text>
          </View>
        </View>
        <Text className="text-[13px] text-text-secondary dark:text-dark-muted mb-4">
          {tier === "free"
            ? "Free · One active identity."
            : "Pro · More actions under each identity."}
        </Text>
        {archivedIdentities.length > 0 && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View archived identities"
            onPress={() =>
              Alert.alert(
                "Archived identities",
                "Choose an identity to restore.",
                [
                  { text: "Cancel", style: "cancel" },
                  ...archivedIdentities.map((i) => ({
                    text: i.name,
                    onPress: () => handleRestore(i.id),
                  })),
                ],
              )
            }
            className="min-h-[44px] flex-row justify-between items-center mb-4"
          >
            <Text className="text-[13px] text-text-primary dark:text-dark-ink">
              Archived · {archivedIdentities.length}{" "}
              {archivedIdentities.length === 1 ? "identity" : "identities"}
            </Text>
            <Text className="text-[13px] font-semibold text-accent dark:text-dark-accent">
              Restore
            </Text>
          </Pressable>
        )}
        {activeIdentities.length === 0 && (
          <>
            <Specimen empty height={130} />
            <Text className="text-[15px] text-text-secondary dark:text-dark-muted mt-5">
              Add an identity to start tracking.
            </Text>
          </>
        )}
        {activeIdentities.map((identity) => {
          const dates = byIdentityDate[identity.id] ?? {};
          const days = Array.from({ length: 30 }, (_, index) => {
            const day = new Date();
            day.setDate(day.getDate() - 29 + index);
            return dates[formatDate(day)] ?? 0;
          });
          const activeDays = Object.keys(dates).filter(
            (date) => date >= start && date <= today && dates[date] > 0,
          ).length;
          return (
            <View
              key={identity.id}
              className="border-t border-border dark:border-dark-rule pt-3 pb-5"
            >
              <View className="flex-row items-center justify-between">
                <Text
                  className="text-[20px] font-bold text-text-primary dark:text-dark-ink flex-1"
                  numberOfLines={2}
                >
                  {identity.name}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Manage ${identity.name}`}
                  onPress={() => manage(identity)}
                  className="w-11 h-11 items-center justify-center"
                >
                  <Icon name="more" color={c.secondaryText} />
                </Pressable>
              </View>
              <Text className="text-[17px] text-text-primary dark:text-dark-ink mb-3">
                {formatMinutes(byIdentity[identity.id] ?? 0)}
              </Text>
              <View className="flex-row " style={{ gap: 3 }}>
                {days.map((minutes, index) => (
                  <View
                    key={index}
                    className="flex-1 h-[18px]"
                    style={{
                      backgroundColor: minutes ? c.primary : c.separator,
                      opacity: minutes
                        ? Math.max(0.35, Math.min(minutes / 60, 1))
                        : 1,
                    }}
                  />
                ))}
              </View>
              <View className="flex-row justify-between mt-2">
                <Text className="text-[11px] text-text-secondary dark:text-dark-muted">
                  {activeDays} active days of 30
                </Text>
                <Text className="text-[11px] text-text-secondary dark:text-dark-muted">
                  Last 30 days
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
