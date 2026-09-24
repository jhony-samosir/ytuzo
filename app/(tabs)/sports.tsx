import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function SportsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sports Tracking Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.text.primary,
    fontSize: 20,
    fontWeight: '700',
  },
});
