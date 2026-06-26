import { Redirect } from 'expo-router';
import { useAppStore } from '@/stores';

export default function Index() {
  const isOnboarded = useAppStore((s) => s.isOnboarded);
  return <Redirect href={isOnboarded ? '/(tabs)/grid' : '/onboarding'} />;
}
