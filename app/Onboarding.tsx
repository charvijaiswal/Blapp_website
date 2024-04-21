import { StyleSheet, Text, View, SafeAreaView, Pressable, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, router } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
// import Animated, { FadeIn, FadeOut, BounceInRight, BounceInLeft, SlideInLeft, SlideOutDown, SlideInRight, SlideOutUp, SlideInUp, SlideInDown } from 'react-native-reanimated'
import { GestureDetector, Gesture, Directions, GestureHandlerRootView } from 'react-native-gesture-handler'

const onboardingSteps = [{
    index: 0,
    title: "Hi!! \nWelcome to Blapp",
    description: "Discover the perfect blend of blogging and app experience with Blapp. Whether you're a seasoned blogger or just starting out, Blapp offers a seamless platform to express your thoughts, connect with your audience, and explore the world of content creation like never before.",
    image: "blog"
}, {
    index: 1,
    title: "Express your Passion",
    description: "Craft engaging blog posts effortlessly using Blapp's intuitive editor. Share your stories, ideas, and expertise with the world. Gain followers and interact with your audience through comments and likes, all within a single app.",
    image: "shapes"
}, {
    index: 2,
    title: "Organize Your Content",
    description: "Categorize your posts to keep your content organized and easily accessible. Blapp offers a variety of categories and tags to help you structure your blog and reach the right audience.",
    image: "soap"
}, {
    index: 3,
    title: "Explore and Connect",
    description: "Discover a vibrant community of bloggers and readers on Blapp. Explore trending topics, follow your favorite creators, and engage in meaningful discussions. Build relationships and grow your network.",
    image: "connectdevelop"
}];


const OnBoardingScreen = () => {

    const [screenIndex, setScreenIndex] = useState(0);

    const data = onboardingSteps[screenIndex];

    const onContinue = () => {
        const isLastScreen = screenIndex === onboardingSteps.length - 1;
        if (isLastScreen) {
            endOnBoarding();
        } else {
            setScreenIndex(prevscreenIndex => prevscreenIndex + 1);
        }
    };
    
    const onBack = () => {
        const isFirstScreen = screenIndex === 0;
        if (isFirstScreen) {
            endOnBoarding();
        } else {
            setScreenIndex(screenIndex - 1);
        }
    };

    const endOnBoarding = () => {
        setScreenIndex(0);
        router.replace('/(tabs)/HomeScreen');
    }
        // ToastAndroid.show(`Continue${screenIndex+1}`, ToastAndroid.SHORT);
    



    // const swipes = Gesture.Simultaneous(
    //     Gesture.Fling().direction(Directions.UP).onEnd(onContinue),
    //     Gesture.Fling().direction(Directions.DOWN).onEnd(onBack)
    // );

    
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{headerShown: false}}/>
            
            {/* <GestureDetector gesture={swipes}> */}
                <View  style={styles.contentContainer}>
                    {/* <Animated.View entering={SlideInDown} exiting={SlideOutUp} style={styles.pageContent} key={data.index}> */}
                    <View style={styles.pageContent} key={data.index}>
                        {/* <Animated.View ></Animated.View> */}
                        <FontAwesome5 style={styles.image} name={data.image} />

                        <View style={styles.footer}>
                            <Text style={styles.title}>{data.title}</Text>
                            <Text  style={styles.description}>
                                {data.description}
                            </Text>

                            {/* <View>
                                <Text style={styles.counter}>
                                    {screenIndex+1}/{onboardingSteps.length}
                                </Text>
                            </View> */}

                            <View style={styles.buttonRow}>
                                
                                    <Text onPress={endOnBoarding} style={styles.buttonText}>Skip</Text>
                                
                                <Pressable onPress={onContinue} style={styles.button}>
                                    <Text style={styles.buttonText}>Continue</Text>
                                </Pressable>

                            </View>

                        </View>
                    </View>

                    <View style={styles.stepIndicatorContainer}>
                        {onboardingSteps.map((step, index) => (
                            <Pressable key={index} style={styles.cover} onPress={() => setScreenIndex(index)}>
                                <View style={[styles.stepIndicator, { backgroundColor: index === screenIndex ? '#FFDA11' : 'white' }]} />
                            </Pressable>
                        ))}
                    </View>

                </View>
            {/* </GestureDetector> */}
        </SafeAreaView>
    )
}

export default OnBoardingScreen

const styles = StyleSheet.create({

    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
        backgroundColor: '#15141A',
        padding:10,
        paddingTop:50,
        paddingBottom: 30,

        // borderColor: 'white',
        // borderWidth: 5,
        
    },
    contentContainer:{
        flex:1,
        flexDirection: 'row',
        // borderColor: 'green',
        // borderWidth: 5,
    },

    pageContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
        // borderColor: 'red',
        // borderWidth: 5,
    },
    image: {
        fontSize: 200,
        color: "#FFDA11",
        marginTop: "auto",

        // borderColor: 'blue',
        // borderWidth: 5,
        // textAlign: "center",
    },

    footer: {
        marginTop: "auto",

        // borderColor: 'green',
        // borderWidth: 5,
    },
    
    title: {
        color: '#FDFDFD',
        fontSize: 90,
        
        fontFamily: 'AmaticBold',
        marginVertical: 20,
        letterSpacing: 1.3,

        // borderColor: 'yellow',
        // borderWidth: 5,
    },
    
    description: {
        textAlign: "left",
        fontFamily: 'Amatic',
        color: 'gray',
        lineHeight:35,
        fontSize:28,

        // borderColor: 'orange',
        // borderWidth: 5,
        
    },

    // counter:{
    //     color: 'gray',
    //     fontSize: 30,
    //     fontFamily: 'Amatic',
    //     textAlign: 'center',
    //     marginVertical: 20,

    //     // borderColor: 'purple',
    //     // borderWidth: 5,
    // },

    // stepIndicatorContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginVertical: 20,
    //     gap: 7,
    //     // borderColor: 'blue',
    //     // borderWidth: 5,
    // },

    cover:{
        
        flex:1,
        paddingVertical: 15,
    },

    // stepIndicator: {
    //     flex:1,
    //     height: 3,
    //     backgroundColor: '#FFDA11',
    //     borderRadius: 10,
    //     paddingVertical:2,
    //     // marginHorizontal: 20,
    //     // borderColor: 'red',
    //     // borderWidth: 5,

        
    // },

    stepIndicatorContainer: {
        flexDirection: 'column', // Change to column
        height: 250,
        justifyContent: 'center', // Align items to flex-end
        alignItems: 'center',
        marginVertical: 250 ,
        marginRight: 0, // Adjust right margin
        // borderColor: 'pink',
        // borderWidth: 5,
    },

    stepIndicator: {
        width: 6, // Adjust width to create a vertical bar
        height: 50, // Set desired height for each step
        backgroundColor: '#FFDA11',
        borderRadius: 10,
        // borderColor: 'red',
        // borderWidth: 5,
        // marginVertical: 5, // Adjust vertical spacing between steps
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        marginLeft:20,
        gap:50,
        // borderColor: 'purple',
        // borderWidth: 5,
    },

    button: {
        backgroundColor: '#302E38',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        flex:1,
        // marginVertical: 30,

        // borderColor: 'pink',
        // borderWidth: 5,

    },

    buttonText: {
        color: 'white',
        fontSize: 40,
        fontFamily: 'AmaticBold',
        letterSpacing: 1.3,
        textAlign: 'center',
        
        // borderColor: 'brown',
        // borderWidth: 5,
    },
})