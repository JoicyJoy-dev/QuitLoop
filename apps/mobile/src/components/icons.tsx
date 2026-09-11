import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = {
  size?: number;
  color: string;
};

export function IconInfinite({ size = 22, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.2 8c4.8 0 4.8 8 0 8-4.9 0-6.9-8-12.4-8-4.3 0-4.3 8 0 8 5.5 0 7.5-8 12.4-8z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconBell({ size = 20, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path d="M10 20a2 2 0 0 0 4 0" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function IconDroplet({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3s7 7.2 7 11.2A7 7 0 1 1 5 14.2C5 10.2 12 3 12 3z"
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  );
}

export function IconClock({ size = 14, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth={1.8} />
      <Path d="M12 8v5l3 2" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function IconTrendingDown({ size = 14, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 8l6 6 4-4 6 6" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M16 16h4v-4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function IconPlus({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function IconChart({ size = 18, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 19h16" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Rect x="6" y="11" width="3" height="6" rx="1" stroke={color} strokeWidth={1.6} />
      <Rect x="11" y="7" width="3" height="10" rx="1" stroke={color} strokeWidth={1.6} />
      <Rect x="16" y="9" width="3" height="8" rx="1" stroke={color} strokeWidth={1.6} />
    </Svg>
  );
}

export function IconFlash({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M13 2 4 14h7l-1 8 10-14h-7l0-6z" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
    </Svg>
  );
}

export function IconLeaf({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 19c8-1 12-8 14-15-8 1-13 6-14 15z" stroke={color} strokeWidth={1.8} />
      <Path d="M8 16c2-4 6-7 11-8" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export function IconCash({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="6" width="18" height="12" rx="2" stroke={color} strokeWidth={1.8} />
      <Circle cx="12" cy="12" r="2.4" stroke={color} strokeWidth={1.6} />
    </Svg>
  );
}

export function IconWarning({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4 3 19h18L12 4z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      <Path d="M12 10v4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx="12" cy="16.2" r="0.8" fill={color} />
    </Svg>
  );
}

export function IconPulse({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 12h4l2-6 4 12 2-6h6" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconSync({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 12a8 8 0 0 1 13.5-5.8L20 8" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M20 4v4h-4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M20 12a8 8 0 0 1-13.5 5.8L4 16" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M4 20v-4h4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function IconArrowRight({ size = 14, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconHeart({ size = 18, color, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
      <Path
        d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconHome({ size = 22, color, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
      <Path
        d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconStats({ size = 22, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 19V9" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M10 19V5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M16 19v-7" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M22 19V8" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function IconWaves({ size = 26, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 12c2.5-3 4.5-3 7 0s4.5 3 7 0 4.5-3 4 0" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M3 17c2.5-3 4.5-3 7 0s4.5 3 7 0 4.5-3 4 0" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function IconPerson({ size = 22, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="3.2" stroke={color} strokeWidth={1.8} />
      <Path d="M5 19c1.4-3.2 4-5 7-5s5.6 1.8 7 5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function IconEye({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke={color} strokeWidth={1.8} />
      <Circle cx="12" cy="12" r="2.4" stroke={color} strokeWidth={1.6} />
    </Svg>
  );
}

export function IconPhone({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 3h4l1 5-3 2c1.2 2.4 3.4 4.6 5.8 5.8l2-3 5 1v4c0 1-1 2-2 2C10.6 19.8 4.2 13.4 4 7c0-1 1-2 2-2z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconPause({ size = 14, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M8 5v14M16 5v14" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
    </Svg>
  );
}

export function IconPlay({ size = 14, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M8 6v12l11-6L8 6z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
    </Svg>
  );
}

export function IconHourglass({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 4h12M6 20h12M7 4c0 5 5 6 5 8s-5 3-5 8M17 4c0 5-5 6-5 8s5 3 5 8" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function IconCheck({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12l5 5 9-10" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconTarget({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth={1.8} />
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={1.6} />
    </Svg>
  );
}

export function IconMinus({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12h14" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function IconCoffee({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" stroke={color} strokeWidth={1.8} />
      <Path d="M16 9h2.5a2.5 2.5 0 1 1 0 5H16" stroke={color} strokeWidth={1.8} />
      <Path d="M6 20h10" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function IconBriefcase({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="8" width="18" height="11" rx="2" stroke={color} strokeWidth={1.8} />
      <Path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

export function IconGlass({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M8 4h8l-1.2 12.5A3 3 0 0 1 11.8 19h-.6a3 3 0 0 1-3-2.5L7 4h1z" stroke={color} strokeWidth={1.8} />
      <Path d="M8 10h8" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export function IconCar({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 14 6 9h12l2 5v4H4v-4z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      <Circle cx="7.5" cy="17.5" r="1.2" fill={color} />
      <Circle cx="16.5" cy="17.5" r="1.2" fill={color} />
    </Svg>
  );
}

export function IconUtensils({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M8 4v7M6 4v4a2 2 0 0 0 4 0V4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M8 11v9M16 4v6a2 2 0 0 0 2 2h0V4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M18 12v8" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function IconMoon({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M15 3a8 8 0 1 0 6 13 7 7 0 0 1-6-13z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
    </Svg>
  );
}

export function IconSliders({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7h16M4 17h16" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx="9" cy="7" r="2" fill={color} />
      <Circle cx="15" cy="17" r="2" fill={color} />
    </Svg>
  );
}
