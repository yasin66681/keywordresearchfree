import React, { useState } from 'react';
import { 
  Search, 
  Globe, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Layers, 
  ArrowUpRight, 
  Info,
  Loader2,
  ShoppingCart,
  Store,
  Edit3,
  ExternalLink,
  Download
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { PLATFORMS, COUNTRIES } from './constants';
import { getKeywordResearch, KeywordData } from './services/geminiService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function MetricCard({ label, value, icon, sub }: { label: string, value: string, icon: React.ReactNode, sub: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-xs text-slate-400 font-medium">{sub}</div>
    </div>
  );
}

function InsightItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-blue-400 mb-1 uppercase tracking-wider">{title}</h4>
      <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function PageContent({ type, setActivePage }: { type: string, setActivePage: (page: any) => void }) {
  switch (type) {
    case 'privacy':
      return (
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p className="mb-4">Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use KeywordPro.</p>
          <h3 className="text-xl font-bold mb-2">1. Information We Collect</h3>
          <p className="mb-4">We collect information you provide directly to us, such as when you search for keywords or contact us for support.</p>
          <h3 className="text-xl font-bold mb-2">2. How We Use Your Information</h3>
          <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p>
          <h3 className="text-xl font-bold mb-2">3. Data Security</h3>
          <p className="mb-4">We implement reasonable security measures to protect your information from unauthorized access or disclosure.</p>
        </div>
      );
    case 'terms':
      return (
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
          <p className="mb-4">By using KeywordPro, you agree to comply with and be bound by the following terms and conditions.</p>
          <h3 className="text-xl font-bold mb-2">1. Use of Service</h3>
          <p className="mb-4">You agree to use KeywordPro only for lawful purposes and in accordance with these Terms.</p>
          <h3 className="text-xl font-bold mb-2">2. Intellectual Property</h3>
          <p className="mb-4">The content and features of KeywordPro are owned by us and are protected by copyright and other laws.</p>
          <h3 className="text-xl font-bold mb-2">3. Limitation of Liability</h3>
          <p className="mb-4">We are not liable for any damages arising from your use of KeywordPro.</p>
        </div>
      );
    case 'cookies':
      return (
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold mb-4">Cookies Policy</h2>
          <p className="mb-4">KeywordPro uses cookies to enhance your experience and analyze our traffic.</p>
          <h3 className="text-xl font-bold mb-2">1. What are Cookies?</h3>
          <p className="mb-4">Cookies are small text files stored on your device when you visit a website.</p>
          <h3 className="text-xl font-bold mb-2">2. How We Use Cookies</h3>
          <p className="mb-4">We use cookies to remember your preferences and to understand how you interact with our site.</p>
          <h3 className="text-xl font-bold mb-2">3. Managing Cookies</h3>
          <p className="mb-4">You can control and manage cookies through your browser settings.</p>
        </div>
      );
    case 'contact':
      return (
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4">Have questions or feedback? We'd love to hear from you!</p>
          <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 h-32" placeholder="How can we help?"></textarea>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      );
    case 'pricing':
      return (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-600">Choose the plan that fits your research needs.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h3 className="text-xl font-bold mb-2">Free Plan</h3>
              <div className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal text-slate-500">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-600">
                  <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs">✓</div>
                  5 searches per day
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs">✓</div>
                  Basic keyword metrics
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs">✓</div>
                  Google & Amazon only
                </li>
              </ul>
              <button onClick={() => window.location.reload()} className="w-full py-3 border-2 border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                Current Plan
              </button>
            </div>
            <div className="bg-blue-600 p-8 rounded-3xl border border-blue-700 shadow-xl shadow-blue-200 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-blue-400 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Popular</div>
              <h3 className="text-xl font-bold mb-2 text-white">Pro Plan</h3>
              <div className="text-4xl font-bold mb-6 text-white">$19<span className="text-lg font-normal text-blue-200">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-blue-50">
                  <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">✓</div>
                  Unlimited searches
                </li>
                <li className="flex items-center gap-3 text-blue-50">
                  <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">✓</div>
                  Advanced CPM & Traffic data
                </li>
                <li className="flex items-center gap-3 text-blue-50">
                  <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">✓</div>
                  All 4 platforms included
                </li>
                <li className="flex items-center gap-3 text-blue-50">
                  <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">✓</div>
                  CSV Export functionality
                </li>
              </ul>
              <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      );
    case 'blog':
      return (
        <div className="prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold mb-6">Keyword Research Guide</h2>
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-blue-600">1. Understanding Search Volume</h3>
              <p>Search volume indicates how many times a keyword is searched per month. High volume means high potential traffic, but often higher competition.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold text-blue-600">2. What is CPM & Traffic Value?</h3>
              <p>CPM (Cost Per Mille) is what advertisers pay for 1,000 impressions. Traffic Value estimates how much that organic traffic would cost if you bought it via ads.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold text-blue-600">3. Platform Specific Strategies</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Amazon:</strong> Focus on "buyer intent" keywords.</li>
                <li><strong>Google:</strong> Focus on informational and problem-solving queries.</li>
                <li><strong>Shopify:</strong> Target niche product categories.</li>
                <li><strong>Blogger:</strong> Look for trending topics and long-tail questions.</li>
              </ul>
            </section>
          </div>
        </div>
      );
    case 'support':
      return (
        <div className="prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold mb-6">Help & Support</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold mb-3">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-sm">How accurate is the data?</p>
                  <p className="text-sm text-slate-600">Our research model analyzes real-time trends and historical data to provide highly accurate estimates.</p>
                </div>
                <div>
                  <p className="font-bold text-sm">Can I export my results?</p>
                  <p className="text-sm text-slate-600">Yes, Pro users can export all keyword data to CSV format.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold mb-3">Still need help?</h3>
              <p className="text-sm text-slate-600 mb-4">Our support team is available 24/7 to assist you with any technical issues or questions.</p>
              <button 
                onClick={() => setActivePage('contact')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function App() {
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState('google');
  const [country, setCountry] = useState('US');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<KeywordData[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordData | null>(null);
  const [activePage, setActivePage] = useState<'home' | 'privacy' | 'terms' | 'cookies' | 'contact' | 'pricing' | 'blog' | 'support'>('home');

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await getKeywordResearch(query, platform, country);
      setResults(data);
      if (data.length > 0) {
        setSelectedKeyword(data[0]);
      }
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (results.length === 0) return;

    const headers = ["Keyword", "Volume", "CPC", "CPM", "Difficulty", "Traffic Value"];
    const csvRows = [
      headers.join(","),
      ...results.map(row => [
        `"${row.keyword}"`,
        row.volume,
        row.cpc,
        row.cpm,
        row.difficulty,
        row.trafficValue
      ].join(","))
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `keyword_research_${query.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPlatformIcon = (id: string) => {
    switch (id) {
      case 'google': return <Search className="w-4 h-4" />;
      case 'amazon': return <ShoppingCart className="w-4 h-4" />;
      case 'shopify': return <Store className="w-4 h-4" />;
      case 'blogger': return <Edit3 className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <BarChart3 className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">KeywordPro</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => setActivePage('home')} className={cn("hover:text-blue-600 transition-colors", activePage === 'home' && "text-blue-600")}>Dashboard</button>
            <button onClick={() => setActivePage('pricing')} className={cn("hover:text-blue-600 transition-colors", activePage === 'pricing' && "text-blue-600")}>Pricing</button>
            <button onClick={() => setActivePage('blog')} className={cn("hover:text-blue-600 transition-colors", activePage === 'blog' && "text-blue-600")}>Blog Guide</button>
            <button onClick={() => setActivePage('support')} className={cn("hover:text-blue-600 transition-colors", activePage === 'support' && "text-blue-600")}>Support</button>
            <button 
              onClick={() => {
                setActivePage('home');
                setPlatform('amazon');
              }} 
              className={cn("hover:text-blue-600 transition-colors flex items-center gap-1.5", platform === 'amazon' && activePage === 'home' && "text-blue-600")}
            >
              <ShoppingCart className="w-4 h-4" /> Amazon
            </button>
            <button 
              onClick={() => {
                setActivePage('home');
                setPlatform('shopify');
              }} 
              className={cn("hover:text-blue-600 transition-colors flex items-center gap-1.5", platform === 'shopify' && activePage === 'home' && "text-blue-600")}
            >
              <Store className="w-4 h-4" /> Shopify
            </button>
            <button 
              onClick={() => {
                setActivePage('home');
                setPlatform('blogger');
              }} 
              className={cn("hover:text-blue-600 transition-colors flex items-center gap-1.5", platform === 'blogger' && activePage === 'home' && "text-blue-600")}
            >
              <Edit3 className="w-4 h-4" /> Blogger
            </button>
            <button onClick={() => setActivePage('contact')} className={cn("hover:text-blue-600 transition-colors", activePage === 'contact' && "text-blue-600")}>Contact Us</button>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900">Sign In</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait">
          {activePage === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Search Section */}
              <section className="mb-12">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-extrabold text-slate-900 mb-3">
                    Multi-Platform Keyword Research
                  </h1>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Analyze search volume, CPM, and traffic value across Google, Amazon, Shopify, and Blogger for over 120 countries.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="Enter a keyword or phrase..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div className="relative min-w-[160px]">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <select 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-blue-500"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          {COUNTRIES.map(c => (
                            <option key={c.code} value={c.code}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex bg-slate-100 p-1 rounded-xl">
                        {PLATFORMS.map(p => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setPlatform(p.id)}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                              platform === p.id 
                                ? "bg-white text-blue-600 shadow-sm" 
                                : "text-slate-600 hover:text-slate-900"
                            )}
                          >
                            {getPlatformIcon(p.id)}
                            <span className="hidden sm:inline">{p.name}</span>
                          </button>
                        ))}
                      </div>

                      <button 
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-w-[140px]"
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Analyze"}
                      </button>
                      {results.length > 0 && !loading && (
                        <button 
                          type="button"
                          onClick={downloadCSV}
                          className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                        >
                          <Download className="w-5 h-5" /> Download
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </section>

              {/* Results Section */}
              <AnimatePresence mode="wait">
                {results.length > 0 ? (
                  <motion.div 
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                  >
                    {/* Left Column: Metrics & Chart */}
                    <div className="lg:col-span-8 space-y-8">
                      {selectedKeyword && (
                        <>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <MetricCard 
                              label="Search Volume" 
                              value={selectedKeyword.volume.toLocaleString()} 
                              icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
                              sub="Monthly average"
                            />
                            <MetricCard 
                              label="CPM (Est.)" 
                              value={`$${selectedKeyword.cpm.toFixed(2)}`} 
                              icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
                              sub="Cost per 1k impressions"
                            />
                            <MetricCard 
                              label="Traffic Value" 
                              value={`$${selectedKeyword.trafficValue.toLocaleString()}`} 
                              icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
                              sub="Monthly potential"
                            />
                            <MetricCard 
                              label="Difficulty" 
                              value={`${selectedKeyword.difficulty}/100`} 
                              icon={<Layers className="w-5 h-5 text-rose-600" />}
                              sub={selectedKeyword.difficulty > 70 ? "Hard" : selectedKeyword.difficulty > 40 ? "Medium" : "Easy"}
                            />
                          </div>

                          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                Trend Analysis: {selectedKeyword.keyword}
                              </h3>
                              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Volume</span>
                              </div>
                            </div>
                            <div className="h-[300px] w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={selectedKeyword.trend}>
                                  <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                  <XAxis 
                                    dataKey="month" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 12, fill: '#64748b' }} 
                                  />
                                  <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 12, fill: '#64748b' }}
                                    tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}
                                  />
                                  <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                  />
                                  <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#3b82f6" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorValue)" 
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Table */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                          <h3 className="font-bold text-lg text-slate-900">Related Keywords</h3>
                          <button 
                            onClick={downloadCSV}
                            className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline"
                          >
                            Export CSV <Download className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">Keyword</th>
                                <th className="px-6 py-4">Volume</th>
                                <th className="px-6 py-4">CPM</th>
                                <th className="px-6 py-4">Value</th>
                                <th className="px-6 py-4">Diff.</th>
                                <th className="px-6 py-4"></th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {results.map((res, idx) => (
                                <tr 
                                  key={idx} 
                                  className={cn(
                                    "hover:bg-slate-50 transition-colors cursor-pointer group",
                                    selectedKeyword?.keyword === res.keyword ? "bg-blue-50/50" : ""
                                  )}
                                  onClick={() => setSelectedKeyword(res)}
                                >
                                  <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{res.keyword}</div>
                                  </td>
                                  <td className="px-6 py-4 text-slate-600 text-sm">{res.volume.toLocaleString()}</td>
                                  <td className="px-6 py-4 text-slate-600 text-sm">${res.cpm.toFixed(2)}</td>
                                  <td className="px-6 py-4 text-slate-600 text-sm">${res.trafficValue.toLocaleString()}</td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                          className={cn(
                                            "h-full rounded-full",
                                            res.difficulty > 70 ? "bg-rose-500" : res.difficulty > 40 ? "bg-amber-500" : "bg-emerald-500"
                                          )}
                                          style={{ width: `${res.difficulty}%` }}
                                        ></div>
                                      </div>
                                      <span className="text-xs font-medium text-slate-500">{res.difficulty}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Insights */}
                    <div className="lg:col-span-4 space-y-8">
                      <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
                        <div className="relative z-10">
                          <h3 className="text-xl font-bold mb-4">Keyword Insights</h3>
                          <div className="space-y-6">
                            <InsightItem 
                              title="Market Opportunity" 
                              desc={selectedKeyword && selectedKeyword.difficulty < 50 ? "High potential for quick ranking with low competition." : "Competitive market. Focus on long-tail variations."}
                            />
                            <InsightItem 
                              title="Monetization" 
                              desc={selectedKeyword && selectedKeyword.cpm > 5 ? "Premium CPM rates. Ideal for high-ticket affiliate marketing." : "Standard monetization potential. Focus on volume."}
                            />
                            <InsightItem 
                              title="Platform Fit" 
                              desc={`This keyword performs exceptionally well on ${platform.charAt(0).toUpperCase() + platform.slice(1)} for informational intent.`}
                            />
                          </div>
                          <button className="w-full mt-8 bg-white text-slate-900 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                            View Full Report
                          </button>
                        </div>
                        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl"></div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <Info className="w-4 h-4 text-blue-600" />
                          How it works
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                          Our advanced engine analyzes historical data and real-time trends to estimate search metrics for your target platform and region.
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0"></div>
                            <span>CPM is estimated based on current ad inventory.</span>
                          </li>
                          <li className="flex items-start gap-3 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0"></div>
                            <span>Traffic value assumes a 2% CTR from organic search.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ) : !loading && (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="bg-slate-100 p-6 rounded-full mb-6">
                      <Search className="w-12 h-12 text-slate-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready to research?</h2>
                    <p className="text-slate-500 max-w-md">
                      Enter a keyword above to discover search volume, trends, and monetization potential across 120+ countries.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-3xl mx-auto"
            >
              <button 
                onClick={() => setActivePage('home')}
                className="text-blue-600 text-sm font-bold mb-6 flex items-center gap-2 hover:underline"
              >
                ← Back to Dashboard
              </button>
              <PageContent type={activePage} setActivePage={setActivePage} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="text-blue-600 w-6 h-6" />
                <span className="font-bold text-xl tracking-tight">KeywordPro</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                The ultimate keyword research tool for modern marketers and content creators.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={() => setActivePage('home')} className="hover:text-blue-600">Features</button></li>
                <li><button onClick={() => setActivePage('pricing')} className="hover:text-blue-600">Pricing</button></li>
                <li><a href="#" className="hover:text-blue-600">API</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-4">Resources</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600">Guides</a></li>
                <li><a href="#" className="hover:text-blue-600">Support</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-4">Platforms</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={() => { setActivePage('home'); setPlatform('google'); }} className="hover:text-blue-600">Google Search</button></li>
                <li><button onClick={() => { setActivePage('home'); setPlatform('amazon'); }} className="hover:text-blue-600">Amazon Marketplace</button></li>
                <li><button onClick={() => { setActivePage('home'); setPlatform('shopify'); }} className="hover:text-blue-600">Shopify Stores</button></li>
                <li><button onClick={() => { setActivePage('home'); setPlatform('blogger'); }} className="hover:text-blue-600">Blogger Content</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={() => setActivePage('support')} className="hover:text-blue-600">Help Center</button></li>
                <li><button onClick={() => setActivePage('blog')} className="hover:text-blue-600">Blog Guide</button></li>
                <li><button onClick={() => setActivePage('contact')} className="hover:text-blue-600">Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={() => setActivePage('privacy')} className="hover:text-blue-600">Privacy Policy</button></li>
                <li><button onClick={() => setActivePage('terms')} className="hover:text-blue-600">Terms & Conditions</button></li>
                <li><button onClick={() => setActivePage('cookies')} className="hover:text-blue-600">Cookies Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
            © 2026 KeywordPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
