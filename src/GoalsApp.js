import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation, Navigate } from 'react-router-dom';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Pie } from 'recharts';
import { 
  User, 
  Target, 
  ArrowLeft, 
  Settings as SettingsIcon, 
  CheckCircle, 
  AlertCircle, 
  Home, 
  Plus, 
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  Bell,
  Star,
  Trash2,
  Camera,
  Pencil,
  ChevronRight,
  BarChart2,
  Moon,
  Calendar,
  Scan,
  Lock,
  DollarSign,
  Globe,
  Download,
  Mail,
  ChevronDown,
  Info,
  Eye,
  EyeOff,
  Check,
  PieChart as LucidePieChart,
  LogOut,
  Wallet,
  ShieldCheck,
  ShoppingBag,
  Utensils,
  Bus,
  Smartphone,
  Zap,
  Coffee,
  Heart,
  Briefcase,
  Send
} from 'lucide-react';

const CategoryIcon = ({ category, className = "w-5 h-5" }) => {
  const map = {
    'Food': Utensils,
    'Dining': Coffee,
    'Transport': Bus,
    'Transportation': Bus,
    'Shopping': ShoppingBag,
    'Clothing': ShoppingBag,
    'Tech': Smartphone,
    'Technology': Smartphone,
    'Utilities': Zap,
    'Health': Heart,
    'Education': Target,
    'Work': Briefcase,
    'Salary': DollarSign,
    'Entertainment': LucidePieChart
  };
  const Icon = map[category] || Receipt;
  return <Icon className={className} />;
};

