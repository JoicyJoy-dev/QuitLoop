import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

type AvatarProps = {
  initials: string;
  size?: number;
  backgroundColor?: string;
};

export function Avatar({
  initials,
  size = 36,
  backgroundColor = '#C9A48A',
}: AvatarProps) {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.38 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2A2420',
  },
  initials: {
    color: colors.white,
    fontWeight: '700',
  },
});
