import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevents the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  await Font.loadAsync({
    'Geometr415BlkBT': require('../assets/fonts/font.ttf'),
  });
};

interface SplashScreenProps {
  onLoad: () => void;
}

const Splash: React.FC<SplashScreenProps> = ({ onLoad }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAsync = async () => {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    };

    loadAsync();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().then(() => {
        onLoad();
        console.log('SplashScreen hidden and onLoad called');
      });
    }
  }, [fontsLoaded]);
  

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Travenor</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D6EFD',
  },
  text: {
    fontFamily: 'Geometr415BlkBT',
    color: '#FFFFFF',
    fontSize: 30,
  },
});

export default Splash;