// Bottom Navigation Component (Mobile Only)
const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const TAB_CONFIG = [
    { label: 'Home',       path: '/dashboard',   icon: Home },
    { label: 'Cards',      path: '/cards',        icon: CreditCard },
    { label: 'Add',        path: '/transaction',  icon: Plus },
    { label: 'Categories', path: '/categories',   icon: LucidePieChart },
    { label: 'Profile',    path: '/profile',      icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 pb-safe md:hidden">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16">
        {TAB_CONFIG.map((tab, i) => {
          const isActive = pathname === tab.path;
          const Icon = tab.icon;
          
          if (tab.label === 'Add') {
            return (
              <button 
                key={i}
                onClick={() => navigate(tab.path)}
                className="relative flex flex-col items-center justify-center"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all transform -mt-10 mb-1 active:scale-90 ${isActive ? 'bg-green-600' : 'bg-green-500'}`}>
                  <Plus className="w-6 h-6 text-white" />
                </div>
              </button>
            );
          }

          return (
            <button 
              key={i}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center transition-all active:scale-95"
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-green-500' : 'text-gray-400'}`} />
              <span className={`text-[10px] font-bold ${isActive ? 'text-green-500' : 'text-gray-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Desktop Sidebar Component
const Sidebar = ({ profile, signOut }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const TAB_CONFIG = [
    { label: 'Home',       path: '/dashboard',   icon: Home },
    { label: 'Cards',      path: '/cards',        icon: CreditCard },
    { label: 'Add',        path: '/transaction',  icon: Plus },
    { label: 'Categories', path: '/categories',   icon: LucidePieChart },
    { label: 'Profile',    path: '/profile',      icon: User },
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <aside className="w-64 h-full flex flex-col bg-white border-r border-gray-100 sticky top-0 z-30 transition-all duration-300">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-green-100">G</div>
        <div>
          <h1 className="text-lg font-black text-gray-800 leading-tight tracking-tight">G.O.A.L.S</h1>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Platform</p>
        </div>
      </div>

      <nav className="flex-1 mt-6 space-y-2 px-4">
        <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Main Menu</p>
        {TAB_CONFIG.map((tab, i) => {
          const isActive = pathname === tab.path;
          const Icon = tab.icon;

          if (tab.label === 'Add') return null; // We'll move "Add" to the header or keep it separate

          return (
            <button
              key={i}
              onClick={() => navigate(tab.path)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 group ${
                isActive 
                ? 'bg-green-500 text-white shadow-xl shadow-green-100' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-green-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-green-500'}`} />
              <span className="text-sm tracking-tight">{tab.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>}
            </button>
          );
        })}

        <div className="pt-8">
          <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Settings</p>
          <button
            onClick={() => navigate('/settings')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 group ${
              pathname === '/settings' 
              ? 'bg-green-500 text-white shadow-xl shadow-green-100' 
              : 'text-gray-500 hover:bg-gray-50 hover:text-green-600'
            }`}
          >
            <SettingsIcon className={`w-5 h-5 ${pathname === '/settings' ? 'text-white' : 'text-gray-400 group-hover:text-green-500'}`} />
            <span className="text-sm tracking-tight">Settings</span>
          </button>
        </div>
      </nav>

      <div className="p-6 border-t border-gray-50 bg-gray-50/50">
        <button 
          onClick={signOut}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <LogOut className="w-4 h-4" />
          </div>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

// Platform Header Component
const PlatformHeader = ({ profile, unreadCount }) => {
  const navigate = useNavigate();
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full group">
          <Scan className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search transactions, cards, or bills..." 
            className="w-full bg-gray-50 border border-transparent focus:border-green-100 focus:bg-white rounded-2xl py-3 pl-12 pr-4 text-sm font-bold transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/notifications')}
            className="p-2.5 text-gray-400 hover:bg-gray-50 rounded-xl transition-all relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex items-center justify-center min-w-[16px] h-4 bg-red-500 text-white text-[8px] font-black rounded-full border-2 border-white px-1">
                {unreadCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => navigate('/transaction')}
            className="p-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-100"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-8 w-px bg-gray-100 mx-2"></div>
        
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-gray-50 rounded-2xl transition-all"
        >
          <div className="text-right">
            <p className="text-xs font-black text-gray-800 leading-tight">{profile.name}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Premium Account</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-gray-600">
            {profile.name[0]}
          </div>
        </button>
      </div>
    </header>
  );
};

// App Shell Wrapper
const AppShell = ({ children, settings, profile, signOut, notifications = [] }) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`flex h-screen overflow-hidden bg-[#f8fafc] ${settings.darkMode ? 'dark-mode' : ''}`}>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full shadow-2xl z-30">
        <Sidebar profile={profile} signOut={signOut} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <PlatformHeader profile={profile} unreadCount={unreadCount} />
        </div>

        <main className="flex-1 overflow-y-auto relative scroll-smooth bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            {children}
          </div>
          
          {/* Mobile Bottom Navigation */}
          <div className="md:hidden">
            <BottomNavigation />
          </div>
        </main>
      </div>
    </div>
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
    { id: 1, category: 'Transportation', amount: 165.0, type: 'expense', icon: 'Bus', color: '#8B5CF6' },
    { id: 2, category: 'Food', amount: 245.5, type: 'expense', icon: 'Utensils', color: '#F59E0B' },
    { id: 3, category: 'Education', amount: 298.0, type: 'expense', icon: 'Target', color: '#10B981' },
    { id: 4, category: 'Clothing', amount: 189.0, type: 'expense', icon: 'ShoppingBag', color: '#06B6D4' },
    { id: 5, category: 'Entertainment', amount: 87.5, type: 'expense', icon: 'LucidePieChart', color: '#EC4899' },
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
const AuthPage = ({ userInfo, setUserInfo, updateProfile }) => {
  const navigate = useNavigate();
  
  // 8.1 Component-level state
  const [activeTab, setActiveTab] = useState('signup');
  const [formFields, setFormFields] = useState({ 
    name: '', username: '', email: '', phone: '', password: '' 
  });
  const [signInFields, setSignInFields] = useState({ 
    identifier: '', password: '' 
  });
  const [errors, setErrors] = useState({
    name: null, username: null, email: null, phone: null, password: null
  });
  const [signInError, setSignInError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 8.6 Tab switching behavior
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setErrors({ name: null, username: null, email: null, phone: null, password: null });
    setSignInError(null);
    setShowPassword(false);
  };

  const handleSignUp = async () => {
    // Sterilize inputs
    const sterilizedFields = {
      name: formFields.name.trim(),
      username: formFields.username.trim().toLowerCase(),
      email: formFields.email.trim().toLowerCase(),
      phone: formFields.phone.trim(),
      password: formFields.password
    };

    const newErrors = {
      name: !sterilizedFields.name ? "Full name is required." : null,
      username: !sterilizedFields.username || sterilizedFields.username.includes(' ') || sterilizedFields.username.length < 3 
        ? "Username must be at least 3 characters with no spaces." : null,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sterilizedFields.email) ? "Enter a valid email address." : null,
      phone: sterilizedFields.phone.replace(/\D/g, '').length < 9 ? "Enter a valid phone number." : null,
      password: sterilizedFields.password.length < 6 ? "Password must be at least 6 characters." : null
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(err => err !== null)) return;

    setIsLoading(true);
    setSignInError(null);
    const formattedDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...sterilizedFields, memberSince: formattedDate })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setSignInError(data.error || 'Signup failed');
        setIsLoading(false);
        return;
      }

      // Save to global state
      const userWithId = { ...data, id: data._id || data.id || Date.now().toString(), memberSince: formattedDate };
      setUserInfo(userWithId);
      
      // Persist to local storage for demo/fallback
      localStorage.setItem('Goals_user', JSON.stringify(userWithId));

      setTimeout(() => {
        navigate('/account-selection');
      }, 100);
    } catch (err) {
      console.warn('Backend unavailable, falling back to Local Mode:', err);
      
      // Fallback: Create local user
      const localUser = {
        ...sterilizedFields,
        id: 'local_' + Date.now(),
        memberSince: formattedDate
      };
      
      setUserInfo(localUser);
      localStorage.setItem('Goals_user', JSON.stringify(localUser));
      
      setTimeout(() => {
        navigate('/account-selection');
      }, 100);
    }
  };

  const handleSignIn = async () => {
    const identifier = signInFields.identifier.trim().toLowerCase();
    const password = signInFields.password;

    if (!identifier) {
      setSignInError("Email or username is required.");
      return;
    }
    if (!password) {
      setSignInError("Password is required.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setSignInError(data.error || 'Invalid credentials');
        setIsLoading(false);
        return;
      }

      setSignInError(null);
      const userWithId = { ...data.user, id: data.user._id || data.user.id };
      setUserInfo(userWithId);
      localStorage.setItem('Goals_user', JSON.stringify(userWithId));
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    } catch (err) {
      console.warn('Backend unavailable, checking Local Storage:', err);
      
      // Fallback: Check local storage for matching user
      const localUserStr = localStorage.getItem('Goals_user');
      if (localUserStr) {
        const localUser = JSON.parse(localUserStr);
        if ((localUser.email === identifier || localUser.username === identifier) && localUser.password === password) {
          setUserInfo(localUser);
          setTimeout(() => navigate('/dashboard'), 100);
          return;
        }
      }
      
      setSignInError('Network error. Please ensure the backend is running or check your credentials.');
      setIsLoading(false);
    }
  };

  const isSignUpDisabled = !formFields.name && !formFields.email;
  const isSignInDisabled = !signInFields.identifier && !signInFields.password;

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Left Side: Branding & Visuals (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-green-800 relative items-center justify-center p-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-black/10 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>
        
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-4 mb-12 animate-in slide-in-from-left duration-700">
            <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl rotate-12">
              <User className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white tracking-tighter mb-2">G.O.A.L.S</h1>
              <p className="text-green-100 text-xs font-black uppercase tracking-[0.3em]">Platform Edition</p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-black text-white leading-tight">
              Manage your wealth with <span className="text-green-300">precision</span> and <span className="text-green-300">clarity</span>.
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: Star, title: 'Smart Asset Tracking', desc: 'Monitor your portfolios across all networks in real-time.' },
                { icon: Target, title: 'Goal-Oriented Spending', desc: 'Set targets and let our AI guide your financial decisions.' },
                { icon: ShieldCheck, title: 'Platform-Grade Security', desc: 'Your data is encrypted and protected with PIN-enforced protocols.' }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/10 hover:bg-white/20 transition-all cursor-default group">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-sm uppercase tracking-wider mb-1">{feature.title}</h3>
                    <p className="text-green-100/70 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Authentication Form */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 bg-[#f8fafc] overflow-y-auto">
        <div className="max-w-md w-full animate-in fade-in zoom-in-95 duration-500">
          {/* Mobile Logo (Shown only on small screens) */}
          <div className="lg:hidden flex flex-col items-center mb-12">
            <div className="w-16 h-16 bg-green-500 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-green-100 mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">G.O.A.L.S</h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Grow Over Assets Ã¢â‚¬Â¢ Limit Spending</p>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">
              {activeTab === 'signup' ? 'Create platform account' : 'Welcome back'}
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              {activeTab === 'signup' 
                ? 'Start managing your assets today with our unified platform.' 
                : 'Sign in to access your dashboard and manage your assets.'}
            </p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-2xl mb-10">
            <button 
              className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'signup' ? 'bg-white text-green-600 shadow-xl shadow-gray-200' : 'text-gray-400'}`}
              onClick={() => handleTabSwitch('signup')}
            >
              Sign Up
            </button>
            <button 
              className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'signin' ? 'bg-white text-green-600 shadow-xl shadow-gray-200' : 'text-gray-400'}`}
              onClick={() => handleTabSwitch('signin')}
            >
              Sign In
            </button>
          </div>

          <div className="space-y-5">
            {activeTab === 'signup' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <input
                      type="text"
                      value={formFields.name}
                      onChange={(e) => {
                        setFormFields({ ...formFields, name: e.target.value });
                        setErrors({ ...errors, name: null });
                      }}
                      className={`w-full p-4 bg-white border rounded-2xl text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-green-500/5 ${errors.name ? 'border-red-400' : 'border-gray-100 focus:border-green-400'}`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Username</label>
                    <input
                      type="text"
                      value={formFields.username}
                      onChange={(e) => {
                        setFormFields({ ...formFields, username: e.target.value.toLowerCase() });
                        setErrors({ ...errors, username: null });
                      }}
                      className={`w-full p-4 bg-white border rounded-2xl text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-green-500/5 ${errors.username ? 'border-red-400' : 'border-gray-100 focus:border-green-400'}`}
                      placeholder="johndoe"
                    />
                    {errors.username && <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">{errors.username}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <input
                    type="email"
                    value={formFields.email}
                    onChange={(e) => {
                      setFormFields({ ...formFields, email: e.target.value });
                      setErrors({ ...errors, email: null });
                    }}
                    className={`w-full p-4 bg-white border rounded-2xl text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-green-500/5 ${errors.email ? 'border-red-400' : 'border-gray-100 focus:border-green-400'}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formFields.phone}
                    onChange={(e) => {
                      setFormFields({ ...formFields, phone: e.target.value });
                      setErrors({ ...errors, phone: null });
                    }}
                    className={`w-full p-4 bg-white border rounded-2xl text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-green-500/5 ${errors.phone ? 'border-red-400' : 'border-gray-100 focus:border-green-400'}`}
                    placeholder="+233 24 000 0000"
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">{errors.phone}</p>}
                </div>
              </>
            ) : (
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email or Username</label>
                <input
                  type="text"
                  value={signInFields.identifier}
                  onChange={(e) => {
                    setSignInFields({ ...signInFields, identifier: e.target.value });
                    setSignInError(null);
                  }}
                  className={`w-full p-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-green-500/5 focus:border-green-400`}
                  placeholder="Username or email"
                />
              </div>
            )}

            <div className="relative">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Secure Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={activeTab === 'signup' ? formFields.password : signInFields.password}
                onChange={(e) => {
                  if (activeTab === 'signup') {
                    setFormFields({ ...formFields, password: e.target.value });
                    setErrors({ ...errors, password: null });
                  } else {
                    setSignInFields({ ...signInFields, password: e.target.value });
                    setSignInError(null);
                  }
                }}
                className={`w-full p-4 bg-white border rounded-2xl text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-green-500/5 ${activeTab === 'signup' && errors.password ? 'border-red-400' : 'border-gray-100 focus:border-green-400'}`}
                placeholder="Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[42px] text-gray-400 hover:text-green-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {activeTab === 'signup' && errors.password && (
                <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">{errors.password}</p>
              )}
            </div>
            
            {activeTab === 'signin' && signInError && (
              <p className="text-red-500 text-[10px] font-black text-center mt-4 animate-bounce uppercase tracking-widest">{signInError}</p>
            )}
          </div>

          <button 
            onClick={() => activeTab === 'signup' ? handleSignUp() : handleSignIn()}
            disabled={isLoading || (activeTab === 'signup' ? isSignUpDisabled : isSignInDisabled)}
            className={`w-full bg-gray-900 text-white p-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-gray-200 transition-all active:scale-95 mt-10 flex items-center justify-center gap-2 ${isLoading || (activeTab === 'signup' ? (isSignUpDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black') : (isSignInDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black'))}`}
          >
            {isLoading && <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>}
            {activeTab === 'signup' ? (isLoading ? 'Creating Account...' : 'Create Account') : (isLoading ? 'Initializing...' : 'Initialize Session')}
          </button>

          <div className="mt-10 text-center">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              By continuing, you agree to our <span className="text-green-600 underline cursor-pointer">Terms of Service</span> and <span className="text-green-600 underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Account Selection Component
const AccountSelection = () => {
  const navigate = useNavigate();

  const PROVIDERS = [
    { 
      name: 'MTN Ghana', 
      desc: 'Mobile Money & Data Services', 
      color: 'bg-yellow-400', 
      text: 'text-black',
      icon: 'Ã°Å¸â€œÂ¡',
      recommended: true
    },
    { 
      name: 'AirtelTigo', 
      desc: 'Unified Network Solutions', 
      color: 'bg-red-600', 
      text: 'text-white',
      icon: 'Ã°Å¸â€œÂ¶'
    },
    { 
      name: 'Telecel', 
      desc: 'Vodafone Network Heritage', 
      color: 'bg-purple-600', 
      text: 'text-white',
      icon: 'Ã°Å¸Å’Â'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 lg:p-20">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-xl shadow-gray-200 mb-6 rotate-3">
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-800 tracking-tight mb-4">Initialize Your Network</h1>
          <p className="text-gray-500 font-medium max-w-md mx-auto leading-relaxed">
            Select your primary network provider to synchronize your assets and initialize the secure monitoring protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROVIDERS.map((provider, i) => (
            <div 
              key={i}
              onClick={() => navigate('/dashboard')}
              className="platform-card p-8 group cursor-pointer relative overflow-hidden flex flex-col h-full hover:border-green-400 transition-all duration-500"
            >
              {provider.recommended && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl z-20">
                  Recommended
                </div>
              )}
              
              <div className={`w-14 h-14 ${provider.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {provider.icon}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-black text-gray-800 mb-2 tracking-tight group-hover:text-green-600 transition-colors">{provider.name}</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-loose">{provider.desc}</p>
              </div>

              <div className="mt-10 flex items-center justify-between pt-6 border-t border-gray-50">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Connect Provider</span>
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-in fade-in duration-1000 delay-500">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Secure Connection Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Transaction Input Component
const TransactionInput = ({ transactions, addTransaction, settings }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const ICON_OPTIONS = [ { name: 'ShoppingBag', component: ShoppingBag }, { name: 'Utensils', component: Utensils }, { name: 'Zap', component: Zap }, { name: 'Home', component: Home }, { name: 'Heart', component: Heart }, { name: 'Target', component: Target }, { name: 'Bus', component: Bus }, { name: 'Briefcase', component: Briefcase }, { name: 'LucidePieChart', component: LucidePieChart }, { name: 'Smartphone', component: Smartphone }, { name: 'DollarSign', component: DollarSign }, { name: 'Coffee', component: Coffee } ];
  const CATEGORY_OPTIONS = ['Food', 'Transport', 'Housing', 'Health', 'Education', 'Entertainment', 'Clothing', 'Technology', 'Utilities', 'Savings', 'Other'];
  const TRANSACTION_COLORS = ['#1a7a4a', '#1a3a6b', '#5b2d8e', '#e67e22', '#e74c3c', '#7f8c8d'];
  
  const currencySymbols = { GHS: 'GH₵', USD: '$', EUR: '€', GBP: '£' };
  const currencySymbol = currencySymbols[settings.currency] || 'GH₵';

  // 9.1 Component-level state
  const [type, setType] = useState(location.state?.type || 'expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedColor, setSelectedColor] = useState(TRANSACTION_COLORS[0]);
  const [errors, setErrors] = useState({ type: null, category: null, amount: null, icon: null });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    const newErrors = {
      type: null,
      category: !category ? "Please select a category." : null,
      amount: isNaN(parseFloat(amount)) || parseFloat(amount) <= 0 ? "Enter a valid amount greater than 0." : null,
      icon: !selectedIcon ? "Please select an icon." : null
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(err => err !== null)) return;

    const transaction = {
      id: Date.now().toString(),
      type,
      category,
      amount: parseFloat(amount),
      icon: selectedIcon,
      color: selectedColor,
      time: 'Just now'
    };

    addTransaction(transaction);
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen relative pb-24 md:pb-6">
      {/* 9.10 Success Banner */}
      {showSuccess && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-green-500 text-white py-4 text-center font-bold shadow-lg animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Transaction added successfully!</span>
          </div>
        </div>
      )}

      {/* 9.3 Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-50 bg-white sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-green-600" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Add Transaction</h1>
        <div className="w-8"></div>
      </div>

      <div className="p-6 space-y-8">
        {/* 9.4 Type Selector */}
        <div className="bg-gray-50 p-1.5 rounded-2xl flex">
          <button 
            onClick={() => { setType('expense'); setErrors({ ...errors, type: null }); }}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${type === 'expense' ? 'bg-red-500 text-white shadow-md' : 'text-gray-400'}`}
          >
            Expense
          </button>
          <button 
            onClick={() => { setType('income'); setErrors({ ...errors, type: null }); }}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${type === 'income' ? 'bg-green-500 text-white shadow-md' : 'text-gray-400'}`}
          >
            Income
          </button>
        </div>

        <div className="space-y-6">
          {/* 9.5 Category Dropdown */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
            <div className="relative">
              <select 
                value={category}
                onChange={(e) => { setCategory(e.target.value); setErrors({ ...errors, category: null }); }}
                className={`w-full p-4 bg-gray-50 border rounded-2xl text-sm font-bold outline-none appearance-none transition-all focus:ring-2 focus:ring-green-500/10 ${errors.category ? 'border-red-400' : 'border-gray-100 focus:border-green-400'}`}
              >
                <option value="" disabled>Select a category</option>
                {CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.category && <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">{errors.category}</p>}
          </div>

          {/* 9.6 Amount Input */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black text-gray-400">{currencySymbol}</span>
              <input 
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setErrors({ ...errors, amount: null }); }}
                placeholder="0.00"
                className={`w-full p-4 pl-14 bg-gray-50 border rounded-2xl text-xl font-black outline-none transition-all focus:ring-2 focus:ring-green-500/10 ${errors.amount ? 'border-red-400' : 'border-gray-100 focus:border-green-400'}`}
              />
            </div>
            {errors.amount && <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase">{errors.amount}</p>}
          </div>

          {/* 9.7 Icon Picker Grid */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Select Icon</label>
            <div className="grid grid-cols-4 gap-3">
              {ICON_OPTIONS.map((iconObj, idx) => {
                const IconComponent = iconObj.component;
                return (
                  <button 
                    key={idx}
                    onClick={() => { setSelectedIcon(iconObj.name); setErrors({ ...errors, icon: null }); }}
                    className={`h-14 rounded-2xl transition-all flex items-center justify-center ${selectedIcon === iconObj.name ? 'bg-green-500 shadow-lg shadow-green-100 scale-110 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </button>
                );
              })}
            </div>
            {errors.icon && <p className="text-red-500 text-[10px] font-bold mt-3 ml-1 uppercase">{errors.icon}</p>}
          </div>

          {/* 9.8 Color Picker Row */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Select Color</label>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
              {TRANSACTION_COLORS.map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full transition-all relative flex items-center justify-center ${selectedColor === color ? 'ring-4 ring-green-500/20 scale-110' : 'hover:scale-105'}`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 9.11 Submit Button */}
        <button 
          onClick={handleSubmit}
          className="w-full py-4 bg-green-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-green-100 hover:bg-green-600 transition-all active:scale-[0.98] mt-8 mb-4"
        >
          Add Transaction
        </button>
      </div>
    </div>
  );
};

// Category Visualization Component
const CategoryVisualization = ({ transactions, budgetData, settings }) => {
  const pieChartData = transactions.map(transaction => ({
    name: transaction.category,
    value: transaction.amount,
    color: transaction.color
  }));

  const currencySymbols = { GHS: 'GH₵', USD: '$', EUR: '€', GBP: '£' };
  const currencySymbol = currencySymbols[settings?.currency] || 'GH₵';

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-6">
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-green-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Spending by Category</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
          <div className="bg-green-50 rounded-2xl p-4 mb-6 border border-green-100">
            <p className="text-green-700 font-bold mb-1">You've spent {currencySymbol}{budgetData.totalSpent} this month</p>
            <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">Budget remaining: {currencySymbol}{(budgetData.monthlyBudget - budgetData.totalSpent).toFixed(2)}</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
              <span>Budget Progress</span>
              <span>{((budgetData.totalSpent / budgetData.monthlyBudget) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden p-0.5">
              <div 
                className="bg-green-500 h-full rounded-full transition-all duration-1000 shadow-sm"
                style={{ width: `${Math.min((budgetData.totalSpent / budgetData.monthlyBudget) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Spending Distribution</h4>
            <div className="h-64 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-2xl font-black text-gray-800">{currencySymbol}{budgetData.totalSpent}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Spent</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Category Breakdown</h4>
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-100 transition-all">
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-xl mr-4 flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: transaction.color }}
                  >
                    <CategoryIcon category={transaction.category} className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-800">{transaction.category}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">
                      {((transaction.amount / budgetData.totalSpent) * 100).toFixed(0)}% of total
                    </p>
                  </div>
                </div>
                <span className="text-sm font-black text-gray-800">{currencySymbol}{transaction.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to calculate days remaining
const calculateDaysRemaining = (deadlineStr) => {
  if (!deadlineStr) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(deadlineStr);
  deadline.setHours(0, 0, 0, 0);
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper to calculate required daily savings rate (Sd)
const calculateDailySavingsRate = (goal) => {
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  if (remainingAmount <= 0) return 0;
  
  const daysRemaining = calculateDaysRemaining(goal.deadline);
  if (daysRemaining <= 0) {
    return remainingAmount; // Must save all remaining amount today
  }
  return remainingAmount / daysRemaining;
};

// Helper to check if a goal is ahead/behind schedule
const getGoalScheduleStatus = (goal) => {
  // If creation date is not present, default to 30 days before deadline
  const startDate = goal.createdAt ? new Date(goal.createdAt) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const deadlineDate = new Date(goal.deadline);
  const currentDate = new Date();
  
  startDate.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  
  const totalDuration = deadlineDate.getTime() - startDate.getTime();
  const elapsedDuration = currentDate.getTime() - startDate.getTime();
  
  if (totalDuration <= 0) {
    return {
      status: goal.currentAmount >= goal.targetAmount ? 'ahead' : 'behind',
      expectedSavings: goal.targetAmount,
      actualSavings: goal.currentAmount,
      difference: Math.max(0, goal.targetAmount - goal.currentAmount)
    };
  }
  
  const boundedElapsed = Math.max(0, Math.min(elapsedDuration, totalDuration));
  const expectedRatio = boundedElapsed / totalDuration;
  const expectedSavings = goal.targetAmount * expectedRatio;
  
  const isAhead = goal.currentAmount >= expectedSavings;
  const difference = Math.abs(goal.currentAmount - expectedSavings);
  
  return {
    status: isAhead ? 'ahead' : 'behind',
    expectedSavings: Math.round(expectedSavings),
    actualSavings: goal.currentAmount,
    difference: Math.round(difference)
  };
};

// Inline sub-component for adding savings progress to a goal
const AddSavingsAction = ({ goal, updateSavingsGoal, currencySymbol }) => {
  const [showInput, setShowInput] = useState(false);
  const [amount, setAmount] = useState('');

  const handleAdd = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;
    updateSavingsGoal(goal.id, { currentAmount: goal.currentAmount + amt });
    setAmount('');
    setShowInput(false);
  };

  return (
    <div className="pt-3 mt-1 border-t border-gray-100">
      {!showInput ? (
        <button 
          onClick={() => setShowInput(true)}
          className="text-[10px] font-black text-green-600 uppercase tracking-wider hover:underline flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Savings Progress
        </button>
      ) : (
        <div className="flex gap-2 items-center animate-in slide-in-from-top-2 duration-200">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">{currencySymbol}</span>
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount to add"
              className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold outline-none focus:border-green-400"
            />
          </div>
          <button 
            onClick={handleAdd}
            className="px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-bold hover:bg-green-600 transition-colors shadow-sm"
          >
            Add
          </button>
          <button 
            onClick={() => setShowInput(false)}
            className="px-3 py-2 bg-white border border-gray-200 text-gray-400 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

// Budget and Goals Component
const BudgetGoals = ({ budgetData, setBudgetData, savingsGoals, addSavingsGoal, updateSavingsGoal, deleteSavingsGoal, settings }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('budget'); // 'budget' or 'goals'
  
  // Budget State
  const [budget, setBudget] = useState({
    type: 'monthly',
    amount: budgetData.monthlyBudget,
    savingsTarget: budgetData.savingsTarget || 0
  });

  // New Goal State
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    deadline: '',
    color: 'bg-green-500'
  });
  const [goalError, setGoalError] = useState(null);

  const GOAL_COLORS = [
    { name: 'Green', class: 'bg-green-500' },
    { name: 'Blue', class: 'bg-blue-600' },
    { name: 'Purple', class: 'bg-purple-600' },
    { name: 'Orange', class: 'bg-orange-500' },
    { name: 'Red', class: 'bg-red-500' },
    { name: 'Indigo', class: 'bg-indigo-600' }
  ];

  const handleBudgetSubmit = () => {
    setBudgetData(prev => ({
      ...prev,
      monthlyBudget: budget.type === 'monthly' ? parseFloat(budget.amount) : parseFloat(budget.amount) * 4,
      weeklyBudget: budget.type === 'weekly' ? parseFloat(budget.amount) : parseFloat(budget.amount) / 4,
      savingsTarget: parseFloat(budget.savingsTarget)
    }));
    navigate('/dashboard');
  };

  const handleAddGoal = () => {
    if (!newGoal.title.trim() || !newGoal.targetAmount || !newGoal.deadline) {
      setGoalError("Please fill in all goal fields.");
      return;
    }
    
    addSavingsGoal({
      title: newGoal.title,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      deadline: newGoal.deadline,
      color: newGoal.color
    });

    setNewGoal({ title: '', targetAmount: '', deadline: '', color: 'bg-green-500' });
    setGoalError(null);
    setActiveTab('goals'); // Switch to see the list
  };

  const currencySymbols = { GHS: 'GH₵', USD: '$', EUR: '€', GBP: '£' };
  const currencySymbol = currencySymbols[settings.currency] || 'GH₵';

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24 md:pb-6">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-green-600" />
          </button>
          <h1 className="text-xl font-black text-gray-800 tracking-tight">Planning & Assets</h1>
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto space-y-8">
        {/* Segmented Control */}
        <div className="bg-gray-100 p-1 rounded-2xl flex">
          <button 
            onClick={() => setActiveTab('budget')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'budget' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400'}`}
          >
            Monthly Budget
          </button>
          <button 
            onClick={() => setActiveTab('goals')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'goals' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400'}`}
          >
            Asset Goals
          </button>
        </div>

        {activeTab === 'budget' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="platform-card p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-800 tracking-tight">Budget Configuration</h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Define your monthly limits</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Period Type</label>
                  <select
                    value={budget.type}
                    onChange={(e) => setBudget({ ...budget, type: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:border-green-400 transition-all appearance-none"
                  >
                    <option value="monthly">Monthly Allocation</option>
                    <option value="weekly">Weekly Allocation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Allocation Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black">{currencySymbol}</span>
                    <input
                      type="number"
                      value={budget.amount}
                      onChange={(e) => setBudget({ ...budget, amount: e.target.value })}
                      className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:border-green-400 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Overall Savings Target</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black">{currencySymbol}</span>
                    <input
                      type="number"
                      value={budget.savingsTarget}
                      onChange={(e) => setBudget({ ...budget, savingsTarget: e.target.value })}
                      className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:border-green-400 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <button
                  onClick={handleBudgetSubmit}
                  className="w-full bg-gray-900 text-white p-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-gray-200 hover:bg-black transition-all active:scale-[0.98] mt-4"
                >
                  Apply Configuration
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* New Goal Form */}
            <div className="platform-card p-8 border-l-4 border-l-green-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-100">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-800 tracking-tight">Create New Asset Goal</h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Track progress toward a target</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Goal Title</label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:border-green-400 transition-all"
                    placeholder="e.g. New Laptop, Vacation"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Target Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black">{currencySymbol}</span>
                      <input
                        type="number"
                        value={newGoal.targetAmount}
                        onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                        className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:border-green-400 transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Target Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                        className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:border-green-400 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Theme Color</label>
                  <div className="flex gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-50">
                    {GOAL_COLORS.map(color => (
                      <button 
                        key={color.name}
                        onClick={() => setNewGoal({ ...newGoal, color: color.class })}
                        className={`w-8 h-8 rounded-full transition-all ${color.class} ${newGoal.color === color.class ? 'ring-4 ring-green-500/20 scale-110 shadow-lg' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                      />
                    ))}
                  </div>
                </div>

                {goalError && <p className="text-red-500 text-[10px] font-black uppercase text-center">{goalError}</p>}

                <button
                  onClick={handleAddGoal}
                  className="w-full bg-green-500 text-white p-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-green-100 hover:bg-green-600 transition-all active:scale-[0.98]"
                >
                  Initialize Asset Goal
                </button>
              </div>
            </div>

            {/* Existing Goals List */}
            {savingsGoals.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Active Asset Goals</h3>
                <div className="grid grid-cols-1 gap-4">
                  {savingsGoals.map((goal) => {
                    const daysRemaining = calculateDaysRemaining(goal.deadline);
                    const dailyRate = calculateDailySavingsRate(goal);
                    const schedule = getGoalScheduleStatus(goal);
                    const percent = Math.min(100, Math.max(0, (goal.currentAmount / goal.targetAmount) * 100));

                    return (
                      <div key={goal.id} className="platform-card p-6 flex flex-col gap-4 group hover:border-green-300 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl ${goal.color} flex items-center justify-center shadow-lg shadow-gray-100 group-hover:scale-110 transition-transform`}>
                              <Star className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="text-sm font-black text-gray-800">{goal.title}</h4>
                              <p className="text-[10px] font-bold text-gray-400 uppercase">
                                Target: {currencySymbol}{goal.targetAmount.toLocaleString()} • Due: {goal.deadline}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {schedule.status === 'ahead' ? (
                              <span className="text-[9px] font-black text-green-600 bg-green-50 px-2.5 py-1.5 rounded-xl uppercase tracking-wider">
                                Ahead
                              </span>
                            ) : (
                              <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-xl uppercase tracking-wider">
                                Behind by {currencySymbol}{schedule.difference}
                              </span>
                            )}
                            <button 
                              onClick={() => deleteSavingsGoal(goal.id)}
                              className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Progress Bar and Details */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-gray-500">
                            <span>Goal Progress</span>
                            <span>{percent.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden p-0.5">
                            <div 
                              className={`h-full ${goal.color} rounded-full transition-all duration-1000 shadow-sm`} 
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                            <span>Saved: {currencySymbol}{goal.currentAmount.toLocaleString()}</span>
                            <span>Remaining: {currencySymbol}{Math.max(0, goal.targetAmount - goal.currentAmount).toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Calculations Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
                          <div>
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Required Daily Savings</p>
                            <p className="text-sm font-black text-gray-800">
                              {currencySymbol}{dailyRate.toFixed(2)} <span className="text-[10px] text-gray-400 font-normal">/ day</span>
                            </p>
                          </div>
                          <div>
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Days Remaining</p>
                            <p className="text-sm font-black text-gray-800">
                              {daysRemaining > 0 ? `${daysRemaining} days left` : daysRemaining === 0 ? 'Due today' : 'Overdue'}
                            </p>
                          </div>
                        </div>

                        {/* Inline progress addition */}
                        <AddSavingsAction goal={goal} updateSavingsGoal={updateSavingsGoal} currencySymbol={currencySymbol} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ transactions, budgetData, cards, notifications, savingsGoals, settings, profile, payBill, addBill, deleteBill }) => {
  const navigate = useNavigate();
  const billsRef = useRef(null);

  // 3.2 Derived values
  const totalBalanceRaw = cards.reduce((sum, c) => sum + c.balance, 0);
  const totalBalance = totalBalanceRaw.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const unreadCount = notifications.filter(n => !n.read).length;
  const spendingPercent = Math.min((budgetData.totalSpent / budgetData.monthlyBudget) * 100, 100);
  const spendingBarColor = spendingPercent < 70 ? 'bg-green-500' : (spendingPercent < 90 ? 'bg-amber-500' : 'bg-red-500');
  const currencySymbols = { GHS: 'GH₵', USD: '$', EUR: '€', GBP: '£' };
  const currencySymbol = currencySymbols[settings.currency] || 'GH₵';
  const totalSavings = savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0);

  // Bill management state
  const [showAddBill, setShowAddBill] = useState(false);
  const [newBill, setNewBill] = useState({ name: '', amount: '', due: '' });

  const handleAddBill = () => {
    if (!newBill.name || !newBill.amount || !newBill.due) return;
    addBill({ ...newBill, amount: parseFloat(newBill.amount) });
    setNewBill({ name: '', amount: '', due: '' });
    setShowAddBill(false);
  };

  return (
    <div className="pb-24 md:pb-6">
      {/* Mobile-only Header (Hidden on Desktop) */}
      <div className="md:hidden p-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10 mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold text-white text-sm shadow-lg mr-3">
            {profile.name[0]}
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-800">Hello, {profile.name}!</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Finance Overview</p>
          </div>
        </div>
        <Link to="/notifications" className="relative p-2 bg-gray-50 rounded-full">
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Balance Card - Premium Glassmorphism */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full -mr-32 -mt-32 blur-[100px] group-hover:bg-green-500/30 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-24 -mb-24 blur-[80px]"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-16">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-2">Total Managed Assets</p>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tighter">{currencySymbol}{totalBalance}</h1>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                  <Wallet className="w-6 h-6 text-green-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8 items-end">
                <div className="space-y-4">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Savings Goal Progress</p>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-bold">{currencySymbol}{totalSavings.toLocaleString()}</p>
                      <div className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-green-500 h-full rounded-full transition-all duration-1000" 
                          style={{ width: `${Math.min((totalSavings / (savingsGoals.reduce((sum, g) => sum + g.targetAmount, 0) || 1)) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full border border-green-500/20">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-black uppercase tracking-wider">+12.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions - Platform Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Send Funds', icon: Send, color: 'bg-white text-blue-600', hover: 'hover:bg-blue-600 hover:text-white', type: 'expense' },
              { label: 'Receive', icon: Download, color: 'bg-white text-green-600', hover: 'hover:bg-green-600 hover:text-white', type: 'income' },
              { label: 'Analytics', icon: LucidePieChart, color: 'bg-white text-purple-600', hover: 'hover:bg-purple-600 hover:text-white', path: '/categories' },
              { label: 'Bill Pay', icon: Receipt, color: 'bg-white text-orange-600', hover: 'hover:bg-orange-600 hover:text-white', action: () => billsRef.current?.scrollIntoView({ behavior: 'smooth' }) }
            ].map((action, i) => (
              <button 
                key={i} 
                onClick={() => {
                  if (action.path) navigate(action.path);
                  else if (action.type) navigate('/transaction', { state: { type: action.type } });
                  else if (action.action) action.action();
                }}
                className={`platform-card p-6 flex flex-col items-center gap-3 text-center transition-all group ${action.hover}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${action.color} group-hover:bg-white/20 group-hover:scale-110 shadow-sm`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Monthly Spending & Recent Activity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Monthly Spending */}
            <div className="platform-card p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Spending Analysis</h3>
                <Link to="/categories" className="text-[10px] font-black text-green-600 hover:underline uppercase tracking-widest">Full Report</Link>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-3xl font-black text-gray-800">{currencySymbol}{budgetData.totalSpent.toLocaleString()}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Total spent this month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-green-600 uppercase">{spendingPercent.toFixed(0)}% Used</p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden p-1 shadow-inner">
                  <div 
                    className={`${spendingBarColor} h-full rounded-full transition-all duration-1000 shadow-lg`}
                    style={{ width: `${spendingPercent}%` }}
                  ></div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Target className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">Current Budget</p>
                    <p className="text-sm font-bold text-gray-700">{currencySymbol}{budgetData.monthlyBudget.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="platform-card p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Transaction Flow</h3>
                <button 
                  onClick={() => navigate('/categories')}
                  className="text-[10px] font-black text-gray-400 uppercase hover:text-green-600 transition-colors tracking-widest"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-hide">
                {transactions.length > 0 ? (
                  [...transactions].reverse().slice(0, 5).map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm bg-white group-hover:scale-110 transition-all text-emerald-500">
                          <CategoryIcon category={tx.category} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-gray-800 tracking-tight">{tx.category}</h4>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">{tx.time || 'Today'}</p>
                        </div>
                      </div>
                      <p className={`text-xs font-black ${tx.type === 'expense' ? 'text-red-500' : 'text-green-600'}`}>
                        {tx.type === 'expense' ? '-' : '+'}{currencySymbol}{tx.amount.toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Receipt className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No Recent Activity</p>
                    <button 
                      onClick={() => navigate('/transaction')}
                      className="mt-4 text-[10px] font-black text-green-600 uppercase tracking-widest hover:underline"
                    >
                      Add First Transaction
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Goals & Bills) */}
        <div className="space-y-8">
          {/* Savings Goals Widget */}
          <div className="platform-card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Target Assets</h3>
              <Link to="/budget-goals" className="p-2 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all"><Plus className="w-4 h-4" /></Link>
            </div>
            <div className="space-y-6">
              {savingsGoals.length > 0 ? (
                savingsGoals.map((goal, i) => {
                  const daysRemaining = calculateDaysRemaining(goal.deadline);
                  const dailyRate = calculateDailySavingsRate(goal);
                  const schedule = getGoalScheduleStatus(goal);

                  return (
                    <div key={i} className="group cursor-pointer">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl ${goal.color} flex items-center justify-center shadow-sm`}>
                            <Star className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{goal.title}</h4>
                        </div>
                        <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md">{((goal.currentAmount / goal.targetAmount) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${goal.color} rounded-full transition-all duration-1000`} 
                          style={{ width: `${Math.min(100, (goal.currentAmount / goal.targetAmount) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Saved: {currencySymbol}{goal.currentAmount.toLocaleString()} / {currencySymbol}{goal.targetAmount.toLocaleString()}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase">{daysRemaining > 0 ? `${daysRemaining}d left` : daysRemaining === 0 ? 'Today' : 'Overdue'}</p>
                      </div>
                      <div className="flex justify-between items-center mt-1.5 text-[8px] font-black uppercase">
                        <span className="text-gray-400">Daily: {currencySymbol}{dailyRate.toFixed(2)}/d</span>
                        <span className={schedule.status === 'ahead' ? 'text-green-600' : 'text-amber-600'}>
                          {schedule.status === 'ahead' ? 'Ahead' : `Behind by ${currencySymbol}${schedule.difference}`}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-10 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-gray-300" />
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">No assets tracked yet</p>
                  <button 
                    onClick={() => navigate('/budget-goals')}
                    className="mt-4 text-[10px] font-black text-green-600 uppercase tracking-widest hover:underline"
                  >
                    Set New Goal
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Bills */}
          <div className="platform-card p-8" ref={billsRef}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Liabilities</h3>
              <button 
                onClick={() => setShowAddBill(!showAddBill)}
                className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all"
              >
                {showAddBill ? <ArrowLeft className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>

            {showAddBill ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <input 
                  type="text" 
                  placeholder="Bill Name (e.g. Rent)" 
                  value={newBill.name}
                  onChange={(e) => setNewBill({...newBill, name: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-orange-400"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="number" 
                    placeholder="Amount" 
                    value={newBill.amount}
                    onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-orange-400"
                  />
                  <input 
                    type="text" 
                    placeholder="Due (e.g. Aug 1)" 
                    value={newBill.due}
                    onChange={(e) => setNewBill({...newBill, due: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-orange-400"
                  />
                </div>
                <button 
                  onClick={handleAddBill}
                  className="w-full py-3 bg-orange-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all"
                >
                  Confirm Liability
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {budgetData.bills.length > 0 ? (
                  budgetData.bills.map((bill, i) => (
                    <div key={i} className={`p-4 rounded-2xl flex items-center justify-between transition-all group ${bill.status === 'paid' ? 'bg-gray-50 opacity-40' : 'bg-white border border-gray-100 hover:border-orange-200'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${bill.status === 'paid' ? 'bg-gray-100' : 'bg-orange-100 group-hover:bg-orange-500 group-hover:text-white'}`}>
                          <Calendar className={`w-5 h-5 ${bill.status === 'paid' ? 'text-gray-400' : 'text-orange-600 group-hover:text-white'}`} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-gray-800 tracking-tight">{bill.name}</h4>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">{bill.due}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-black text-gray-800">{currencySymbol}{bill.amount}</p>
                        {bill.status === 'pending' && (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => payBill(bill.name)}
                              className="p-2 bg-green-50 text-green-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-green-500 hover:text-white"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => deleteBill(bill.name)}
                              className="p-2 bg-red-50 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <Receipt className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No Liabilities</p>
                  </div>
                )}
                <button className="w-full mt-4 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-gray-200">
                  Manage All Bills
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Component
const Settings = ({ settings, updateSettings, transactions, cards, budgetData, clearTransactions, profile, deleteAccount }) => {
  
  // 6.1 Component-level state
  const [showPinForm, setShowPinForm] = useState(false);
  const [pinForm, setPinForm] = useState({ current: '', newPin: '', confirm: '' });
  const [pinError, setPinError] = useState(null);
  const [pinSuccess, setPinSuccess] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePinSave = () => {
    if (!/^\d{4}$/.test(pinForm.newPin) || !/^\d{4}$/.test(pinForm.confirm)) {
      setPinError("PIN must be exactly 4 digits.");
      return;
    }
    if (pinForm.newPin !== pinForm.confirm) {
      setPinError("New PINs do not match.");
      return;
    }
    if (settings.pin && pinForm.current !== settings.pin) {
      setPinError("Current PIN is incorrect.");
      return;
    }

    updateSettings({ pin: pinForm.newPin });
    setPinSuccess(true);
    setPinError(null);
    setTimeout(() => {
      setPinSuccess(false);
      setShowPinForm(false);
      setPinForm({ current: '', newPin: '', confirm: '' });
    }, 1500);
  };

  const handleExport = () => {
    const exportData = {
      transactions,
      cards: cards.map(c => ({ ...c, last4: c.last4 })),
      budgetData,
      exportedAt: new Date().toISOString()
    };
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "goals-export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 2000);
  };

  const ToggleRow = ({ icon: Icon, label, value, onToggle, note }) => (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
          <span className="text-sm font-bold text-gray-700">{label}</span>
        </div>
        <button 
          onClick={onToggle}
          className={`w-12 h-6 rounded-full transition-colors relative ${value ? 'bg-green-500' : 'bg-gray-200'}`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${value ? 'right-1' : 'left-1'}`} />
        </button>
      </div>
      {note && value && <p className="text-[10px] text-amber-600 font-medium mt-2 ml-13">{note}</p>}
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-6">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-green-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        </div>

        {/* 6.3 Appearance - Enhanced Key Feature */}
        <div className="platform-card p-8 mb-6 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Key Feature</h3>
              <h2 className="text-xl font-black text-gray-800 tracking-tight">Theme Control</h2>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${settings.darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-yellow-50 text-yellow-600'}`}>
              {settings.darkMode ? <Moon className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
            </div>
          </div>
          
          <p className="text-xs font-medium text-gray-500 leading-relaxed mb-8">
            Experience the platform in a new light. Dark mode reduces eye strain during night sessions and optimizes performance on OLED displays.
          </p>

          <div className="flex gap-4 p-1 bg-gray-100 rounded-[1.5rem]">
            <button 
              onClick={() => updateSettings({ darkMode: false })}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${!settings.darkMode ? 'bg-white text-green-600 shadow-xl shadow-gray-200' : 'text-gray-400'}`}
            >
              <Globe className="w-4 h-4" />
              Light Mode
            </button>
            <button 
              onClick={() => updateSettings({ darkMode: true })}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${settings.darkMode ? 'bg-gray-800 text-white shadow-xl shadow-black/20' : 'text-gray-400'}`}
            >
              <Moon className="w-4 h-4" />
              Dark Mode
            </button>
          </div>
        </div>

        {/* 6.4 Notifications */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 mb-4">
          <h3 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-4">Notifications</h3>
          <ToggleRow 
            icon={Bell} 
            label="Push Notifications" 
            value={settings.notifications} 
            onToggle={() => updateSettings({ notifications: !settings.notifications })} 
          />
          <ToggleRow 
            icon={Calendar} 
            label="Bill Reminders" 
            value={settings.billReminders} 
            onToggle={() => updateSettings({ billReminders: !settings.billReminders })} 
          />
        </div>

        {/* 6.5 Security */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 mb-4">
          <h3 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-4">Security</h3>
          <ToggleRow 
            icon={Scan} 
            label="Biometric Login" 
            value={settings.biometrics} 
            onToggle={() => updateSettings({ biometrics: !settings.biometrics })}
            note="Biometric login will be available in a future update."
          />
          
          <div className="mt-4 pt-4 border-t border-gray-50">
            <button 
              onClick={() => setShowPinForm(!showPinForm)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-sm font-bold text-gray-700">Change PIN</span>
              </div>
              <ChevronRight className={`w-5 h-5 text-gray-300 transition-transform ${showPinForm ? 'rotate-90' : ''}`} />
            </button>

            {showPinForm && (
              <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-2xl">
                {settings.pin && (
                  <input 
                    type="password" 
                    placeholder="Current PIN" 
                    maxLength={4}
                    inputMode="numeric"
                    value={pinForm.current}
                    onChange={(e) => setPinForm({ ...pinForm, current: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl text-center tracking-[1em]"
                  />
                )}
                <input 
                  type="password" 
                  placeholder="New PIN" 
                  maxLength={4}
                  inputMode="numeric"
                  value={pinForm.newPin}
                  onChange={(e) => setPinForm({ ...pinForm, newPin: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl text-center tracking-[1em]"
                />
                <input 
                  type="password" 
                  placeholder="Confirm New PIN" 
                  maxLength={4}
                  inputMode="numeric"
                  value={pinForm.confirm}
                  onChange={(e) => setPinForm({ ...pinForm, confirm: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl text-center tracking-[1em]"
                />
                {pinError && <p className="text-red-500 text-xs text-center">{pinError}</p>}
                {pinSuccess && <p className="text-green-500 text-xs text-center font-bold">PIN Saved Successfully!</p>}
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowPinForm(false)}
                    className="flex-1 py-2 bg-white text-gray-500 rounded-lg text-sm font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handlePinSave}
                    className="flex-1 py-2 bg-green-500 text-white rounded-lg text-sm font-bold"
                  >
                    Save PIN
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 6.6 Preferences */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 mb-4">
          <h3 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-4">Preferences</h3>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-sm font-bold text-gray-700">Currency</span>
            </div>
            <div className="relative">
              <select 
                value={settings.currency}
                onChange={(e) => updateSettings({ currency: e.target.value })}
                className="appearance-none bg-transparent pr-8 text-sm font-bold text-green-600 outline-none cursor-pointer"
              >
                <option value="GHS">GHS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
              <ChevronDown className="w-4 h-4 text-green-600 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-sm font-bold text-gray-700">Language</span>
            </div>
            <div className="relative">
              <select 
                value={settings.language}
                onChange={(e) => updateSettings({ language: e.target.value })}
                className="appearance-none bg-transparent pr-8 text-sm font-bold text-green-600 outline-none cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Twi">Twi</option>
                <option value="FranÃƒÂ§ais">FranÃƒÂ§ais</option>
              </select>
              <ChevronDown className="w-4 h-4 text-green-600 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 6.7 Data & Privacy */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 mb-4">
          <h3 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-4">Data & Privacy</h3>
          
          <button 
            onClick={() => setShowClearConfirm(true)}
            className="w-full flex items-center justify-between mb-4 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-sm font-bold text-gray-700">Clear Transaction History</span>
            </div>
          </button>

          {showClearConfirm && (
            <div className="mb-4 p-4 bg-red-50 rounded-2xl animate-in zoom-in-95 duration-200">
              <p className="text-xs text-red-800 font-medium mb-3 text-center">
                This will permanently delete all {transactions.length} transactions. This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-2 bg-white text-gray-500 rounded-lg text-xs font-bold"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { clearTransactions(); setShowClearConfirm(false); }}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg text-xs font-bold"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          <button 
            onClick={handleExport}
            className="w-full flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Download className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm font-bold text-gray-700">Export My Data</span>
            </div>
            {exportSuccess && <span className="text-[10px] text-green-600 font-bold">Export downloaded!</span>}
          </button>

          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center justify-between mt-4 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-sm font-bold text-gray-700">Delete My Account</span>
            </div>
          </button>

          {showDeleteConfirm && (
            <div className="mt-4 p-4 bg-red-50 rounded-2xl animate-in zoom-in-95 duration-200">
              <p className="text-xs text-red-800 font-bold mb-3 text-center">
                WARNING: This will permanently delete your account and all associated transactions, cards, and savings goals. This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2 bg-white text-gray-500 rounded-lg text-xs font-bold"
                >
                  Cancel
                </button>
                <button 
                  onClick={async () => {
                    await deleteAccount();
                    setShowDeleteConfirm(false);
                  }}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg text-xs font-bold"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 6.8 About */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 mb-4">
          <h3 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-4">About</h3>
          <div className="mb-6">
            <p className="text-lg font-black text-gray-800">G.O.A.L.S</p>
            <p className="text-xs text-gray-500 font-bold mb-1">Version v0.1.0</p>
            <p className="text-[10px] text-gray-400 font-medium tracking-tight">Goal-Oriented Accounting & Lifestyle System</p>
          </div>
          
          <button 
            onClick={() => window.location.href = 'mailto:feedback@goals.app'}
            className="w-full flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-green-50 transition-colors">
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">Send Feedback</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>

      <div className="pb-safe">
      </div>
    </div>
  );
};

const COLOR_PRESETS = ['#1a7a4a', '#1a3a6b', '#5b2d8e', '#0e6673', '#b22234', '#2d2d2d'];
const CARD_TYPES = [
  { value: 'momo', label: 'MoMo' },
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' }
];

const Cards = ({ cards, transactions, settings, addCard, removeCard, setDefaultCard }) => {
  
  // 4.1 Component-level state
  const [selectedCardId, setSelectedCardId] = useState(
    cards.find(c => c.isDefault)?.id || cards[0]?.id
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormError, setAddFormError] = useState(null);
  const [removeError, setRemoveError] = useState(null);

  // Form field states
  const [formType, setFormType] = useState('momo');
  const [formLabel, setFormLabel] = useState('');
  const [formLast4, setFormLast4] = useState('');
  const [formBalance, setFormBalance] = useState('');
  const [formColor, setFormColor] = useState(COLOR_PRESETS[0]);

  // 4.3 Derived values
  const currencySymbols = { GHS: 'GH₵', USD: '$', EUR: '€', GBP: '£' };
  const currencySymbol = currencySymbols[settings.currency] || 'GH₵';
  
  const totalBalanceRaw = cards.reduce((sum, c) => sum + c.balance, 0);
  const totalBalance = totalBalanceRaw.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];
  
  // TODO: filter by cardId when transactions carry cardId
  const cardTransactions = [...transactions].reverse();

  const handleRemove = (e, id) => {
    e.stopPropagation();
    if (cards.length === 1) {
      setRemoveError("You must have at least one card.");
      setTimeout(() => setRemoveError(null), 3000);
      return;
    }
    
    removeCard(id);
    if (selectedCardId === id) {
      const remaining = cards.filter(c => c.id !== id);
      setSelectedCardId(remaining[0]?.id);
    }
  };

  const handleSetDefault = (e, id) => {
    e.stopPropagation();
    setDefaultCard(id);
    setSelectedCardId(id);
  };

  const resetForm = () => {
    setFormType('momo');
    setFormLabel('');
    setFormLast4('');
    setFormBalance('');
    setFormColor(COLOR_PRESETS[0]);
    setAddFormError(null);
    setShowAddForm(false);
  };

  const handleAddCard = () => {
    if (!formLabel.trim()) {
      setAddFormError("Card label is required.");
      return;
    }
    if (!/^\d{4}$/.test(formLast4)) {
      setAddFormError("Last 4 digits must be exactly 4 numbers.");
      return;
    }
    const bal = parseFloat(formBalance);
    if (isNaN(bal) || bal < 0) {
      setAddFormError("Please enter a valid positive balance.");
      return;
    }

    addCard({
      type: formType,
      label: formLabel,
      last4: formLast4,
      balance: bal,
      color: formColor,
      isDefault: false
    });
    resetForm();
  };

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-6">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-green-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">My Cards</h1>
        </div>

        {/* 4.4 Total balance header */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1 font-bold uppercase tracking-widest text-[10px]">Total Balance</p>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">{currencySymbol}{totalBalance}</h2>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-8 items-start">
          {/* Left: Cards Display */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Your Wallets</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase">{cards.length} Active</p>
            </div>
            
            {/* Desktop Grid / Mobile Carousel */}
            <div 
              className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide md:grid md:grid-cols-1 md:overflow-visible md:pb-0"
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {cards.map(card => (
                <div 
                  key={card.id}
                  onClick={() => setSelectedCardId(card.id)}
                  className={`min-w-[280px] md:min-w-0 rounded-3xl p-6 text-white shadow-xl transition-all cursor-pointer relative overflow-hidden group ${
                    selectedCardId === card.id ? 'ring-4 ring-green-500/20 scale-[1.02]' : 'opacity-90 grayscale-[0.3] hover:grayscale-0'
                  }`}
                  style={{ backgroundColor: card.color }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl transition-transform group-hover:scale-125"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <div>
                        <span className="font-black text-lg tracking-tight block">{card.label}</span>
                        <span className="text-[10px] font-black tracking-widest opacity-80 uppercase">
                          {card.type === 'momo' ? 'Digital Wallet' : card.type === 'visa' ? 'Visa Card' : 'Mastercard'}
                        </span>
                      </div>
                      <CreditCard className="w-8 h-8 opacity-40" />
                    </div>
                    
                    <div className="mb-8">
                      <p className="text-lg tracking-[0.25em] font-black">Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢ Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢ Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢ {card.last4}</p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Available Balance</p>
                        <p className="text-2xl font-black">{currencySymbol}{card.balance.toLocaleString('en-GH', { minimumFractionDigits: 2 })}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => handleSetDefault(e, card.id)}
                          className="p-2.5 bg-white/20 rounded-xl hover:bg-white/30 backdrop-blur-md transition-all active:scale-90"
                        >
                          <Star className={`w-5 h-5 ${card.isDefault ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`} />
                        </button>
                        <button 
                          onClick={(e) => handleRemove(e, card.id)}
                          className="p-2.5 bg-white/20 rounded-xl hover:bg-red-500/40 backdrop-blur-md transition-all active:scale-90 text-white"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {removeError && <p className="text-red-500 text-[10px] font-black uppercase text-center animate-bounce">{removeError}</p>}
          </div>

          {/* Right: Add Form (Persistent on Desktop) */}
          <div className="mt-8 md:mt-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Manage Accounts</h3>
            </div>
            
            {!showAddForm && (
              <button 
                onClick={() => setShowAddForm(true)}
                className="w-full py-4 border-2 border-dashed border-green-500/30 text-green-600 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-50 hover:border-green-500 transition-all md:hidden"
              >
                <Plus className="w-5 h-5" />
                Add New Card
              </button>
            )}

            {(showAddForm || window.innerWidth >= 768) && (
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-black text-gray-800 mb-6 uppercase tracking-widest">Add New Wallet</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Card Type</label>
                    <select 
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:border-green-400 transition-all"
                    >
                      {CARD_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Card Label</label>
                    <input 
                      type="text"
                      value={formLabel}
                      onChange={(e) => setFormLabel(e.target.value)}
                      placeholder="e.g. My MTN MoMo"
                      className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:border-green-400 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Last 4 Digits</label>
                      <input 
                        type="text"
                        maxLength={4}
                        value={formLast4}
                        onChange={(e) => setFormLast4(e.target.value.replace(/\D/g, ''))}
                        placeholder="0000"
                        className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-sm font-black outline-none focus:border-green-400 transition-all text-center tracking-widest"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Initial Balance</label>
                      <input 
                        type="number"
                        value={formBalance}
                        onChange={(e) => setFormBalance(e.target.value)}
                        placeholder="0.00"
                        className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:border-green-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Card Color</label>
                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-50">
                      {COLOR_PRESETS.map(color => (
                        <button 
                          key={color}
                          onClick={() => setFormColor(color)}
                          className={`w-7 h-7 rounded-full transition-all relative ${formColor === color ? 'ring-4 ring-green-500/20 scale-125 shadow-lg' : 'hover:scale-110'}`}
                          style={{ backgroundColor: color }}
                        >
                          {formColor === color && <Check className="w-3 h-3 text-white m-auto" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {addFormError && <p className="text-red-500 text-[10px] font-black uppercase text-center">{addFormError}</p>}

                  <div className="flex gap-4 pt-2">
                    <button 
                      onClick={resetForm}
                      className="flex-1 py-4 bg-white border border-gray-100 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all md:hidden"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleAddCard}
                      className="flex-1 py-4 bg-green-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-green-100 hover:bg-green-600 transition-all active:scale-95"
                    >
                      Create Wallet
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4.8 Card transaction history */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Transaction History</h3>
              <p className="text-[10px] font-bold text-gray-400">Activity for <span className="text-green-600 font-black">"{selectedCard?.label}"</span></p>
            </div>
            <button className="text-[10px] font-black text-green-600 uppercase tracking-widest">Filter</button>
          </div>
          
          <div className="space-y-3">
            {cardTransactions.length > 0 ? (
              cardTransactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-white transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm transition-transform group-hover:scale-110 text-emerald-500">
                      <CategoryIcon category={tx.category} className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-800">{tx.category}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{tx.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${tx.type === 'expense' ? 'text-red-500' : 'text-green-600'}`}>
                      {tx.type === 'expense' ? '-' : '+'}{currencySymbol}{tx.amount.toLocaleString()}
                    </p>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Wallet Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢ {selectedCard?.last4}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <CreditCard className="w-12 h-12 text-gray-200 m-auto mb-4" />
                <p className="text-sm font-bold text-gray-400">No transactions for this wallet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = ({ profile, transactions, savingsGoals, cards, updateProfile, settings, signOut }) => {
  const navigate = useNavigate();
  
  // 5.1 Component-level state
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    username: profile.username,
    email: profile.email,
    phone: profile.phone
  });
  const [avatarSrc, setAvatarSrc] = useState(profile.avatar);
  const [editError, setEditError] = useState(null);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  // Derive initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);
        updateProfile({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      setEditError("Name cannot be empty.");
      return;
    }
    if (!formData.email.includes('@')) {
      setEditError("Please enter a valid email address.");
      return;
    }
    updateProfile(formData);
    setEditMode(false);
    setEditError(null);
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      username: profile.username,
      email: profile.email,
      phone: profile.phone
    });
    setEditMode(false);
    setEditError(null);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/auth');
  };

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-6">
      <div className="p-4">
        <div className="flex items-center mb-8">
          <Link to="/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-green-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        </div>

        {/* 5.2 Avatar section */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <label htmlFor="avatar-upload" className="cursor-pointer block">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto relative group">
                {avatarSrc ? (
                  <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold">
                    {getInitials(profile.name)}
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border-2 border-white shadow-sm">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </label>
            <input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleAvatarChange} 
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-4">{profile.name || 'User'}</h2>
          <p className="text-sm text-gray-500">@{profile.username || 'user123'}</p>
        </div>

        {/* 5.3 Account stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Transactions', value: transactions.length },
            { label: 'Goals', value: savingsGoals.length },
            { label: 'Cards', value: cards.length }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 text-center">
              <p className="text-xl font-black text-gray-800">{stat.value}</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 5.4 Profile info card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 mb-6 relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Personal Information</h3>
            {!editMode ? (
              <button 
                onClick={() => setEditMode(true)}
                className="flex items-center gap-1 text-green-600 text-sm font-bold"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            ) : (
              <div className="flex gap-3">
                <button 
                  onClick={handleCancel}
                  className="text-gray-400 text-sm font-bold"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="text-green-600 text-sm font-bold"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="space-y-5">
            {[
              { label: 'Full Name', key: 'name', type: 'text', editable: true },
              { label: 'Username', key: 'username', type: 'text', editable: true, prefix: '@' },
              { label: 'Email Address', key: 'email', type: 'email', editable: true },
              { label: 'Phone Number', key: 'phone', type: 'tel', editable: true },
              { label: 'Member Since', value: profile.memberSince, editable: false },
              { label: 'Default Currency', value: settings.currency, editable: false }
            ].map((field, i) => (
              <div key={i} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">
                  {field.label}
                </label>
                {editMode && field.editable ? (
                  <input 
                    type={field.type}
                    value={formData[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full text-sm font-medium text-gray-800 bg-gray-50 p-2 rounded-lg outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800">
                    {field.prefix}{field.value || formData[field.key]}
                  </p>
                )}
              </div>
            ))}
          </div>
          {editError && <p className="text-red-500 text-xs mt-4">{editError}</p>}
        </div>

        {/* 5.5 Quick links section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 mb-8">
          <h3 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-4">Account</h3>
          <div className="space-y-4">
            {[
              { label: 'My Goals', icon: Target, path: '/budget-goals' },
              { label: 'My Cards', icon: CreditCard, path: '/cards' },
              { label: 'Spending History', icon: BarChart2, path: '/categories' },
              { label: 'Settings', icon: SettingsIcon, path: '/settings' }
            ].map((link, i) => (
              <button 
                key={i}
                onClick={() => navigate(link.path)}
                className="w-full flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-green-50 transition-colors">
                    <link.icon className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">{link.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
            ))}
          </div>
        </div>

        {/* 5.6 Sign out button */}
        <div className="mb-8">
          {!showSignOutConfirm ? (
            <button 
              onClick={() => setShowSignOutConfirm(true)}
              className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            >
              Sign Out
            </button>
          ) : (
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100 animate-in zoom-in-95 duration-200">
              <p className="text-red-800 font-bold text-center mb-4">Are you sure you want to sign out?</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowSignOutConfirm(false)}
                  className="flex-1 py-3 bg-white text-gray-500 rounded-xl font-bold shadow-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSignOut}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold shadow-md shadow-red-200"
                >
                  Yes, Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pb-safe">
      </div>
    </div>
  );
};

// Notifications Component
const Notifications = ({ notifications, markNotificationRead, clearAllNotifications }) => {
  const navigate = useNavigate();

  const CONFIG = {
    alert: { icon: AlertCircle, color: '#ef4444', label: 'Alert' },
    success: { icon: CheckCircle, color: '#22c55e', label: 'Success' },
    info: { icon: Info, color: '#3b82f6', label: 'Info' }
  };

  const newNotifications = notifications.filter(n => !n.read);
  const earlierNotifications = notifications.filter(n => n.read);

  const NotificationItem = ({ notification, isEarlier = false }) => {
    const config = CONFIG[notification.type] || CONFIG.info;
    const Icon = config.icon;

    return (
      <div 
        onClick={() => markNotificationRead(notification.id)}
        className={`flex items-start gap-4 p-4 border-b border-gray-50 last:border-0 cursor-pointer transition-colors hover:bg-gray-50 ${isEarlier ? 'opacity-70' : ''}`}
      >
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${config.color}15`, color: config.color }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className={`text-sm text-gray-800 mb-1 ${!notification.read ? 'font-bold' : 'font-medium'}`}>
            {notification.message}
          </p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{notification.time}</p>
        </div>
        {!notification.read && (
          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0 shadow-sm shadow-green-100" />
        )}
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-6 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-green-600" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Notifications</h1>
        <div className="w-16 flex justify-end">
          {notifications.length > 0 && (
            <button 
              onClick={clearAllNotifications}
              className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="pb-8">
            {newNotifications.length > 0 && (
              <div className="mt-4">
                <h3 className="px-4 mb-2 text-[10px] uppercase font-bold text-gray-400 tracking-widest">New</h3>
                {newNotifications.map(n => <NotificationItem key={n.id} notification={n} />)}
              </div>
            )}
            
            {earlierNotifications.length > 0 && (
              <div className="mt-6">
                <h3 className="px-4 mb-2 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Earlier</h3>
                {earlierNotifications.map(n => <NotificationItem key={n.id} notification={n} isEarlier={true} />)}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-12 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Bell className="w-12 h-12 text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">All caught up!</h2>
            <p className="text-sm text-gray-400 font-medium">You have no notifications right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const GoalsApp = ({ user, onLogout }) => {
  const [userInfo, setUserInfo] = useState(user);

  // Expanded State Model
  const [cards, setCards] = useState([
    { id: 1, type: 'momo', label: 'MTN MoMo', last4: '4321', balance: 2425.48, color: '#FBBF24', isDefault: true },
    { id: 2, type: 'visa', label: 'Ecobank Visa', last4: '8892', balance: 1250.00, color: '#2563EB', isDefault: false }
  ]);

  const [profile, setProfile] = useState({
    name: user?.name || 'User',
    username: user?.username || 'user123',
    email: user?.email || 'user@example.com',
    phone: user?.phone || '+233 24 000 0000',
    avatar: user?.avatar || null,
    memberSince: user?.memberSince || 'May 2024',
    currency: 'GHS'
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'alert', message: 'Low balance on MoMo', time: '2h ago', read: false },
    { id: 2, type: 'success', message: 'Salary credited', time: '1d ago', read: true },
    { id: 3, type: 'info', message: 'New feature: Savings Goals', time: '2d ago', read: false },
    { id: 4, type: 'alert', message: 'Rent due in 3 days', time: '3d ago', read: false }
  ]);

  const [savingsGoals, setSavingsGoals] = useState([
    { id: 1, title: 'New Laptop', targetAmount: 5000, currentAmount: 1200, deadline: '2025-12-31', color: 'bg-purple-500', createdAt: '2025-01-01' },
    { id: 2, title: 'Emergency Fund', targetAmount: 2000, currentAmount: 500, deadline: '2025-09-30', color: 'bg-green-500', createdAt: '2025-01-01' }
  ]);

  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    billReminders: true,
    biometrics: false,
    currency: 'GHS',
    language: 'English'
  });

  const [transactions, setTransactions] = useState(STATIC_DATA.transactions);
  const [budgetData, setBudgetData] = useState(STATIC_DATA.budgetData);

  // Setter Functions
  const addCard = (card) => {
    setCards([...cards, { ...card, id: Date.now() }]);
    addNotification('success', `New payment method added: ${card.label}`);
  };
  const removeCard = (id) => {
    setCards(prevCards => {
      const cardToRemove = prevCards.find(c => c.id === id);
      const updatedCards = prevCards.filter(c => c.id !== id);
      if (updatedCards.length > 0 && !updatedCards.some(c => c.isDefault)) {
        updatedCards[0].isDefault = true;
      }
      if (cardToRemove) addNotification('info', `Card removed: ${cardToRemove.label}`);
      return updatedCards;
    });
  };
  const setDefaultCard = (id) => setCards(cards.map(c => ({ ...c, isDefault: c.id === id })));

  const updateProfile = (fields) => setProfile(prev => ({ ...prev, ...fields }));

  const addNotification = (type, message) => {
    setNotifications(prev => [{
      id: Date.now(),
      type,
      message,
      time: 'Just now',
      read: false
    }, ...prev]);
  };

  const markNotificationRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  const clearAllNotifications = () => setNotifications([]);

  const addSavingsGoal = async (goal) => {
    if (userInfo && userInfo.id) {
      try {
        const response = await fetch('/api/goals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...goal, userId: userInfo.id })
        });
        const data = await response.json();
        if (response.ok) {
          const mappedGoal = { ...data, id: data._id || data.id };
          setSavingsGoals(prev => [...prev, mappedGoal]);
          addNotification('success', `New asset goal created: ${goal.title}`);
        } else {
          setSavingsGoals(prev => [...prev, { ...goal, id: Date.now() }]);
          addNotification('success', `New asset goal created (local): ${goal.title}`);
        }
      } catch (error) {
        console.error("Failed to add goal:", error);
        setSavingsGoals(prev => [...prev, { ...goal, id: Date.now() }]);
        addNotification('success', `New asset goal created (local): ${goal.title}`);
      }
    } else {
      setSavingsGoals(prev => [...prev, { ...goal, id: Date.now() }]);
      addNotification('success', `New asset goal created: ${goal.title}`);
    }
  };

  const updateSavingsGoal = async (id, fields) => {
    const isMongoId = typeof id === 'string' && id.length === 24;

    if (userInfo && userInfo.id && isMongoId) {
      try {
        const response = await fetch(`/api/goals/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields)
        });
        const data = await response.json();
        if (response.ok) {
          const mappedGoal = { ...data, id: data._id || data.id };
          setSavingsGoals(prev => prev.map(g => g.id === id ? mappedGoal : g));
          addNotification('info', `Goal progress updated: ${mappedGoal.title}`);
        } else {
          setSavingsGoals(prev => prev.map(g => g.id === id ? { ...g, ...fields } : g));
        }
      } catch (error) {
        console.error("Failed to update goal:", error);
        setSavingsGoals(prev => prev.map(g => g.id === id ? { ...g, ...fields } : g));
      }
    } else {
      setSavingsGoals(prev => prev.map(g => g.id === id ? { ...g, ...fields } : g));
    }
  };

  const deleteSavingsGoal = async (id) => {
    const isMongoId = typeof id === 'string' && id.length === 24;

    if (userInfo && userInfo.id && isMongoId) {
      try {
        const response = await fetch(`/api/goals/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setSavingsGoals(prev => prev.filter(g => g.id !== id));
          addNotification('info', 'Asset goal deleted.');
        } else {
          setSavingsGoals(prev => prev.filter(g => g.id !== id));
        }
      } catch (error) {
        console.error("Failed to delete goal:", error);
        setSavingsGoals(prev => prev.filter(g => g.id !== id));
      }
    } else {
      setSavingsGoals(prev => prev.filter(g => g.id !== id));
    }
  };

  const updateSettings = (fields) => setSettings(prev => ({ ...prev, ...fields }));

  const payBill = (name) => {
    const billToPay = budgetData.bills.find(b => b.name === name);
    if (!billToPay || billToPay.status === 'paid') return;

    // 1. Mark bill as paid and update total spent
    setBudgetData(prev => ({
      ...prev,
      totalSpent: prev.totalSpent + parseFloat(billToPay.amount),
      bills: prev.bills.map(bill => bill.name === name ? { ...bill, status: 'paid' } : bill)
    }));

    // 2. Deduct from first available card
    setCards(prevCards => {
      if (prevCards.length === 0) return prevCards;
      const updatedCards = [...prevCards];
      updatedCards[0].balance -= parseFloat(billToPay.amount);
      return updatedCards;
    });

    // 3. Create a transaction record
    const billTransaction = {
      id: Date.now().toString(),
      type: 'expense',
      category: 'Utilities',
      amount: parseFloat(billToPay.amount),
      icon: 'Zap',
      color: '#e67e22',
      time: 'Just now',
      note: `Bill Payment: ${name}`
    };
    
    addTransaction(billTransaction);
    addNotification('success', `Liability settled: ${name}`);
  };

  const addBill = (bill) => {
    setBudgetData(prev => ({
      ...prev,
      bills: [...prev.bills, { ...bill, status: 'pending' }]
    }));
  };

  const deleteBill = (name) => {
    setBudgetData(prev => ({
      ...prev,
      bills: prev.bills.filter(bill => bill.name !== name)
    }));
  };

  const addTransaction = async (tx) => {
    // Update budget totalSpent for expense transactions
    if (tx.type === 'expense') {
      setBudgetData(prev => ({ ...prev, totalSpent: prev.totalSpent + tx.amount }));
    }

    if (userInfo && userInfo.id) {
      try {
        const response = await fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...tx, userId: userInfo.id })
        });
        const data = await response.json();
        if (response.ok) {
          setTransactions(prev => [data, ...prev]);
          addNotification(tx.type === 'expense' ? 'alert' : 'success', `New ${tx.type}: ${tx.category} of ${settings.currency}${tx.amount}`);
        }
      } catch (error) {
        console.error("Failed to add transaction:", error);
        setTransactions(prev => [tx, ...prev]);
      }
    } else {
      setTransactions(prev => [tx, ...prev]);
      addNotification(tx.type === 'expense' ? 'alert' : 'success', `New ${tx.type}: ${tx.category} of ${settings.currency}${tx.amount}`);
    }
  };

  const clearTransactions = () => {
    setTransactions([]);
    addNotification('info', 'Transaction history has been cleared.');
  };

  const deleteAccount = async () => {
    if (userInfo && userInfo.id) {
      try {
        const response = await fetch(`/api/auth/users/${userInfo.id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          signOut();
          addNotification('info', 'Your account and all associated data have been deleted.');
        } else {
          signOut();
        }
      } catch (error) {
        console.error("Failed to delete account on server:", error);
        signOut();
      }
    } else {
      signOut();
    }
  };

  const signOut = () => {
    onLogout();
  };

  // Handle Dark Mode body class
  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // Cleanup on unmount
    return () => document.body.classList.remove('dark-mode');
  }, [settings.darkMode]);

  // Update profile from userInfo when logging in
  const handleSetUserInfo = (info) => {
    setUserInfo(info);
    setProfile(prev => ({
      ...prev,
      name: info.name || prev.name,
      username: info.username || prev.username,
      email: info.email || prev.email,
      phone: info.phone || prev.phone,
      memberSince: info.memberSince || prev.memberSince
    }));
  };

  // Fetch transactions when userInfo changes
  useEffect(() => {
    const fetchTransactions = async () => {
      if (userInfo && userInfo.id) {
        try {
          const response = await fetch(`/api/transactions/${userInfo.id}`);
          const data = await response.json();
          if (response.ok) {
            setTransactions(data.transactions || []);
          }
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        }
      }
    };
    fetchTransactions();
  }, [userInfo]);

  // Fetch savings goals when userInfo changes
  useEffect(() => {
    const fetchGoals = async () => {
      if (userInfo && userInfo.id) {
        try {
          const response = await fetch(`/api/goals/${userInfo.id}`);
          const data = await response.json();
          if (response.ok) {
            // Map Mongoose _id to id for the frontend
            const mappedGoals = (data.goals || []).map(g => ({
              ...g,
              id: g._id || g.id
            }));
            setSavingsGoals(mappedGoals);
          }
        } catch (error) {
          console.error("Failed to fetch goals:", error);
        }
      }
    };
    fetchGoals();
  }, [userInfo]);

  // Savings Nudge decision logic to alert user if any goal is behind schedule
  useEffect(() => {
    if (!settings.notifications || savingsGoals.length === 0) return;
    
    // Check if we've already nudged today to avoid spamming
    const lastNudgeDate = localStorage.getItem('last_savings_nudge_date');
    const todayStr = new Date().toDateString();
    if (lastNudgeDate === todayStr) return;
    
    // Find any goals that are behind schedule
    const behindGoals = savingsGoals.filter(goal => {
      const schedule = getGoalScheduleStatus(goal);
      return schedule.status === 'behind';
    });
    
    if (behindGoals.length > 0) {
      // Pick the first behind goal to notify the user about
      const goal = behindGoals[0];
      const schedule = getGoalScheduleStatus(goal);
      
      addNotification(
        'alert',
        `🚨 Savings Nudge: You are behind schedule on your "${goal.title}" goal by ${settings.currency === 'GHS' ? 'GH₵' : settings.currency}${schedule.difference}. Save more to stay on track!`
      );
      
      // Save notification date so we only nudge once per day
      localStorage.setItem('last_savings_nudge_date', todayStr);
    }
  }, [savingsGoals, settings.notifications]);

  const wrapped = (component) => (
    <AppShell settings={settings} profile={profile} signOut={signOut} notifications={notifications}>
      {component}
    </AppShell>
  );

  return (
    <div className={settings.darkMode ? 'dark-mode min-h-screen' : 'min-h-screen'}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/account-selection" element={<AccountSelection />} />
        <Route path="/dashboard" element={wrapped(
          <Dashboard 
            transactions={transactions}
            budgetData={budgetData}
            cards={cards}
            notifications={notifications}
            savingsGoals={savingsGoals}
            settings={settings}
            profile={profile}
            payBill={payBill}
            addBill={addBill}
            deleteBill={deleteBill}
          />
        )} />
        <Route path="/transaction" element={wrapped(
          <TransactionInput 
            transactions={transactions} 
            addTransaction={addTransaction} 
            settings={settings} 
          />
        )} />
        <Route path="/categories" element={wrapped(<CategoryVisualization transactions={transactions} budgetData={budgetData} settings={settings} />)} />
        <Route path="/notifications" element={wrapped(
          <Notifications 
            notifications={notifications} 
            markNotificationRead={markNotificationRead} 
            clearAllNotifications={clearAllNotifications} 
          />
        )} />
        <Route path="/budget-goals" element={wrapped(
          <BudgetGoals 
            budgetData={budgetData} 
            setBudgetData={setBudgetData}
            savingsGoals={savingsGoals}
            addSavingsGoal={addSavingsGoal}
            updateSavingsGoal={updateSavingsGoal}
            deleteSavingsGoal={deleteSavingsGoal}
            settings={settings}
          />
        )} />
        <Route path="/settings" element={wrapped(
          <Settings 
            settings={settings} 
            updateSettings={updateSettings} 
            transactions={transactions}
            cards={cards}
            budgetData={budgetData}
            clearTransactions={clearTransactions}
            profile={profile}
            deleteAccount={deleteAccount}
          />
        )} />
        <Route path="/cards" element={wrapped(
          <Cards 
            cards={cards} 
            transactions={transactions}
            settings={settings}
            addCard={addCard} 
            removeCard={removeCard} 
            setDefaultCard={setDefaultCard} 
          />
        )} />
        <Route path="/profile" element={wrapped(
          <Profile 
            profile={profile} 
            updateProfile={updateProfile} 
            transactions={transactions}
            savingsGoals={savingsGoals}
            cards={cards}
            settings={settings}
            signOut={signOut}
          />
        )} />
        {/* Redirect any other unknown routes to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default GoalsApp;
