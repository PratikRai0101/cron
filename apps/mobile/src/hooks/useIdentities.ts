import { useIdentityStore } from '@/stores';
import { demoIdentities } from '@/lib/demo-data';

export function useIdentities() {
  const stored = useIdentityStore((s) => s.identities);
  return stored.length > 0 ? stored : demoIdentities;
}
