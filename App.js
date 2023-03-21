import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Onboarding from './screens/Onboarding';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './screens/Profile';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#43534D',
    secondary: '#E6CE30',
    background: "#EBECEB"
  },
};


export default function App() {

  const [userStatus, setUserStatus] = useState({
    loading: true,
    isOnBoardingCompleted: false
  })
  useEffect(() => {
    (async () => {
      try {
        const response = await AsyncStorage.getItem('userOnBoarded')
        const userStatus = JSON.parse(response)

        if (userStatus) {
          setUserStatus({ ...userStatus, loading: false, isOnBoardingCompleted: userStatus })
        }
        else {
          setUserStatus({ ...userStatus, loading: false })
        }
      } catch (error) {
        console.log(error)
      }
    })();
  }, [])
  console.log(userStatus)
  // if (userStatus.loading) {
  //   return <SplashScreen />
  // }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {userStatus.isOnBoardingCompleted ?
            <Stack.Screen name="Profile" component={Profile} />
            :
            <Stack.Screen name="Onboarding" component={Onboarding} />
          }

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',

  },
});