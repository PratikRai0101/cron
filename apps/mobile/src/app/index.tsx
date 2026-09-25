import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { useAppStore } from '@/stores';

export default function Index() {
  const isOnboarded = useAppStore((s) => s.isOnboarded);
  const [ready, setReady] = useState(useAppStore.persist.hasHydrated());
  useEffect(() => useAppStore.persist.onFinishHydration(() => setReady(true)), []);
  if (!ready) return null;
  return <Redirect href={isOnboarded ? '/(tabs)/grid' : '/onboarding'} />;
}
