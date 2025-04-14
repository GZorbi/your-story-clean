import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenuScreen from './screens/MainMenuScreen';
import OptionsScreen from './screens/OptionsScreen';
import InstructionsScreen from './screens/InstructionsScreen';
import GameScreen from './screens/GameScreen';
import EndScreen from './screens/EndScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="Options" component={OptionsScreen} />
        <Stack.Screen name="Instructions" component={InstructionsScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="End" component={EndScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
