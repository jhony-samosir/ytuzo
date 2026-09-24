import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { financeStyles as styles } from './financeStyles';
import { EmptyState } from '../ui/EmptyState';
import { formatMoney, safeAlpha } from '../../utils/finance';
import { Budget } from '../../types/finance';

interface BudgetsTabProps {
  budgets: Budget[];
}

export const BudgetsTab: React.FC<BudgetsTabProps> = ({ budgets }) => {
  if (budgets.length === 0) {
    return (
      <View style={styles.tabContent}>
        <EmptyState 
          icon="pie-chart-outline" 
          title="No Budgets Set" 
          description="Take control of your spending by creating monthly budgets."
          actionLabel="Create Budget"
        />
      </View>
    );
  }

  return (
    <View style={styles.tabContent}>
      <View style={styles.budgetList}>
        {budgets.map(b => {
          // For demo purposes, generating a static mock spent amount.
          const spent = b.monthly_limit * 0.65; 
          const progress = Math.min((spent / (b.monthly_limit || 1)) * 100, 100);
          
          return (
            <View key={b.id} style={localStyles.budgetItem}>
              <View style={localStyles.budgetHeader}>
                <View style={localStyles.budgetTitleRow}>
                  <View style={[localStyles.iconWrapper, { backgroundColor: safeAlpha(b.category_color, 0.15) }]}>
                    <Ionicons name={(b.category_icon || 'pie-chart') as any} size={18} color={b.category_color || '#FFF'} />
                  </View>
                  <Text style={localStyles.budgetName}>{b.category_name || 'Category'}</Text>
                </View>
                <Text style={localStyles.budgetPercent}>{Math.round(progress)}%</Text>
              </View>
              
              <Text style={localStyles.budgetAmount}>
                {formatMoney(spent)} <Text style={localStyles.budgetLimit}>/ {formatMoney(b.monthly_limit)}</Text>
              </Text>

              <View style={localStyles.progressBarBg}>
                <View style={[localStyles.progressBarFill, { width: `${progress}%`, backgroundColor: b.category_color }]} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  budgetItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  budgetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  budgetName: {
    color: '#FAFAFA',
    fontSize: 17,
    fontWeight: '700',
  },
  budgetPercent: {
    color: '#FAFAFA',
    fontSize: 16,
    fontWeight: '800',
  },
  budgetAmount: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
  },
  budgetLimit: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '500',
    fontSize: 14,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
});
