import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { Avatar } from '../components/Avatar';
import { BrandMark } from '../components/BrandMark';
import { Card } from '../components/Card';
import { IconBubble } from '../components/IconBubble';
import {
  IconCheck,
  IconClock,
  IconDroplet,
  IconEye,
  IconHourglass,
  IconPause,
  IconPhone,
  IconPlay,
  IconTarget,
} from '../components/icons';
import { cravingSosMock } from '../data/cravingSosMock';
import { dashboardLocale } from '../data/dashboardMock';
import { formatClock, formatMoney } from '../format';
import { colors, fonts, radii, space } from '../theme';

type CravingSosScreenProps = {
  onComplete: () => void;
};

const DELAY_SECONDS = 300;

export function CravingSosScreen({ onComplete }: CravingSosScreenProps) {
  const insets = useSafeAreaInsets();
  const phases = cravingSosMock.breathPhases;
  const [running, setRunning] = useState(true);
  const [waveLeft, setWaveLeft] = useState(cravingSosMock.waveSeconds);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseLeft, setPhaseLeft] = useState(phases[0].seconds);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [doneTools, setDoneTools] = useState<string[]>([]);
  const [beaten, setBeaten] = useState(false);

  const phase = phases[phaseIndex];
  const waveProgress = 1 - waveLeft / cravingSosMock.waveSeconds;
  const phaseProgress = phaseLeft / phase.seconds;
  const protectedToday = formatMoney(
    cravingSosMock.protectedTodayMinorUnits,
    dashboardLocale.currencyCode,
    dashboardLocale.languageCode,
  );
  const communityCount = new Intl.NumberFormat(dashboardLocale.languageCode).format(
    cravingSosMock.community.cravingsDefeatedThisWeek,
  );

  useEffect(() => {
    if (!running || waveLeft <= 0) {
      return;
    }

    const id = setInterval(() => {
      setWaveLeft((value) => Math.max(0, value - 1));
      setPhaseLeft((value) => value - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [running, waveLeft]);

  useEffect(() => {
    if (phaseLeft > 0) {
      return;
    }

    setPhaseIndex((index) => {
      const next = (index + 1) % phases.length;
      setPhaseLeft(phases[next].seconds);
      return next;
    });
  }, [phaseLeft, phases]);

  useEffect(() => {
    if (waveLeft === 0) {
      setRunning(false);
    }
  }, [waveLeft]);

  const toggleWave = () => {
    if (waveLeft === 0) {
      setWaveLeft(cravingSosMock.waveSeconds);
      setPhaseIndex(0);
      setPhaseLeft(phases[0].seconds);
      setRunning(true);
      return;
    }
    setRunning((value) => !value);
  };

  const useTool = (id: string) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
    setActiveTool(id);

    if (id === 'delay') {
      setWaveLeft((value) => value + DELAY_SECONDS);
    }

    if (id === 'physical' || id === 'sensory') {
      setDoneTools((current) => (current.includes(id) ? current : [...current, id]));
    }
  };

  const beatCraving = () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
    setRunning(false);
    setBeaten(true);
    onComplete();
  };

  const toolAction = (id: string, fallback: string) => {
    if (doneTools.includes(id) && id !== 'delay') {
      return 'Done';
    }
    if (activeTool === id && id === 'delay') {
      return 'Added +5';
    }
    if (activeTool === id && id === 'buddy') {
      return 'Set in Profile';
    }
    return fallback;
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: 128 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topRow}>
        <View style={styles.brand}>
          <BrandMark size={32} />
          <Text style={styles.brandTitle} numberOfLines={1}>
            {cravingSosMock.title}
          </Text>
        </View>
        <Avatar initials="A" />
      </View>

      <View style={styles.modeRow}>
        <View style={styles.modeDot} />
        <Text style={styles.modeLabel}>{cravingSosMock.modeLabel.toUpperCase()}</Text>
      </View>

      <Text style={styles.headline}>{cravingSosMock.headline}</Text>
      <Text style={styles.body}>{cravingSosMock.body}</Text>

      <BreathRing
        progress={phaseProgress}
        label={phase.label}
        detail={phase.detail}
        value={Math.max(0, phaseLeft)}
      />

      <View style={styles.waveControls}>
        <View style={styles.remaining}>
          <IconClock size={14} color={colors.textMuted} />
          <Text style={styles.remainingText}>{formatClock(waveLeft)} remaining</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Pause or resume wave" onPress={toggleWave} style={styles.pausePill}>
          {running ? <IconPause size={14} color={colors.text} /> : <IconPlay size={14} color={colors.text} />}
          <Text style={styles.pauseText}>
            {waveLeft === 0 ? 'Restart Wave' : running ? 'Pause Wave' : 'Resume Wave'}
          </Text>
        </Pressable>
      </View>
      <View style={styles.waveTrack}>
        <View style={[styles.waveFill, { width: `${Math.round(waveProgress * 100)}%` }]} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Rapid Coping Resets</Text>
        <Text style={styles.sectionMeta}>INSTANT TAP</Text>
      </View>

      <Card style={styles.toolsCard}>
        {cravingSosMock.tools.map((tool, index) => (
          <Pressable
            key={tool.id}
            accessibilityRole="button"
            accessibilityLabel={tool.title}
            onPress={() => useTool(tool.id)}
            style={[styles.toolRow, index < cravingSosMock.tools.length - 1 && styles.toolDivider]}
          >
            <IconBubble>{toolIcon(tool.id)}</IconBubble>
            <View style={styles.toolCopy}>
              <Text style={styles.toolTitle}>{tool.title}</Text>
              <Text style={styles.toolBody}>{tool.body}</Text>
            </View>
            <View style={styles.toolAction}>
              <Text style={styles.toolActionText}>{toolAction(tool.id, tool.action)}</Text>
            </View>
          </Pressable>
        ))}
      </Card>

      <Card>
        <View style={styles.scienceRow}>
          <IconBubble>
            <IconTarget size={16} color={colors.mint} />
          </IconBubble>
          <View style={styles.scienceCopy}>
            <Text style={styles.scienceTitle}>
              Cravings naturally crest and dissolve within 3 minutes.
            </Text>
            <Text style={styles.scienceBody}>
              Over {communityCount} cravings defeated cleanly by {cravingSosMock.community.label} this week.
            </Text>
          </View>
        </View>
      </Card>

      <Card style={styles.neuroCard}>
        <View style={styles.neuroRow}>
          <View style={styles.neuroPhoto}>
            <IconPersonSilhouette />
          </View>
          <View style={styles.scienceCopy}>
            <Text style={styles.neuroLabel}>Neuro-recovery active</Text>
            <Text style={styles.scienceBody}>
              Acetylcholine receptors normalizing. Lungs recovering cilia motion. {protectedToday} protected today.
            </Text>
          </View>
        </View>
      </Card>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="I beat this craving"
        onPress={beatCraving}
        style={styles.beatButton}
      >
        <IconCheck size={16} color={colors.onPrimaryDark} />
        <Text style={styles.beatText}>
          I Beat This Craving (+{cravingSosMock.xpReward} Clean XP)
        </Text>
      </Pressable>
      <Text style={styles.beatHint}>
        {beaten
          ? 'Logged. This urge is marked neutralized.'
          : 'Record this urge as neutralized in your neuro-remodelling log today.'}
      </Text>
    </ScrollView>
  );
}

