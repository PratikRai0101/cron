import { useIdentityStore } from '@/stores';
import { demoIdentities } from '@/lib/demo-data';

export function useIdentities() {
  const stored = useIdentityStore((s) => s.identities);
  if (stored.length === 0) return demoIdentities;

  return stored.map((identity) => {
    const demo = demoIdentities.find(
      (d) => d.name === identity.name || d.id === identity.id
    );
    return {
      ...identity,
      totalMinutes: identity.totalMinutes ?? demo?.totalMinutes ?? 0,
    };
  });
}
