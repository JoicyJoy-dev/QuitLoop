import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, space, type } from '../theme';

type PlaceholderScreenProps = {
  title: string;
  body: string;
};

export function PlaceholderScreen({ title, body }: PlaceholderScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 24 }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: space.lg,
  },
  title: {
    ...type.headline,
  },
  body: {
    ...type.body,
    marginTop: 10,
  },
});