function toolIcon(id: string) {
  switch (id) {
    case 'sensory':
      return <IconEye size={16} color={colors.mint} />;
    case 'physical':
      return <IconDroplet size={16} color={colors.mint} />;
    case 'delay':
      return <IconHourglass size={16} color={colors.warning} />;
    default:
      return <IconPhone size={16} color={colors.mint} />;
  }
}

function BreathRing({
  progress,
  label,
  detail,
  value,
}: {
  progress: number;
  label: string;
  detail: string;
  value: number;
}) {
  const size = 220;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <View style={[styles.ringWrap, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.mint}
          strokeOpacity={0.12}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.mintBright}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.ringCenter} pointerEvents="none">
        <Text style={styles.ringLabel}>{label}</Text>
        <Text style={styles.ringDetail}>{detail}</Text>
        <Text style={styles.ringValue}>{value}</Text>
      </View>
    </View>
  );
}

function IconPersonSilhouette() {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="3.4" fill="#D7C4B2" />
      <Path d="M5 20c1.2-4 3.8-6 7-6s5.8 2 7 6" fill="#D7C4B2" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingHorizontal: space.lg,
    gap: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  brandTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    flexShrink: 1,
  },
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.green,
  },
  modeLabel: {
    color: colors.textMuted,
    fontSize: 11,
    letterSpacing: 1.4,
    fontWeight: '600',
  },
  headline: {
    color: colors.text,
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.45,
  },
  body: {
    color: colors.textSecondary,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
  },
  ringWrap: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  ringCenter: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  ringLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  ringDetail: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  ringValue: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: 56,
    letterSpacing: -1.1,
    marginTop: 4,
    fontVariant: ['tabular-nums'],
  },
  waveControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  remaining: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  remainingText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  pausePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pauseText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  waveTrack: {
    height: 3,
    backgroundColor: colors.mintDim,
    borderRadius: 2,
    overflow: 'hidden',
  },
  waveFill: {
    height: 3,
    backgroundColor: colors.mint,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  sectionMeta: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  toolsCard: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  toolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  toolDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  toolCopy: {
    flex: 1,
  },
  toolTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  toolBody: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  toolAction: {
    maxWidth: 92,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toolActionText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  scienceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  scienceCopy: {
    flex: 1,
  },
  scienceTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },
  scienceBody: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  neuroCard: {
    backgroundColor: colors.surfaceMuted,
  },
  neuroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  neuroPhoto: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#2A241F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  neuroLabel: {
    color: colors.mint,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  beatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.mint,
    borderRadius: radii.pill,
    paddingVertical: 16,
  },
  beatText: {
    color: colors.onPrimaryDark,
    fontFamily: fonts.label,
    fontSize: 14,
  },
  beatHint: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: 8,
  },
});
