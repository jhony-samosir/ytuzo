import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export const financeStyles = StyleSheet.create({
  // Container & Headers
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.title,
    letterSpacing: -0.5,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.faint,
  },
  headerActionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.faint,
  },
  
  // Submenu Styles
  submenuContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  tabPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.background.card,
    borderWidth: 1,
    borderColor: Colors.border.faint,
  },
  tabPillActive: {
    backgroundColor: Colors.text.primary,
    borderColor: Colors.text.primary,
  },
  tabPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  tabPillTextActive: {
    color: Colors.background.primary,
  },

  tabContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  // Overview Tab Styles
  netWorthCard: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 32,
    overflow: 'hidden', // For BlurView
  },
  netWorthLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  netWorthAmount: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginTop: 4,
    marginBottom: 24,
  },
  cashFlowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  cashFlowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cfIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cfLabel: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  cfAmount: {
    fontSize: 16,
    color: Colors.text.primary,
    fontWeight: '700',
  },
  cfDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border.faint,
    marginHorizontal: 16,
  },

  chartContainer: {
    backgroundColor: Colors.background.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border.faint,
    marginBottom: 32,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.title,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.title,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.brand.yuzu,
  },

  // List Styles (Transactions)
  txList: {
    marginBottom: 32,
  },
  txListContainer: {
  },
  txItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 12,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  txTitle: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  txSubtitle: {
    color: Colors.text.secondary,
    fontSize: 13,
    marginTop: 2,
  },
  txAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  swipeDeleteBtn: {
    backgroundColor: '#F43F5E',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    height: '100%',
    width: 80,
    borderRadius: 16,
    marginLeft: 16,
  },

  // Budgets Tab
  budgetList: {
  },
  budgetItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 24,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  budgetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetName: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  budgetAmount: {
    color: Colors.text.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  budgetLimit: {
    color: Colors.text.muted,
    fontWeight: '500',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },

  // Accounts Tab
  accountsGrid: {
  },
  accountCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    marginBottom: 16,
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  accountIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountType: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text.secondary,
    letterSpacing: 1,
  },
  accountName: {
    color: Colors.text.secondary,
    fontSize: 15,
    fontWeight: '500',
  },
  accountBalance: {
    fontSize: 32,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: -0.5,
  },

  // Subscriptions
  subList: {
    marginBottom: 40,
  },
  subItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border.faint,
    borderLeftWidth: 4,
    borderLeftColor: Colors.border.brand,
    marginBottom: 12,
  },
  subLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  subName: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  subDate: {
    color: Colors.text.secondary,
    fontSize: 13,
    marginTop: 2,
  },
  subAmount: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  
  // Global FAB for Finance
  fab: {
    position: 'absolute',
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.brand.yuzu,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.brand.yuzu,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
    zIndex: 100,
  }
});
