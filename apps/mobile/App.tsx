import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from './src/auth/AuthContext';
import { firstNameFrom, initialsFrom } from './src/auth/api';
import { BottomTabBar } from './src/components/BottomTabBar';
import { TabId, tabMeta } from './src/navigation/tabs';
import { AuthFlow } from './src/screens/auth/AuthFlow';
import { CravingSosScreen } from './src/screens/CravingSosScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { PlaceholderScreen } from './src/screens/PlaceholderScreen';
import { PlanHealthScreen } from './src/screens/PlanHealthScreen';
import { RoadmapCalibrationScreen } from './src/screens/RoadmapCalibrationScreen';
import { TrackingAnalyticsScreen } from './src/screens/TrackingAnalyticsScreen';
import { colors } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit_500Medium: require('./assets/fonts/Outfit-Medium.ttf'),
    Outfit_600SemiBold: require('./assets/fonts/Outfit-SemiBold.ttf'),
    PlusJakartaSans_400Regular: require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    PlusJakartaSans_600SemiBold: require('./assets/fonts/PlusJakartaSans-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.shell} />;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function AppShell() {
  const { status, user, signOut } = useAuth();
  const [tab, setTab] = useState<TabId>('home');
  const [calibrated, setCalibrated] = useState(false);

  useEffect(() => {
    if (status === 'signedOut') {
      setCalibrated(false);
      setTab('home');
    }
  }, [status]);

  return (
    <View style={styles.shell}>
      {status === 'loading' ? null : status === 'signedOut' || !user ? (
        <AuthFlow />
      ) : !calibrated ? (
        <RoadmapCalibrationScreen onContinue={() => setCalibrated(true)} />
      ) : tab === 'home' ? (
        <DashboardScreen
          firstName={firstNameFrom(user)}
          initials={initialsFrom(user)}
          onStartReset={() => setTab('breathe')}
          onSignOut={() => void signOut()}
        />
      ) : tab === 'breathe' ? (
        <CravingSosScreen onComplete={() => setTab('home')} />
      ) : tab === 'health' ? (
        <PlanHealthScreen />
      ) : tab === 'track' ? (
        <TrackingAnalyticsScreen />
      ) : (
        <PlaceholderScreen title={tabMeta[tab].title} body={tabMeta[tab].body} />
      )}
      {status === 'signedIn' && user && calibrated ? <BottomTabBar current={tab} onChange={setTab} /> : null}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
