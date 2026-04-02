import React from 'react';
import { useTransactions } from '../contexts/TransactionContext';
import { TransactionItem } from './TransactionItem';
import { Receipt } from 'lucide-react';

export function TransactionList() {
  const { filteredTransactions, deleteTransaction, filter } = useTransactions();

  // Show empty state if no transactions
  if (filteredTransactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Receipt className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Transactions Found</h3>
          <p className="text-gray-600">
            {filter.type !== 'all' || filter.category !== 'all'
              ? 'Try adjusting your filters to see more transactions.'
              : 'Start by adding your first transaction.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <span className="text-sm text-gray-600">
          {filteredTransactions.length} {filteredTransactions.length === 1 ? 'transaction' : 'transactions'}
        </span>
      </div>

      <div className="space-y-3">
        {filteredTransactions.map(transaction => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={deleteTransaction}
          />
        ))}
      </div>
    </div>
  );
}
