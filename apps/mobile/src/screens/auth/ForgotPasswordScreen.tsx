import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { ApiError } from '../../auth/api';
import { useAuth } from '../../auth/AuthContext';
import { colors } from '../../theme';
import { AuthShell } from './AuthShell';
import { authStyles } from './authStyles';

type ForgotPasswordScreenProps = {
  onLogin: () => void;
  onReset: (token?: string) => void;
};

export function ForgotPasswordScreen({ onLogin, onReset }: ForgotPasswordScreenProps) {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [devToken, setDevToken] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = async () => {
    setError('');
    setNotice('');
    setDevToken(null);
    setPending(true);
    try {
      const result = await requestPasswordReset(email.trim());
      setNotice(result.message);
      setDevToken(result.devResetToken ?? null);
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : 'Unable to send reset instructions.');
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthShell
      kicker="Reset password"
      title="We’ll help you back in."
      body="If that email has an account, we send a one-hour reset link. In local development the token appears here too."
    >
      <View style={authStyles.field}>
        <Text style={authStyles.label}>Email</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor={colors.textMuted}
          style={authStyles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      {error ? <Text style={authStyles.error}>{error}</Text> : null}
      {notice ? <Text style={authStyles.notice}>{notice}</Text> : null}
      <Pressable
        accessibilityRole="button"
        disabled={pending}
        onPress={() => void submit()}
        style={[authStyles.button, pending && { opacity: 0.6 }]}
      >
        <Text style={authStyles.buttonText}>{pending ? 'Sending…' : 'Send reset instructions'}</Text>
      </Pressable>
      <View style={authStyles.links}>
        {devToken ? (
          <Pressable onPress={() => onReset(devToken)}>
            <Text style={authStyles.link}>Development: set a new password</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => onReset()}>
            <Text style={authStyles.link}>I already have a reset token</Text>
          </Pressable>
        )}
        <Pressable onPress={onLogin}>
          <Text style={authStyles.link}>Back to sign in</Text>
        </Pressable>
      </View>
    </AuthShell>
  );
}
