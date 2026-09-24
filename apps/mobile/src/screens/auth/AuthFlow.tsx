import { useState } from 'react';

import { ForgotPasswordScreen } from './ForgotPasswordScreen';
import { LoginScreen } from './LoginScreen';
import { ResetPasswordScreen } from './ResetPasswordScreen';
import { SignUpScreen } from './SignUpScreen';

type Screen = 'login' | 'signup' | 'forgot' | 'reset';

export function AuthFlow() {
  const [screen, setScreen] = useState<Screen>('login');
  const [resetToken, setResetToken] = useState('');

  if (screen === 'signup') {
    return <SignUpScreen onLogin={() => setScreen('login')} />;
  }

  if (screen === 'forgot') {
    return (
      <ForgotPasswordScreen
        onLogin={() => setScreen('login')}
        onReset={(token) => {
          setResetToken(token ?? '');
          setScreen('reset');
        }}
      />
    );
  }

  if (screen === 'reset') {
    return (
      <ResetPasswordScreen
        initialToken={resetToken}
        onLogin={() => {
          setResetToken('');
          setScreen('login');
        }}
      />
    );
  }

  return (
    <LoginScreen
      onSignUp={() => setScreen('signup')}
      onForgotPassword={() => setScreen('forgot')}
    />
  );
}
