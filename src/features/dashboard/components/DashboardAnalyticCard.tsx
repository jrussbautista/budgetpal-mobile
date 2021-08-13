import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Colors } from 'react-native-paper';

interface Props {
  label: string;
  value: string;
}

const DashboardAnalyticCard = ({ label, value }: Props) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.label}>{label}</Title>
        <Paragraph style={styles.value}>{value}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default DashboardAnalyticCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
  },
  label: {
    color: Colors.blueGrey600,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: '400',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
