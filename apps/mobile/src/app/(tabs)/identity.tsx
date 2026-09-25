import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card } from '@/components/ui';
import { ContributionGrid } from '@/components/contribution-grid';
import { formatDate, formatMinutes } from '@monolith/shared';
import { useActivity } from '@/hooks/useActivity';
import { useIdentityStore, useUserStore } from '@/stores';

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
  const activeIdentities = identities.filter((identity) => !identity.isArchived);
  const archivedIdentities = identities.filter((identity) => identity.isArchived);

  const addIdentity = () => {
    if (tier === 'free' && activeIdentities.length >= 1) {
      Alert.alert('Identity limit reached', 'The Free plan supports one active identity. Identity upgrades are not available yet.');
      return;
    }
    router.push('/modals/add-identity');
  };

  const handleRestore = (id: string) => {
    if (tier === 'free' && activeIdentities.length >= 1) {
      Alert.alert('Identity limit reached', 'Archive your active identity first. The Free plan supports one active identity.');
      return;
    }
    restoreIdentity(id);
  };

  const renderIdentity = (identity: (typeof identities)[number]) => {
    const dates = byIdentityDate[identity.id] || {};
    const gridData = Object.entries(dates).map(([date, minutes]) => ({ date, minutes }));
    const today = formatDate(new Date());
    const activeDays = Object.keys(dates).filter((date) => date >= start && date <= today && dates[date] > 0).length;
    const recentMinutes = Object.entries(dates).filter(([date]) => date >= start && date <= today).reduce((sum, [, minutes]) => sum + minutes, 0);

    return (
      <Card key={identity.id} style={{ marginBottom: 12 }}>
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center flex-1 mr-3">
            <View className="w-1 h-12 mr-3" style={{ backgroundColor: identity.color }} />
            <View className="flex-1">
              <Text className="text-h3 text-text-primary font-sans" numberOfLines={2}>{identity.name}</Text>
              <Text className="text-mono-sm text-text-tertiary font-mono mt-0.5">{formatMinutes(byIdentity[identity.id] || 0)} total</Text>
            </View>
          </View>
          {identity.isArchived ? (
            <Pressable onPress={() => handleRestore(identity.id)} accessibilityRole="button" accessibilityLabel={`Restore ${identity.name}`} className="px-3 py-2 border border-border">
              <Text className="text-body-sm text-text-primary">Restore</Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => Alert.alert(identity.name, 'Manage this identity', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Edit', onPress: () => router.push({ pathname: '/modals/add-identity', params: { id: identity.id } }) },
              { text: 'Archive', style: 'destructive', onPress: () => archiveIdentity(identity.id) },
            ])} accessibilityRole="button" accessibilityLabel={`Manage ${identity.name}`} hitSlop={8}>
              <Text className="text-text-secondary text-xl">⋯</Text>
            </Pressable>
          )}
        </View>
        {!identity.isArchived && (
          <>
            <View className="mt-3"><ContributionGrid data={gridData} dailyGoal={60} weeksToShow={5} cellSize={10} gap={2} /></View>
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-mono-sm text-text-secondary font-mono">Active: {activeDays}/30 days</Text>
              <Text className="text-caption text-text-tertiary font-sans">30d avg: {Math.round(recentMinutes / 30)}m/day</Text>
            </View>
          </>
        )}
      </Card>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <View className="px-5 pb-2 flex-row items-center justify-between" style={{ paddingTop: insets.top + 8 }}>
        <Text className="text-h1 text-text-primary font-sans">Identities</Text>
        <Pressable onPress={addIdentity} accessibilityRole="button" accessibilityLabel="Add identity" className="w-11 h-11 items-center justify-center">
          <Text className="text-text-primary text-xl font-mono">+</Text>
        </Pressable>
      </View>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {activeIdentities.length === 0 && <Text className="text-body text-text-secondary font-sans mt-6">Add an identity to start tracking.</Text>}
        {activeIdentities.map(renderIdentity)}
        {archivedIdentities.length > 0 && <Text className="text-caption text-text-secondary uppercase font-sans my-3">Archived</Text>}
        {archivedIdentities.map(renderIdentity)}
      </ScrollView>
    </View>
  );
}
