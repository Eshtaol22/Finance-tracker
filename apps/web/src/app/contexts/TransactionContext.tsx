import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Transaction type
export type TransactionType = 'income' | 'expense';

// Transaction categories
export const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Other Income'],
  expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Other'],
};

// Transaction interface
export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  amount: number;
  description: string;
  date: string;
}

// Filter interface
export interface TransactionFilter {
  type: 'all' | TransactionType;
  category: string;
}

// Transaction context type
interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  filter: TransactionFilter;
  setFilter: (filter: TransactionFilter) => void;
  filteredTransactions: Transaction[];
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Sample initial transactions for demo
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'income',
    category: 'Salary',
    amount: 5000,
    description: 'Monthly salary',
    date: '2026-03-01',
  },
  {
    id: '2',
    type: 'expense',
    category: 'Food',
    amount: 250,
    description: 'Grocery shopping',
    date: '2026-03-05',
  },
  {
    id: '3',
    type: 'expense',
    category: 'Transport',
    amount: 100,
    description: 'Monthly bus pass',
    date: '2026-03-10',
  },
  {
    id: '4',
    type: 'income',
    category: 'Freelance',
    amount: 800,
    description: 'Website project',
    date: '2026-03-15',
  },
];

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<TransactionFilter>({
    type: 'all',
    category: 'all',
  });

  // Load transactions from localStorage on mount
  useEffect(() => {
    const storedTransactions = localStorage.getItem('finance_tracker_transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      // Use initial transactions if none stored
      setTransactions(INITIAL_TRANSACTIONS);
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('finance_tracker_transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  // Add new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  // Delete transaction
  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const typeMatch = filter.type === 'all' || transaction.type === filter.type;
    const categoryMatch = filter.category === 'all' || transaction.category === filter.category;
    return typeMatch && categoryMatch;
  });

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    filter,
    setFilter,
    filteredTransactions,
    totalBalance,
    totalIncome,
    totalExpenses,
  };

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
}

// Custom hook to use transaction context
export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
