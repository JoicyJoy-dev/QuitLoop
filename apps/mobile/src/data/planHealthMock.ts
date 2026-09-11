export const planHealthMock = {
  title: 'Plan Health',
  cleanDays: 14,
  modeLabel: 'Evidence-led taper',
  phase: 'Phase 2: Habit Decoupling',
  headline: 'Your 6-Week Tapering Programme',
  body: 'Gentle neurochemical tapering designed to minimise receptor shock while retraining daily reflexive routines.',
  paceBadge: 'On Pace',
  today: {
    logged: 42,
    cap: 70,
    hoursRemaining: 10,
    minIntervalMinutes: 45,
  },
  roadmapLabel: 'Tapering Roadmap',
  frameworkLabel: 'UK NHS Framework',
  weeks: [
    {
      id: 'w1',
      title: 'Week 1: Baseline Taper',
      status: 'completed',
      detail: 'Daily limit: 90 puffs • Stabilised autonomic triggers',
    },
    {
      id: 'w2',
      title: 'Week 2: Trigger Disruption',
      status: 'active',
      detail: 'Goal: 70 puffs • 4 days remaining (On track)',
      progressLabel: '3 / 7 days',
      progress: 3 / 7,
    },
    {
      id: 'w3',
      title: 'Week 3: Nicotine Step-Down',
      status: 'upcoming',
      detail: 'Goal: 45 puffs/day • introducing oral substitute habits',
      meta: 'Starts Monday',
    },
    {
      id: 'w46',
      title: 'Weeks 4–6: Zero Nicotine & Horizon',
      status: 'upcoming',
      detail: 'Zero dependency • Dopamine receptor resensitisation',
    },
  ],
  clinician: {
    name: 'Dr Sarah Jenkins',
    credentials: 'Chartered Behavioural Psychologist, HCPC',
    focus: 'Clinical CBT focus: Urge surfing',
    quote:
      'A craving peak lasts 3 to 5 minutes like an ocean wave, then naturally dissipates. Notice the tightness in your chest as mere sensation rather than a demand for action.',
    audioTitle: 'Somatic Wave Riding',
    audioDuration: '3:12',
  },
  recovery: {
    title: 'Cilia Recovery',
    body: 'Bronchial clearance increased by',
    changePercent: 38,
  },
  guideline:
    'Plan calibrated in accordance with National Institute for Health and Care Excellence (NICE) tobacco harm reduction guidelines.',
};
