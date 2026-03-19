import React, { useState } from 'react';
import { useTransactions, CATEGORIES } from '../contexts/TransactionContext';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Filter, X, Menu } from 'lucide-react';

export function Sidebar() {
  const { filter, setFilter } = useTransactions();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle filter changes
  const handleTypeChange = (value: string) => {
    setFilter({
      ...filter,
      type: value as 'all' | 'income' | 'expense',
    });
  };

  const handleCategoryChange = (value: string) => {
    setFilter({
      ...filter,
      category: value,
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilter({
      type: 'all',
      category: 'all',
    });
  };

  // Get available categories based on selected type
  const getAvailableCategories = () => {
    if (filter.type === 'income') return CATEGORIES.income;
    if (filter.type === 'expense') return CATEGORIES.expense;
    return [...CATEGORIES.income, ...CATEGORIES.expense];
  };

  const sidebarContent = (
    <div className="h-full bg-white border-r border-gray-200 p-6 overflow-y-auto">
      {/* Mobile close button */}
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Filter header for desktop */}
      <div className="hidden lg:flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>

      {/* Filter options */}
      <div className="space-y-6">
        {/* Transaction type filter */}
        <div>
          <Label htmlFor="type-filter" className="text-sm font-medium text-gray-700">
            Transaction Type
          </Label>
          <Select value={filter.type} onValueChange={handleTypeChange}>
            <SelectTrigger id="type-filter" className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="income">Income Only</SelectItem>
              <SelectItem value="expense">Expenses Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category filter */}
        <div>
          <Label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
            Category
          </Label>
          <Select value={filter.category} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category-filter" className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {getAvailableCategories().map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reset filters button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </div>

      {/* Active filters info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs font-medium text-gray-600 mb-2">Active Filters:</p>
        <div className="space-y-1">
          <p className="text-sm text-gray-900">
            Type: <span className="font-medium capitalize">{filter.type}</span>
          </p>
          <p className="text-sm text-gray-900">
            Category: <span className="font-medium">{filter.category === 'all' ? 'All' : filter.category}</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="sm"
        className="lg:hidden fixed bottom-4 right-4 z-20 shadow-lg"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="w-5 h-5 mr-2" />
        Filters
      </Button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="lg:hidden fixed top-0 left-0 bottom-0 w-64 z-40">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
