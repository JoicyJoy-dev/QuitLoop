import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { ApiError } from '../../auth/api';
import { useAuth } from '../../auth/AuthContext';
import { colors } from '../../theme';
import { AuthShell } from './AuthShell';
import { authStyles } from './authStyles';

type LoginScreenProps = {
  onSignUp: () => void;
  onForgotPassword: () => void;
};

export function LoginScreen({ onSignUp, onForgotPassword }: LoginScreenProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async () => {
    setError('');
    setPending(true);
    try {
      await signIn(email.trim(), password);
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : 'Unable to sign in.');
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthShell
      kicker="Sign in"
      title="Welcome back to your taper."
      body="Use the email and password for your QuitLoop account. Your session stays on this device."
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
      <View style={authStyles.field}>
        <Text style={authStyles.label}>Password</Text>
        <TextInput
          secureTextEntry
          autoComplete="password"
          placeholder="Your password"
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
        <Text style={authStyles.buttonText}>{pending ? 'Signing in…' : 'Enter sanctuary'}</Text>
      </Pressable>
      <View style={authStyles.links}>
        <Pressable onPress={onForgotPassword}>
          <Text style={authStyles.link}>Forgotten password?</Text>
        </Pressable>
        <Pressable onPress={onSignUp}>
          <Text style={authStyles.link}>Create an account</Text>
        </Pressable>
      </View>
    </AuthShell>
  );
}
