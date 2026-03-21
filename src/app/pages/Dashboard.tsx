import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../contexts/TransactionContext';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { StatsCard } from '../components/StatsCard';
import { AddTransactionForm } from '../components/AddTransactionForm';
import { TransactionList } from '../components/TransactionList';
import { ChartSection } from '../components/ChartSection';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export function Dashboard() {
  const { isAuthenticated } = useAuth();
  const { totalBalance, totalIncome, totalExpenses } = useTransactions();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page title */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600 mt-1">Welcome back! Here's your financial overview.</p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatsCard
                title="Total Balance"
                amount={totalBalance}
                icon={Wallet}
                iconBgColor="bg-indigo-100"
                iconColor="text-indigo-600"
              />
              <StatsCard
                title="Total Income"
                amount={totalIncome}
                icon={TrendingUp}
                iconBgColor="bg-green-100"
                iconColor="text-green-600"
              />
              <StatsCard
                title="Total Expenses"
                amount={totalExpenses}
                icon={TrendingDown}
                iconBgColor="bg-red-100"
                iconColor="text-red-600"
              />
            </div>

            {/* Charts */}
            <div className="mb-8">
              <ChartSection />
            </div>

            {/* Add transaction form */}
            <div className="mb-8">
              <AddTransactionForm />
            </div>

            {/* Transaction list */}
            <TransactionList />
          </div>
        </main>
      </div>
    </div>
  );
}
