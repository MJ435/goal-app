import React, { useState, useCallback, useRef } from 'react';
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
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  Bell
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
const BudgetGoals = ({ budgetData, setBudgetData, savingsGoals, addSavingsGoal, updateSavingsGoal, deleteSavingsGoal }) => {
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
const Dashboard = ({ transactions, budgetData, cards, notifications, savingsGoals, settings, profile, payBill }) => {
  const navigate = useNavigate();
  const billsRef = useRef(null);

  // 3.2 Derived values
  const totalBalanceRaw = cards.reduce((sum, c) => sum + c.balance, 0);
  const totalBalance = totalBalanceRaw.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const defaultCard = cards.find(c => c.isDefault) || cards[0];
  const unreadCount = notifications.filter(n => !n.read).length;
  const spendingPercent = Math.min((budgetData.totalSpent / budgetData.monthlyBudget) * 100, 100);
  const spendingBarColor = spendingPercent < 70 ? 'bg-green-500' : (spendingPercent < 90 ? 'bg-amber-500' : 'bg-red-500');
  const recentTransactions = [...transactions].reverse().slice(0, 5);
  const currencySymbols = { GHS: 'GH₵', USD: '$', EUR: '€', GBP: '£' };
  const currencySymbol = currencySymbols[settings.currency] || 'GH₵';

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-24">
      <div className="p-4">
        {/* 3.3 Header Row */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Good morning, {profile.name || 'User'}</h1>
            <p className="text-gray-500 text-sm">Here's your overview</p>
          </div>
          <button 
            onClick={() => navigate('/notifications')}
            className="relative p-2 bg-gray-100 rounded-full"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white translate-x-1/4 -translate-y-1/4">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* 3.4 Balance Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg mb-6">
          <p className="text-sm opacity-90 mb-1">Total Balance</p>
          <h2 className="text-3xl font-bold mb-4">{currencySymbol}{totalBalance}</h2>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80 mb-1">across {cards.length} card(s)</p>
              <p className="text-sm font-medium tracking-wider">
                {defaultCard.type.toUpperCase()} •••• •••• •••• {defaultCard.last4}
              </p>
            </div>
            <Wallet className="w-8 h-8 opacity-30" />
          </div>
        </div>

        {/* 3.5 Quick Actions Row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Send', icon: ArrowUpRight, path: '/transaction', state: { type: 'expense' } },
            { label: 'Receive', icon: ArrowDownLeft, path: '/transaction', state: { type: 'income' } },
            { label: 'Pay Bills', icon: Receipt, action: () => billsRef.current?.scrollIntoView({ behavior: 'smooth' }) },
            { label: 'Top Up', icon: Plus, path: '/cards' }
          ].map((action, i) => (
            <div key={i} className="flex flex-col items-center">
              <button 
                onClick={() => action.path ? navigate(action.path, { state: action.state }) : action.action()}
                className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mb-2 hover:bg-gray-50 transition-colors"
              >
                <action.icon className="w-6 h-6 text-green-600" />
              </button>
              <span className="text-xs font-medium text-gray-600">{action.label}</span>
            </div>
          ))}
        </div>

        {/* 3.6 Spending Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Monthly Spending</h3>
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm text-gray-500">
              <span className="text-gray-800 font-bold">{currencySymbol}{budgetData.totalSpent}</span> spent of {currencySymbol}{budgetData.monthlyBudget}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden">
            <div 
              className={`${spendingBarColor} h-full rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${spendingPercent}%` }}
            ></div>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 font-medium">
              {currencySymbol}{(budgetData.monthlyBudget - budgetData.totalSpent).toFixed(2)} left
            </span>
          </div>
        </div>

        {/* 3.7 Savings Goals Strip */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Savings Goals</h3>
            <Link to="/budget-goals" className="text-sm text-green-600 font-medium">See all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {savingsGoals.length > 0 ? (
              savingsGoals.map(goal => (
                <div key={goal.id} className="min-w-[160px] bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
                  <p className="text-sm font-bold text-gray-800 mb-2 truncate">{goal.title}</p>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                    <div 
                      className={`${goal.color || 'bg-blue-500'} h-full rounded-full`}
                      style={{ width: `${Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] font-medium text-gray-500 mb-1">
                    {currencySymbol}{goal.currentAmount} / {currencySymbol}{goal.targetAmount}
                  </p>
                  <p className="text-[10px] text-gray-400">Due {goal.deadline}</p>
                </div>
              ))
            ) : (
              <button 
                onClick={() => navigate('/budget-goals')}
                className="min-w-[160px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-4 flex flex-col items-center justify-center text-gray-400"
              >
                <Plus className="w-6 h-6 mb-1" />
                <span className="text-xs">Add a goal</span>
              </button>
            )}
          </div>
        </div>

        {/* 3.8 Recent Transactions List */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Recent Transactions</h3>
            <Link to="/categories" className="text-sm text-green-600 font-medium">See all</Link>
          </div>
          <div className="space-y-3">
            {recentTransactions.length > 0 ? (
              recentTransactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-50 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                      style={{ backgroundColor: `${tx.color}20`, color: tx.color }}
                    >
                      {tx.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{tx.category}</p>
                      <p className="text-xs text-gray-400 capitalize">{tx.type}</p>
                    </div>
                  </div>
                  <p className={`font-bold text-sm ${tx.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                    {tx.type === 'expense' ? '-' : '+'}{currencySymbol}{tx.amount.toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-400">No transactions yet. Tap + to add one.</p>
              </div>
            )}
          </div>
        </div>

        {/* 3.9 Upcoming Bills */}
        <div ref={billsRef} className="mb-8">
          <h3 className="font-bold text-gray-800 mb-4">Upcoming Bills</h3>
          <div className="space-y-3">
            {budgetData.bills.map((bill, index) => (
              <div key={index} className={`flex items-center justify-between p-4 rounded-xl border ${bill.status === 'paid' ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-100 shadow-sm'}`}>
                <div className="flex items-center gap-3">
                  {bill.status === 'paid' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                  )}
                  <div>
                    <p className={`font-bold text-sm ${bill.status === 'paid' ? 'text-gray-500' : 'text-gray-800'}`}>{bill.name}</p>
                    <p className="text-xs text-gray-400">Due {bill.due}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-sm text-gray-800">{currencySymbol}{bill.amount}</p>
                  {bill.status === 'pending' && (
                    <button 
                      onClick={() => payBill(bill.name)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-600 transition-colors"
                    >
                      Pay
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.10 Bottom Navigation */}
      <BottomNavigation currentPage="home" />
    </div>
  );
};

// Settings Component
const Settings = ({ settings, updateSettings }) => {
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
const Cards = ({ cards, addCard, removeCard, setDefaultCard }) => {
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
const Profile = ({ profile, updateProfile }) => {
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

  // Expanded State Model
  const [cards, setCards] = useState([
    { id: 1, type: 'momo', label: 'MTN MoMo', last4: '4321', balance: 2425.48, color: 'bg-yellow-400', isDefault: true },
    { id: 2, type: 'visa', label: 'Ecobank Visa', last4: '8892', balance: 1250.00, color: 'bg-blue-600', isDefault: false }
  ]);

  const [profile, setProfile] = useState({
    name: 'User',
    username: 'user123',
    email: 'user@example.com',
    phone: '+233 24 000 0000',
    avatar: null,
    memberSince: 'May 2024',
    currency: 'GHS'
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'alert', message: 'Low balance on MoMo', time: '2h ago', read: false },
    { id: 2, type: 'success', message: 'Salary credited', time: '1d ago', read: true },
    { id: 3, type: 'info', message: 'New feature: Savings Goals', time: '2d ago', read: false },
    { id: 4, type: 'alert', message: 'Rent due in 3 days', time: '3d ago', read: false }
  ]);

  const [savingsGoals, setSavingsGoals] = useState([
    { id: 1, title: 'New Laptop', targetAmount: 5000, currentAmount: 1200, deadline: '2024-12-31', color: 'bg-purple-500' },
    { id: 2, title: 'Emergency Fund', targetAmount: 2000, currentAmount: 500, deadline: '2024-08-31', color: 'bg-green-500' }
  ]);

  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    biometrics: false,
    currency: 'GHS',
    language: 'English'
  });

  const [transactions, setTransactions] = useState(STATIC_DATA.transactions);
  const [budgetData, setBudgetData] = useState(STATIC_DATA.budgetData);

  // Setter Functions
  const addCard = (card) => setCards([...cards, { ...card, id: Date.now() }]);
  const removeCard = (id) => setCards(cards.filter(c => c.id !== id));
  const setDefaultCard = (id) => setCards(cards.map(c => ({ ...c, isDefault: c.id === id })));

  const updateProfile = (fields) => setProfile(prev => ({ ...prev, ...fields }));

  const markNotificationRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  const clearAllNotifications = () => setNotifications([]);

  const addSavingsGoal = (goal) => setSavingsGoals([...savingsGoals, { ...goal, id: Date.now() }]);
  const updateSavingsGoal = (id, fields) => setSavingsGoals(savingsGoals.map(g => g.id === id ? { ...g, ...fields } : g));
  const deleteSavingsGoal = (id) => setSavingsGoals(savingsGoals.filter(g => g.id !== id));

  const updateSettings = (fields) => setSettings(prev => ({ ...prev, ...fields }));

  const payBill = (name) => {
    setBudgetData(prev => ({
      ...prev,
      bills: prev.bills.map(bill => bill.name === name ? { ...bill, status: 'paid' } : bill)
    }));
  };

  // Update profile from userInfo when logging in
  const handleSetUserInfo = (info) => {
    setUserInfo(info);
    setProfile(prev => ({
      ...prev,
      name: info.name || prev.name,
      username: info.username || prev.username,
      email: info.email || prev.email,
      phone: info.phone || prev.phone
    }));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage setUserInfo={handleSetUserInfo} />} />
        <Route path="/auth" element={<AuthPage setUserInfo={handleSetUserInfo} />} />
        <Route path="/account-selection" element={<AccountSelection />} />
        <Route path="/dashboard" element={
          <Dashboard 
            transactions={transactions}
            budgetData={budgetData}
            cards={cards}
            notifications={notifications}
            savingsGoals={savingsGoals}
            settings={settings}
            profile={profile}
            payBill={payBill}
          />
        } />
        <Route path="/transaction" element={<TransactionInput transactions={transactions} setTransactions={setTransactions} />} />
        <Route path="/categories" element={<CategoryVisualization transactions={transactions} budgetData={budgetData} />} />
        <Route path="/budget-goals" element={
          <BudgetGoals 
            budgetData={budgetData} 
            setBudgetData={setBudgetData}
            savingsGoals={savingsGoals}
            addSavingsGoal={addSavingsGoal}
            updateSavingsGoal={updateSavingsGoal}
            deleteSavingsGoal={deleteSavingsGoal}
          />
        } />
        <Route path="/settings" element={<Settings settings={settings} updateSettings={updateSettings} />} />
        <Route path="/cards" element={
          <Cards 
            cards={cards} 
            addCard={addCard} 
            removeCard={removeCard} 
            setDefaultCard={setDefaultCard} 
          />
        } />
        <Route path="/profile" element={<Profile profile={profile} updateProfile={updateProfile} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default GorkApp;