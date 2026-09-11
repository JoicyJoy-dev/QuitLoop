import { StyleSheet, View } from 'react-native';

import { colors } from '../theme';

export function AmbientGlow() {
  return <View pointerEvents="none" style={styles.glow} />;
}

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.mint,
    opacity: 0.12,
  },
});
