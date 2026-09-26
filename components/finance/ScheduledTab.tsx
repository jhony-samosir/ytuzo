import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Subscription } from '../../types/finance';
import { formatMoney, safeAlpha } from '../../utils/finance';
import { EmptyState } from '../ui/EmptyState';

interface ScheduledTabProps {
  subscriptions: Subscription[];
  onAdd: () => void;
  onEdit: (sub: Subscription) => void;
}

export const ScheduledTab: React.FC<ScheduledTabProps> = ({ subscriptions, onAdd, onEdit }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 160 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Scheduled & Recurring</Text>
        <Text style={styles.subtitle}>Manage your automated income and expenses.</Text>
      </View>

      {subscriptions.length === 0 ? (
        <EmptyState 
          icon="calendar-outline" 
          title="No Active Schedules" 
          description="You don't have any recurring transactions set up yet." 
        />
      ) : (
        subscriptions.map(s => {
          const date = new Date(s.next_billing_date);
          const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
          
          return (
            <View key={s.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={[styles.iconBg, { backgroundColor: safeAlpha(s.color, 0.15) }]}>
                  <Ionicons name={s.icon as any || 'cash'} size={24} color={s.color || '#FFF'} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.name}>{s.name}</Text>
                  <Text style={styles.cycleText}>Repeats {s.billing_cycle.toLowerCase()}</Text>
                </View>
                <Text style={[styles.amount, { color: s.type === 'INCOME' ? '#10B981' : Colors.text.primary }]}>
                  {s.type === 'INCOME' ? '+' : '-'}{formatMoney(s.amount)}
                </Text>
              </View>

              <View style={styles.divider} />
              
              <View style={styles.cardBottom}>
                <Text style={styles.nextDate}>Next Execution: {dateStr}</Text>
                <TouchableOpacity style={styles.actionBtn} onPress={() => onEdit(s)}>
                  <Ionicons name="ellipsis-horizontal" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}

      <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
        <Ionicons name="add" size={20} color="#000" />
        <Text style={styles.addBtnText}>Create New Schedule</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  name: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  cycleText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    textTransform: 'capitalize',
  },
  amount: {
    fontSize: 18,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginVertical: 16,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextDate: {
    color: Colors.brand.yuzu,
    fontSize: 14,
    fontWeight: '600',
  },
  actionBtn: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.brand.yuzu,
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  addBtnText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  }
});
