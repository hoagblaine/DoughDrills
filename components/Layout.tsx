
import React from 'react';
import { UserStats } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  stats: UserStats;
  onNavigate: (view: 'library' | 'dashboard') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, stats, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm px-4 md:px-8 py-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('dashboard')}
        >
          <div className="bg-orange-500 p-2 rounded-xl text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl text-orange-900 hidden sm:block">Dough Drills</h1>
        </div>

        <nav className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('library')}
            className="text-orange-900 font-medium hover:text-orange-600 transition-colors"
          >
            Library
          </button>
          <div className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
            <span className="text-orange-600 font-bold">🍞 {stats.points}</span>
            <div className="w-px h-4 bg-orange-200" />
            <span className="text-orange-600 font-bold">🔥 {stats.streak}</span>
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8">
        {children}
      </main>

      <footer className="bg-orange-900 text-orange-50 py-8 px-4">
        <div className="container mx-auto text-center opacity-70 text-sm">
          <p>© 2024 Dough Drills. Bake with confidence, recall with ease.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
