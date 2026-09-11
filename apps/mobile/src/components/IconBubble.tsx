import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../theme';

type IconBubbleProps = {
  children: ReactNode;
  backgroundColor?: string;
  size?: number;
};

export function IconBubble({
  children,
  backgroundColor = colors.surfaceMuted,
  size = 36,
}: IconBubbleProps) {
  return (
    <View
      style={[
        styles.bubble,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
