import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '../components/Avatar';
import { BrandMark } from '../components/BrandMark';
import { Card } from '../components/Card';
import { IconBubble } from '../components/IconBubble';
import { IconClock, IconPlus, IconTrendingDown, IconWarning } from '../components/icons';
import { dashboardLocale } from '../data/dashboardMock';
import { TrackingPeriod, trackingAnalyticsMock } from '../data/trackingAnalyticsMock';
import { formatMoney } from '../format';
import { colors, fonts, radii, space } from '../theme';

type TrackingAnalyticsScreenProps = {
  onLogCraving?: () => void;
};

export function TrackingAnalyticsScreen({ onLogCraving }: TrackingAnalyticsScreenProps) {
  const insets = useSafeAreaInsets();
  const [period, setPeriod] = useState<TrackingPeriod>('week');
  const [loggedExtra, setLoggedExtra] = useState(0);

  const average = trackingAnalyticsMock.average[period];
  const displayPuffs = average.puffs + (period === 'today' ? loggedExtra : 0);
  const saved = formatMoney(
    trackingAnalyticsMock.savingsThisWeekMinorUnits,
    dashboardLocale.currencyCode,
    dashboardLocale.languageCode,
  );
  const maxBar = Math.max(trackingAnalyticsMock.ceiling, ...trackingAnalyticsMock.weekBars.map((bar) => bar.puffs));
  const underDays = trackingAnalyticsMock.weekBars.filter((bar) => bar.puffs <= trackingAnalyticsMock.ceiling).length;

  const intensityColor = useMemo(
    () =>
      ({
        High: colors.coral,
        Moderate: colors.warning,
        Low: colors.mint,
      }) as const,
    [],
  );

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
            {trackingAnalyticsMock.title}
          </Text>
          <View style={styles.cleanBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.cleanBadgeText}>DAY {trackingAnalyticsMock.cleanDays} CLEAN</Text>
          </View>
        </View>
        <Avatar initials="A" />
      </View>

      <View style={styles.headlineRow}>
        <View style={styles.headlineCopy}>
          <Text style={styles.headline}>{trackingAnalyticsMock.headline}</Text>
          <Text style={styles.body}>{trackingAnalyticsMock.body}</Text>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>{trackingAnalyticsMock.liveLabel.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.periodRow}>
        {trackingAnalyticsMock.periods.map((item) => {
          const active = period === item.id;
          return (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => setPeriod(item.id)}
              style={[styles.periodChip, active && styles.periodChipActive]}
            >
              <Text style={[styles.periodText, active && styles.periodTextActive]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.eyebrow}>Daily average inhalation</Text>
          <View style={styles.changeBadge}>
            <IconTrendingDown size={12} color={colors.mint} />
            <Text style={styles.changeText}>{average.changePercent}%</Text>
          </View>
        </View>
        <Text style={styles.heroValue}>
          {displayPuffs} <Text style={styles.heroUnit}>puffs / day</Text>
        </Text>
        <Text style={styles.helper}>
          Baseline comparison: {average.baseline} puffs / day
        </Text>
        <Text style={styles.helper}>
          You saved approx {saved} and {trackingAnalyticsMock.nicotineAvoidedMg}mg nicotine this week.
        </Text>
      </Card>

      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>7-Day Taper Trajectory</Text>
          <Text style={styles.ceilingLabel}>Ceiling {trackingAnalyticsMock.ceiling} puffs</Text>
        </View>
        <Text style={styles.helper}>Mon–Sun vs your neuro-regulated safe limit</Text>
        <View style={styles.chart}>
          {trackingAnalyticsMock.weekBars.map((bar, index) => {
            const over = bar.puffs > trackingAnalyticsMock.ceiling;
            const height = Math.max(8, Math.round((bar.puffs / maxBar) * 110));
            return (
              <View key={`${bar.day}-${index}`} style={styles.barCol}>
                <View style={[styles.bar, { height, backgroundColor: over ? colors.coral : colors.mint }]} />
                <Text style={styles.barDay}>{bar.day}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>
            {underDays} of {trackingAnalyticsMock.weekBars.length} days strictly under taper ceiling
          </Text>
          <Text style={styles.adherence}>{trackingAnalyticsMock.adherence.percent}% adherence</Text>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Peak Trigger Zones</Text>
        <Text style={styles.helper}>Circadian clusters & behavioural cues</Text>
        {trackingAnalyticsMock.triggers.map((trigger, index) => (
          <View
            key={trigger.time}
            style={[styles.triggerRow, index < trackingAnalyticsMock.triggers.length - 1 && styles.rowDivider]}
          >
            <IconBubble>
              <IconClock size={14} color={colors.mint} />
            </IconBubble>
            <View style={styles.triggerCopy}>
              <Text style={styles.triggerTime}>{trigger.time}</Text>
              <Text style={styles.triggerTitle}>{trigger.title}</Text>
              <Text style={styles.helper}>{trigger.detail}</Text>
            </View>
            <View style={styles.triggerMeta}>
              <Text style={styles.triggerPuffs}>{trigger.puffs} puffs</Text>
              <Text style={[styles.intensity, { color: intensityColor[trigger.intensity as keyof typeof intensityColor] }]}>
                {trigger.intensity}
                {trigger.intensity === 'High' ? ' flagged' : ''}
              </Text>
            </View>
          </View>
        ))}
        <Text style={styles.aiNote}>AI pattern detected. Auto-schedule a friction point?</Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Neuro-Triggers Breakdown</Text>
        <Text style={styles.helper}>Primary neurobiological drivers reported</Text>
        {trackingAnalyticsMock.neuro.map((item) => (
          <View key={item.label} style={styles.neuroRow}>
            <View style={styles.neuroCopy}>
              <Text style={styles.neuroLabel}>{item.label}</Text>
              <View style={styles.neuroTrack}>
                <View style={[styles.neuroFill, { width: `${item.percent}%` as const }]} />
              </View>
            </View>
            <Text style={styles.neuroPercent}>{item.percent}%</Text>
          </View>
        ))}
      </Card>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Quick log craving or micro puff"
        onPress={() => {
          setLoggedExtra((value) => value + 1);
          onLogCraving?.();
        }}
        style={styles.primaryButton}
      >
        <IconPlus size={16} color={colors.onPrimaryDark} />
        <Text style={styles.primaryText}>Quick Log Craving or Micro-puff</Text>
      </Pressable>
      <View style={styles.syncRow}>
        <IconWarning size={14} color={colors.textMuted} />
        <Text style={styles.syncText}>
          Sync QuitLoop Sensor Band (last sync: {trackingAnalyticsMock.lastSyncMinutesAgo} minutes ago)
        </Text>
      </View>
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
    fontSize: 17,
    fontWeight: '700',
    flexShrink: 1,
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
    letterSpacing: 0.5,
  },
  headlineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  headlineCopy: {
    flex: 1,
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
    fontSize: 15,
    lineHeight: 21,
    marginTop: 6,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.mintDim,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginTop: 6,
  },
  liveText: {
    color: colors.mint,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  periodRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  periodChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  periodChipActive: {
    backgroundColor: colors.surfaceMuted,
  },
  periodText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  periodTextActive: {
    color: colors.text,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.mintDim,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  changeText: {
    color: colors.mint,
    fontSize: 12,
    fontWeight: '700',
  },
  heroValue: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: 36,
    letterSpacing: -0.72,
    marginTop: 8,
    fontVariant: ['tabular-nums'],
  },
  heroUnit: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  helper: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  ceilingLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 132,
    marginTop: 18,
    paddingHorizontal: 4,
  },
  barCol: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  bar: {
    width: 14,
    borderRadius: 7,
  },
  barDay: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 14,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 12,
    flex: 1,
  },
  adherence: {
    color: colors.mint,
    fontSize: 12,
    fontWeight: '700',
  },
  triggerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 12,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  triggerCopy: {
    flex: 1,
  },
  triggerTime: {
    color: colors.mint,
    fontSize: 13,
    fontWeight: '700',
  },
  triggerTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  triggerMeta: {
    alignItems: 'flex-end',
    minWidth: 78,
  },
  triggerPuffs: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  intensity: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  aiNote: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 8,
  },
  neuroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  neuroCopy: {
    flex: 1,
  },
  neuroLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  neuroTrack: {
    height: 5,
    backgroundColor: colors.mintDim,
    borderRadius: 3,
    overflow: 'hidden',
  },
  neuroFill: {
    height: 5,
    backgroundColor: colors.mint,
  },
  neuroPercent: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    width: 40,
    textAlign: 'right',
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
  syncRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  syncText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    flex: 1,
  },
});
