import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

import DashboardAnalyticCard from '../components/DashboardAnalyticCard';
import { fetchDashboard } from '../slice';

import { useAppDispatch, useAppSelector } from '@/app/hooks';

const DashboardScreen = () => {
  const { dashboard, status } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  const { colors } = useTheme();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDashboard());
    }
  }, [status, dispatch]);

  const isLoading = status === 'idle' || status === 'loading';

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator animating color={colors.primary} />
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View>
        <Text>Sorry. Unexpected error occured. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {dashboard?.analytics.map((analytic) => (
        <DashboardAnalyticCard
          key={analytic.name}
          label={analytic.name}
          value={`${analytic.value}`}
        />
      ))}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
