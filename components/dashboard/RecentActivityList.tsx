import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';

import { Colors } from '../../constants/Colors';
import { TouchableScale } from '../ui/TouchableScale';

interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: string;
  icon: any;
  color: string;
}

export function RecentActivityList() {
  const db = useSQLiteContext();
  const [activities, setActivities] = useState<Transaction[]>([]);

  useEffect(() => {
    async function loadData() {
      // Fetch data directly from SQLite
      const result = await db.getAllAsync<Transaction>('SELECT * FROM transactions ORDER BY created_at DESC');
      setActivities(result);
    }
    loadData();
  }, [db]);

  const formatAmount = (amount: number, type: string) => {
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(amount));
    return type === 'INCOME' ? `+${formatted}` : `-${formatted}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <TouchableScale>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableScale>
      </View>

      <View style={styles.activityList}>
        {activities.map((item) => (
          <TouchableScale key={item.id} scaleTo={0.98}>
            <View style={styles.activityCard}>
              <View style={styles.activityLeft}>
                <View style={[styles.activityIcon, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
                <View>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Text style={[
                styles.activityAmount, 
                { color: item.type === 'INCOME' ? Colors.brand.mint : Colors.text.primary }
              ]}>
                {formatAmount(item.amount, item.type)}
              </Text>
            </View>
          </TouchableScale>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: Colors.text.title,
    fontSize: 18,
    fontWeight: '700',
  },
  seeAllText: {
    color: Colors.brand.yuzu,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border.faint,
    borderLeftWidth: 4,
    borderLeftColor: Colors.border.brand,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityTitle: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activitySubtitle: {
    color: Colors.text.secondary,
    fontSize: 13,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
});
