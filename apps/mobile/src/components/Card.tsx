import { BlurView } from 'expo-blur';
import { ReactNode } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, elevation, radii, space } from '../theme';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Card({ children, style }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={28} tint="dark" style={StyleSheet.absoluteFill} />
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceFrost,
    borderRadius: radii.md,
    overflow: 'hidden',
    padding: space.lg,
    ...elevation.card,
  },
});
