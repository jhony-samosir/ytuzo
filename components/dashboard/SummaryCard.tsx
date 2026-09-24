import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableScale } from '../ui/TouchableScale';
import { Colors } from '../../constants/Colors';

export function SummaryCard() {
  return (
    <TouchableScale>
      <LinearGradient
        colors={[Colors.background.card, 'rgba(15, 23, 42, 0.9)']}
        style={styles.summaryCard}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Overview</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>+12%</Text>
          </View>
        </View>
        
        <Text style={styles.cardMainValue}>$12,450.00</Text>
        
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Monthly Goal</Text>
            <Text style={styles.progressPercentage}>78%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <LinearGradient
              colors={[Colors.brand.yuzu, Colors.brand.blaze]}
              style={[StyleSheet.absoluteFill, { width: '78%' }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
        </View>
      </LinearGradient>
    </TouchableScale>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    padding: 28,
    borderWidth: 1,
    borderTopColor: Colors.border.brand,
    borderLeftColor: Colors.border.brand,
    borderBottomColor: Colors.border.faint,
    borderRightColor: Colors.border.faint,
    marginBottom: 32,
    shadowColor: Colors.brand.yuzu,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    color: Colors.text.title,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  badge: {
    backgroundColor: 'rgba(250, 204, 21, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.3)',
  },
  badgeText: {
    color: Colors.brand.yuzu,
    fontSize: 12,
    fontWeight: '700',
  },
  cardMainValue: {
    color: Colors.text.primary,
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 28,
    letterSpacing: -1,
  },
  progressSection: {
    width: '100%',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: {
    color: Colors.text.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  progressPercentage: {
    color: Colors.text.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: Colors.border.light,
    borderRadius: 4,
    overflow: 'hidden',
  },
});
