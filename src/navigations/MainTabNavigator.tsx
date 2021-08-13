import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BudgetsScreen from '@/features/budgets/screens/BudgetsScreen';
import DashboardScreen from '@/features/dashboard/screens/DashboardScreen';
import ReportsScreen from '@/features/reports/screens/ReportsScreen';
import TransactionsScreen from '@/features/transactions/screens/TransactionsScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'dashboard';

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Budgets') {
            iconName = 'account-balance';
          } else if (route.name === 'Transactions') {
            iconName = 'credit-card';
          } else if (route.name === 'Reports') {
            iconName = 'bar-chart';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Budgets" component={BudgetsScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
