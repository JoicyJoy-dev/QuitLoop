import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { ApiError } from '../../auth/api';
import { useAuth } from '../../auth/AuthContext';
import { colors } from '../../theme';
import { AuthShell } from './AuthShell';
import { authStyles } from './authStyles';

type ResetPasswordScreenProps = {
  initialToken?: string;
  onLogin: () => void;
};

export function ResetPasswordScreen({ initialToken = '', onLogin }: ResetPasswordScreenProps) {
  const { confirmPasswordReset } = useAuth();
  const [token, setToken] = useState(initialToken);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async () => {
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setPending(true);
    try {
      await confirmPasswordReset(token.trim(), password);
      onLogin();
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : 'Unable to update your password.');
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthShell
      kicker="New password"
      title="Choose a password only you know."
      body="This token expires after an hour and signs other devices out once the password is changed."
    >
      <View style={authStyles.field}>
        <Text style={authStyles.label}>Reset token</Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Paste the token from your email"
          placeholderTextColor={colors.textMuted}
          style={authStyles.input}
          value={token}
          onChangeText={setToken}
        />
      </View>
      <View style={authStyles.field}>
        <Text style={authStyles.label}>New password</Text>
        <TextInput
          secureTextEntry
          autoComplete="new-password"
          placeholder="At least 8 characters"
          placeholderTextColor={colors.textMuted}
          style={authStyles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={authStyles.field}>
        <Text style={authStyles.label}>Confirm password</Text>
        <TextInput
          secureTextEntry
          autoComplete="new-password"
          placeholder="Repeat password"
          placeholderTextColor={colors.textMuted}
          style={authStyles.input}
          value={confirm}
          onChangeText={setConfirm}
        />
      </View>
      {error ? <Text style={authStyles.error}>{error}</Text> : null}
      <Pressable
        accessibilityRole="button"
        disabled={pending}
        onPress={() => void submit()}
        style={[authStyles.button, pending && { opacity: 0.6 }]}
      >
        <Text style={authStyles.buttonText}>{pending ? 'Updating…' : 'Update password'}</Text>
      </Pressable>
      <View style={authStyles.links}>
        <Pressable onPress={onLogin}>
          <Text style={authStyles.link}>Back to sign in</Text>
        </Pressable>
      </View>
    </AuthShell>
  );
}
