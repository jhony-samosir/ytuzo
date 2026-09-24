import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { financeStyles as styles } from './financeStyles';
import { Colors } from '../../constants/Colors';
import { EmptyState } from '../ui/EmptyState';
import { formatMoney, safeAlpha } from '../../utils/finance';
import { Transaction, Subscription } from '../../types/finance';

interface OverviewTabProps {
  totalBalance: number;
  transactions: Transaction[];
  subscriptions: Subscription[];
  showChart: boolean;
  onSeeAllTransactions: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ 
  totalBalance, 
  transactions, 
  subscriptions, 
  showChart, 
  onSeeAllTransactions 
}) => {
  const { width } = useWindowDimensions();
  
  // Calculate income and expense
  const totalIncome = useMemo(() => transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0), [transactions]);
  const totalExpense = useMemo(() => transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0), [transactions]);

  // Dynamically calculate chart data grouped by subtitle (category)
  const chartData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'EXPENSE');
    const grouped = expenses.reduce((acc, tx) => {
      const category = tx.subtitle || 'Other';
      if (!acc[category]) {
        acc[category] = { name: category, amount: 0, color: tx.color || '#A1A1AA', legendFontColor: Colors.text.primary, legendFontSize: 13 };
      }
      acc[category].amount += tx.amount;
      return acc;
    }, {} as Record<string, any>);
    
    const result = Object.values(grouped).sort((a, b) => b.amount - a.amount);
    // Return placeholder if no expenses
    if (result.length === 0) {
      return [{ name: 'No Expenses', amount: 1, color: 'rgba(255,255,255,0.1)', legendFontColor: Colors.text.primary, legendFontSize: 13 }];
    }
    return result;
  }, [transactions]);

  const getSafeIcon = (iconName: string | undefined): any => {
    return iconName ? iconName : 'help-circle-outline';
  };

  return (
    <View style={styles.tabContent}>
      {/* Premium Net Worth Card with Glassmorphism */}
      <View style={{ borderRadius: 32, overflow: 'hidden', marginBottom: 32 }}>
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        <LinearGradient 
          colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.01)']}
          style={localStyles.heroCard}
        >
          <Text style={localStyles.heroLabel}>Total Net Worth</Text>
          <Text style={localStyles.heroAmount}>{formatMoney(totalBalance)}</Text>
          
          <View style={localStyles.cashFlowRow}>
            <View style={localStyles.cashFlowItem}>
              <View style={[localStyles.cfIconBg, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Ionicons name="arrow-down" size={16} color="#10B981" />
              </View>
              <View>
                <Text style={localStyles.cfLabel}>Income</Text>
                <Text style={localStyles.cfAmount}>{formatMoney(totalIncome)}</Text>
              </View>
            </View>
            <View style={localStyles.cfDivider} />
            <View style={localStyles.cashFlowItem}>
              <View style={[localStyles.cfIconBg, { backgroundColor: 'rgba(244, 63, 94, 0.2)' }]}>
                <Ionicons name="arrow-up" size={16} color="#F43F5E" />
              </View>
              <View>
                <Text style={localStyles.cfLabel}>Expense</Text>
                <Text style={localStyles.cfAmount}>{formatMoney(totalExpense)}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Chart Visualization Toggle */}
      {showChart && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Expense Breakdown</Text>
          <PieChart
            data={chartData}
            width={width - 48}
            height={220}
            chartConfig={{ color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})` }}
            accessor={"amount"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />
        </View>
      )}

      {/* Recent Transactions Preview */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <TouchableOpacity onPress={onSeeAllTransactions}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {transactions.length === 0 ? (
        <EmptyState 
          icon="receipt-outline" 
          title="No Transactions" 
          description="You haven't logged any income or expenses yet."
          actionLabel="Log Income"
        />
      ) : (
        <View style={styles.txList}>
          {transactions.slice(0, 3).map(tx => (
            <View key={tx.id} style={styles.txItem}>
              <View style={styles.txLeft}>
                <View style={[styles.txIconBg, { backgroundColor: safeAlpha(tx.color, 0.15) }]}>
                  <Ionicons name={getSafeIcon(tx.icon)} size={20} color={tx.color || '#FAFAFA'} />
                </View>
                <View>
                  <Text style={styles.txTitle}>{tx.title}</Text>
                  <Text style={styles.txSubtitle}>{tx.subtitle}</Text>
                </View>
              </View>
              <Text style={[styles.txAmount, { color: tx.type === 'INCOME' ? '#10B981' : Colors.text.primary }]}>
                {tx.type === 'INCOME' ? '+' : '-'}{formatMoney(tx.amount)}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Upcoming Subscriptions Preview */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Bills</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Manage</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subList}>
        {subscriptions.map(s => {
          const date = new Date(s.next_billing_date);
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          return (
            <View key={s.id} style={styles.subItem}>
              <View style={styles.subLeft}>
                <View style={[styles.subIconBg, { backgroundColor: safeAlpha(s.color, 0.15) }]}>
                  <Ionicons name={getSafeIcon(s.icon)} size={20} color={s.color || '#FAFAFA'} />
                </View>
                <View>
                  <Text style={styles.subName}>{s.name}</Text>
                  <Text style={styles.subDate}>Due {dateStr}</Text>
                </View>
              </View>
              <Text style={styles.subAmount}>{formatMoney(s.amount)}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  heroCard: {
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 32,
  },
  heroLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  heroAmount: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1.5,
    marginTop: 8,
    marginBottom: 28,
  },
  cashFlowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  cashFlowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cfIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cfLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    marginBottom: 2,
  },
  cfAmount: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  cfDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 20,
  },
});
