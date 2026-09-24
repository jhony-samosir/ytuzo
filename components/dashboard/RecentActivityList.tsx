import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';

import { Colors } from '../../constants/Colors';
import { TouchableScale } from '../ui/TouchableScale';

interface DailyActivity {
  id: string;
  module_type: 'FINANCE' | 'SPORTS' | 'FUEL';
  primary_text: string;
  secondary_text: string;
  main_value: number;
  sub_value: string;
  icon: any;
  color: string;
}

export function RecentActivityList() {
  const db = useSQLiteContext();
  const [activities, setActivities] = useState<DailyActivity[]>([]);

  useEffect(() => {
    async function loadData() {
      // Fetch data directly from SQLite unified view
      const result = await db.getAllAsync<DailyActivity>('SELECT * FROM daily_activities ORDER BY created_at DESC');
      setActivities(result);
    }
    loadData();
  }, [db]);

  const renderValue = (item: DailyActivity) => {
    if (item.module_type === 'FINANCE' || item.module_type === 'FUEL') {
      const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(item.main_value));
      const prefix = item.sub_value === 'INCOME' ? '+' : '-';
      const color = item.sub_value === 'INCOME' ? Colors.brand.mint : Colors.text.primary;
      return <Text style={[styles.activityAmount, { color }]}>{prefix}{formatted}</Text>;
    }
    if (item.module_type === 'SPORTS') {
      return (
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.activityAmount, { color: Colors.text.primary }]}>{item.main_value}</Text>
          <Text style={{ fontSize: 10, color: Colors.brand.yuzu, fontWeight: '700' }}>KCAL</Text>
        </View>
      );
    }
    return null;
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
                  <Text style={styles.activityTitle}>{item.primary_text}</Text>
                  <Text style={styles.activitySubtitle}>{item.secondary_text}</Text>
                </View>
              </View>
              {renderValue(item)}
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
