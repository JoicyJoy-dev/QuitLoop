import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '../components/Avatar';
import { BrandMark } from '../components/BrandMark';
import { Card } from '../components/Card';
import { IconBubble } from '../components/IconBubble';
import {
  IconCheck,
  IconClock,
  IconLeaf,
  IconPause,
  IconPlay,
  IconPlus,
  IconPulse,
  IconSliders,
} from '../components/icons';
import { planHealthMock } from '../data/planHealthMock';
import { colors, fonts, radii, space } from '../theme';

export function PlanHealthScreen() {
  const insets = useSafeAreaInsets();
  const [logged, setLogged] = useState(planHealthMock.today.logged);
  const [playing, setPlaying] = useState(false);
  const cap = planHealthMock.today.cap;
  const consumed = useMemo(() => Math.round((logged / cap) * 100), [logged, cap]);
  const headroom = Math.max(0, cap - logged);

  const logOne = () => {
    setLogged((value) => Math.min(cap, value + 1));
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
          <Text style={styles.brandTitle}>{planHealthMock.title}</Text>
          <View style={styles.cleanBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.cleanBadgeText}>DAY {planHealthMock.cleanDays} CLEAN</Text>
          </View>
        </View>
        <Avatar initials="A" />
      </View>

      <View style={styles.modeRow}>
        <View style={styles.modeDot} />
        <Text style={styles.modeLabel}>{planHealthMock.modeLabel.toUpperCase()}</Text>
        <Text style={styles.phase}>{planHealthMock.phase}</Text>
      </View>

      <View style={styles.headlineRow}>
        <Text style={styles.headline}>{planHealthMock.headline}</Text>
        <View style={styles.paceBadge}>
          <Text style={styles.paceText}>{planHealthMock.paceBadge}</Text>
        </View>
      </View>
      <Text style={styles.body}>{planHealthMock.body}</Text>

      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionEyebrow}>Today’s daily target</Text>
          <Text style={styles.headroom}>{headroom} puffs headroom</Text>
        </View>
        <Text style={styles.targetValue}>
          {logged} / {cap} <Text style={styles.targetCap}>cap</Text>
        </Text>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${Math.min(100, consumed)}%` as const }]} />
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{consumed}% consumed</Text>
          <Text style={styles.metaText}>{planHealthMock.today.hoursRemaining} hours remaining today</Text>
        </View>
        <View style={styles.pacingRow}>
          <View style={styles.pacingCopy}>
            <View style={styles.inlineIcon}>
              <IconClock size={14} color={colors.mint} />
              <Text style={styles.pacingTitle}>Recommended pacing interval</Text>
            </View>
            <Text style={styles.helper}>
              Space usage by at least {planHealthMock.today.minIntervalMinutes} minutes
            </Text>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Log one puff" onPress={logOne} style={styles.logButton}>
            <IconPlus size={14} color={colors.bg} />
            <Text style={styles.logText}>Log 1</Text>
          </Pressable>
        </View>
      </Card>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{planHealthMock.roadmapLabel}</Text>
        <View style={styles.frameworkBadge}>
          <Text style={styles.frameworkText}>{planHealthMock.frameworkLabel}</Text>
        </View>
      </View>

      <Card style={styles.timelineCard}>
        {planHealthMock.weeks.map((week, index) => (
          <View
            key={week.id}
            style={[styles.weekRow, index < planHealthMock.weeks.length - 1 && styles.weekDivider]}
          >
            <View style={styles.weekRail}>
              <View
                style={[
                  styles.weekDot,
                  week.status === 'completed' && styles.weekDotDone,
                  week.status === 'active' && styles.weekDotActive,
                ]}
              >
                {week.status === 'completed' ? <IconCheck size={11} color={colors.bg} /> : null}
              </View>
              {index < planHealthMock.weeks.length - 1 ? <View style={styles.weekLine} /> : null}
            </View>
            <View style={styles.weekCopy}>
              <View style={styles.weekTitleRow}>
                <Text style={styles.weekTitle}>{week.title}</Text>
                <Text
                  style={[
                    styles.weekStatus,
                    week.status === 'active' && styles.weekStatusActive,
                    week.status === 'completed' && styles.weekStatusDone,
                  ]}
                >
                  {week.status === 'completed' ? 'Completed' : week.status === 'active' ? 'Active' : week.meta}
                </Text>
              </View>
              <Text style={styles.weekDetail}>{week.detail}</Text>
              {week.progress != null ? (
                <View style={styles.weekProgress}>
                  <View style={styles.weekProgressTrack}>
                    <View style={[styles.weekProgressFill, { width: `${Math.round(week.progress * 100)}%` as const }]} />
                  </View>
                  <Text style={styles.weekProgressLabel}>{week.progressLabel}</Text>
                </View>
              ) : null}
            </View>
          </View>
        ))}
      </Card>

      <Card>
        <View style={styles.clinicianTop}>
          <Avatar initials="SJ" size={44} backgroundColor="#8A9AA8" />
          <View style={styles.clinicianCopy}>
            <View style={styles.clinicianNameRow}>
              <Text style={styles.clinicianName}>{planHealthMock.clinician.name}</Text>
              <View style={styles.verified}>
                <IconCheck size={10} color={colors.bg} />
              </View>
            </View>
            <Text style={styles.clinicianCreds}>{planHealthMock.clinician.credentials}</Text>
          </View>
        </View>
        <Text style={styles.focus}>{planHealthMock.clinician.focus}</Text>
        <Text style={styles.quote}>“{planHealthMock.clinician.quote}”</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Play somatic wave riding"
          onPress={() => setPlaying((value) => !value)}
          style={styles.audioRow}
        >
          <View style={styles.playButton}>
            {playing ? <IconPause size={14} color={colors.bg} /> : <IconPlay size={14} color={colors.bg} />}
          </View>
          <View style={styles.audioCopy}>
            <Text style={styles.audioTitle}>{planHealthMock.clinician.audioTitle}</Text>
            <View style={styles.audioTrack}>
              <View style={[styles.audioFill, { width: playing ? '38%' : '18%' }]} />
            </View>
          </View>
          <Text style={styles.audioTime}>{planHealthMock.clinician.audioDuration}</Text>
        </Pressable>
      </Card>

      <Card>
        <View style={styles.recoveryRow}>
          <IconBubble>
            <IconLeaf size={16} color={colors.mint} />
          </IconBubble>
          <View style={styles.recoveryCopy}>
            <Text style={styles.recoveryTitle}>{planHealthMock.recovery.title}</Text>
            <Text style={styles.helper}>
              {planHealthMock.recovery.body} +{planHealthMock.recovery.changePercent}%
            </Text>
          </View>
          <Text style={styles.recoveryValue}>+{planHealthMock.recovery.changePercent}%</Text>
        </View>
      </Card>

      <Pressable accessibilityRole="button" style={styles.primaryButton}>
        <IconPulse size={16} color={colors.onPrimaryDark} />
        <Text style={styles.primaryText}>Schedule Clinical Check-in</Text>
      </Pressable>
      <Pressable accessibilityRole="button" style={styles.ghostButton}>
        <IconSliders size={16} color={colors.text} />
        <Text style={styles.ghostText}>Adjust taper pace</Text>
      </Pressable>
      <Text style={styles.guideline}>{planHealthMock.guideline}</Text>
    </ScrollView>
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
  },
  cleanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.greenMuted,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.green,
  },
  cleanBadgeText: {
    color: colors.green,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
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
    letterSpacing: 1.2,
    fontWeight: '600',
  },
  phase: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  headlineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  headline: {
    color: colors.text,
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.45,
    flex: 1,
  },
  paceBadge: {
    backgroundColor: colors.mintDim,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 4,
  },
  paceText: {
    color: colors.mint,
    fontSize: 11,
    fontWeight: '700',
  },
  body: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionEyebrow: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  headroom: {
    color: colors.mint,
    fontSize: 12,
    fontWeight: '600',
  },
  targetValue: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: 34,
    letterSpacing: -0.68,
    marginTop: 8,
    fontVariant: ['tabular-nums'],
  },
  targetCap: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '600',
  },
  barTrack: {
    height: 6,
    backgroundColor: colors.mintDim,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 12,
  },
  barFill: {
    height: 6,
    backgroundColor: colors.mint,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  pacingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
  },
  pacingCopy: {
    flex: 1,
  },
  inlineIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pacingTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  helper: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.mint,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  logText: {
    color: colors.bg,
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  frameworkBadge: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  frameworkText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
  },
  timelineCard: {
    paddingVertical: 8,
  },
  weekRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 10,
  },
  weekDivider: {
    borderBottomWidth: 0,
  },
  weekRail: {
    width: 20,
    alignItems: 'center',
  },
  weekDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDotDone: {
    backgroundColor: colors.mint,
    borderColor: colors.mint,
  },
  weekDotActive: {
    borderColor: colors.mint,
    backgroundColor: colors.mintDim,
  },
  weekLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginTop: 4,
    minHeight: 18,
  },
  weekCopy: {
    flex: 1,
  },
  weekTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'flex-start',
  },
  weekTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  weekStatus: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  weekStatusActive: {
    color: colors.mint,
  },
  weekStatusDone: {
    color: colors.green,
  },
  weekDetail: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  weekProgress: {
    marginTop: 8,
    gap: 6,
  },
  weekProgressTrack: {
    height: 4,
    backgroundColor: colors.mintDim,
    borderRadius: 2,
    overflow: 'hidden',
  },
  weekProgressFill: {
    height: 4,
    backgroundColor: colors.mint,
  },
  weekProgressLabel: {
    color: colors.textMuted,
    fontSize: 11,
  },
  clinicianTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clinicianCopy: {
    flex: 1,
  },
  clinicianNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  clinicianName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  verified: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clinicianCreds: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
  focus: {
    color: colors.mint,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 14,
  },
  quote: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioCopy: {
    flex: 1,
  },
  audioTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  audioTrack: {
    height: 4,
    backgroundColor: colors.mintDim,
    borderRadius: 2,
    overflow: 'hidden',
  },
  audioFill: {
    height: 4,
    backgroundColor: colors.mint,
  },
  audioTime: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  recoveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recoveryCopy: {
    flex: 1,
  },
  recoveryTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  recoveryValue: {
    color: colors.mint,
    fontSize: 18,
    fontWeight: '700',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.mint,
    borderRadius: radii.pill,
    paddingVertical: 15,
  },
  primaryText: {
    color: colors.onPrimaryDark,
    fontFamily: fonts.label,
    fontSize: 14,
  },
  ghostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingVertical: 14,
  },
  ghostText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  guideline: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
});
