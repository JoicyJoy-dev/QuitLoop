export type TabId = 'home' | 'track' | 'breathe' | 'health' | 'profile';

export const tabMeta: Record<
  Exclude<TabId, 'breathe'>,
  { label: string; title: string; body: string }
> = {
  home: {
    label: 'Home',
    title: 'Dashboard',
    body: '',
  },
  track: {
    label: 'Track',
    title: 'Track',
    body: 'Usage logging and daily totals will land here.',
  },
  health: {
    label: 'Health',
    title: 'Health',
    body: 'Health insights will land here.',
  },
  profile: {
    label: 'Profile',
    title: 'Profile',
    body: 'Account and regional settings will land here.',
  },
};
