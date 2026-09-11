import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabId } from '../navigation/tabs';
import { colors } from '../theme';
import { IconHeart, IconHome, IconPerson, IconStats, IconWaves } from './icons';

type BottomTabBarProps = {
  current: TabId;
  onChange: (tab: TabId) => void;
};

export function BottomTabBar({ current, onChange }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <TabButton
        label="Home"
        active={current === 'home'}
        onPress={() => onChange('home')}
        icon={<IconHome size={22} color={current === 'home' ? colors.text : colors.textMuted} filled={current === 'home'} />}
      />
      <TabButton
        label="Track"
        active={current === 'track'}
        onPress={() => onChange('track')}
        icon={<IconStats size={22} color={current === 'track' ? colors.text : colors.textMuted} />}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Breathe"
        onPress={() => onChange('breathe')}
        style={styles.fabWrap}
      >
        <View style={[styles.fab, current === 'breathe' && styles.fabActive]}>
          <IconWaves size={26} color={colors.white} />
        </View>
        <Text style={[styles.label, current === 'breathe' && styles.labelActive]}>Breathe</Text>
      </Pressable>
      <TabButton
        label="Health"
        active={current === 'health'}
        onPress={() => onChange('health')}
        icon={<IconHeart size={22} color={current === 'health' ? colors.text : colors.textMuted} filled={current === 'health'} />}
      />
      <TabButton
        label="Profile"
        active={current === 'profile'}
        onPress={() => onChange('profile')}
        icon={<IconPerson size={22} color={current === 'profile' ? colors.text : colors.textMuted} />}
      />
    </View>
  );
}

function TabButton({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: ReactNode;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={styles.tab}>
      {icon}
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingBottom: 4,
  },
  fabWrap: {
    alignItems: 'center',
    marginTop: -28,
    width: 76,
  },
  fab: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: colors.coral,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  fabActive: {
    transform: [{ scale: 1.04 }],
  },
  label: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  labelActive: {
    color: colors.text,
  },
});
