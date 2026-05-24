'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { Bot, LogIn } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#050505] items-center justify-center font-sans">
        <div className="flex items-center space-x-3 text-white/50">
          <Bot className="w-8 h-8 animate-pulse text-[#00FFC2]" />
          <span className="text-xl tracking-widest uppercase text-xs font-semibold">Authenticating...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen bg-[#050505] items-center justify-center font-sans p-4">
        <div className="max-w-md w-full bg-[#090909] border border-white/10 rounded-sm p-8 text-center shadow-2xl">
          <div className="flex justify-center mb-6">
            <Bot className="w-12 h-12 text-[#00FFC2]" />
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">CloudFinAI</h1>
          <p className="text-white/50 mb-8 text-sm">Please sign in to view your dashboard, analytics, and manage agents.</p>
          <button
            onClick={signInWithGoogle}
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-sm text-[#050505] bg-[#00FFC2] hover:bg-[#00FFC2]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00FFC2] focus:ring-offset-[#050505] transition-colors"
          >
            <LogIn className="w-5 h-5 mr-3" />
            Sign in with Google
          </button>
          
          <div className="mt-8 text-xs text-white/30 uppercase tracking-widest text-center mt-6">
            Email verification required to access CloudFinAI tools
          </div>
        </div>
      </div>
    );
  }

  // Once authenticated, we require email verification
  if (user && !user.emailVerified) {
    return (
      <div className="flex h-screen bg-[#050505] items-center justify-center font-sans p-4">
        <div className="max-w-md w-full bg-[#090909] border border-white/10 rounded-sm p-8 text-center shadow-2xl">
          <div className="flex justify-center mb-6">
            <Bot className="w-12 h-12 text-yellow-400" />
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">Verify Your Email</h1>
          <p className="text-white/50 mb-8 text-sm">
            You signed in with {user.email}, but your email is not verified yet. Please check your inbox or use a verified Google account.
          </p>
          <button
            onClick={signOut}
            className="w-full flex justify-center items-center px-4 py-3 border border-white/10 text-sm font-medium rounded-sm text-white hover:bg-white/5 focus:outline-none transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
