import { StyleSheet, Text, View, Image, ScrollView, Pressable, Dimensions, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import { usePinContext } from './PinContext';


const PinScreen = () => {
  const { params } = useRoute();
  const { pin } = params as { pin: any };
  const navigation = useNavigation();
  const [ratio, setRatio] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const insets = useSafeAreaInsets();

      const { addBookmark, removeBookmark, bookmarks } = usePinContext();

  useEffect(() => {
    setIsBookmarked(bookmarks.some((b) => b.id === pin.id));
  }, [bookmarks, pin.id]);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(pin.id);
    } else {
      addBookmark(pin);
    }
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {
    if (pin.image) {
      Image.getSize(pin.image, (width, height) => setRatio(width/height));
    }
  }, [pin]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={require('@/assets/images/wallpaper.jpg')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeView}>
        <StatusBar style="dark" />
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Image source={{ uri: pin.image }} style={[styles.image, { aspectRatio: ratio }]} />
              <Pressable onPress={toggleBookmark} style={styles.iconBtn}>
                <FontAwesome
                  name={isBookmarked ? 'bookmark' : 'bookmark-o'}
                  style={[styles.icon, { color: isBookmarked ? '#FF6311' : 'white' }]}
                />
              </Pressable>
            </View>
            <View style={styles.completeContent}>
              <Text style={styles.titles}>{pin.title}</Text>
              <Text style={styles.writer}>
                Written by <Text style={styles.writerName}>
                  {/* {pin.author.username} */}
                  {pin.author ? pin.author.username : 'Sakshi'}
                  </Text>
              </Text>
              <View style={styles.article}>
                <Text style={styles.articleText}>{pin.content}</Text>
              </View>
            </View>
          </View>
          <Pressable style={styles.backBtn} onPress={goBack}>
            <Ionicons style={[styles.back, { top: insets.top - 25 }]} name="chevron-back" />
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeContent: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFDA11',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  },
  image: {
    width: '100%',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  iconBtn: {
    backgroundColor: '#D3CFD4',
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 12,
    borderRadius: 25,
  },
  icon: {
    fontSize: 24,
    color: 'white',
  },
  titles: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    width: '100%',
    marginLeft: 5,
    padding: 15,
    paddingBottom: 0,
  },
  writer: {
    fontSize: 15,
    color: 'gray',
    width: '90%',
    textAlign: 'left',
    marginHorizontal: 5,
  },
  article: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'wheat',
    width: '96%',
    marginVertical: 8,
    borderRadius: 10,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    height: 'auto',
    padding: 10,
  },
  articleText: {
    fontSize: 20,
    color: 'gray',
    padding: 10,
    textAlign: 'left',
    marginVertical: 3,
    marginHorizontal: 5,
  },
  backBtn: {
    position: 'absolute',
    left: 10,
    zIndex: 100,
  },
  back: {
    color: 'white',
    fontSize: 35,
  },
  writerName: {
    fontFamily: 'Amatic',
    fontSize: 30,
    color: 'black',
  },
});

export default PinScreen;
