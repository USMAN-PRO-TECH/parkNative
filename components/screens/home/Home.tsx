import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Dimensions, SafeAreaView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import axios from 'axios';
import Constants from 'expo-constants';
import ImageWithPlaceholder from '../../ImageWithPlaceholder';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Home = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = React.useState('home');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://developer.nps.gov/api/v1/parks', {
          params: {
            api_key: process.env.EXPO_PUBLIC_API_KEY_DATA,
          },
        });
        const flattenedData = response.data.data.flatMap(activity => activity);
        setData(flattenedData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter(item => 
    (searchQuery === '' || item.name.toLowerCase().startsWith(searchQuery.toLowerCase())) &&
    (selectedState === 'All States' || item.states.includes(selectedState))
  );
  

  const renderItem = ({ item }) => (
    <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('Details', { item })}
  >
    <ImageWithPlaceholder
      uri={item.images?.[0]?.url}
      style={styles.image}
    />
    <Text style={styles.title}>{item.name}</Text>
    <Text style={styles.description}>{item.designation}</Text>
  </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Text style={styles.profile}>{activeTab}</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search parks..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      <Picker
        selectedValue={selectedState}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedState(itemValue)}
      >
        <Picker.Item label="All States" value="All States" />
        <Picker.Item label="California" value="CA" />
        <Picker.Item label="New York" value="NY" />
        {/* Add more states or other filter options as needed */}
      </Picker>

   
      {loading ? (
        <ActivityIndicator color="black" />
      ) : (
        filteredData.length > 0 ? (
          <View style={styles.container}>
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
        ) : (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>No parks found.</Text>
          </View>
        )
      )}
      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => setActiveTab('settings')}>
          <Icon name="settings-outline" size={30} color={activeTab === 'settings' ? '#007AFF' : '#ccc'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => setActiveTab('notifications')}>
          <Icon name="notifications-outline" size={30} color={activeTab === 'notifications' ? '#007AFF' : '#ccc'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeIconWrapper} onPress={() => setActiveTab('home')}>
          <Icon name="home-outline" size={40} color={activeTab === 'home' ? '#007AFF' : '#ccc'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => setActiveTab('search')}>
          <Icon name="search-outline" size={30} color={activeTab === 'search' ? '#007AFF' : '#ccc'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => setActiveTab('profile')}>
          <Icon name="person-outline" size={30} color={activeTab === 'profile' ? '#007AFF' : '#ccc'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Constants.statusBarHeight,
  },
  navbar: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    marginBottom: 10,
  },
  profile: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: width - 20,
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#f5f5f5",
    alignItems: 'center',
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    width: width / 2 - 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 12,
    marginTop: 5,
    color: "#666",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: '#333',
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#fff',
    borderTopColor: '#fff',
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  homeIconWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: -10, // Raise the home icon above others
  },
});

export default Home;
