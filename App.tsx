import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Splash from './components/Splash';
import IntroScreen from './components/IntroScreen';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/screens/home/Home';
import CardDetail from './components/CardDetail';
//  type for your intro data structure
interface IntroData {
  image: any; // You can use ImageSourcePropType if you want a more specific type
  heading: string;
  text: string;
  navigation: number[];
  currentIndex: number;
  lastHeadingWord: string;
}

// Array of intro data
const introData: IntroData[] = [
  {
    image: require('./assets/1.png'),
    heading: 'Life is short and the world is',
    text: 'At Friends tours and travel, we customize reliable and trustworthy educational tours to destinations all over the world',
    navigation: [0, 1, 2],
    currentIndex: 0,
    lastHeadingWord: 'wide',
  },
  {
    image: require('./assets/2.png'),
    heading: 'It’s a big world out there go',
    text: 'To get the best of your adventure you just need to leave and go where you like. we are waiting for you',
    navigation: [0, 1, 2],
    currentIndex: 1,
    lastHeadingWord: 'explore',
  },
  {
    image: require('./assets/3.png'),
    heading: 'People don’t take trips, trips take',
    text: 'To get the best of your adventure you just need to leave and go where you like. we are waiting for you',
    navigation: [0, 1, 2],
    currentIndex: 2,
    lastHeadingWord: 'people',
  },
];

const Stack = createNativeStackNavigator();
const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'Splash' | 'Intro' | 'Main'>('Splash');
  const [introIndex, setIntroIndex] = useState(0);

  const handleSplashLoad = () => {
    setCurrentScreen('Intro');
  };

  const handleNextIntro = () => {
    if (introIndex < introData.length - 1) {
      setIntroIndex(introIndex + 1);
    } else {
      setCurrentScreen('Main');
    }
  };

  if (currentScreen !== 'Main') {
    return (
      <View style={styles.container}>
        {currentScreen === 'Splash' && <Splash onLoad={handleSplashLoad} />}
        {currentScreen === 'Intro' && (
          <IntroScreen
            data={introData[introIndex]}
            onNext={handleNextIntro}
            isFirst={introIndex === 0}
            isLast={introIndex === introData.length - 1}
          />
        )}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen name="Signin"   options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="SignUp"  options={{ headerShown: false }} component={RegisterScreen} />
        <Stack.Screen name="Home"  options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Details"   component={CardDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
