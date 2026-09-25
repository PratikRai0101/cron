import { useIdentityStore } from '@/stores';
export function useIdentities() {
  const stored = useIdentityStore((s) => s.identities);
  return stored.filter((identity) => !identity.isArchived);
}
