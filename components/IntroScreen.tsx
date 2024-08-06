import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

interface IntroData {
  image: any; 
  heading: string;
  text: string;
  navigation: number[];
  currentIndex: number;
  lastHeadingWord: string;
}

interface IntroScreenProps {
  data: IntroData;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ data, onNext, isFirst, isLast })  => {
  // Find the index of the last space to split the heading
  const lastSpaceIndex = data.heading.lastIndexOf(' ');
  const headingText = data.heading.substring(0, lastSpaceIndex);
 
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={data.image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>
            {headingText}
            <Text style={styles.headingLastWord}>
              {` ${data.lastHeadingWord}`}
            </Text>
          </Text>
          {data.lastHeadingWord && (
            <View style={styles.curvedLineWrapper}>
              <View style={styles.curvedLine} />
            </View>
          )}
        </View>
        <Text style={styles.text}>{data.text}</Text>
        <View style={styles.navContainer}>
          {data.navigation.map((_: any, index: any) => (
            <View
              key={index}
              style={[
                styles.navDot,
                data.currentIndex === index && styles.activeNavDot,
              ]}
            />
          ))}
        </View>
        <TouchableOpacity onPress={onNext} style={styles.button}>
          <Text style={styles.buttonText}>
            {isFirst ? 'Get Started' : isLast ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default IntroScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    width: '100%',
    height: height / 2,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headingWrapper: {
    alignItems: 'center',
    marginVertical: 10,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingLastWord: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF7029',
  },
  curvedLineWrapper: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 5, // Adjust this value as needed
  },
  curvedLine: {
    width: 80,
    height: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#FF7029',
    borderRadius: 10,
    transform: [{ rotate: '0deg' }],
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  navContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  navDot: {
    width: 15,  // Smaller size for inactive dots
    height: 5,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeNavDot: {
    width: 40,  // Larger size for active dot
    height: 5,
    borderRadius: 5,
    backgroundColor: '#0D6EFD',
  },
  button: {
    backgroundColor: '#0D6EFD',
    padding: 15,
    borderRadius: 10, // Adjust this value for more or less roundness
    width: '100%',
    alignItems: 'center',
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
