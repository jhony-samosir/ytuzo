export interface Wallet {
  id: string;
  name: string;
  type: 'BANK' | 'CASH' | 'WALLET';
  balance: number;
  color_theme: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Budget {
  id: string;
  category_id: string;
  monthly_limit: number;
  category_name: string;
  category_icon: string;
  category_color: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  next_billing_date: string; // ISO string
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  icon: string;
  color: string;
  created_at: string; // ISO string
  wallet_id?: string;
  category_id?: string;
}
