import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { loadCurrentUser } from '../features/auth/auth-slice';
import Splash from '../app/Splash';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const { user, status } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);

  const isLoading = status === 'idle' || status === 'loading';

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
