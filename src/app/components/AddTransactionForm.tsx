import React, { useState } from 'react';
import { useTransactions, CATEGORIES, TransactionType } from '../contexts/TransactionContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Plus, X } from 'lucide-react';

export function AddTransactionForm() {
  const { addTransaction } = useTransactions();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'expense' as TransactionType,
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Handle form input changes
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Reset category when type changes
    if (field === 'type') {
      setFormData(prev => ({
        ...prev,
        category: '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.category || !formData.amount || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    // Add transaction
    addTransaction({
      type: formData.type,
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date,
    });

    // Reset form and close
    setFormData({
      type: 'expense',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
    setIsOpen(false);
  };

  // Get categories based on transaction type
  const availableCategories = formData.type === 'income' ? CATEGORIES.income : CATEGORIES.expense;

  return (
    <div>
      {/* Add transaction button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Transaction
        </Button>
      )}

      {/* Transaction form */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Add New Transaction</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Transaction type */}
            <div>
              <Label htmlFor="type">Transaction Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleChange('type', value)}
              >
                <SelectTrigger id="type" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger id="category" className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder="0.00"
                required
                className="mt-1"
              />
            </div>

            {/* Date */}
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter transaction details"
                required
                className="mt-1"
                rows={3}
              />
            </div>

            {/* Submit buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Add Transaction
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
