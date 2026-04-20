/// <reference types="vite/client" />
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { 
  Search, 
  DollarSign, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  X,
  Briefcase,
  Loader2,
  Plus,
  Pencil,
  Image as ImageIcon,
  RotateCcw,
  AlertCircle,
  Heart,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  LogIn,
  LogOut,
  LifeBuoy,
  User as UserIcon,
  Download,
  Upload,
  Info,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { get, set, del } from 'idb-keyval';
import { loadStripe } from '@stripe/stripe-js';

import { BUSINESS_IDEAS } from './data/ideas';

// Firebase Imports
import { auth, db } from './firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  onSnapshot, 
  collection, 
  query, 
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  writeBatch
} from 'firebase/firestore';

const CLEAN_BUSINESS_IDEAS = BUSINESS_IDEAS.filter(idea => idea !== undefined && idea !== null);

import { BusinessIdea } from './types';
import { generateNewIdeas } from './services/geminiService';
import { GoogleGenAI, Type } from "@google/genai";

// Firestore Error Handling
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
  }
}


const CATEGORIES = ['All', 'Shortlisted', 'Service', 'Maintenance', 'Automotive', 'Landscaping', 'Specialty', 'Seasonal', 'Cleaning', 'Real Estate', 'Passive Income', 'Creative', 'Event Service', 'Education', 'Beauty'];

const QUICK_TAGS = [
  { label: 'High Margin', query: 'luxury premium high-end' },
  { label: 'Low Startup', query: 'under 1000' },
  { label: 'Passive', query: 'subscription recurring' },
  { label: 'Quick Launch', query: 'simple easy fast' }
];

