import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePinContext } from '../PinContext';


// const Bookmark = ({ bookmarks }) => {
const Bookmark = () => {
  const { bookmarks } = usePinContext();
  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  const navigateToPinScreen = (pin: any) => {
    navigation.navigate('PinScreen', { pin });
  };

  const renderItem = ({ item }: { item: any }) => (
    <Pressable onPress={() => navigateToPinScreen(item)}>
      <Text style={styles.bookmark}>
        {`\u{26A1} ${item.title}`}
      </Text>
    </Pressable>
  );

  return (
    <View  style={styles.bigContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Bookmarked Pins</Text>
        <FlatList style={styles.listOfBookmarks}
          data={bookmarks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    bigContainer: {
    // height: '10%',
    justifyContent: 'center',
    margin:20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 70,
    alignContent: 'center',
    // fontWeight: 'bold',
    // paddingHorizontal: 20,
    fontFamily: 'Amatic',
    color: 'white',
  },
  listOfBookmarks: {
    width: '100%',
    padding: 20,
  },
  bookmark: {
    fontSize: 25,
    marginBottom: 10,
    color: "#FFDA11",
    // fontStyle: 'italic',
    fontFamily: 'BungeeSpice',
  },
});

export default Bookmark;
