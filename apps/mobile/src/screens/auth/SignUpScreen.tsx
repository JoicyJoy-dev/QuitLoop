import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { ApiError } from '../../auth/api';
import { useAuth } from '../../auth/AuthContext';
import { colors } from '../../theme';
import { AuthShell } from './AuthShell';
import { authStyles } from './authStyles';

type SignUpScreenProps = {
  onLogin: () => void;
};

export function SignUpScreen({ onLogin }: SignUpScreenProps) {
  const { signUp } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async () => {
    setError('');
    setPending(true);
    try {
      await signUp({
        email: email.trim(),
        password,
        displayName: displayName.trim() || undefined,
      });
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : 'Unable to create your account.');
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthShell
      kicker="Create account"
      title="Start a taper that stays with you."
      body="We’ll apply UK regional defaults. Password must be at least 8 characters."
    >
      <View style={authStyles.field}>
        <Text style={authStyles.label}>Name</Text>
        <TextInput
          autoComplete="name"
          placeholder="Alex"
          placeholderTextColor={colors.textMuted}
          style={authStyles.input}
          value={displayName}
          onChangeText={setDisplayName}
        />
      </View>
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
      <View style={authStyles.field}>
        <Text style={authStyles.label}>Password</Text>
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
      {error ? <Text style={authStyles.error}>{error}</Text> : null}
      <Pressable
        accessibilityRole="button"
        disabled={pending}
        onPress={() => void submit()}
        style={[authStyles.button, pending && { opacity: 0.6 }]}
      >
        <Text style={authStyles.buttonText}>{pending ? 'Creating account…' : 'Create account'}</Text>
      </Pressable>
      <View style={authStyles.links}>
        <Pressable onPress={onLogin}>
          <Text style={authStyles.link}>Already have an account? Sign in</Text>
        </Pressable>
      </View>
    </AuthShell>
  );
}
