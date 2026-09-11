import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { colors } from '../theme';

type ProgressRingProps = {
  size: number;
  strokeWidth: number;
  progress: number;
  valueLabel: string;
  caption: string;
  footer: string;
};

export function ProgressRing({
  size,
  strokeWidth,
  progress,
  valueLabel,
  caption,
  footer,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(1, Math.max(0, progress));
  const offset = circumference * (1 - clamped);

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.mintDim}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.mint}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.center} pointerEvents="none">
        <Text style={styles.caption}>{caption}</Text>
        <Text style={styles.value}>{valueLabel}</Text>
        <Text style={styles.footer}>{footer}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  caption: {
    color: colors.textMuted,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  value: {
    color: colors.text,
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -1,
  },
  footer: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
});
