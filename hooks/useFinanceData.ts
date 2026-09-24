import { useState, useEffect, useCallback } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { Wallet, Budget, Subscription, Transaction, Category } from '../types/finance';

export function useFinanceData() {
  const db = useSQLiteContext();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const wData = await db.getAllAsync<Wallet>('SELECT * FROM wallets');
      setWallets(wData);

      const bData = await db.getAllAsync<Budget>(`
        SELECT b.*, c.name as category_name, c.icon as category_icon, c.color as category_color 
        FROM budgets b
        JOIN categories c ON b.category_id = c.id
      `);
      setBudgets(bData);

      const cData = await db.getAllAsync<Category>('SELECT * FROM categories');
      setCategories(cData);

      const sData = await db.getAllAsync<Subscription>('SELECT * FROM subscriptions ORDER BY next_billing_date ASC');
      setSubscriptions(sData);

      const tData = await db.getAllAsync<Transaction>('SELECT * FROM finance_logs ORDER BY created_at DESC');
      setTransactions(tData);
    } catch (e) {
      console.warn('Database not fully migrated yet.', e);
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      setTransactions(prev => prev.filter(t => t.id !== id));
      await db.runAsync('DELETE FROM finance_logs WHERE id = ?', [id]);
    } catch (e) {
      console.error('Failed to delete transaction', e);
      loadData();
    }
  }, [db, loadData]);

  const addTransaction = useCallback(async (tx: Omit<Transaction, 'id' | 'created_at'> & { created_at?: string | number }) => {
    try {
      const txTime = tx.created_at ? (typeof tx.created_at === 'string' ? new Date(tx.created_at).getTime() : tx.created_at) : Date.now();
      const id = 'fin-' + Date.now() + Math.floor(Math.random() * 1000); // Generate unique ID
      await db.runAsync(
        'INSERT INTO finance_logs (id, title, subtitle, amount, type, icon, color, created_at, updated_at, sync_status, wallet_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)',
        [id, tx.title, tx.subtitle, tx.amount, tx.type, tx.icon || 'cash', tx.color || '#10B981', txTime, Date.now(), tx.wallet_id || 'w-1', tx.category_id || 'cat-1']
      );
      loadData();
    } catch (e) {
      console.error('Failed to add transaction', e);
    }
  }, [db, loadData]);

  const updateTransaction = useCallback(async (id: string, tx: Partial<Transaction>) => {
    try {
      const now = Date.now();
      const txTime = tx.created_at ? (typeof tx.created_at === 'string' ? new Date(tx.created_at).getTime() : tx.created_at) : null;
      await db.runAsync(
        'UPDATE finance_logs SET title = COALESCE(?, title), subtitle = COALESCE(?, subtitle), amount = COALESCE(?, amount), type = COALESCE(?, type), wallet_id = COALESCE(?, wallet_id), category_id = COALESCE(?, category_id), created_at = COALESCE(?, created_at), updated_at = ? WHERE id = ?',
        [tx.title ?? null, tx.subtitle ?? null, tx.amount ?? null, tx.type ?? null, tx.wallet_id ?? null, tx.category_id ?? null, txTime, now, id]
      );
      loadData();
    } catch (e) {
      console.error('Failed to update transaction', e);
    }
  }, [db, loadData]);

  const totalBalance = wallets.reduce((acc, w) => acc + w.balance, 0);

  return {
    wallets,
    budgets,
    subscriptions,
    transactions,
    categories,
    totalBalance,
    isLoading,
    error,
    refreshData: loadData,
    deleteTransaction,
    addTransaction,
    updateTransaction
  };
}
