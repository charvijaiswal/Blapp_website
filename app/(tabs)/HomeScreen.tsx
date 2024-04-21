import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Pressable, ImageBackground, RefreshControl, Text, ToastAndroid } from 'react-native';
import Pin from '@/components/Pin';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [pins, setPins] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://blapp-backend.onrender.com/post');
      setPins(response.data);
      console.log('Fetched pins:', response.data);
      // console.log('Fetched pins:', response.data);
      console.log('REfreshed'),
      ToastAndroid.show('Refreshing', ToastAndroid.SHORT); 
      ToastAndroid.show('Done !!', ToastAndroid.SHORT); 
      setError('');
    } catch (error: any) {
      console.error('Error fetching pins:', error.message);
      setError('Error fetching pins. Please check your network connection.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial render
  }, []); // Only run once on initial render

  const navigateToPinScreen = (pin: any) => {
    navigation.navigate('PinScreen', { pin });
  };

  const handleRefresh = () => {
    setRefreshing(true); // Set refreshing state to true
    fetchData(); // Fetch data when refreshing
  };

  const renderPins = () => {
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    const leftColumnPins = pins.filter((_, index) => index % 2 === 0);
    const rightColumnPins = pins.filter((_, index) => index % 2 !== 0);

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          {leftColumnPins.map((pin: any) => (
            <Pressable key={pin.id} onPress={() => navigateToPinScreen(pin)}>
              <Pin pin={pin} />
            </Pressable>
          ))}
        </View>
        <View style={styles.column}>
          {rightColumnPins.map((pin: any) => (
            <Pressable key={pin.id} onPress={() => navigateToPinScreen(pin)}>
              <Pin pin={pin} />
            </Pressable>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ImageBackground source={require('@/assets/images/wallpaper.jpg')} style={styles.backgroundImage}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh} // Call handleRefresh when refreshing
            colors={['#FF6311']}
            progressBackgroundColor="#FFFFFF"
          />
        }
      >
        {renderPins()}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
});

export default HomeScreen;
