import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet, Text, TouchableOpacity, Vibration, Alert} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import * as Animatable from 'react-native-animatable'

type RootStackParamList = {
    Home: undefined;
    Dog: undefined;
}

type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProp = {
    navigation: HomeScreenNavigationProps;
}

const HomeScreen: React.FC<HomeScreenProp> = ({navigation}) => {
    const {colors} = useTheme();
    const handleHelloMetal = () => {
        Vibration.vibrate(500);
        Alert.alert('Hello Metal', 'Welcome to the Hello Metal app');
    };
    const handleDogPress = () => {
        navigation.navigate('Dog');
    }
    return(
        <View style = {[styles.container, {backgroundColor: colors.background}]}>
            <Animatable.View
                animation = "fadeInDown"
                duration = {800}
                style = {styles.headerContainer}
            >
                <Text style = {[styles.title, {color: colors.text}]}>Hello Metal</Text>
                <Text style = {[styles.subtitle,{color: colors.textSecondary}]}>
                    Choose an action below.
                </Text>
            </Animatable.View>

            <View style = {styles.buttonContainer}>
                <Animatable.View
                    animation="bounceIn"
                    duration={1000}
                    delay={200}
                    style = {styles.buttonWrapper}
                >
                    <TouchableOpacity style = {[styles.button, {backgroundColor: colors.primary}]}
                    onPress = {handleHelloMetal}
                    activeOpacity = {0.8}> 
                        <Animatable.Text
                            animation = "pulse"
                            iterationCount = "infinite"
                            duration = {2000}
                            style = {[styles.buttonText, {color: '#FFFFFF'}]}
                        >
                            Hello Metal Button
                        </Animatable.Text>
                    </TouchableOpacity>
                </Animatable.View>
                <Animatable.View
                    animation="bounceIn"
                    duration={1000}
                    delay={200}
                    style = {styles.buttonWrapper}
                >
                    <TouchableOpacity style = {[styles.button, {backgroundColor: colors.primary}]}
                    onPress = {handleDogPress}
                    activeOpacity = {0.8}> 
                        <Text
                            style = {[styles.buttonText, {color: '#FFFFFF'}]}
                        >
                            Dog Button
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
        gap: 20
    },
    buttonWrapper: {
        width: '100%'
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600'
    }
})

export default HomeScreen;