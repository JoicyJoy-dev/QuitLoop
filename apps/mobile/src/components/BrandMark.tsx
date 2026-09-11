import { Image, StyleProp, ImageStyle } from 'react-native';

const emblem = require('../../assets/brand/quitloop-emblem.png');

type BrandMarkProps = {
  size?: number;
  style?: StyleProp<ImageStyle>;
};

export function BrandMark({ size = 32, style }: BrandMarkProps) {
  return (
    <Image
      source={emblem}
      accessibilityLabel="QuitLoop"
      style={[{ width: size, height: size, borderRadius: size * 0.2 }, style]}
    />
  );
}
