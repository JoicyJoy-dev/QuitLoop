export type TabId = 'home' | 'track' | 'breathe' | 'health' | 'profile';

export const tabMeta: Record<
  Exclude<TabId, 'breathe'>,
  { label: string; title: string; body: string }
> = {
  home: {
    label: 'Journey',
    title: 'Journey',
    body: '',
  },
  track: {
    label: 'Toolkit',
    title: 'Toolkit',
    body: 'Usage logging and daily totals will land here.',
  },
  health: {
    label: 'Health',
    title: 'Health',
    body: 'Health insights will land here.',
  },
  profile: {
    label: 'Community',
    title: 'Community',
    body: 'Shared milestones and peer support will land here.',
  },
};
