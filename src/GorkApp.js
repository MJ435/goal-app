import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Pie } from 'recharts';
import { 
  User, 
  Target, 
  ArrowLeft, 
  Settings as SettingsIcon, 
  Wallet, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Home, 
  BarChart3, 
  Plus, 
  CreditCard 
} from 'lucide-react';

// Bottom Navigation Component
const BottomNavigation = ({ currentPage = 'home' }) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link to="/dashboard" className="flex flex-col items-center p-2">
            <Home className={`w-5 h-5 ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className={`text-xs mt-1 ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>Home</span>
          </Link>
          <Link to="/categories" className="flex flex-col items-center p-2">
            <BarChart3 className={`w-5 h-5 ${currentPage === 'analytics' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className={`text-xs mt-1 ${currentPage === 'analytics' ? 'text-blue-600' : 'text-gray-400'}`}>Analytics</span>
          </Link>
          <Link to="/transaction" className="bg-blue-600 rounded-full p-3">
            <Plus className="w-6 h-6 text-white" />
          </Link>
          <Link to="/cards" className="flex flex-col items-center p-2">
            <CreditCard className={`w-5 h-5 ${currentPage === 'cards' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className={`text-xs mt-1 ${currentPage === 'cards' ? 'text-blue-600' : 'text-gray-400'}`}>Cards</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-2">
            <User className={`w-5 h-5 ${currentPage === 'profile' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className={`text-xs mt-1 ${currentPage === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}>Profile</span>
          </Link>
        </div>
      </div>
      <div className="h-20"></div>
    </>
  );
};

// Static data
const STATIC_DATA = {
  accounts: {
    current: 125.0,
    projected: 375.0,
    wallet: 2425.48,
  },
  transactions: [
    { id: 1, category: 'Transportation', amount: 165.0, type: 'expense', icon: '🚗', color: '#8B5CF6' },
    { id: 2, category: 'Food', amount: 245.5, type: 'expense', icon: '🍽️', color: '#F59E0B' },
    { id: 3, category: 'Education', amount: 298.0, type: 'expense', icon: '📚', color: '#10B981' },
    { id: 4, category: 'Clothing', amount: 189.0, type: 'expense', icon: '👕', color: '#06B6D4' },
    { id: 5, category: 'Entertainment', amount: 87.5, type: 'expense', icon: '🎬', color: '#EC4899' },
  ],
  budgetData: {
    totalSpent: 985.0,
    monthlyBudget: 1500,
    creditScore: 720,
    bills: [
      { name: 'Rent', amount: 450, due: 'Aug 1', status: 'paid' },
      { name: 'Electricity', amount: 125.5, due: 'Aug 15', status: 'pending' },
      { name: 'Water', amount: 65.99, due: 'Aug 22', status: 'pending' },
    ],
  },
};

// Authentication Component
const AuthPage = ({ setUserInfo }) => {
  const navigate = useNavigate();
  const [userInfo, setLocalUserInfo] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: ''
  });
  const [isSignUp, setIsSignUp] = useState(true);

  const handleInputChange = useCallback((field, value) => {
    setLocalUserInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = () => {
    setUserInfo(userInfo);
    navigate('/account-selection');
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="min-h-screen bg-gradient-to-b from-green-400 to-green-500 flex flex-col">
        <div className="bg-white rounded-t-3xl flex-1 mt-16 p-6">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mr-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">G.O.A.L.S</h1>
              <p className="text-gray-500 text-sm">Grow Over Assets, Limit Spending</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button 
              className={`px-4 py-2 ${isSignUp ? 'border-b-2 border-green-500' : ''}`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
            <button 
              className={`px-4 py-2 ${!isSignUp ? 'border-b-2 border-green-500' : ''}`}
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
          </div>

          <div className="mb-8">
            {isSignUp && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">NAME:</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full p-3 border rounded-lg text-base outline-none box-border"
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">USERNAME:</label>
              <input
                type="text"
                value={userInfo.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full p-3 border rounded-lg text-base outline-none box-border"
                placeholder="Choose a username"
              />
            </div>
            {isSignUp && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">TEL NO:</label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full p-3 border rounded-lg text-base outline-none box-border"
                  placeholder="Enter phone number"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">EMAIL:</label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-3 border rounded-lg text-base outline-none box-border"
                placeholder="Enter email address"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">PASSWORD:</label>
              <input
                type="password"
                value={userInfo.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full p-3 border rounded-lg text-base outline-none box-border"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-red-500 text-white p-3 rounded-lg font-medium border-none cursor-pointer text-base">
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="flex-1 bg-green-500 text-white p-3 rounded-lg font-medium border-none cursor-pointer text-base"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>

        <BottomNavigation currentPage="analytics" />
      </div>
    </div>
  );
};

// Account Selection Component
const AccountSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="min-h-screen bg-gradient-to-b from-green-400 to-green-500 flex flex-col">
        <div className="bg-white rounded-t-3xl flex-1 mt-16 p-6">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mr-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">G.O.A.L.S</h1>
          </div>

          <h2 className="text-xl font-bold text-center mb-8 text-gray-800">Choose an account</h2>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-yellow-400 text-black p-4 rounded-full text-lg font-bold border-none cursor-pointer hover:bg-yellow-500 transition-colors"
            >
              MTN
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-red-500 text-white p-4 rounded-full text-lg font-bold border-none cursor-pointer hover:bg-red-600 transition-colors"
            >
              AirtelTigo
            </button>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-purple-600 text-white p-4 px-8 rounded-full text-lg font-bold border-none cursor-pointer hover:bg-purple-700 transition-colors"
            >
              Telecel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Transaction Input Component
const TransactionInput = ({ transactions, setTransactions }) => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    category: '',
    amount: '',
    type: 'expense',
    icon: '💸',
    color: '#000000'
  });

  const handleInputChange = (field, value) => {
    setTransaction(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (transaction.category && transaction.amount) {
      const newTransaction = {
        ...transaction,
        id: Date.now(),
        amount: parseFloat(transaction.amount)
      };
      setTransactions([...transactions, newTransaction]);
      setTransaction({
        category: '',
        amount: '',
        type: 'expense',
        icon: '💸',
        color: '#000000'
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Add Transaction</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Type</label>
            <select
              value={transaction.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full p-3 border rounded-lg text-base outline-none"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              value={transaction.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full p-3 border rounded-lg text-base outline-none"
              placeholder="Enter category"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              value={transaction.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className="w-full p-3 border rounded-lg text-base outline-none"
              placeholder="Enter amount"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Icon</label>
            <select
              value={transaction.icon}
              onChange={(e) => handleInputChange('icon', e.target.value)}
              className="w-full p-3 border rounded-lg text-base outline-none"
            >
              <option value="💸">💸 Money</option>
              <option value="🚗">🚗 Transportation</option>
              <option value="🍽️">🍽️ Food</option>
              <option value="📚">📚 Education</option>
              <option value="👕">👕 Clothing</option>
              <option value="🎬">🎬 Entertainment</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Color</label>
            <input
              type="color"
              value={transaction.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              className="w-full h-10 border rounded-lg"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white p-3 rounded-lg font-medium border-none cursor-pointer text-base hover:bg-green-600 transition-colors"
          >
            Add Transaction
          </button>
        </div>

        <BottomNavigation currentPage="transaction" />
      </div>
    </div>
  );
};

// Category Visualization Component
const CategoryVisualization = ({ transactions, budgetData }) => {
  const pieChartData = transactions.map(transaction => ({
    name: transaction.category,
    value: transaction.amount,
    color: transaction.color
  }));

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Spending by Category</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <p className="text-green-700 font-medium">You've spent ₵{budgetData.totalSpent} this month</p>
            <p className="text-sm text-green-600">Budget remaining: ₵{(budgetData.monthlyBudget - budgetData.totalSpent).toFixed(2)}</p>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Budget Progress</span>
              <span>{((budgetData.totalSpent / budgetData.monthlyBudget) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((budgetData.totalSpent / budgetData.monthlyBudget) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Spending by Category</h4>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">₵{budgetData.totalSpent}</p>
              <p className="text-sm text-gray-500">Total Spent</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Category Breakdown</h4>
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: transaction.color }}
                  ></div>
                  <span className="text-sm flex items-center">
                    <span className="mr-2">{transaction.icon}</span>
                    {transaction.category}
                  </span>
                </div>
                <span className="font-medium">₵{transaction.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Budget and Goals Component
const BudgetGoals = ({ budgetData, setBudgetData }) => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState({
    type: 'monthly',
    amount: budgetData.monthlyBudget,
    savingsTarget: 0
  });

  const handleInputChange = (field, value) => {
    setBudget(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setBudgetData(prev => ({
      ...prev,
      monthlyBudget: budget.type === 'monthly' ? parseFloat(budget.amount) : parseFloat(budget.amount) * 4,
      weeklyBudget: budget.type === 'weekly' ? parseFloat(budget.amount) : parseFloat(budget.amount) / 4,
      savingsTarget: parseFloat(budget.savingsTarget)
    }));
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Set Budget & Goals</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Budget Type</label>
            <select
              value={budget.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full p-3 border rounded-lg text-base outline-none"
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Budget Amount</label>
            <input
              type="number"
              value={budget.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className="w-full p-3 border rounded-lg text-base outline-none"
              placeholder="Enter budget amount"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Savings Target</label>
            <input
              type="number"
              value={budget.savingsTarget}
              onChange={(e) => handleInputChange('savingsTarget', e.target.value)}
              className="w-full p-3 border rounded-lg text-base outline-none"
              placeholder="Enter savings target"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white p-3 rounded-lg font-medium border-none cursor-pointer text-base hover:bg-green-600 transition-colors"
          >
            Set Budget & Goals
          </button>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ accounts, budgetData, transactions }) => {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="min-h-screen bg-gray-100">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
          <div className="flex justify-between items-center mb-4">
            <Link to="/auth">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <Link to="/settings">
              <SettingsIcon className="w-6 h-6" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-sm opacity-90 mb-1">Current Balance</p>
              <p className="text-2xl font-bold">₵{accounts.current}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-sm opacity-90 mb-1">Projected Balance</p>
              <p className="text-2xl font-bold">₵{accounts.projected}</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white m-4 mt-[-8px] rounded-lg shadow mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Wallet</p>
              <p className="font-bold">₵{accounts.wallet}</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Credit Score</p>
              <p className="font-bold">{budgetData.creditScore}</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Budget Left</p>
              <p className="font-bold">₵{(budgetData.monthlyBudget - budgetData.totalSpent).toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold text-lg mb-3">Upcoming Bills</h3>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-blue-800 font-medium">
                You have ₵{budgetData.bills.reduce((sum, bill) => bill.status === 'pending' ? sum + bill.amount : sum, 0)} in bills
              </p>
            </div>

            <div>
              {budgetData.bills.map((bill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {bill.status === 'paid' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium mb-0.5">{bill.name}</p>
                      <p className="text-sm text-gray-500">Due {bill.due}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold mb-0.5">₵{bill.amount}</p>
                    <p className={`text-xs ${bill.status === 'paid' ? 'text-green-500' : 'text-orange-600'} capitalize`}>
                      {bill.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <Link to="/dashboard" className="flex flex-col items-center p-2">
              <Home className="w-5 h-5 text-blue-600" />
              <span className="text-xs text-blue-600 mt-1">Home</span>
            </Link>
            <Link to="/categories" className="flex flex-col items-center p-2">
              <BarChart3 className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">Analytics</span>
            </Link>
            <Link to="/transaction" className="bg-blue-600 rounded-full p-3">
              <Plus className="w-6 h-6 text-white" />
            </Link>
            <Link to="/cards" className="flex flex-col items-center p-2">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">Cards</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center p-2">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">Profile</span>
            </Link>
          </div>
        </div>

        <BottomNavigation currentPage="home" />
      </div>
    </div>
  );
};

// Settings Component
const Settings = () => {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-700">Settings page content goes here</p>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
};

// Cards Component
const Cards = () => {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Cards</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-700">Cards page content goes here</p>
        </div>

        <BottomNavigation currentPage="cards" />
      </div>
    </div>
  );
};

// Profile Component
const Profile = () => {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-700">Profile page content goes here</p>
        </div>

        <BottomNavigation currentPage="profile" />
      </div>
    </div>
  );
};

// Main App Component
const GorkApp = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
  });
  const [transactions, setTransactions] = useState(STATIC_DATA.transactions);
  const [budgetData, setBudgetData] = useState(STATIC_DATA.budgetData);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage setUserInfo={setUserInfo} />} />
        <Route path="/auth" element={<AuthPage setUserInfo={setUserInfo} />} />
        <Route path="/account-selection" element={<AccountSelection />} />
        <Route path="/dashboard" element={<Dashboard accounts={STATIC_DATA.accounts} budgetData={budgetData} transactions={transactions} />} />
        <Route path="/transaction" element={<TransactionInput transactions={transactions} setTransactions={setTransactions} />} />
        <Route path="/categories" element={<CategoryVisualization transactions={transactions} budgetData={budgetData} />} />
        <Route path="/budget-goals" element={<BudgetGoals budgetData={budgetData} setBudgetData={setBudgetData} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default GorkApp;