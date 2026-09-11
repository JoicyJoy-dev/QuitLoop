import * as Haptics from 'expo-haptics';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '../components/Avatar';
import { BrandMark } from '../components/BrandMark';
import { Card } from '../components/Card';
import { IconBubble } from '../components/IconBubble';
import {
  IconArrowRight,
  IconBell,
  IconCash,
  IconChart,
  IconClock,
  IconDroplet,
  IconFlash,
  IconHeart,
  IconLeaf,
  IconPlus,
  IconPulse,
  IconSync,
  IconTrendingDown,
  IconWarning,
} from '../components/icons';
import { ProgressRing } from '../components/ProgressRing';
import { Sparkline } from '../components/Sparkline';
import { dashboardLocale, dashboardMock } from '../data/dashboardMock';
import { formatMoney } from '../format';
import { AmbientGlow } from '../components/AmbientGlow';
import { colors, fonts, radii, space } from '../theme';

type DashboardScreenProps = {
  onStartReset: () => void;
};

export function DashboardScreen({ onStartReset }: DashboardScreenProps) {
  const insets = useSafeAreaInsets();
  const [logged, setLogged] = useState(dashboardMock.allowance.logged);
  const { limit } = dashboardMock.allowance;

  const remainingPercent = useMemo(
    () => Math.round(((limit - logged) / limit) * 100),
    [logged, limit],
  );
  const greeting = `Good morning, ${dashboardMock.user.firstName}.`;
  const saved = formatMoney(
    dashboardMock.savings.amountMinorUnits,
    dashboardLocale.currencyCode,
    dashboardLocale.languageCode,
  );

  const logPuff = () => {
    if (logged >= limit) {
      return;
    }
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => undefined);
    setLogged((value) => Math.min(limit, value + 1));
  };

  const startReset = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
    onStartReset();
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 8, paddingBottom: 140 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <AmbientGlow />
      <View style={styles.topRow}>
        <View style={styles.brand}>
          <BrandMark size={32} />
          <Text style={styles.brandTitle}>Dashboard</Text>
          <View style={styles.cleanBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.cleanBadgeText}>
              DAY {dashboardMock.user.cleanDays} CLEAN
            </Text>
          </View>
        </View>
        <Avatar initials="A" />
      </View>

      <View style={styles.modeRow}>
        <View style={styles.modeDot} />
        <Text style={styles.modeLabel}>{dashboardMock.modeLabel.toUpperCase()}</Text>
      </View>

      <View style={styles.greetingRow}>
        <View style={styles.greetingCopy}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.subgreeting}>{dashboardMock.greetingLine}</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Notifications" style={styles.bell}>
          <IconBell size={20} color={colors.textSecondary} />
          <View style={styles.bellDot} />
        </Pressable>
      </View>

      <Card>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <IconBubble>
              <IconDroplet size={16} color={colors.mint} />
            </IconBubble>
            <Text style={styles.cardTitle}>Daily vape allowance</Text>
          </View>
          <View style={styles.safeBadge}>
            <Text style={styles.safeBadgeText}>Safe zone</Text>
          </View>
        </View>

        <ProgressRing
          size={210}
          strokeWidth={14}
          progress={logged / limit}
          caption="Inhales logged"
          valueLabel={`${logged} / ${limit}`}
          footer={`${remainingPercent}% remaining`}
        />

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <IconClock size={14} color={colors.textMuted} />
            <Text style={styles.metaText}>
              {dashboardMock.allowance.hoursUntilReset} hours until daily reset
            </Text>
          </View>
          <View style={styles.metaItem}>
            <IconTrendingDown size={14} color={colors.mint} />
            <Text style={styles.metaText}>
              On track for {dashboardMock.allowance.weeklyChangePercent}% weekly
            </Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Quick log plus one puff"
            onPress={logPuff}
            style={styles.primaryPill}
          >
            <IconPlus size={16} color={colors.onPrimaryDark} />
            <Text style={styles.primaryPillText}>Quick log +1 puff</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Usage chart" style={styles.iconButton}>
            <IconChart size={18} color={colors.text} />
          </Pressable>
        </View>
      </Card>

      <Card style={styles.urgeCard}>
        <View style={styles.urgeLeft}>
          <IconBubble>
            <IconFlash size={16} color={colors.coralSoft} />
          </IconBubble>
          <View style={styles.urgeCopy}>
            <Text style={styles.urgeTitle}>Feeling an urge right now?</Text>
            <Text style={styles.urgeBody}>
              Surge passes in {dashboardMock.urge.surgeSeconds} seconds.
            </Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Start two minute reset"
          onPress={startReset}
          style={styles.coralPill}
        >
          <Text style={styles.coralPillText}>Start 2-Min Reset</Text>
        </Pressable>
      </Card>

      <View style={styles.statGrid}>
        <Card style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statLabel}>Clean streak</Text>
            <IconLeaf size={16} color={colors.mint} />
          </View>
          <Text style={styles.statValue}>{dashboardMock.streak.days} Days</Text>
          <Text style={styles.statHint}>{dashboardMock.streak.phase}</Text>
        </Card>
        <Card style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statLabel}>Money saved</Text>
            <IconCash size={16} color={colors.mint} />
          </View>
          <Text style={styles.statValue}>{saved}</Text>
          <Text style={styles.statHint}>
            −{dashboardMock.savings.podsAvoided} disposable pods
          </Text>
        </Card>
      </View>

      <View style={styles.statGrid}>
        <Card style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statLabel}>Craving risk</Text>
            <IconWarning size={16} color={colors.warning} />
          </View>
          <Text style={styles.statValueSm}>{dashboardMock.craving.level}</Text>
          <Text style={styles.statHint}>
            Peak at {dashboardMock.craving.peakTime} ({dashboardMock.craving.peakContext})
          </Text>
          <View style={styles.sparkWrap}>
            <Sparkline />
          </View>
        </Card>
        <Card style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statLabel}>O₂ capacity</Text>
            <IconPulse size={16} color={colors.mint} />
          </View>
          <Text style={styles.statValue}>{dashboardMock.oxygen.percent}%</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${dashboardMock.oxygen.percent}%` }]} />
          </View>
          <Text style={styles.statHint}>{dashboardMock.oxygen.note}</Text>
        </Card>
      </View>

      <Card>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <IconBubble>
              <IconSync size={16} color={colors.mint} />
            </IconBubble>
            <Text style={styles.cardTitle}>Habit loop replacement</Text>
          </View>
          <View style={styles.methodBadge}>
            <Text style={styles.methodBadgeText}>{dashboardMock.habitTip.regionLabel}</Text>
          </View>
        </View>
        <Text style={styles.tipTitle}>{dashboardMock.habitTip.title}</Text>
        <Text style={styles.tipBody}>{dashboardMock.habitTip.body}</Text>
        <View style={styles.actionRow}>
          <Pressable accessibilityRole="button" style={styles.ghostPill}>
            <Text style={styles.ghostPillText}>Practise today</Text>
          </Pressable>
          <Pressable accessibilityRole="button" style={styles.ghostPill}>
            <Text style={styles.ghostPillText}>Learn science</Text>
          </Pressable>
        </View>
      </Card>

      <View style={styles.communityHeader}>
        <Text style={styles.communityTitle}>Community milestones</Text>
        <Pressable accessibilityRole="button" style={styles.viewAll}>
          <Text style={styles.viewAllText}>View all</Text>
          <IconArrowRight size={14} color={colors.textSecondary} />
        </Pressable>
      </View>
      <Card style={styles.communityCard}>
        <View style={styles.communityTop}>
          <Avatar initials="SM" size={40} backgroundColor="#7D8B99" />
          <View style={styles.communityCopy}>
            <Text style={styles.communityName}>
              {dashboardMock.community.name}, {dashboardMock.community.place}
            </Text>
            <Text style={styles.communityMeta}>{dashboardMock.community.days} Days</Text>
          </View>
          <IconHeart size={18} color={colors.textMuted} />
        </View>
        <Text style={styles.communityQuote}>“{dashboardMock.community.quote}”</Text>
      </Card>
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
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  brandTitle: {
    color: colors.text,
    fontFamily: fonts.label,
    fontSize: 18,
    lineHeight: 26,
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
    fontFamily: fonts.label,
    fontSize: 11,
    letterSpacing: 0.44,
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
    fontFamily: fonts.label,
    fontSize: 11,
    letterSpacing: 0.44,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 4,
  },
  greetingCopy: {
    flex: 1,
  },
  greeting: {
    color: colors.text,
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.45,
  },
  subgreeting: {
    color: colors.textSecondary,
    fontFamily: fonts.body,
    fontSize: 16,
    marginTop: 6,
    lineHeight: 26,
  },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  bellDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.green,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  cardTitle: {
    color: colors.text,
    fontFamily: fonts.label,
    fontSize: 16,
    lineHeight: 24,
  },
  safeBadge: {
    backgroundColor: colors.mintDim,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  safeBadgeText: {
    color: colors.mintBright,
    fontFamily: fonts.label,
    fontSize: 11,
  },
  metaRow: {
    gap: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: colors.textSecondary,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  primaryPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.mint,
    borderRadius: radii.pill,
    paddingVertical: 14,
  },
  primaryPillText: {
    color: colors.onPrimaryDark,
    fontFamily: fonts.label,
    fontSize: 14,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  urgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  urgeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  urgeCopy: {
    flex: 1,
  },
  urgeTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  urgeBody: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 3,
  },
  coralPill: {
    backgroundColor: colors.coralSoft,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  coralPillText: {
    color: colors.bg,
    fontSize: 12,
    fontWeight: '700',
  },
  statGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statLabel: {
    color: colors.textMuted,
    fontFamily: fonts.label,
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
  },
  statValue: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: 26,
    letterSpacing: -0.4,
    fontVariant: ['tabular-nums'],
  },
  statValueSm: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  statHint: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 6,
    lineHeight: 17,
  },
  sparkWrap: {
    marginTop: 12,
  },
  barTrack: {
    height: 4,
    backgroundColor: colors.mintDim,
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  barFill: {
    height: 4,
    backgroundColor: colors.mint,
    borderRadius: 2,
  },
  tipTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 8,
  },
  tipBody: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  ghostPill: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingVertical: 11,
    alignItems: 'center',
  },
  ghostPillText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  methodBadge: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  methodBadgeText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  communityTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  communityCard: {
    paddingVertical: 16,
  },
  communityTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  communityCopy: {
    flex: 1,
  },
  communityName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  communityMeta: {
    color: colors.mint,
    fontSize: 12,
    marginTop: 2,
    fontWeight: '600',
  },
  communityQuote: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 12,
    lineHeight: 20,
  },
});
