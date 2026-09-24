import { StyleSheet } from 'react-native';

import { colors, fonts, radii, space } from '../../theme';

export const authStyles = StyleSheet.create({
  field: {
    marginBottom: space.md,
  },
  label: {
    marginBottom: 8,
    fontFamily: fonts.label,
    fontSize: 13,
    color: colors.text,
  },
  input: {
    height: 52,
    borderRadius: radii.pill,
    paddingHorizontal: 20,
    backgroundColor: colors.surfaceHigh,
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: 16,
  },
  error: {
    marginBottom: space.md,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.coralSoft,
  },
  notice: {
    marginBottom: space.md,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  button: {
    height: 52,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mint,
    marginTop: 4,
  },
  buttonText: {
    fontFamily: fonts.label,
    fontSize: 15,
    color: colors.onPrimary,
  },
  links: {
    marginTop: 20,
    alignItems: 'center',
    gap: 10,
  },
  link: {
    fontFamily: fonts.label,
    fontSize: 14,
    color: colors.mintBright,
  },
});
