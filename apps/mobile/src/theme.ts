export const colors = {
  bg: '#0D191F',
  background: '#09151B',
  surface: '#13242C',
  surfaceMuted: '#152127',
  surfaceHigh: '#202C32',
  surfaceFrost: 'rgba(25, 45, 54, 0.72)',
  border: 'rgba(148, 175, 189, 0.14)',
  borderStrong: 'rgba(148, 175, 189, 0.24)',
  text: '#F0F6F8',
  textSecondary: '#98ADB8',
  textMuted: '#5F7582',
  mint: '#19B5A5',
  mintBright: '#54DBCA',
  mintDim: 'rgba(25, 181, 165, 0.2)',
  onPrimary: '#003732',
  onPrimaryDark: '#061014',
  green: '#76C79A',
  greenMuted: 'rgba(118, 199, 154, 0.16)',
  coral: '#F0806A',
  coralSoft: '#FFB4A5',
  dawn: '#7BB8DC',
  warning: '#7BB8DC',
  white: '#FFFFFF',
};

export const fonts = {
  display: 'Outfit_600SemiBold',
  headline: 'Outfit_600SemiBold',
  headlineMd: 'Outfit_500Medium',
  body: 'PlusJakartaSans_400Regular',
  label: 'PlusJakartaSans_600SemiBold',
};

export const type = {
  display: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.68,
    color: colors.text,
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.45,
    color: colors.text,
  },
  title: {
    fontFamily: fonts.label,
    fontSize: 18,
    lineHeight: 26,
    color: colors.text,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.textSecondary,
  },
  bodyMd: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  bodySm: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  label: {
    fontFamily: fonts.label,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.14,
    color: colors.text,
  },
  labelMd: {
    fontFamily: fonts.label,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.24,
    color: colors.textMuted,
  },
  labelSm: {
    fontFamily: fonts.label,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.44,
    color: colors.textMuted,
  },
};

export const radii = {
  sm: 8,
  md: 24,
  lg: 32,
  xl: 48,
  pill: 9999,
};

export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 36,
};

export const elevation = {
  card: {
    borderWidth: 1,
    borderColor: 'rgba(148, 175, 189, 0.12)',
    shadowColor: '#00080C',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  tealGlow: {
    shadowColor: '#19B5A5',
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  coralGlow: {
    shadowColor: '#F0806A',
    shadowOpacity: 0.32,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
};
