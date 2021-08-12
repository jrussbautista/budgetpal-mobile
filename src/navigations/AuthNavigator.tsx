import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../features/auth/screens/LoginScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false, headerMode: 'screen' }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
