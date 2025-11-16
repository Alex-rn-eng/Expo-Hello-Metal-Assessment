import React, {createContext, useContext, useState, useEffect} from 'react';
import { Appearance, useColorScheme } from 'react-native';

export type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
    theme: Theme;
    currentTheme: 'light' | 'dark';
    setTheme: (theme: Theme) => void; 
    colors: {
        background: string;
        surface: string;
        text: string;
        textSecondary: string;
        primary: string;
        primaryDark: string;
        border: string;
        error: string;

    }
}

const lightColors = {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#1A1A1A',
    textSecondary: '#666666',
    primary: '#007AFF',
    primaryDark: '0051D5',
    border: 'E0E0E0',
    error: 'FF3B30',
}

const darkColors = {
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#98989D',
    primary: '#007AFF',
    primaryDark: '0051D5',
    border: '38383A',
    error: 'FF3B30',
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState<Theme>('auto');
    const getCurrentTheme = (): 'light' | 'dark' => {
        if(theme === 'auto') {
            return systemColorScheme === 'dark' ? 'dark' : 'light';
        }
        return theme;
    }
    const currentTheme = getCurrentTheme();
    const colors = currentTheme === 'dark' ? darkColors: lightColors;

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({colorScheme}) => {

        });
        return() => subscription.remove();
    }, []);
    
    return(
        <ThemeContext.Provider value = {{theme, currentTheme, setTheme, colors}}>
            {children}     
        </ThemeContext.Provider>
    )
};


export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error('useTheme must be used in ThemeProvider');
    }

    return context;
}