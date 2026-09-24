import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AmbientGlow } from '../../components/AmbientGlow';
import { BrandMark } from '../../components/BrandMark';
import { colors, fonts, space } from '../../theme';

type AuthShellProps = {
  kicker: string;
  title: string;
  body: string;
  children: ReactNode;
};

export function AuthShell({ kicker, title, body, children }: AuthShellProps) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 32 },
        ]}
      >
        <AmbientGlow />
        <View style={styles.brand}>
          <BrandMark size={40} />
          <Text style={styles.kicker}>{kicker}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: space.lg,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 28,
  },
  kicker: {
    fontFamily: fonts.label,
    fontSize: 11,
    letterSpacing: 1.2,
    color: colors.mint,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.6,
    color: colors.text,
  },
  body: {
    marginTop: 12,
    marginBottom: 28,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSecondary,
  },
});
