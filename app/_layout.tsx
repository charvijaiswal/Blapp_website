import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Animated, { FadeIn, FadeOut, BounceInRight, BounceInLeft, SlideInLeft, SlideOutDown, SlideInRight, SlideOutUp, SlideInUp, SlideInDown } from 'react-native-reanimated'
import { useEffect } from 'react';
import { AmaticSC_400Regular, AmaticSC_700Bold } from '@expo-google-fonts/amatic-sc';

import { RubikPuddles_400Regular } from '@expo-google-fonts/rubik-puddles';

import { BungeeSpice_400Regular } from '@expo-google-fonts/bungee-spice';

import { useColorScheme } from '@/components/useColorScheme';
import { GestureDetector, Gesture, Directions, GestureHandlerRootView } from 'react-native-gesture-handler'
import { PinProvider } from './PinContext';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold,
    
    RubikPuddles: RubikPuddles_400Regular,

    BungeeSpice: BungeeSpice_400Regular,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{flex:1}}>
        <PinProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
        </PinProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
