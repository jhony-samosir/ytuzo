import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { financeStyles as styles } from './financeStyles';
import { EmptyState } from '../ui/EmptyState';
import { formatMoney, safeAlpha } from '../../utils/finance';
import { Wallet } from '../../types/finance';

interface AccountsTabProps {
  wallets: Wallet[];
}

export const AccountsTab: React.FC<AccountsTabProps> = ({ wallets }) => {
  if (wallets.length === 0) {
    return (
      <View style={styles.tabContent}>
        <EmptyState 
          icon="wallet-outline" 
          title="No Accounts" 
          description="Add your first bank account or wallet to start tracking."
          actionLabel="Add Account"
        />
      </View>
    );
  }

  return (
    <View style={styles.tabContent}>
      <View style={styles.accountsGrid}>
        {wallets.map((w) => (
          <LinearGradient
            key={w.id}
            colors={[safeAlpha(w.color_theme, 0.25), 'rgba(255,255,255,0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={localStyles.card}
          >
            {/* Top row with icon and type */}
            <View style={localStyles.cardHeader}>
              <View style={[localStyles.cardIconBg, { backgroundColor: safeAlpha(w.color_theme, 0.2) }]}>
                <Ionicons 
                  name={w.type === 'BANK' ? 'library' : w.type === 'CASH' ? 'cash' : 'wallet'} 
                  size={20} 
                  color={w.color_theme || '#FFF'} 
                />
              </View>
              <Text style={localStyles.cardType}>{w.type}</Text>
            </View>

            {/* Simulated Chip */}
            <View style={localStyles.chip}>
              <View style={localStyles.chipLine} />
              <View style={localStyles.chipLine} />
              <View style={localStyles.chipLine} />
            </View>

            {/* Bottom info */}
            <View style={localStyles.cardFooter}>
              <Text style={localStyles.cardName}>{w.name}</Text>
              <Text style={localStyles.cardBalance}>{formatMoney(w.balance)}</Text>
            </View>
          </LinearGradient>
        ))}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
    height: 200,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIconBg: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 13,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  chip: {
    width: 40,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 4,
    marginTop: 20,
  },
  chipLine: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  cardFooter: {
    marginTop: 16,
  },
  cardName: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  cardBalance: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
});
