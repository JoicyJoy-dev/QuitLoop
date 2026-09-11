import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '../theme';

type SparklineProps = {
  width?: number;
  height?: number;
};

export function Sparkline({ width = 150, height = 28 }: SparklineProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 150 28">
      <Path
        d="M2 18 C 22 18, 32 8, 48 10 S 78 24, 96 16 S 128 8, 148 12"
        stroke={colors.mint}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
      <Circle cx="148" cy="12" r="3.5" fill={colors.mint} />
    </Svg>
  );
}
