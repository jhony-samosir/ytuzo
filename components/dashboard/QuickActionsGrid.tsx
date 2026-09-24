import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableScale } from '../ui/TouchableScale';
import { Colors } from '../../constants/Colors';

const ACTIONS = [
  { id: '1', icon: 'wallet', label: 'Transfer', color: Colors.brand.yuzu, bg: 'rgba(250, 204, 21, 0.1)' },
  { id: '2', icon: 'pie-chart', label: 'Analytics', color: Colors.brand.blaze, bg: 'rgba(249, 115, 22, 0.1)' },
  { id: '3', icon: 'card', label: 'Cards', color: Colors.brand.ruby, bg: 'rgba(244, 63, 94, 0.1)' },
  { id: '4', icon: 'grid', label: 'More', color: Colors.text.primary, bg: 'rgba(250, 250, 250, 0.1)' },
];

export function QuickActionsGrid() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionGrid}>
        {ACTIONS.map((action) => (
          <TouchableScale key={action.id} style={styles.actionItem}>
            <View style={[styles.actionIconBg, { backgroundColor: action.bg }]}>
              <Ionicons name={action.icon as any} size={28} color={action.color} />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableScale>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: Colors.text.primary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  actionIconBg: {
    width: 64,
    height: 64,
    borderTopLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.faint,
  },
  actionLabel: {
    color: Colors.text.title,
    fontSize: 13,
    fontWeight: '600',
  },
});
