import { BlurView } from 'expo-blur';
import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabId } from '../navigation/tabs';
import { colors, elevation, fonts, radii } from '../theme';
import { IconHeart, IconHome, IconPerson, IconStats, IconWaves } from './icons';

type BottomTabBarProps = {
  current: TabId;
  onChange: (tab: TabId) => void;
};

export function BottomTabBar({ current, onChange }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const fabScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] });

  return (
    <View style={[styles.dockWrap, { bottom: Math.max(insets.bottom, 10) + 6 }]}>
      <View style={styles.dock}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={36} tint="dark" style={StyleSheet.absoluteFill} />
        ) : null}
        <TabButton
          label="Journey"
          active={current === 'home'}
          onPress={() => onChange('home')}
          icon={<IconHome size={22} color={current === 'home' ? colors.mintBright : colors.textMuted} filled={current === 'home'} />}
        />
        <TabButton
          label="Toolkit"
          active={current === 'track'}
          onPress={() => onChange('track')}
          icon={<IconStats size={22} color={current === 'track' ? colors.mintBright : colors.textMuted} />}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="SOS craving intervention"
          onPress={() => onChange('breathe')}
          style={styles.fabWrap}
        >
          <Animated.View style={[styles.fab, { transform: [{ scale: fabScale }] }, current === 'breathe' && styles.fabActive]}>
            <IconWaves size={26} color={colors.white} />
          </Animated.View>
          <Text style={[styles.label, current === 'breathe' && styles.labelActive]}>SOS</Text>
        </Pressable>
        <TabButton
          label="Health"
          active={current === 'health'}
          onPress={() => onChange('health')}
          icon={<IconHeart size={22} color={current === 'health' ? colors.mintBright : colors.textMuted} filled={current === 'health'} />}
        />
        <TabButton
          label="Community"
          active={current === 'profile'}
          onPress={() => onChange('profile')}
          icon={<IconPerson size={22} color={current === 'profile' ? colors.mintBright : colors.textMuted} />}
        />
      </View>
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
  dockWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
  },
  dock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: colors.surfaceFrost,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingBottom: 2,
  },
  fabWrap: {
    alignItems: 'center',
    marginTop: -26,
    width: 72,
  },
  fab: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    ...elevation.coralGlow,
  },
  fabActive: {
    transform: [{ scale: 1.04 }],
  },
  label: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.44,
    fontFamily: fonts.label,
  },
  labelActive: {
    color: colors.text,
  },
});
