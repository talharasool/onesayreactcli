import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HomeStackScreen } from './screens/HomeScreen';
import { SettingsScreen } from './screens/Settings';

import './i18n'
import { useTranslation } from 'react-i18next'
import { useColorScheme } from 'react-native';



const Tab = createBottomTabNavigator();
const queryClient = new QueryClient()

const config = {
  screens: {
    News: {
      screens: {
        Article: "article/:url",
      }
    },
    Settings: "settings"
  },
};





export default function App() {

  //Themeing.
  const colorScheme = useColorScheme()
  const tabbarIconColor = colorScheme === 'dark' ? 'white' : 'black'
  console.log(colorScheme)

  //Translating
  const { t } = useTranslation()

  const linking = {
    prefixes: ["news.org://app"],
    config
  }


  return (
 <QueryClientProvider client={queryClient}>
    
<NavigationContainer linking={linking}   theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
        <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarActiveBackgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          tabBarInactiveBackgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          tabBarStyle: { borderTopWidth: 0,
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white'
          },
        }}>
        <Tab.Screen name={t('home')} component={HomeStackScreen} 
        
     
        />
        <Tab.Screen name="Settings" component={SettingsScreen} 
   />
      </Tab.Navigator>
    </NavigationContainer>

</QueryClientProvider>
  );
}