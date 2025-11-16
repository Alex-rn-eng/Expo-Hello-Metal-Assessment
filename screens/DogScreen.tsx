import React, { useState, useEffect, useCallback } from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet, RefreshControl, ActivityIndicator, Text, TouchableOpacity, Image, Platform, Alert} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';

type RootStackParamList = {
    Home: undefined;
    Dog: undefined;
}

type DogScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dog'>;

type DogScreenProps = {
    navigation: DogScreenNavigationProp;
}

interface DogApiResponse {
    message: string;
    status: string;
}

const DogScreen: React.FC<DogScreenProps> = ({navigation}) => {
    const {colors} = useTheme();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dogImage, setDogImage] = useState<string>('');

    const fetchDogImage = useCallback(async (isRefresh = false) => {
        if(isRefresh){
            setRefreshing(true);
        } else {
            setLoading(true);
        }
        setError(null);

        try{
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: DogApiResponse = await response.json();

            if(data.status === 'success' && data.message) {
                setDogImage(data.message);
                if(Platform.OS === 'ios') {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }
            } else {
                throw new Error('Invalid response from API');
            }
        } catch(err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dog image';
            setError(errorMessage);
            console.error('Error fetching dog image:', err);
            if(Platform.OS === 'ios') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            }
            Alert.alert(
                'Error',
                'Failed to fetch dog image. Please try again.',
                [{text: 'OK'}]
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchDogImage();
        })

        return unsubscribe;
    }, [navigation, fetchDogImage]);

    const handleRefresh = () => {
        fetchDogImage(true);
    }
    const handleGetAnotherDog = () => {
        fetchDogImage();
    }

    return (
        <View style = {[styles.container, {backgroundColor: colors.background}]}>
            <ScrollView
                contentContainerStyle = {styles.scrollContent}
                refreshControl = {
                    <RefreshControl 
                        refreshing = {refreshing}
                        onRefresh = {handleRefresh}
                        tintColor = {colors.primary}
                        colors = {[colors.primary]}
                    />
                }
            >
                {loading && !refreshing ? (
                    <View style = {styles.loadingContainer}>
                        <ActivityIndicator size = "large" color = {colors.primary} />
                        <Text style = {[styles.loadingText, {color: colors.textSecondary}]}>
                            Fetching a cute dog.
                        </Text>
                    </View>
                ) : error ? (
                    <View style = {styles.errorContainer}>
                        <Text style = {[styles.errorText, {color: colors.error}]}>
                            {error}
                        </Text>
                        <TouchableOpacity style = {[styles.retryButton, {backgroundColor: colors.primary}]}
                            onPress = {handleGetAnotherDog}
                        >
                            <Text style = {styles.retryButtonText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ): dogImage ? (
                    <Animatable.View
                        animation="fadeIn"
                        duration={500}
                        style={styles.imageContainer}
                    >
                        <Image 
                            source = {{uri: dogImage}}
                            style = {styles.image}
                            resizeMode = "cover"
                            onError = {() => {
                                setError('Failed to load image');
                                setLoading(false);
                            }}
                        />
                        <TouchableOpacity style = {[styles.button, {backgroundColor: colors.primary}]}
                            onPress = {handleGetAnotherDog}
                        >
                            <Text style = {styles.buttonText}>Get Another Dog</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                ) : null}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding : 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16
    },
    loadingText: {
        fontSize: 16,
        marginTop: 12.
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        padding: 20
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center'
    },
    retryButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 24,
    },
    image: {
        width: '100%',
        height: 400,
        borderRadius: 16,
        backgroundColor: '#E0E0E0',
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 200,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600'
    }
})

export default DogScreen;