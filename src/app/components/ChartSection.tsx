import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useTransactions } from '../contexts/TransactionContext';

export function ChartSection() {
  const { totalIncome, totalExpenses } = useTransactions();

  // Data for income vs expenses pie chart
  const pieData = [
    { name: 'Income', value: totalIncome, color: '#10b981' },
    { name: 'Expenses', value: totalExpenses, color: '#ef4444' },
  ];

  // Colors for pie chart
  const COLORS = ['#10b981', '#ef4444'];

  // Custom label for pie chart
  const renderLabel = (entry: any) => {
    const percent = ((entry.value / (totalIncome + totalExpenses)) * 100).toFixed(0);
    return `${percent}%`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Overview</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart - Income vs Expenses */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4 text-center">Income vs Expenses</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(value)
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Comparison */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4 text-center">Financial Comparison</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { name: 'Income', amount: totalIncome },
                { name: 'Expenses', amount: totalExpenses },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(value)
                }
              />
              <Bar dataKey="amount" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary stats below charts */}
      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Income</p>
          <p className="text-lg font-semibold text-green-600">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(totalIncome)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Expenses</p>
          <p className="text-lg font-semibold text-red-600">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(totalExpenses)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Net Balance</p>
          <p className={`text-lg font-semibold ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(totalIncome - totalExpenses)}
          </p>
        </div>
      </div>
    </div>
  );
}
