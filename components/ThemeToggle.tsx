import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import * as Haptics from 'expo-haptics';

const ThemeToggle: React.FC = () => {
    const {theme, setTheme, colors} = useTheme();

    const handleThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
        if(Platform.OS === 'ios'){
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        setTheme(newTheme);
    }

    return(
        <View style = {[styles.container, {backgroundColor: colors.surface, borderColor: colors.border}]}>
            <Text style = {[styles.label, {color: colors.textSecondary}]}>Theme: </Text>
            <View style = {styles.buttonGroup}>
                <TouchableOpacity
                    style = {[
                        styles.themeButton,
                        theme === 'light' && {backgroundColor: colors.primary},
                        {borderColor: colors.border},
                    ]}
                    onPress = {() => handleThemeChange('light')}
                    activeOpacity = {0.7}
                >
                    <Text style = {[
                        styles.themeButtonText,
                        {color: theme === 'light' ? '#FFFFFF' : colors.text}
                    ]}>
                        Light
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {[
                        styles.themeButton,
                        theme === 'dark' && {backgroundColor: colors.primary},
                        {borderColor: colors.border},
                    ]}
                    onPress = {() => handleThemeChange('dark')}
                    activeOpacity = {0.7}
                >
                    <Text style = {[
                        styles.themeButtonText,
                        {color: theme === 'light' ? '#FFFFFF' : colors.text}
                    ]}>
                        Dark
                    </Text>
                    
                </TouchableOpacity>
                <TouchableOpacity
                    style = {[
                        styles.themeButton,
                        theme === 'auto' && {backgroundColor: colors.primary},
                        {borderColor: colors.border},
                    ]}
                    onPress = {() => handleThemeChange('auto')}
                    activeOpacity = {0.7}
                >
                    <Text style = {[
                        styles.themeButtonText,
                        {color: theme === 'light' ? '#FFFFFF' : colors.text}
                    ]}>
                        Auto
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        gap: 8
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
    },

    themeButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        borderWidth: 1,
        minWidth: 50,
    },
    themeButtonText: {
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 4
    }
});
export default ThemeToggle;