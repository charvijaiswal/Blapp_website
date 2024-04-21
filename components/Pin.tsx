import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { usePinContext } from '@/app/PinContext';

const Pin = ({ pin }: { pin: any }) => {
  const { addBookmark, removeBookmark, bookmarks } = usePinContext();
  const navigation = useNavigation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    // Check if pin and pin.id are defined before accessing
    if (pin && pin.id) {
      setIsBookmarked(bookmarks.some((b) => b.id === pin.id));
    }
  }, [bookmarks, pin]);

  useEffect(() => {
    if (pin && pin.image) {
      Image.getSize(pin.image, (width, height) => {
        setRatio(width / height);
      });
    }
  }, [pin]);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(pin.id);
    } else {
      addBookmark(pin);
    }
    setIsBookmarked(!isBookmarked);
  };

  const navigateToPinScreen = () => {
    navigation.navigate('PinScreen', { pin });
  };

  return (
    <View style={styles.pin}>
      <View>
        {pin && pin.image && (
          <Image source={{ uri: pin.image }} style={[styles.image, { aspectRatio: ratio }]} />
        )}
        <Pressable onPress={toggleBookmark} style={styles.iconBtn}>
        <FontAwesome
            name={isBookmarked ? 'bookmark' : 'bookmark-o'}
            style={[styles.icon, { color: isBookmarked ? '#FF6311' : 'white' }]}
        />
        </Pressable>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {pin && pin.title ? pin.title : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pin: {
    width: '100%',
    borderColor: '#FFDA11',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#FFDA11',
    margin: 7,
    padding:5,
    marginTop: 0,
    
  },
  image: {
    width: '100%',
    borderRadius: 15,
  },
  iconBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#D3CFD4',
  },
  icon: {
    fontSize: 24,
    color: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
});

export default Pin;

