export type TrackingPeriod = 'today' | 'week' | 'month';

export const trackingAnalyticsMock = {
  title: 'Tracking Analytics',
  cleanDays: 14,
  headline: 'Usage & Pattern Analytics',
  body: 'Cognitive mapping of your neuro-tapering rate.',
  liveLabel: 'Live',
  periods: [
    { id: 'today' as const, label: 'Today' },
    { id: 'week' as const, label: 'This Week' },
    { id: 'month' as const, label: 'Last 30 Days' },
  ],
  average: {
    today: { puffs: 42, changePercent: -18, baseline: 70 },
    week: { puffs: 68, changePercent: -32, baseline: 100 },
    month: { puffs: 74, changePercent: -26, baseline: 100 },
  },
  savingsThisWeekMinorUnits: 430,
  nicotineAvoidedMg: 42,
  ceiling: 80,
  weekBars: [
    { day: 'M', puffs: 58 },
    { day: 'T', puffs: 64 },
    { day: 'W', puffs: 49 },
    { day: 'T', puffs: 71 },
    { day: 'F', puffs: 96 },
    { day: 'S', puffs: 41 },
    { day: 'S', puffs: 36 },
  ],
  adherence: {
    daysUnder: 5,
    daysTotal: 7,
    percent: 71,
  },
  triggers: [
    {
      time: '08:30',
      title: 'Morning coffee / commute walk',
      detail: 'Habit loop',
      puffs: 12,
      intensity: 'Moderate',
    },
    {
      time: '13:15',
      title: 'Post-lunch stroll',
      detail: 'Midday cognitive reset',
      puffs: 8,
      intensity: 'Low',
    },
    {
      time: '19:45',
      title: 'Social pub drinks',
      detail: 'Cue & sensory reflex zone',
      puffs: 26,
      intensity: 'High',
    },
  ],
  neuro: [
    { label: 'Work stress & screen fatigue', percent: 42 },
    { label: 'Socialising & alcohol cues', percent: 35 },
    { label: 'Restlessness & idle boredom', percent: 23 },
  ],
  lastSyncMinutesAgo: 4,
};
