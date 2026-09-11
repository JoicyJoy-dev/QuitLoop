import { ReactNode, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandMark } from '../components/BrandMark';
import { Card } from '../components/Card';
import { IconBubble } from '../components/IconBubble';
import {
  IconArrowRight,
  IconBriefcase,
  IconCar,
  IconCheck,
  IconCoffee,
  IconGlass,
  IconMinus,
  IconMoon,
  IconPlus,
  IconSliders,
  IconUtensils,
} from '../components/icons';
import { dashboardLocale } from '../data/dashboardMock';
import { roadmapCalibrationMock } from '../data/roadmapCalibrationMock';
import { formatMoney } from '../format';
import { colors, fonts, radii, space } from '../theme';

type RoadmapCalibrationScreenProps = {
  onContinue: () => void;
};

export function RoadmapCalibrationScreen({ onContinue }: RoadmapCalibrationScreenProps) {
  const insets = useSafeAreaInsets();
  const { baseline, plans } = roadmapCalibrationMock;
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [puffs, setPuffs] = useState(baseline.defaultPuffsPerDay);
  const [planId, setPlanId] = useState(plans[0].id);

  const pods = (puffs / baseline.puffsPerPod).toFixed(1);
  const weeklyMinor = Math.round(puffs * baseline.pencePerPuff);
  const annualMinor = weeklyMinor * 52;
  const weekly = formatMoney(weeklyMinor, dashboardLocale.currencyCode, dashboardLocale.languageCode);
  const annual = formatMoney(annualMinor, dashboardLocale.currencyCode, dashboardLocale.languageCode);

  const progressWidth = useMemo(
    () => `${(roadmapCalibrationMock.step / roadmapCalibrationMock.stepCount) * 100}%` as const,
    [],
  );

  const toggleTrigger = (id: string) => {
    setSelectedTriggers((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const changePuffs = (delta: number) => {
    setPuffs((value) => Math.min(baseline.maxPuffs, Math.max(baseline.minPuffs, value + delta)));
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 28 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.stepRow}>
          <View style={styles.stepBrand}>
            <BrandMark size={28} />
            <Text style={styles.stepLabel}>
              STEP {roadmapCalibrationMock.step} OF {roadmapCalibrationMock.stepCount}
            </Text>
          </View>
          <Text style={styles.stepTitle}>{roadmapCalibrationMock.title}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: progressWidth }]} />
        </View>

        <Text style={styles.question}>{roadmapCalibrationMock.question}</Text>
        <Text style={styles.intro}>{roadmapCalibrationMock.intro}</Text>

        <Card style={styles.triggerCard}>
          {roadmapCalibrationMock.triggers.map((trigger, index) => {
            const selected = selectedTriggers.includes(trigger.id);
            return (
              <Pressable
                key={trigger.id}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selected }}
                accessibilityLabel={trigger.label}
                onPress={() => toggleTrigger(trigger.id)}
                style={[
                  styles.triggerRow,
                  index < roadmapCalibrationMock.triggers.length - 1 && styles.rowDivider,
                ]}
              >
                <IconBubble>{triggerIcon(trigger.id)}</IconBubble>
                <Text style={styles.triggerLabel}>{trigger.label}</Text>
                <SelectionMark selected={selected} />
              </Pressable>
            );
          })}
        </Card>

        <Card>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <IconBubble>
                <IconSliders size={16} color={colors.mint} />
              </IconBubble>
              <View>
                <Text style={styles.cardTitle}>{baseline.title}</Text>
                <Text style={styles.helper}>{baseline.helper}</Text>
              </View>
            </View>
            <View style={styles.standardBadge}>
              <Text style={styles.standardText}>{baseline.standardLabel}</Text>
            </View>
          </View>

          <Text style={styles.intakeLabel}>Estimated intake</Text>
          <View style={styles.stepperRow}>
            <Text style={styles.puffValue}>{puffs}</Text>
            <Text style={styles.puffUnit}>puffs / day</Text>
            <View style={styles.stepper}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Decrease puffs"
                onPress={() => changePuffs(-baseline.puffStep)}
                style={styles.stepperButton}
              >
                <IconMinus size={16} color={colors.text} />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Increase puffs"
                onPress={() => changePuffs(baseline.puffStep)}
                style={styles.stepperButton}
              >
                <IconPlus size={16} color={colors.text} />
              </Pressable>
            </View>
          </View>
          <Text style={styles.helper}>
            ≈ {pods} pods • {baseline.nicotineMgMl}mg/ml salt
          </Text>

          <View style={styles.moneyRow}>
            <View>
              <Text style={styles.moneyLabel}>Weekly spend</Text>
              <Text style={styles.moneyValue}>{weekly}</Text>
            </View>
            <View>
              <Text style={styles.moneyLabel}>Potential annual saving</Text>
              <Text style={styles.moneyValue}>{annual}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select your pace</Text>
          <Text style={styles.sectionMeta}>{roadmapCalibrationMock.paceHint}</Text>
        </View>

        {plans.map((plan) => {
          const selected = planId === plan.id;
          return (
            <Pressable
              key={plan.id}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => setPlanId(plan.id)}
            >
              <Card style={[styles.planCard, selected && styles.planCardSelected]}>
                <View style={styles.planTop}>
                  <SelectionMark selected={selected} />
                  <Text style={styles.planTitle}>{plan.title}</Text>
                  {plan.recommended ? (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>{roadmapCalibrationMock.popularLabel}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.planBody}>{plan.body}</Text>
              </Card>
            </Pressable>
          );
        })}

        <Card style={styles.roadmapCard}>
          <Text style={styles.roadmapLabel}>{roadmapCalibrationMock.roadmap.authorityLabel}</Text>
          <Text style={styles.roadmapBody}>{roadmapCalibrationMock.roadmap.body}</Text>
          <View style={styles.chipRow}>
            {roadmapCalibrationMock.roadmap.chips.map((chip) => (
              <View key={chip} style={styles.chip}>
                <View style={styles.chipDot} />
                <Text style={styles.chipText}>{chip}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Continue to my plan"
          onPress={onContinue}
          style={styles.continueButton}
        >
          <Text style={styles.continueText}>Continue to My Plan</Text>
          <IconArrowRight size={16} color={colors.onPrimaryDark} />
        </Pressable>
        <Text style={styles.footer}>{roadmapCalibrationMock.footer}</Text>
      </ScrollView>
    </View>
  );
}

function SelectionMark({ selected }: { selected: boolean }) {
  return (
    <View style={[styles.mark, selected && styles.markSelected]}>
      {selected ? <IconCheck size={12} color={colors.bg} /> : null}
    </View>
  );
}

function triggerIcon(id: string): ReactNode {
  switch (id) {
    case 'coffee':
      return <IconCoffee size={16} color={colors.mint} />;
    case 'work':
      return <IconBriefcase size={16} color={colors.mint} />;
    case 'social':
      return <IconGlass size={16} color={colors.mint} />;
    case 'commute':
      return <IconCar size={16} color={colors.mint} />;
    case 'meals':
      return <IconUtensils size={16} color={colors.mint} />;
    default:
      return <IconMoon size={16} color={colors.mint} />;
  }
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
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  stepTitle: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  progressTrack: {
    height: 3,
    backgroundColor: colors.surface,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    backgroundColor: colors.mint,
  },
  question: {
    color: colors.text,
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.45,
  },
  intro: {
    color: colors.textSecondary,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
  },
  triggerCard: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  triggerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  triggerLabel: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  mark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markSelected: {
    backgroundColor: colors.mint,
    borderColor: colors.mint,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    flex: 1,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  helper: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },
  standardBadge: {
    backgroundColor: colors.mintDim,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  standardText: {
    color: colors.mint,
    fontSize: 10,
    fontWeight: '700',
  },
  intakeLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  puffValue: {
    color: colors.text,
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -1,
  },
  puffUnit: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 8,
    flex: 1,
  },
  stepper: {
    flexDirection: 'row',
    gap: 8,
  },
  stepperButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moneyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  moneyLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  moneyValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
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
  sectionMeta: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  planCard: {
    borderWidth: 1,
  },
  planCardSelected: {
    borderColor: colors.mint,
    backgroundColor: '#0F1A18',
  },
  planTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  planTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  popularBadge: {
    backgroundColor: colors.mint,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  popularText: {
    color: colors.bg,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  planBody: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  roadmapCard: {
    backgroundColor: colors.surfaceMuted,
  },
  roadmapLabel: {
    color: colors.mint,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  roadmapBody: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.mint,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.mint,
    borderRadius: radii.pill,
    paddingVertical: 16,
    marginTop: 4,
  },
  continueText: {
    color: colors.onPrimaryDark,
    fontFamily: fonts.label,
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