const CalculatorSection = ({ idea }: { idea: BusinessIdea }) => {
  const [price, setPrice] = useState(150);
  const [clients, setClients] = useState(10);
  const [overhead, setOverhead] = useState(500);

  const monthlyRevenue = price * clients;
  const monthlyProfit = monthlyRevenue - overhead;
  const annualProfit = monthlyProfit * 12;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gray-500">Price per Service ($)</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gold focus:outline-none focus:border-gold/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gray-500">Monthly Clients</label>
          <input 
            type="number" 
            value={clients} 
            onChange={(e) => setClients(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gold focus:outline-none focus:border-gold/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gray-500">Monthly Overhead ($)</label>
          <input 
            type="number" 
            value={overhead} 
            onChange={(e) => setOverhead(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gold focus:outline-none focus:border-gold/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Monthly Profit</p>
          <p className="text-2xl font-serif text-white">${monthlyProfit.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Annual Projection</p>
          <p className="text-2xl font-serif text-gold">${annualProfit.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="p-4 bg-gold/10 rounded-xl border border-gold/20">
        <p className="text-xs text-gold/80 leading-relaxed italic">
          "At this rate, you'll recover your maximum startup cost of ${idea.startupCost.max.toLocaleString()} in {Math.ceil(idea.startupCost.max / monthlyProfit)} months."
        </p>
      </div>
    </div>
  );
};

const LaunchRoadmap = ({ idea, checkedSteps, onToggleStep }: { 
  idea: BusinessIdea, 
  checkedSteps: string[], 
  onToggleStep: (stepId: string) => void 
}) => {
  const steps = [
    { id: 'legal', day: '1-7', task: 'Legal & Setup', detail: 'Register LLC, obtain insurance, and set up a business bank account.' },
    { id: 'equipment', day: '8-14', task: 'Equipment & Branding', detail: 'Purchase essential tools and create a basic website or Google Business Profile.' },
    { id: 'beta', day: '15-21', task: 'Beta Launch', detail: 'Offer services to 3 friends/neighbors at cost to get initial reviews and photos.' },
    { id: 'marketing', day: '22-30', task: 'Full Marketing', detail: 'Execute the first strategy: ' + idea.customerAcquisition[0] }
  ];

  return (
    <div className="space-y-6">
      {steps.map((step, i) => {
        const stepKey = `${idea.id}-${step.id}`;
        const isChecked = checkedSteps.includes(stepKey);
        
        return (
          <div 
            key={i} 
            className={`relative pl-10 pb-6 border-l border-white/10 last:pb-0 cursor-pointer group/step transition-opacity ${isChecked ? 'opacity-50' : 'opacity-100'}`}
            onClick={() => onToggleStep(stepKey)}
          >
            <div className={`absolute left-[-12px] top-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
              isChecked 
                ? 'bg-gold border-gold text-luxury-black' 
                : 'bg-luxury-black border-white/20 text-transparent group-hover/step:border-gold/50'
            }`}>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex justify-between items-start mb-1">
              <h4 className={`text-sm font-bold transition-all ${isChecked ? 'text-gray-500 line-through' : 'text-white'}`}>
                {step.task}
              </h4>
              <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 rounded uppercase">Day {step.day}</span>
            </div>
            <p className="text-xs text-gray-400 font-light leading-relaxed">{step.detail}</p>
          </div>
        );
      })}
    </div>
  );
};

const ComparisonModal = ({ ideas, onClose }: { ideas: BusinessIdea[], onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-luxury-black border border-white/10 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="p-10 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
          <div>
            <span className="text-gold text-[10px] font-display font-bold uppercase tracking-[0.4em] mb-2 block">Investment Analysis</span>
            <h2 className="text-4xl font-serif text-white">Side-by-Side Comparison</h2>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full transition-all border border-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-auto p-10 custom-scrollbar">
          <div className="min-w-[900px] grid grid-cols-[250px_repeat(auto-fit,minmax(280px,1fr))] gap-12">
            {/* Header Column */}
            <div className="space-y-12 pt-32">
              <div className="h-12 flex items-center text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold border-b border-white/5">Market Category</div>
              <div className="h-12 flex items-center text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold border-b border-white/5">Capital Requirement</div>
              <div className="h-12 flex items-center text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold border-b border-white/5">Revenue Potential</div>
              <div className="h-12 flex items-center text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold border-b border-white/5">Complexity Index</div>
            </div>

            {/* Idea Columns */}
            {ideas.map((idea) => (
              <div key={idea.id} className="space-y-12 group">
                <div className="space-y-4 text-center">
                  <div className="h-12 flex items-center justify-center">
                    <h3 className="text-2xl font-serif text-gold leading-tight group-hover:scale-105 transition-transform duration-500">{idea.title}</h3>
                  </div>
                  <div className="flex justify-center">
                    <span className="px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-[8px] font-display font-bold uppercase tracking-widest text-gold">Grade A Asset</span>
                  </div>
                </div>

                <div className="h-12 flex items-center justify-center text-xs text-white bg-white/[0.03] rounded-xl border border-white/10 font-display font-bold uppercase tracking-widest">
                  {idea.category}
                </div>

                <div className="h-12 flex items-center justify-center text-2xl font-serif text-white">
                  <span className="text-gold mr-2">$</span>
                  {idea.startupCost.min.toLocaleString()} <span className="text-gray-600 mx-2">-</span> {idea.startupCost.max.toLocaleString()}
                </div>

                <div className="h-12 flex items-center justify-center text-2xl font-serif text-white italic">
                  {idea.potentialIncome}
                </div>

                <div className="h-12 flex items-center justify-center">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div 
                        key={star} 
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${
                          star <= (idea.startupCost.max > 3000 ? 4 : 2) 
                            ? 'bg-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]' 
                            : 'bg-white/5 border border-white/10'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
          <p className="text-gray-500 text-[10px] font-display font-bold uppercase tracking-widest">
            Confidential Investment Report • VentureX Curator
          </p>
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-gold text-luxury-black font-display font-bold rounded-full text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
          >
            Close Report
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Auth Modal Component
const AuthModal = ({ 
  mode, 
  setMode, 
  onClose, 
  onEmailAuth, 
  onGoogleSignIn, 
  error, 
  isLoading 
}: { 
  mode: 'login' | 'signup' | 'forgot';
  setMode: (mode: 'login' | 'signup' | 'forgot') => void;
  onClose: () => void;
  onEmailAuth: (mode: 'login' | 'signup' | 'forgot', data: { email: string; password?: string; displayName?: string }) => void;
  onGoogleSignIn: () => void;
  error: string | null;
  isLoading: boolean;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEmailAuth(mode, { email, password, displayName });
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-luxury-black border border-white/10 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl custom-scrollbar"
      >
        <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
          <div>
            <h2 className="text-2xl font-serif text-white">
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join VentureX' : 'Reset Password'}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {mode === 'login' ? 'Sign in to access your blueprints' : mode === 'signup' ? 'Start your journey to simple wealth' : 'Enter your email to receive a reset link'}
            </p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-xs text-red-500 leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-all"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Password</label>
                  {mode === 'login' && (
                    <button 
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[10px] text-gold hover:underline uppercase tracking-widest font-bold"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 gold-gradient text-luxury-black font-display font-bold rounded-xl text-sm uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {mode !== 'forgot' && (
            <>
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="bg-luxury-black px-4 text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                onClick={onGoogleSignIn}
                disabled={isLoading}
                className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
            </>
          )}

          <div className="text-center pt-4">
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
              }}
              className="text-xs text-gray-400 hover:text-gold transition-colors"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showExecutionPlan, setShowExecutionPlan] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeduplicateConfirm, setShowDeduplicateConfirm] = useState(false);
  const [showAutoEnhanceConfirm, setShowAutoEnhanceConfirm] = useState(false);
  const [showRevertConfirm, setShowRevertConfirm] = useState(false);
  const [adminFeedback, setAdminFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  // Auth State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
    const message = error instanceof Error ? error.message : String(error);
    const errInfo: FirestoreErrorInfo = {
      error: message,
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        emailVerified: auth.currentUser?.emailVerified,
        isAnonymous: auth.currentUser?.isAnonymous,
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    
    if (message.includes('insufficient permissions')) {
      setAdminFeedback({
        message: 'Permission Denied. Please ensure your email is verified to perform admin actions.',
        type: 'error'
      });
    } else {
      setAdminFeedback({
        message: `Firestore Error: ${message.split('\n')[0]}`,
        type: 'error'
      });
    }
  };
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const dotX = useSpring(mouseX, springConfig);
  const dotY = useSpring(mouseY, springConfig);

  // Custom Cursor Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Auto-hide feedback
  useEffect(() => {
    if (adminFeedback) {
      const timer = setTimeout(() => setAdminFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [adminFeedback]);
  const [allIdeas, setAllIdeas] = useState<BusinessIdea[]>(CLEAN_BUSINESS_IDEAS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const [editForm, setEditForm] = useState<Partial<BusinessIdea>>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'calculator' | 'roadmap' | 'resources'>('overview');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [generatedNames, setGeneratedNames] = useState<Record<string, string[]>>({});
  const [isNaming, setIsNaming] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<string[]>([]);
  const [showCopied, setShowCopied] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const hasAccess = isPaid || (user?.email?.toLowerCase() === 'chailey33@gmail.com');
  const [showPaywall, setShowPaywall] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [modifiedIds, setModifiedIds] = useState<Set<string>>(new Set());

  // Load modifiedIds from IndexedDB
  useEffect(() => {
    const loadModified = async () => {
      const saved = await get('venturex_modified') || await get('boring_ventures_modified');
      if (saved) {
        try {
          setModifiedIds(new Set(JSON.parse(saved)));
        } catch (e) {
          console.error('Failed to load modified IDs', e);
        }
      }
    };
    loadModified();
  }, []);

  // Save modifiedIds to IndexedDB
  useEffect(() => {
    set('venturex_modified', JSON.stringify(Array.from(modifiedIds)));
  }, [modifiedIds]);

  // Handle Stripe Payment Success Redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success' && user) {
      const finalizePayment = async () => {
        const userDocRef = doc(db, 'users', user.uid);
        try {
          await updateDoc(userDocRef, { isPaid: true });
          setIsPaid(true);
          setAdminFeedback({ 
            message: 'Payment confirmed! Welcome to Business Ventures Premium.', 
            type: 'success' 
          });
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error("Error updating payment status:", error);
        }
      };
      finalizePayment();
    }
  }, [user]);

  // Sync Paid Status and User Data from Firestore
  useEffect(() => {
    if (!user) {
      setIsPaid(false);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setIsPaid(data.isPaid === true || data.role === 'pro');
        if (data.favorites) setFavorites(data.favorites);
        if (data.checkedSteps) setCheckedSteps(data.checkedSteps);
      } else {
        // Create user doc if it doesn't exist
        setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          createdAt: new Date().toISOString(),
          isPaid: false,
          role: 'user'
        }).catch(err => handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`));
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, `users/${user.uid}`));

    return () => unsubscribe();
  }, [user]);

  const handleStripeCheckout = async () => {
    if (!user) {
      setAdminFeedback({ message: 'Please sign in to continue with payment.', type: 'info' });
      return;
    }

    setIsProcessingPayment(true);
    try {
      console.log('[Stripe] Initiating automated checkout via API...');
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const session = await response.json();
      
      if (session.url) {
        console.log('[Stripe] Redirecting to Checkout:', session.url);
        // Using _blank to avoid iframe security blocks (white screen)
        window.open(session.url, '_blank');
        setAdminFeedback({ message: 'Opening secure checkout...', type: 'success' });
      } else {
        throw new Error('Could not generate checkout URL');
      }
    } catch (error: any) {
      console.error('Checkout Error:', error);
      setAdminFeedback({ 
        message: error.message?.includes('STRIPE_SECRET_KEY') 
          ? 'Stripe Keys missing. Go to Settings > Environment Variables.'
          : `Checkout Error: ${error.message || 'Failed to start payment'}`, 
        type: 'error' 
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };
  // Handle Body Scroll Locking
  useEffect(() => {
    const isLocked = !!(selectedIdea || showPaywall || showPrivacy || showTerms || showComparison || showExecutionPlan);
    if (isLocked) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [selectedIdea, showPaywall, showPrivacy, showTerms, showComparison, showExecutionPlan]);

  const isAdmin = (user?.email?.toLowerCase() === 'chailey33@gmail.com') && user?.emailVerified;
  const isUnverifiedAdmin = (user?.email?.toLowerCase() === 'chailey33@gmail.com') && !user?.emailVerified;

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Sync user profile
        const userDocRef = doc(db, 'users', currentUser.uid);
        try {
          const userDoc = await getDoc(userDocRef);
          const isAdminUser = currentUser.email?.toLowerCase() === 'chailey33@gmail.com';
          if (!userDoc.exists()) {
            // Create initial profile
            await setDoc(userDocRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              isPaid: isAdminUser,
              favorites: [],
              checkedSteps: []
            });
            setIsPaid(isAdminUser);
          } else {
            const data = userDoc.data();
            setIsPaid(data.isPaid || isAdminUser);
            setFavorites(data.favorites || []);
            setCheckedSteps(data.checkedSteps || []);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
        }
      } else {
        setIsPaid(false);
        setFavorites([]);
        setCheckedSteps([]);
      }
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Sync Global Ideas from Firestore
  useEffect(() => {
    if (isLoading) return; // Wait for IndexedDB to load first

    const ideasQuery = collection(db, 'ideas');
    const unsubscribe = onSnapshot(ideasQuery, (snapshot) => {
      if (snapshot.empty) {
        console.log('Firestore is empty. Skipping sync to prevent data loss.');
        return;
      }

      const firestoreIdeas = snapshot.docs.map(doc => doc.data() as BusinessIdea);
      
      setAllIdeas(prev => {
        const newIdeas = [...prev];
        
        firestoreIdeas.forEach(fIdea => {
          const index = newIdeas.findIndex(m => m.id === fIdea.id);
          if (index === -1) {
            newIdeas.push(fIdea);
          } else {
            // If admin, only overwrite if we haven't modified this specific idea locally
            // OR if the local one is a placeholder and remote is real
            const localIdea = newIdeas[index];
            const isLocalPlaceholder = !localIdea.image || localIdea.image.includes('picsum.photos') || localIdea.image.includes('1562016600-ece13e8ba570');
            const isRemoteReal = fIdea.image && !fIdea.image.includes('picsum.photos') && !fIdea.image.includes('1562016600-ece13e8ba570');
            
            const shouldOverwrite = !(isAdmin || isUnverifiedAdmin) || !modifiedIds.has(fIdea.id) || (isLocalPlaceholder && isRemoteReal);
            
            if (shouldOverwrite) {
              newIdeas[index] = fIdea;
            }
          }
        });
        
        return newIdeas;
      });
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'ideas');
    });

    return () => unsubscribe();
  }, [isLoading, isAdmin, isUnverifiedAdmin]);

  // Migration: Sync local data to Firestore when user logs in
  useEffect(() => {
    if (!user || isLoading) return;

    const migrateData = async () => {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const remoteData = userDoc.data();
          
          // If remote is empty but local has data, migrate local to remote
          const updates: any = {};
          
          if ((!remoteData.favorites || remoteData.favorites.length === 0) && favorites.length > 0) {
            updates.favorites = favorites;
          }
          
          if ((!remoteData.checkedSteps || remoteData.checkedSteps.length === 0) && checkedSteps.length > 0) {
            updates.checkedSteps = checkedSteps;
          }

          if (Object.keys(updates).length > 0) {
            await updateDoc(userDocRef, updates);
            console.log('Migrated local data to Firestore');
          }
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      }
    };

    migrateData();
  }, [user, isLoading]);

  // Get user location for "Trending" feature
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village || 'your area';
          setUserLocation(city);
        } catch (e) {
          console.error("Error fetching location name:", e);
        }
      });
    }
  }, []);

  // Initial load from IndexedDB
  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const saved = await get('venturex_ideas') || await get('boring_ventures_ideas');
        const savedFavs = await get('venturex_favorites') || await get('boring_ventures_favorites');
        const savedSteps = await get('venturex_steps') || await get('boring_ventures_steps');
        const savedPaid = await get('venturex_paid') || await get('boring_ventures_paid');
        const legacySaved = localStorage.getItem('venturex_ideas') || localStorage.getItem('boring_ventures_ideas');
        
        if (savedFavs) {
          setFavorites(JSON.parse(savedFavs));
        }

        if (savedSteps) {
          setCheckedSteps(JSON.parse(savedSteps));
        }

        if (savedPaid) {
          const paidStatus = JSON.parse(savedPaid);
          setIsPaid(prev => prev || paidStatus);
        }

        let ideasToUse = CLEAN_BUSINESS_IDEAS;
        
        if (saved) {
          const savedIdeas = JSON.parse(saved);
          // Merge new default ideas that don't exist in saved state
          const newDefaults = CLEAN_BUSINESS_IDEAS.filter(def => !savedIdeas.some((s: BusinessIdea) => s.id === def.id));
          if (newDefaults.length > 0) {
            console.log(`Merging ${newDefaults.length} new default ideas...`);
            ideasToUse = [...savedIdeas, ...newDefaults];
            // Save the merged list back to IndexedDB immediately
            await set('venturex_ideas', JSON.stringify(ideasToUse));
          } else {
            ideasToUse = savedIdeas;
          }
        }

        // Check if localStorage has something better (like custom images)
        if (legacySaved) {
          try {
            const legacyIdeas = JSON.parse(legacySaved);
            const hasCustomChanges = legacyIdeas.some((idea: any) => {
              const defaultIdea = CLEAN_BUSINESS_IDEAS.find(i => i.id === idea.id);
              return !defaultIdea || idea.image !== defaultIdea.image || idea.title !== defaultIdea.title;
            });

            // If we have custom changes in legacy and IndexedDB is either empty or just the default
            const isIndexedDBDefault = !saved || JSON.stringify(ideasToUse) === JSON.stringify(CLEAN_BUSINESS_IDEAS);
            
            if (hasCustomChanges && isIndexedDBDefault) {
              console.log('Found custom changes in legacy storage. Migrating...');
              // Even when migrating from legacy, we must merge new defaults
              const legacyIdeas = JSON.parse(legacySaved);
              const mergedWithLegacy = [...legacyIdeas];
              
              CLEAN_BUSINESS_IDEAS.forEach(def => {
                if (!mergedWithLegacy.some(s => s.id === def.id)) {
                  mergedWithLegacy.push(def);
                }
              });
              
              ideasToUse = mergedWithLegacy;
              await set('venturex_ideas', JSON.stringify(mergedWithLegacy));
            }
          } catch (err) {
            console.error('Error parsing legacy data:', err);
          }
        }
        
        setAllIdeas(ideasToUse);
      } catch (e) {
        console.error('Error loading saved ideas:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadIdeas();
  }, []);

  // Save to IndexedDB whenever ideas change
  useEffect(() => {
    if (isLoading) return;
    set('venturex_steps', JSON.stringify(checkedSteps));
  }, [checkedSteps, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    set('venturex_paid', JSON.stringify(isPaid));
  }, [isPaid, isLoading]);

  useEffect(() => {
    if (isLoading) return; // Don't save during initial load
    
    const saveIdeas = async () => {
      try {
        await set('venturex_ideas', JSON.stringify(allIdeas));
        setStorageError(null);
      } catch (e) {
        console.error('Error saving ideas:', e);
        setStorageError('Failed to save changes. Your browser storage might be full.');
      }
    };
    saveIdeas();
  }, [allIdeas, isLoading]);

  useEffect(() => {
    if (selectedIdea) {
      setEditForm(selectedIdea);
    }
  }, [selectedIdea]);

  const syncToCloud = async () => {
    if (!isAdmin && !isUnverifiedAdmin) return;
    setIsGenerating(true);
    try {
      const batch = writeBatch(db);
      allIdeas.forEach(idea => {
        const ideaDocRef = doc(db, 'ideas', idea.id);
        batch.set(ideaDocRef, idea);
      });

      await batch.commit();
      setModifiedIds(new Set()); // Clear modified tracking after successful sync
      setAdminFeedback({
        message: 'Successfully synced all changes to the cloud!',
        type: 'success'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'ideas');
    } finally {
      setIsGenerating(false);
    }
  };

  const revertToCloud = async () => {
    if (!isAdmin && !isUnverifiedAdmin) return;
    setShowRevertConfirm(false);
    setIsGenerating(true);
    try {
      const ideasQuery = collection(db, 'ideas');
      const querySnapshot = await getDocs(ideasQuery);
      
      if (querySnapshot.empty) {
        setAdminFeedback({ message: 'Cloud is empty. Nothing to revert to.', type: 'info' });
        return;
      }

      const firestoreIdeas = querySnapshot.docs.map(doc => doc.data() as BusinessIdea);
      setAllIdeas(firestoreIdeas);
      setModifiedIds(new Set());
      setAdminFeedback({ message: 'Successfully reverted to cloud state.', type: 'success' });
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'ideas');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadBackup = () => {
    const dataStr = JSON.stringify(allIdeas, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `business_ventures_backup_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const restoreFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const ideas = JSON.parse(event.target?.result as string);
          if (Array.isArray(ideas)) {
            setAllIdeas(ideas);
            setAdminFeedback({ message: 'Restored from file! Click "Sync to Cloud" to save.', type: 'success' });
          }
        } catch (err) {
          setAdminFeedback({ message: 'Invalid backup file.', type: 'error' });
        }
      };
      reader.readAsText(file);
    }
  };

  const forceResetToDefaults = () => {
    setShowResetConfirm(true);
  };

  const handleGoogleSignIn = async () => {
    setIsAuthLoading(true);
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    try {
      // Use popup but provide guidance for mobile users
      await signInWithPopup(auth, provider);
      setShowAuthModal(false);
    } catch (error: any) {
      console.error('Google Sign In failed:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in window was closed. Please try again or use the "Open in new tab" icon at the top of the app.');
      } else if (error.code === 'auth/popup-blocked') {
        setAuthError('Pop-up blocked! Please enable pop-ups for this site or use Email/Password below.');
      } else {
        setAuthError(error.message);
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleEmailAuth = async (mode: 'login' | 'signup' | 'forgot', data: { email: string; password?: string; displayName?: string }) => {
    setIsAuthLoading(true);
    setAuthError(null);

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, data.email, data.password || '');
        setShowAuthModal(false);
      } else if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password || '');
        if (data.displayName) {
          await updateProfile(userCredential.user, { displayName: data.displayName });
        }
        await sendEmailVerification(userCredential.user);
        setAdminFeedback({ message: 'Account created! Please check your email for verification.', type: 'success' });
        setShowAuthModal(false);
      } else if (mode === 'forgot') {
        await sendPasswordResetEmail(auth, data.email);
        setAdminFeedback({ message: 'Password reset email sent!', type: 'success' });
        setAuthMode('login');
      }
    } catch (error: any) {
      console.error('Auth failed:', error);
      let friendlyError = error.message;
      if (error.code === 'auth/invalid-credential') {
        friendlyError = 'Invalid email or password. If you haven\'t created an account yet, please click "Sign up" below. Or try the Google button for instant access.';
      } else if (error.code === 'auth/user-not-found') {
        friendlyError = 'No account found with this email. Please sign up first!';
      }
      setAuthError(friendlyError);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleResendVerification = async () => {
    if (auth.currentUser) {
      try {
        await auth.currentUser.reload();
        setUser(auth.currentUser);
        
        if (auth.currentUser.emailVerified) {
          setAdminFeedback({
            message: 'Your email is already verified!',
            type: 'success'
          });
          return;
        }

        await sendEmailVerification(auth.currentUser);
        setAdminFeedback({
          message: 'Verification email sent! Please check your inbox.',
          type: 'success'
        });
      } catch (error: any) {
        console.error('Failed to send verification email:', error);
        setAdminFeedback({
          message: `Failed to send email: ${error.message}`,
          type: 'error'
        });
      }
    }
  };

  const toggleStep = async (stepKey: string) => {
    const isChecked = checkedSteps.includes(stepKey);
    const newSteps = isChecked 
      ? checkedSteps.filter(k => k !== stepKey) 
      : [...checkedSteps, stepKey];
    
    setCheckedSteps(newSteps);

    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userDocRef, {
          checkedSteps: isChecked ? arrayRemove(stepKey) : arrayUnion(stepKey)
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!editForm.title || !editForm.id) return;
    
    const updatedIdea = { ...selectedIdea, ...editForm } as BusinessIdea;

    // Update Local State
    setAllIdeas(prev => {
      const exists = prev.find(i => i.id === editForm.id);
      if (exists) {
        return prev.map(i => i.id === editForm.id ? updatedIdea : i);
      } else {
        return [...prev, updatedIdea];
      }
    });

    // Update Firestore if Admin
    try {
      const ideaDocRef = doc(db, 'ideas', updatedIdea.id);
      await setDoc(ideaDocRef, updatedIdea);
      // If successful, we can remove it from modified tracking if we want, 
      // but usually we keep it until a full sync or just trust the cloud now.
      setModifiedIds(prev => {
        const next = new Set(prev);
        next.delete(updatedIdea.id);
        return next;
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `ideas/${updatedIdea.id}`);
      // Mark as modified locally since cloud sync failed
      setModifiedIds(prev => new Set(prev).add(updatedIdea.id));
    }

    setSelectedIdea(updatedIdea);
    setIsEditing(false);
  };

  const handleAddNew = () => {
    const maxId = allIdeas.reduce((max, idea) => {
      const id = parseInt(idea.id);
      return isNaN(id) ? max : Math.max(max, id);
    }, 0);
    const newId = String(maxId + 1);
    const newIdea: BusinessIdea = {
      id: newId,
      title: 'New Opportunity',
      category: 'Service',
      description: 'Describe the business opportunity here...',
      startupCost: { min: 500, max: 2000 },
      potentialIncome: '$50,000 - $100,000/year',
      customerAcquisition: ['Strategy 1', 'Strategy 2'],
      upsell: 'Offer a premium service package or maintenance plan.'
    };
    setAllIdeas(prev => [newIdea, ...prev]);
    setSelectedIdea(newIdea);
    setIsEditing(true);
  };

  const handleReset = async () => {
    try {
      await del('venturex_ideas');
      await del('boring_ventures_ideas');
      await del('venturex_favorites');
      await del('boring_ventures_favorites');
      await del('venturex_paid');
      await del('boring_ventures_paid');
      await del('venturex_modified');
      await del('boring_ventures_modified');
      setAllIdeas(CLEAN_BUSINESS_IDEAS);
      setFavorites([]);
      setModifiedIds(new Set());
      setIsPaid(false);
      setShowResetConfirm(false);
      setAdminFeedback({ message: 'Reset complete. Local data cleared.', type: 'success' });
    } catch (e) {
      console.error('Error resetting ideas:', e);
      setAdminFeedback({ message: 'Failed to reset local data.', type: 'error' });
    }
  };

  const toggleFavorite = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isFav = favorites.includes(id);
    const newFavs = isFav ? favorites.filter(fid => fid !== id) : [...favorites, id];
    setFavorites(newFavs);
    set('venturex_favorites', JSON.stringify(newFavs));

    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userDocRef, {
          favorites: isFav ? arrayRemove(id) : arrayUnion(id)
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      }
    }
  };

  const generateNames = async (idea: BusinessIdea) => {
    setIsNaming(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate 10 professional, catchy, and high-end business names for a "${idea.title}" business. The names should sound established and trustworthy. Return ONLY a JSON array of strings.`,
        config: { responseMimeType: "application/json" }
      });
      
      const names = JSON.parse(response.text);
      setGeneratedNames(prev => ({ ...prev, [idea.id]: names }));
    } catch (error) {
      console.error("Error generating names:", error);
    } finally {
      setIsNaming(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedIdea) return;
    
    const updatedIdeas = allIdeas.filter(i => i.id !== selectedIdea.id);
    setAllIdeas(updatedIdeas);
    setSelectedIdea(null);
    setIsEditing(false);
    setShowDeleteConfirm(false);
  };

  const handleDeduplicate = async () => {
    const uniqueIdeas: BusinessIdea[] = [];
    const seenTitles = new Map<string, BusinessIdea>();

    // We want to prioritize ideas that have custom descriptions
    allIdeas.forEach(idea => {
      const existing = seenTitles.get(idea.title);
      if (!existing) {
        seenTitles.set(idea.title, idea);
      } else {
        // If we have a duplicate, check which one is "better"
        if (idea.description.length > existing.description.length) {
          // Prioritize longer descriptions (likely edited)
          seenTitles.set(idea.title, idea);
        }
      }
    });

    setAllIdeas(Array.from(seenTitles.values()));
    setShowDeduplicateConfirm(false);
  };

  const hasDuplicates = useMemo(() => {
    const titles = allIdeas.map(i => i.title);
    return new Set(titles).size !== titles.length;
  }, [allIdeas]);

  const filteredIdeas = useMemo(() => {
    let baseIdeas = allIdeas;
    
    if (selectedCategory === 'Shortlisted') {
      baseIdeas = baseIdeas.filter(idea => favorites.includes(idea.id));
    } else if (selectedCategory !== 'All') {
      baseIdeas = baseIdeas.filter(idea => idea.category === selectedCategory);
    }

    const effectiveQuery = (searchQuery + ' ' + (activeTag || '')).trim().toLowerCase();
    let results = baseIdeas;
    if (effectiveQuery) {
      const keywords = effectiveQuery.split(/\s+/).filter(k => k.length > 0);
      results = baseIdeas.filter(idea => {
        // Pre-calculate searchable text if needed, or at least avoid repeated joins
        const title = idea.title.toLowerCase();
        const desc = idea.description.toLowerCase();
        const cat = idea.category.toLowerCase();
        const acq = idea.customerAcquisition.join(' ').toLowerCase();

        return keywords.every(keyword => 
          title.includes(keyword) || 
          desc.includes(keyword) || 
          cat.includes(keyword) || 
          acq.includes(keyword)
        );
      });
    }

    // Limit to top 10 for free users
    if (!hasAccess) {
      return results.slice(0, 10);
    }
    return results;
  }, [searchQuery, selectedCategory, activeTag, allIdeas, hasAccess, favorites]);

  const handleGenerateMore = async () => {
    setIsGenerating(true);
    try {
      const existingTitles = allIdeas.map(i => i.title);
      const newIdeas = await generateNewIdeas(existingTitles);
      if (newIdeas && newIdeas.length > 0) {
        setAllIdeas(prev => [...prev, ...newIdeas]);
      }
    } catch (error) {
      console.error("Error generating ideas:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-luxury-black flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
        <p className="text-gray-500 font-display font-bold uppercase tracking-[0.3em] text-[10px]">Initializing VentureX</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black text-white selection:bg-gold/30 relative">
      {/* Admin Feedback Toast */}
      <AnimatePresence>
        {adminFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`fixed bottom-10 left-1/2 z-[400] px-8 py-4 rounded-2xl backdrop-blur-xl border flex items-center gap-4 shadow-2xl ${
              adminFeedback.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
              adminFeedback.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
              'bg-gold/10 border-gold/20 text-gold'
            }`}
          >
            {adminFeedback.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> :
             adminFeedback.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
             <Sparkles className="w-5 h-5" />}
            <span className="text-sm font-medium">{adminFeedback.message}</span>
            <button onClick={() => setAdminFeedback(null)} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isUnverifiedAdmin && (
        <motion.div 
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          className="fixed top-24 left-1/2 z-[100] px-6 py-3 rounded-xl border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 shadow-2xl flex items-center gap-4 backdrop-blur-xl max-w-[90vw] text-center"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Admin email not verified. Cloud updates blocked.</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleResendVerification}
                className="px-4 py-1.5 bg-yellow-500 text-luxury-black text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Resend Email
              </button>
              <button 
                onClick={async () => {
                  if (auth.currentUser) {
                    await auth.currentUser.reload();
                    setUser({ ...auth.currentUser });
                    setAdminFeedback({ message: 'Auth status refreshed.', type: 'info' });
                  }
                }}
                className="px-4 py-1.5 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white/20 transition-colors"
              >
                Refresh Status
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Luxury Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Global Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-luxury-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { setSelectedIdea(null); setSelectedCategory('All'); }}>
            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform duration-500">
              <TrendingUp className="w-6 h-6 text-luxury-black" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold tracking-tighter text-white group-hover:text-gold transition-colors uppercase">VENTURE<span className="text-gold">X</span></h1>
              <p className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-gray-500">Luxury Business Curator</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                {(isAdmin || isUnverifiedAdmin) && (
                  <div className="relative">
                    <button 
                      onClick={() => setShowAdminMenu(!showAdminMenu)}
                      className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-gray-500 rounded-full hover:bg-gold/10 hover:border-gold/30 hover:text-gold transition-all"
                      title="Admin Settings"
                    >
                      <UserIcon className="w-4 h-4" />
                    </button>
                    
                    <AnimatePresence>
                      {showAdminMenu && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute right-0 mt-4 w-72 bg-luxury-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-3 z-[110]"
                        >
                          <div className="px-4 py-2 mb-2">
                            <p className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-gray-500">System Controls</p>
                            <div className="mt-1 flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${user?.emailVerified ? 'bg-green-500' : 'bg-yellow-500'}`} />
                              <span className="text-[9px] text-gray-400 uppercase tracking-widest">
                                {user?.emailVerified ? 'Verified Admin' : 'Unverified Admin'}
                              </span>
                            </div>
                          </div>

                          <button 
                            onClick={() => { syncToCloud(); setShowAdminMenu(false); }}
                            className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/5 rounded-2xl text-left transition-all group"
                          >
                            <div className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center">
                              <RotateCcw className="w-4 h-4 text-green-400" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">Sync to Cloud</p>
                              <p className="text-[10px] text-gray-500">Deploy changes globally</p>
                            </div>
                          </button>

                          <div className="h-px bg-white/5 my-3" />

                          <div className="grid grid-cols-2 gap-2">
                            <button 
                              onClick={() => { downloadBackup(); setShowAdminMenu(false); }}
                              className="flex flex-col items-center gap-2 p-3 hover:bg-white/5 rounded-2xl transition-all"
                            >
                              <Download className="w-4 h-4 text-blue-400" />
                              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Backup</span>
                            </button>

                            <label className="flex flex-col items-center gap-2 p-3 hover:bg-white/5 rounded-2xl transition-all cursor-pointer">
                              <Upload className="w-4 h-4 text-purple-400" />
                              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Restore</span>
                              <input type="file" className="hidden" onChange={restoreFromFile} accept=".json" />
                            </label>
                          </div>

                          <div className="h-px bg-white/5 my-3" />

                          <button 
                            onClick={() => { setShowRevertConfirm(true); setShowAdminMenu(false); }}
                            className="w-full flex items-center justify-center gap-2 py-3 text-orange-400/60 hover:text-orange-400 transition-colors text-[10px] font-bold uppercase tracking-widest"
                          >
                            <RotateCcw className="w-3 h-3" />
                            Revert to Cloud
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                    {user?.email?.toLowerCase() === 'chailey33@gmail.com' ? 'Admin' : 'Member'}
                  </span>
                  <span className="text-xs text-white font-medium">{user.email}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
            {!hasAccess && (
              <button 
                onClick={() => setShowPaywall(true)}
                className="px-6 py-2 gold-gradient text-luxury-black font-bold rounded-full text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-all"
              >
                Go Pro
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal 
            key="auth-modal"
            mode={authMode}
            setMode={setAuthMode}
            onClose={() => setShowAuthModal(false)}
            onEmailAuth={handleEmailAuth}
            onGoogleSignIn={handleGoogleSignIn}
            error={authError}
            isLoading={isAuthLoading}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      {!hasAccess ? (
        <header className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-linear-to-b from-gold/5 via-luxury-black/50 to-luxury-black" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05] mix-blend-overlay" />
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gold/10 rounded-full blur-[150px] animate-pulse" />
          </div>

          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full mb-8">
                <Sparkles className="w-3 h-3 text-gold" />
                <span className="text-[10px] font-display font-bold uppercase tracking-widest text-gold">Exclusive Access</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif mb-8 leading-[0.9] tracking-tight">
                The Art of <br />
                <span className="text-gold-gradient italic font-serif">Simple Wealth</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-12">
                Curating high-margin, recession-proof ventures for the modern entrepreneur. 
                Where stability meets extraordinary returns.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
                <button 
                  onClick={() => setShowPaywall(true)}
                  className="px-10 py-5 gold-gradient text-luxury-black font-display font-bold rounded-full text-lg shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-3"
                >
                  Unlock All Blueprints
                  <ArrowRight className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-10 py-5 bg-white/5 border border-white/10 text-white font-display font-bold rounded-full text-lg hover:bg-white/10 transition-all uppercase tracking-widest text-[12px]"
                >
                  View Samples
                </button>
              </div>

              {/* Market Insights Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12 border-t border-white/5 mt-12">
                <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-gray-500 mb-2">Avg. Margin</p>
                  <p className="text-3xl font-serif text-gold">65%+</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-gray-500 mb-2">Opportunities</p>
                  <p className="text-3xl font-serif text-white">250+</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-gray-500 mb-2">Market Value</p>
                  <p className="text-3xl font-serif text-white">$4.2B</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-gray-500 mb-2">Success Rate</p>
                  <p className="text-3xl font-serif text-gold">82%</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Animated Background Text */}
          <div className="absolute top-1/2 right-[-10%] translate-y-[-50%] opacity-[0.02] pointer-events-none select-none hidden lg:block">
            <h3 className="text-[30rem] font-serif italic leading-none">Wealth</h3>
          </div>
        </header>
      ) : (
        <header className="relative min-h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden py-20 px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-linear-to-b from-gold/5 via-luxury-black/50 to-luxury-black" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05] mix-blend-overlay" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gold/10 rounded-full blur-[150px] animate-pulse" />
          </div>

          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full mb-8">
                <Sparkles className="w-3 h-3 text-gold" />
                <span className="text-[10px] font-display font-bold uppercase tracking-widest text-gold">Premium Member</span>
              </div>

              <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif mb-8 leading-[0.9] tracking-tight">
                Venture<span className="text-gold-gradient not-italic font-display font-bold">Catalog</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-12">
                Your exclusive collection of high-margin, low-overhead business opportunities.
              </p>

              <div className="max-w-2xl mx-auto mb-12 relative group">
                <div className="absolute -inset-1 bg-gold/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full p-2 backdrop-blur-xl focus-within:border-gold/50 transition-all">
                  <Search className="w-6 h-6 text-gray-500 ml-6" />
                  <input 
                    type="text" 
                    placeholder="Search by industry, cost, or keyword..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow bg-transparent border-none px-6 py-4 text-white placeholder-gray-500 focus:outline-none text-lg"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors mr-2"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {QUICK_TAGS.map(tag => (
                  <button
                    key={tag.label}
                    onClick={() => setActiveTag(activeTag === tag.query ? null : tag.query)}
                    className={`px-6 py-3 rounded-full text-[10px] font-display font-bold uppercase tracking-[0.2em] border transition-all duration-500 ${
                      activeTag === tag.query 
                        ? 'bg-gold border-gold text-luxury-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                        : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </header>
      )}

      {/* Search & Filter Bar */}
      <section id="catalog" className="sticky top-0 z-40 bg-luxury-black/80 backdrop-blur-xl border-b border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8">
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="relative w-full lg:max-w-xl group"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none group-focus-within:text-gold transition-colors" />
            <input 
              type="text"
              placeholder="Search the collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-12 focus:outline-none focus:border-gold/30 focus:bg-white/[0.06] transition-all placeholder:text-gray-600 text-white text-sm font-display tracking-wide"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full text-gray-500 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
          
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-[10px] font-display font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-500 ${
                    selectedCategory === category 
                      ? 'bg-gold text-luxury-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3 ml-auto">
              {selectedCategory === 'Shortlisted' && favorites.length > 1 && (
                <button
                  onClick={() => setShowComparison(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gold text-luxury-black rounded-full hover:scale-105 transition-all text-[10px] font-display font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  <TrendingUp className="w-4 h-4" />
                  Compare
                </button>
              )}

              {(isAdmin || isUnverifiedAdmin) && hasDuplicates && (
                <button 
                  onClick={() => setShowDeduplicateConfirm(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/20 text-gold rounded-full hover:bg-gold/20 transition-all text-[10px] font-display font-bold uppercase tracking-widest"
                  title="Remove Duplicates"
                >
                  <AlertCircle className="w-4 h-4" />
                  Clean
                </button>
              )}

              {(isAdmin || isUnverifiedAdmin) && (
                <button
                  onClick={handleAddNew}
                  className="flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/20 text-gold rounded-full hover:bg-gold/20 transition-all text-[10px] font-display font-bold uppercase tracking-widest"
                >
                  <Plus className="w-4 h-4" />
                  Add Idea
                </button>
              )}

              {(isAdmin || isUnverifiedAdmin) && (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="p-3 bg-white/5 border border-white/10 text-gray-500 rounded-full hover:bg-white/10 transition-all"
                  title="Reset to Defaults"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Revert Confirmation Modal */}
      <AnimatePresence>
        {showRevertConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-red-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <RotateCcw className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Revert to Cloud?</h3>
              <p className="text-gray-400 mb-8">
                This will discard all your local changes and pull the latest data from the cloud. This action cannot be undone.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={revertToCloud}
                  className="w-full py-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-bold"
                >
                  Discard Changes & Revert
                </button>
                <button
                  onClick={() => setShowRevertConfirm(false)}
                  className="w-full py-4 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-2">Reset All Ideas?</h3>
              <p className="text-gray-400 mb-6">
                This will delete all your custom business ideas, edits, and uploaded pictures. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-4 py-2 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium"
                >
                  Reset Everything
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Deduplicate Confirmation Modal */}
      <AnimatePresence>
        {showDeduplicateConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-gold/20 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Clean Up Duplicates?</h3>
              <p className="text-gray-400 mb-8">
                I've found some duplicate business ideas. I can automatically merge them for you, keeping the versions with your custom pictures and edits.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleDeduplicate}
                  className="w-full py-4 gold-gradient text-luxury-black rounded-xl hover:opacity-90 transition-all font-bold"
                >
                  Clean Up Now
                </button>
                <button
                  onClick={() => setShowDeduplicateConfirm(false)}
                  className="w-full py-4 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-red-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Delete Opportunity?</h3>
              <p className="text-gray-400 mb-8">
                Are you sure you want to remove "<span className="text-white font-medium">{selectedIdea?.title}</span>"? This action cannot be undone.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleDelete}
                  className="w-full py-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-bold"
                >
                  Yes, Delete It
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="w-full py-4 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all"
                >
                  Keep It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {!hasAccess && (
          <div className="mb-16 p-8 bg-gold/10 border border-gold/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl">
            <div>
              <h3 className="text-2xl font-serif text-white mb-2">Exclusive Sample Access</h3>
              <p className="text-sm text-gray-400 font-light">You are viewing a curated selection of our premium business blueprints.</p>
            </div>
            <button 
              onClick={() => setShowPaywall(true)}
              className="px-10 py-4 gold-gradient text-luxury-black font-display font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] uppercase tracking-widest text-xs"
            >
              Unlock Full Catalog
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-16 h-16 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
            <p className="text-gray-500 font-display font-bold uppercase tracking-[0.3em] text-[10px]">Curating Collection</p>
          </div>
        ) : filteredIdeas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-3xl font-serif text-white mb-4">No Matches Found</h3>
            <p className="text-gray-400 max-w-md mx-auto font-light leading-relaxed mb-10">
              We couldn't find any blueprints matching your current search. Try adjusting your filters or search terms.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setActiveTag(null);
              }}
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredIdeas.map((idea, index) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => setSelectedIdea(idea)}
                  className="group cursor-pointer"
                >
                  <div className="luxury-card overflow-hidden h-full flex flex-col">
                    <div className="p-8 relative">
                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex gap-2">
                          <span className="bg-luxury-black/60 backdrop-blur-xl text-gold text-[9px] font-display font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-white/10">
                            {idea.category}
                          </span>
                          {favorites.includes(idea.id) && (
                            <span className="bg-gold/20 backdrop-blur-xl text-gold text-[9px] font-display font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-gold/40 flex items-center gap-1">
                              <Heart className="w-2.5 h-2.5 fill-current" />
                              Shortlisted
                            </span>
                          )}
                          {index % 5 === 0 && (
                            <span className="bg-gold gold-gradient text-luxury-black text-[8px] font-display font-bold uppercase tracking-widest px-2 py-1 rounded flex items-center gap-1 shadow-lg">
                              <Sparkles className="w-2 h-2" />
                              Curator's Choice
                            </span>
                          )}
                        </div>
                      </div>

                      <button 
                        onClick={(e) => toggleFavorite(idea.id, e)}
                        className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-xl border transition-all duration-500 ${
                          favorites.includes(idea.id)
                            ? 'bg-gold border-gold text-luxury-black shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                            : 'bg-luxury-black/40 border-white/10 text-white hover:bg-gold/20 hover:border-gold/50'
                        }`}
                      >
                        <Heart className={`w-4 h-4 transition-all ${favorites.includes(idea.id) ? 'fill-current' : ''}`} />
                      </button>

                      {(isAdmin || isUnverifiedAdmin) && (
                        <div className="absolute top-6 right-20 flex gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedIdea(idea);
                              setIsEditing(true);
                            }}
                            className="p-3 rounded-full backdrop-blur-xl border bg-luxury-black/40 border-white/10 text-gold hover:bg-gold/20 hover:border-gold/50 transition-all duration-500"
                            title="Quick Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedIdea(idea);
                              setShowDeleteConfirm(true);
                            }}
                            className="p-3 rounded-full backdrop-blur-xl border bg-luxury-black/40 border-white/10 text-red-500/60 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-500"
                            title="Delete Opportunity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-10 flex-grow flex flex-col">
                      <h3 className="text-3xl font-serif mb-4 group-hover:text-gold transition-colors leading-tight">
                        {idea.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-10 font-light leading-relaxed">
                        {idea.description}
                      </p>
                      
                      <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-display font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Valuation Potential</span>
                          <span className="text-lg font-display font-bold text-white tracking-tight">{idea.potentialIncome}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gold group/btn">
                          <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em]">Explore</span>
                          <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover/btn:bg-gold group-hover/btn:text-luxury-black transition-all duration-500">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {!hasAccess && filteredIdeas.length >= 10 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setShowPaywall(true)}
                  className="group cursor-pointer bg-gold/5 border-2 border-dashed border-gold/20 rounded-3xl flex flex-col items-center justify-center p-12 text-center hover:bg-gold/10 transition-all duration-500"
                >
                  <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Plus className="w-10 h-10 text-gold" />
                  </div>
                  <h3 className="text-3xl font-serif text-white mb-4">Unlock 300+ More</h3>
                  <p className="text-gray-500 text-sm font-light mb-10 leading-relaxed">Get instant access to our entire library of high-margin local business blueprints.</p>
                  <button className="px-10 py-4 gold-gradient text-luxury-black font-display font-bold rounded-full uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    Upgrade to Premium
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Generate More Button */}
        <div className="mt-24 flex justify-center">
          <button
            onClick={handleGenerateMore}
            disabled={isGenerating}
            className="flex items-center gap-4 px-10 py-5 bg-white/[0.03] border border-white/10 rounded-full hover:bg-white/[0.06] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
            ) : (
              <Plus className="w-5 h-5 text-gold group-hover:rotate-90 transition-transform duration-500" />
            )}
            <span className="font-display font-bold uppercase tracking-[0.2em] text-[10px] text-white">
              {isGenerating ? 'Curating New Opportunities...' : 'Unlock More Ideas'}
            </span>
          </button>
        </div>

        {filteredIdeas.length === 0 && !isGenerating && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-light italic mb-4">No opportunities found matching your keywords.</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-2 bg-gold/10 border border-gold/20 text-gold rounded-full hover:bg-gold/20 transition-all text-sm font-medium"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedIdea && (
          <motion.div 
            key="detail-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIdea(null)}
              className="absolute inset-0 bg-luxury-black/90 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass-card max-h-[90vh] flex flex-col overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                {(isAdmin || isUnverifiedAdmin) && !showExecutionPlan && (
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 bg-luxury-black/50 rounded-full hover:bg-luxury-black transition-colors text-gold"
                    title="Edit Idea"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                )}
                <button 
                  onClick={() => {
                    setSelectedIdea(null);
                    setShowExecutionPlan(false);
                    setIsEditing(false);
                  }}
                  className="p-2 bg-luxury-black/50 rounded-full hover:bg-luxury-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="edit"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full h-full p-10 md:p-16 overflow-y-auto bg-luxury-black text-white"
                  >
                    <div className="max-w-3xl mx-auto">
                      <div className="flex items-center justify-between mb-12">
                        <h2 className="text-4xl font-serif text-gold">Edit Opportunity</h2>
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-gray-500 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="block text-[10px] font-display font-bold uppercase tracking-[0.2em] text-gray-500">Opportunity Title</label>
                            <input 
                              type="text"
                              value={editForm.title || ''}
                              onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-gold/30 focus:bg-white/[0.06] transition-all text-sm font-display tracking-wide"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-[10px] font-display font-bold uppercase tracking-[0.2em] text-gray-500">Category</label>
                            <select 
                              value={editForm.category || ''}
                              onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-gold/30 focus:bg-white/[0.06] transition-all text-sm font-display tracking-wide appearance-none"
                            >
                              {CATEGORIES.filter(c => c !== 'All').map(c => (
                                <option key={c} value={c} className="bg-luxury-black">{c}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[10px] font-display font-bold uppercase tracking-[0.2em] text-gray-500">Valuation Potential</label>
                          <input 
                            type="text"
                            value={editForm.potentialIncome || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, potentialIncome: e.target.value }))}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-gold/30 focus:bg-white/[0.06] transition-all text-sm font-display tracking-wide"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[10px] font-display font-bold uppercase tracking-[0.2em] text-gray-500">Description</label>
                          <textarea 
                            value={editForm.description || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                            rows={5}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-gold/30 focus:bg-white/[0.06] transition-all text-sm font-light leading-relaxed resize-none"
                          />
                        </div>

                        <div className="flex flex-col gap-6 pt-8">
                          <div className="flex gap-4">
                            <button 
                              onClick={handleSaveEdit}
                              className="flex-grow gold-gradient text-luxury-black font-display font-bold py-5 rounded-full hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] uppercase tracking-widest text-xs"
                            >
                              Save Collection Item
                            </button>
                            <button 
                              onClick={() => setIsEditing(false)}
                              className="px-10 py-5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all font-display font-bold uppercase tracking-widest text-xs text-gray-400"
                            >
                              Cancel
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => setShowDeleteConfirm(true)}
                            className="w-full py-4 text-red-500/40 hover:text-red-500 text-[10px] font-display font-bold uppercase tracking-[0.3em] transition-colors"
                          >
                            Remove from Collection
                          </button>
                        </div>

                        {storageError && (
                          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3">
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            <p className="text-red-400 text-xs font-medium">{storageError}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : !showExecutionPlan ? (
                  <motion.div 
                    key="details"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col w-full h-full min-h-0"
                  >
                    <div className="flex-1 overflow-y-auto p-8 md:p-16 flex flex-col bg-luxury-black custom-scrollbar">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
                        <div className="flex flex-col gap-1">
                          <span className="text-gold text-[10px] font-display font-bold uppercase tracking-[0.3em] block">
                            {selectedIdea.category}
                          </span>
                          <div className="h-px w-8 bg-gold/30 mt-2" />
                        </div>
                        <div className="flex gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/10 w-fit">
                          {(['overview', 'calculator', 'roadmap', 'resources'] as const).map((tab) => (
                            <button
                              key={tab}
                              onClick={() => {
                                if (!hasAccess && tab !== 'overview') {
                                  setShowPaywall(true);
                                } else {
                                  setActiveTab(tab);
                                }
                              }}
                              className={`px-4 py-2 text-[9px] font-display font-bold uppercase tracking-widest rounded-lg transition-all relative ${
                                activeTab === tab 
                                  ? 'bg-gold text-luxury-black shadow-lg' 
                                  : 'text-gray-500 hover:text-gray-300'
                              }`}
                            >
                              {tab}
                              {!hasAccess && tab !== 'overview' && (
                                <div className="absolute -top-1 -right-1">
                                  <div className="w-2 h-2 bg-gold rounded-full animate-ping" />
                                  <div className="w-2 h-2 bg-gold rounded-full absolute top-0" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                  <div className="flex-grow flex flex-col">
                    <div className="mb-10">
                      <h2 className="text-4xl md:text-5xl font-serif mb-4 leading-tight tracking-tight">{selectedIdea.title}</h2>
                      <p className="text-gray-400 font-light leading-relaxed text-lg max-w-3xl">
                        {selectedIdea.description}
                      </p>
                    </div>

                    <AnimatePresence mode="wait">
                      {activeTab === 'overview' && (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-12"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 group hover:border-gold/20 transition-colors">
                                  <h4 className="text-[9px] font-display font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Startup Capital</h4>
                                  <p className="text-2xl text-white font-serif tracking-tight">${selectedIdea.startupCost.min.toLocaleString()} - ${selectedIdea.startupCost.max.toLocaleString()}</p>
                                </div>
                                <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 group hover:border-gold/20 transition-colors">
                                  <h4 className="text-[9px] font-display font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Valuation Potential</h4>
                                  <p className="text-2xl text-gold font-serif tracking-tight">{selectedIdea.potentialIncome}</p>
                                </div>
                              </div>

                              {/* Curator's Note */}
                              <div className="p-10 bg-gold/5 rounded-3xl border border-gold/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                  <Sparkles className="w-12 h-12 text-gold" />
                                </div>
                                <h4 className="text-[10px] font-display font-bold text-gold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                                  <div className="w-4 h-px bg-gold/30" />
                                  Curator's Note
                                </h4>
                                <p className="text-gray-300 italic font-serif text-xl leading-relaxed relative z-10">
                                  "This venture represents the pinnacle of 'simple' but high-yield opportunities. Its low competition and essential nature make it a cornerstone for any diversified portfolio. Focus on operational excellence to truly unlock its potential."
                                </p>
                              </div>

                              <div className="space-y-6">
                                <h4 className="text-[10px] font-display font-bold text-gray-500 uppercase tracking-[0.3em] flex items-center gap-3">
                                  <div className="w-4 h-px bg-gold/30" />
                                  Strategic Upsell
                                </h4>
                                <div className="bg-gold/5 border border-gold/10 p-8 rounded-3xl relative overflow-hidden group">
                                  <div className="absolute top-0 left-0 w-1 h-full bg-gold/30" />
                                  <p className="text-gray-300 text-lg font-serif italic leading-relaxed">
                                    "{selectedIdea.upsell}"
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-6">
                                <h4 className="text-[10px] font-display font-bold text-gray-500 uppercase tracking-[0.3em] flex items-center gap-3">
                                  <div className="w-4 h-px bg-gold/30" />
                                  Market Intelligence
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  {[
                                    { label: 'Demand', value: 'High', color: 'text-green-400' },
                                    { label: 'Competition', value: 'Low', color: 'text-blue-400' },
                                    { label: 'Scalability', value: '9.8/10', color: 'text-gold' }
                                  ].map((stat, i) => (
                                    <div key={i} className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 text-center">
                                      <p className="text-[8px] font-display font-bold text-gray-600 uppercase tracking-widest mb-2">{stat.label}</p>
                                      <p className={`text-sm font-display font-bold uppercase tracking-widest ${stat.color}`}>{stat.value}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Regulatory Disclaimer */}
                              <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 flex items-start gap-4">
                                <div className="p-3 bg-gold/10 rounded-xl">
                                  <AlertCircle className="w-5 h-5 text-gold" />
                                </div>
                                <div>
                                  <h4 className="text-[10px] font-display font-bold text-white uppercase tracking-widest mb-2">Due Diligence Required</h4>
                                  <p className="text-xs text-gray-500 leading-relaxed">
                                    Business regulations vary significantly by jurisdiction. You are responsible for conducting your own research to determine which local permits, licenses, or certifications are required for this specific opportunity in your area.
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-6">
                                <h4 className="text-[10px] font-display font-bold text-gray-500 uppercase tracking-[0.3em] flex items-center gap-3">
                                  <div className="w-4 h-px bg-gold/30" />
                                  AI Brand Concepts
                                </h4>
                                <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl relative overflow-hidden">
                                  {!hasAccess && (
                                    <div className="absolute inset-0 bg-luxury-black/80 backdrop-blur-md z-10 flex flex-col items-center justify-center p-8 text-center">
                                      <p className="text-xs text-gray-400 mb-4 font-light">Unlock proprietary AI naming engine</p>
                                      <button 
                                        onClick={() => setShowPaywall(true)}
                                        className="text-[10px] font-display font-bold bg-gold text-luxury-black px-6 py-3 rounded-full hover:scale-105 transition-all uppercase tracking-widest"
                                      >
                                        Unlock AI Naming
                                      </button>
                                    </div>
                                  )}
                                  {generatedNames[selectedIdea.id] ? (
                                    <div className="flex flex-wrap gap-3">
                                      {generatedNames[selectedIdea.id].map((name, i) => (
                                        <span key={i} className="px-5 py-2 bg-gold/10 text-gold text-[10px] font-display font-bold uppercase tracking-widest rounded-full border border-gold/20">{name}</span>
                                      ))}
                                      <button 
                                        onClick={() => generateNames(selectedIdea)}
                                        className="text-[10px] font-display font-bold text-gray-600 hover:text-gold transition-colors ml-4 uppercase tracking-widest"
                                      >
                                        Refresh
                                      </button>
                                    </div>
                                  ) : (
                                    <button 
                                      onClick={() => generateNames(selectedIdea)}
                                      disabled={isNaming}
                                      className="w-full py-5 bg-gold/5 text-gold text-[10px] font-display font-bold uppercase tracking-[0.2em] rounded-2xl border border-gold/10 hover:bg-gold/10 transition-all flex items-center justify-center gap-3"
                                    >
                                      {isNaming ? <div className="w-4 h-4 border-2 border-gold/20 border-t-gold rounded-full animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                      {isNaming ? 'Generating Concepts...' : 'Generate AI Brand Names'}
                                    </button>
                                  )}
                                </div>
                              </div>

                              <div className="flex gap-6 pt-8">
                                <button 
                                  onClick={() => {
                                    if (!hasAccess) {
                                      setShowPaywall(true);
                                    } else {
                                      setShowExecutionPlan(true);
                                    }
                                  }}
                                  className="flex-grow gold-gradient text-luxury-black font-display font-bold py-5 rounded-full hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group relative overflow-hidden uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                                >
                                  Access Full Blueprint
                                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                                </button>
                                <button 
                                  onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    setShowCopied(true);
                                    setTimeout(() => setShowCopied(false), 2000);
                                  }}
                                  className="p-5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-gray-400 hover:text-white relative"
                                  title="Share Collection Item"
                                >
                                  <AnimatePresence>
                                    {showCopied ? (
                                      <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gold text-luxury-black text-[10px] font-display font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl"
                                      >
                                        Link Copied
                                      </motion.span>
                                    ) : null}
                                  </AnimatePresence>
                                  <ExternalLink className="w-5 h-5" />
                                </button>
                              </div>
                            </motion.div>
                          )}

                          {activeTab === 'resources' && (
                            <motion.div
                              key="resources"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="space-y-6"
                            >
                              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h3 className="text-xl font-serif text-white mb-4">Tools of the Trade</h3>
                                <p className="text-sm text-gray-400 mb-8 font-light">Essential resources to launch your {selectedIdea.title} business.</p>
                                
                                <div className="space-y-4">
                                  {[
                                    { name: 'Mercury', desc: 'Modern business banking for startups.', link: 'https://mercury.com' },
                                    { name: 'Stripe', desc: 'Accept payments and manage billing.', link: 'https://stripe.com' },
                                    { name: 'Next Insurance', desc: 'Tailored business insurance for local services.', link: 'https://nextinsurance.com' },
                                    { name: 'Northwest Registered Agent', desc: 'Professional LLC formation and compliance.', link: 'https://northwestregisteredagent.com' }
                                  ].map((tool, i) => (
                                    <a 
                                      key={i}
                                      href={tool.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:border-gold/30 transition-all group"
                                    >
                                      <div>
                                        <h4 className="text-sm font-bold text-white group-hover:text-gold transition-colors">{tool.name}</h4>
                                        <p className="text-xs text-gray-500">{tool.desc}</p>
                                      </div>
                                      <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gold" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {activeTab === 'calculator' && (
                            <motion.div
                              key="calculator"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="space-y-6"
                            >
                              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h3 className="text-xl font-serif text-white mb-4">Profitability Simulator</h3>
                                <p className="text-sm text-gray-400 mb-6 font-light">Adjust the variables below to see your potential monthly net profit.</p>
                                
                                <CalculatorSection idea={selectedIdea} />
                              </div>
                            </motion.div>
                          )}

                          {activeTab === 'roadmap' && (
                            <motion.div
                              key="roadmap"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="space-y-6"
                            >
                              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h3 className="text-xl font-serif text-white mb-4">30-Day Launch Roadmap</h3>
                                <p className="text-sm text-gray-400 mb-8 font-light">Your step-by-step guide to going from zero to your first paying client. Progress is saved automatically.</p>
                                
                                <LaunchRoadmap 
                                  idea={selectedIdea} 
                                  checkedSteps={checkedSteps}
                                  onToggleStep={toggleStep}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="plan"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full h-full p-6 sm:p-8 md:p-16 overflow-y-auto bg-white text-luxury-black"
                  >
                    <div className="max-w-2xl mx-auto">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 border-b-2 border-luxury-black pb-6">
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-serif uppercase tracking-tighter">Execution Plan</h2>
                          <p className="text-sm text-gray-500 font-mono">ID: {selectedIdea.id.padStart(4, '0')} | {selectedIdea.category}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-xs uppercase tracking-widest font-bold">Business Ventures</p>
                          <p className="text-[10px] text-gray-400">Proprietary Blueprint</p>
                        </div>
                      </div>

                      <div className="space-y-12">
                        <section>
                          <h3 className="text-lg font-bold uppercase tracking-widest mb-4 border-l-4 border-gold pl-4">01. Executive Summary</h3>
                          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            The <span className="font-bold">{selectedIdea.title}</span> venture is a high-margin local service business designed for rapid deployment. 
                            With a low initial overhead and a focus on essential maintenance/service, this model prioritizes recurring revenue and word-of-mouth growth.
                          </p>
                        </section>

                        <section>
                          <h3 className="text-lg font-bold uppercase tracking-widest mb-4 border-l-4 border-gold pl-4">02. Financial Roadmap</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 bg-gray-50 p-6 rounded-lg">
                            <div>
                              <p className="text-xs text-gray-500 uppercase mb-1">Capital Requirement</p>
                              <p className="text-xl sm:text-2xl font-serif">${selectedIdea.startupCost.min} - ${selectedIdea.startupCost.max}</p>
                              <p className="text-[10px] text-gray-400 mt-2 italic">Includes equipment, initial marketing, and licensing.</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase mb-1">Target Annual Yield</p>
                              <p className="text-xl sm:text-2xl font-serif">{selectedIdea.potentialIncome}</p>
                              <p className="text-[10px] text-gray-400 mt-2 italic">Based on 15-20 billable hours per week.</p>
                            </div>
                          </div>
                        </section>

                        <section>
                          <h3 className="text-lg font-bold uppercase tracking-widest mb-4 border-l-4 border-gold pl-4">03. 30-Day Launch Sequence</h3>
                          <div className="space-y-4">
                            {[
                              { day: '01-05', task: 'Register LLC, obtain local business license, and secure specialized insurance.' },
                              { day: '06-12', task: 'Procure core equipment and set up a professional Google Business Profile.' },
                              { day: '13-20', task: 'Execute initial customer acquisition strategies (Nextdoor, Facebook, Door Hangers).' },
                              { day: '21-30', task: 'Complete first 3-5 "Beta" jobs at a discount to secure reviews and testimonials.' }
                            ].map((step, i) => (
                              <div key={i} className="flex gap-6 items-start">
                                <span className="font-mono text-gold font-bold text-sm pt-1">D.{step.day}</span>
                                <p className="text-sm text-gray-700">{step.task}</p>
                              </div>
                            ))}
                          </div>
                        </section>

                        <section>
                          <h3 className="text-lg font-bold uppercase tracking-widest mb-4 border-l-4 border-gold pl-4">04. Growth & Scale</h3>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            Once the first 10 recurring clients are secured, focus shifts to optimization:
                          </p>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
                            <li>Implement automated invoicing and scheduling software.</li>
                            <li>Upsell seasonal maintenance packages to existing clients.</li>
                            <li>Hire a part-time technician to increase billable capacity.</li>
                          </ul>
                        </section>

                        <section className="bg-gray-100 p-8 rounded-xl border-l-4 border-luxury-black">
                          <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Regulatory Compliance Notice</h3>
                          <p className="text-xs text-gray-600 leading-relaxed italic">
                            This blueprint provides a general operational framework. It is the user's sole responsibility to perform due diligence regarding local zoning laws, professional certifications, and municipal permit requirements. We strongly recommend consulting with a local business advisor or legal counsel before commencing operations.
                          </p>
                        </section>
                      </div>

                      <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
                        <button 
                          onClick={() => setShowExecutionPlan(false)}
                          className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-gold transition-colors"
                        >
                          <ArrowRight className="w-4 h-4 rotate-180" />
                          Back to Details
                        </button>
                        <button 
                          onClick={() => window.print()}
                          className="px-6 py-2 bg-luxury-black text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-gray-800 transition-colors"
                        >
                          Print / Save as PDF
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
        {showComparison && (
          <motion.div
            key="comparison-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120]"
          >
            <ComparisonModal 
              ideas={allIdeas.filter(i => favorites.includes(i.id))} 
              onClose={() => setShowComparison(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Paywall Modal */}
      <AnimatePresence>
        {showPaywall && (
          <motion.div 
            key="paywall-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
          >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-luxury-black border border-gold/30 rounded-[2.5rem] p-6 sm:p-8 md:p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_100px_rgba(212,175,55,0.2)] relative"
              >
                <div className="absolute top-0 left-0 w-full h-1 gold-gradient" />
                <button 
                  onClick={() => setShowPaywall(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>

                <div className="text-center mb-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12 border border-gold/20">
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4">Unlock the Full Catalog</h2>
                  <p className="text-gray-400 text-base sm:text-lg font-light">Join 2,400+ entrepreneurs building high-margin local empires.</p>
                </div>

                <div className="space-y-4 sm:space-y-6 mb-10">
                  {[
                    'Access to all 300+ Business Blueprints',
                    'AI-Powered Business Name Generator',
                    'Interactive 30-Day Launch Roadmap',
                    'Side-by-Side Opportunity Comparison',
                    'Profitability & ROI Simulator',
                    'Priority Support & Community Access'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 text-left">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                      </div>
                      <span className="text-gray-300 font-light text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-gray-500 line-through text-lg sm:text-xl">$149</span>
                    <span className="text-4xl sm:text-5xl font-serif text-white">$49</span>
                  </div>
                  <p className="text-gold text-[10px] sm:text-xs uppercase tracking-widest font-bold">One-Time Lifetime Access</p>
                </div>

                {!user ? (
                  <button 
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                    }}
                    className="w-full py-4 sm:py-5 bg-white text-luxury-black font-bold rounded-2xl text-lg sm:text-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3"
                  >
                    <LogIn className="w-5 h-5 sm:w-6 sm:h-6" />
                    Sign in to Purchase
                  </button>
                ) : (
                  <button 
                    onClick={handleStripeCheckout}
                    disabled={isProcessingPayment}
                    className="w-full py-4 sm:py-5 gold-gradient text-luxury-black font-bold rounded-2xl text-lg sm:text-xl shadow-[0_20px_40px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessingPayment ? (
                      <div className="w-6 h-6 border-2 border-luxury-black/20 border-t-luxury-black rounded-full animate-spin" />
                    ) : (
                      <>
                        Get Instant Access
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </>
                    )}
                  </button>
                )}

                {/* Secure payment message */}
                <p className="text-center text-[10px] text-gray-600 mt-8 uppercase tracking-widest">
                  Secure payment via Stripe
                </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif mb-4">Business <span className="text-gold">Ventures</span></h2>
          <p className="text-gray-500 text-sm font-light max-w-md mx-auto">
            Curating the most reliable paths to financial independence through simple, local service businesses.
          </p>
          <div className="mt-8 flex justify-center gap-6 text-gray-600 text-xs uppercase tracking-widest">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-gold transition-colors">Privacy</button>
            <button onClick={() => setShowTerms(true)} className="hover:text-gold transition-colors">Terms</button>
          </div>
        </div>
      </footer>
      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div 
            key="privacy-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="luxury-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 sm:p-16"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-serif text-white mb-2">Privacy Policy</h2>
                  <p className="text-[10px] text-gold font-display font-bold uppercase tracking-widest">Confidentiality Agreement</p>
                </div>
                <button onClick={() => setShowPrivacy(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-8 text-gray-400 font-light leading-relaxed">
                <section>
                  <h3 className="text-white font-serif text-lg mb-3">Data Collection</h3>
                  <p>We collect minimal data necessary to provide our curated business blueprints. This includes your email address for authentication and your shortlisted ventures for your personal dashboard.</p>
                </section>
                <section>
                  <h3 className="text-white font-serif text-lg mb-3">Local Storage</h3>
                  <p>To ensure maximum performance and privacy, many of your preferences are stored locally on your device via encrypted IndexedDB. This data remains under your control at all times.</p>
                </section>
                <section>
                  <h3 className="text-white font-serif text-lg mb-3">Third-Party Services</h3>
                  <p>We utilize Google Firebase for secure authentication and Stripe for encrypted payment processing. We never sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
                </section>
                <section>
                  <h3 className="text-white font-serif text-lg mb-3">Your Rights</h3>
                  <p>You have the right to access, correct, or delete your personal data at any time through your account settings or by contacting our support team.</p>
                </section>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/5">
                <button 
                  onClick={() => setShowPrivacy(false)}
                  className="w-full py-4 bg-white/5 border border-white/10 text-white font-display font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-white/10 transition-all"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms Modal */}
      <AnimatePresence>
        {showTerms && (
          <motion.div 
            key="terms-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="luxury-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 sm:p-16"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-serif text-white mb-2">Terms of Service</h2>
                  <p className="text-[10px] text-gold font-display font-bold uppercase tracking-widest">Usage Agreement</p>
                </div>
                <button onClick={() => setShowTerms(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-8 text-gray-400 font-light leading-relaxed">
                <section>
                  <h3 className="text-white font-serif text-lg mb-3">Intellectual Property</h3>
                  <p>All business blueprints, market insights, and curated strategies provided by Business Ventures are proprietary. Access is granted for personal use only and may not be redistributed or resold.</p>
                </section>
                <section>
                  <h3 className="text-white font-serif text-lg mb-3">No Financial Advice</h3>
                  <p>The information provided is for educational and inspirational purposes only. We are not financial advisors. Starting a business involves risk, and results are not guaranteed.</p>
                </section>
                <section>
                  <h3 className="text-white font-serif text-lg mb-3">Due Diligence</h3>
                  <p>It is the user's sole responsibility to research and comply with all local, state, and federal regulations. This includes, but is not limited to, obtaining necessary business licenses, professional certifications, and municipal permits required for each specific business opportunity.</p>
                </section>
                <section>
                  <h3 className="text-white font-serif text-lg mb-3">Subscription & Access</h3>
                  <p>Full access to the catalog is provided via a one-time or recurring payment.</p>
                </section>
                <section>
                  <h3 className="text-white font-serif text-lg mb-3">Limitation of Liability</h3>
                  <p>Business Ventures shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services or blueprints.</p>
                </section>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/5">
                <button 
                  onClick={() => setShowTerms(false)}
                  className="w-full py-4 bg-white/5 border border-white/10 text-white font-display font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-white/10 transition-all"
                >
                  Accept & Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
