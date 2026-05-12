import React from 'react';
import { Transaction } from '../contexts/TransactionContext';
import { Button } from './ui/button';
import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  // Format date
  const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Format amount
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(transaction.amount);

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-4 flex-1">
        {/* Icon based on transaction type */}
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            transaction.type === 'income'
              ? 'bg-green-100'
              : 'bg-red-100'
          }`}
        >
          {transaction.type === 'income' ? (
            <ArrowUpCircle className="w-5 h-5 text-green-600" />
          ) : (
            <ArrowDownCircle className="w-5 h-5 text-red-600" />
          )}
        </div>

        {/* Transaction details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-medium text-gray-900">{transaction.description}</p>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                transaction.type === 'income'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {transaction.category}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
        </div>

        {/* Amount */}
        <div className="text-right">
          <p
            className={`text-lg font-semibold ${
              transaction.type === 'income'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {transaction.type === 'income' ? '+' : '-'}{formattedAmount}
          </p>
        </div>
      </div>

      {/* Delete button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(transaction.id)}
        className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-4 h-4 text-red-600" />
      </Button>
    </div>
  );
}
