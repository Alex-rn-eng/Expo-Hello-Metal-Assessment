import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import ThemeToggle from './components/ThemeToggle';
import HomeScreen from './screens/HomeScreen';
import DogScreen from './screens/DogScreen';

const Stack = createStackNavigator();

function AppNavigator(){
  const {currentTheme, colors} = useTheme();
  const navTheme = currentTheme === 'dark' ? DarkTheme : DefaultTheme;
  const customTheme = {
    ...navTheme,
    colors: {
      ...navTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    }
  }
  return(
    <>
      <StatusBar style = {currentTheme === 'dark' ? 'light': 'dark'} />
      <NavigationContainer theme = {customTheme}>
        <Stack.Navigator
          initialRouteName = "Home"
          screenOptions = {{
            headerStyle: {
              backgroundColor: colors.surface,
            },
            headerTintColor: colors.text,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <View style = {styles.headerRight}>
                  <ThemeToggle />
              </View>
            )
          }}
        >
          <Stack.Screen
            name = "Home"
            component = {HomeScreen}
            options = {{
              title: 'Hello Metal',
            }}
          />
          <Stack.Screen
            name = "Dog"
            component = {DogScreen}
            options = {{
              title: 'Dog',
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    marginRight: 16,
  }
});
