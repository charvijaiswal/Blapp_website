import { Link, Stack, router } from 'expo-router';
import { StyleSheet, Text, View, Pressable, Button, ImageBackground } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function HomeScreen() {

  const shiftToOnboarding = () => {
    // console.log('shiftToOnboarding');
    router.replace('/Onboarding');
  }
  

  return ( 
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground source={require('@/assets/images/wallpaper.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.heading1}>Welcome</Text>
            <Text style={styles.heading2}>to</Text>
            <Text style={styles.heading3}>Blapp</Text>
          </View>

          {/* <Link href='/Onboarding' asChild> */}
          
          <Pressable onPress={shiftToOnboarding} style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
          
          
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex:1,
    resizeMode: 'cover',
    opacity: 0.9,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  content:{
    gap:10,
    marginTop: 20,
  },
  box: {
    backgroundColor: '#f9ede3',
    flex: 1, // width
    margin: 20,
    justifyContent: 'center',
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9b4521',
    borderRadius:20,
  },

  button: {
    backgroundColor: '#f9ede3',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#9b4521',
    margin: 20,
    paddingHorizontal: 60,
    shadowOpacity: 0.5,
    
  },
  buttonText: {
    color: 'black',
    fontSize: 40,
    fontFamily: 'AmaticBold',
    letterSpacing: 1.3,
    textAlign: 'center',
  },

  text: {
    color: '#9b4521',
    fontSize: 80,
    fontFamily: 'AmaticBold',
  },

  column:{
    gap:10,
  },

  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading1: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 80,
    fontFamily: 'BungeeSpice',
    color: '#9b4521',
  },
  heading2: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 60,
    fontFamily: 'BungeeSpice',
    color: '#9b4521',
  },
  heading3: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 120,
    fontFamily: 'BungeeSpice',
    color: '#9b4521',
  },
});
