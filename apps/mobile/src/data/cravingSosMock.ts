export const cravingSosMock = {
  title: 'Craving SOS Intervention',
  modeLabel: 'Emergency wave sanctuary',
  headline: 'Ride the Wave. You are in control.',
  body: 'Acute nicotine surges last fewer than 180 seconds. Let your parasympathetic nervous system take over.',
  waveSeconds: 180,
  xpReward: 10,
  protectedTodayMinorUnits: 1480,
  community: {
    cravingsDefeatedThisWeek: 14200,
    label: 'UK QuitLoopers',
  },
  buddyLabel: 'Mum / Partner',
  breathPhases: [
    { id: 'inhale', label: 'Inhale through', detail: 'Nose (4s)', seconds: 4 },
    { id: 'hold', label: 'Hold gently', detail: 'Soft jaw (2s)', seconds: 2 },
    { id: 'exhale', label: 'Exhale through', detail: 'Mouth (6s)', seconds: 6 },
  ],
  tools: [
    {
      id: 'sensory',
      title: '5-4-3-2-1 Sensory Ground',
      action: 'Tap to Start',
      body: 'Spot 5 blue items, touch 4 textures nearby.',
    },
    {
      id: 'physical',
      title: 'Physical Reset',
      action: 'Quick Fix',
      body: 'Drink a chilled glass of water or splash cold water on your wrists.',
    },
    {
      id: 'delay',
      title: 'Urge Delay Timer',
      action: '+5 Minutes',
      body: 'Postpone the decision for 5 minutes. Watch the urge lose its edge.',
    },
    {
      id: 'buddy',
      title: 'Call Accountability Buddy',
      action: 'Mum / Partner',
      body: 'One ring triggers an immediate supportive check-in.',
    },
  ],
};
