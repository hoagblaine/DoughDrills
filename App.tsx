
import React, { useState, useEffect } from 'react';
import { Recipe, Difficulty, UserStats, QuizResult, SRSItem, Challenge } from './types';
import { INITIAL_RECIPES } from './constants';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RecipeLibrary from './components/RecipeLibrary';
import QuizInterface from './components/QuizInterface';
import ChallengeInterface from './components/ChallengeInterface';
import RecipeEditor from './components/RecipeEditor';

type View = 'dashboard' | 'library' | 'quiz' | 'results' | 'review' | 'challenge';

const SRS_INTERVALS = [1, 3, 7, 14, 30, 90]; // Days

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Beginner');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [lastQuizResults, setLastQuizResults] = useState<QuizResult[]>([]);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('dough_drills_stats');
    return saved ? JSON.parse(saved) : {
      points: 0,
      streak: 0,
      badges: [],
      lastCompletedRecipe: undefined,
      preferredDifficulty: 'Beginner',
      srsItems: [],
      userRecipes: [],
      lastActivityDate: undefined,
      bestChallengeScore: 0
    };
  });

  // Ensure preferredDifficulty and userRecipes exist (migration for existing users)
  useEffect(() => {
    setStats(prev => {
      let updated = false;
      const newStats = { ...prev };
      if (!newStats.preferredDifficulty) {
        newStats.preferredDifficulty = 'Beginner';
        updated = true;
      }
      if (!newStats.userRecipes) {
        newStats.userRecipes = [];
        updated = true;
      }
      return updated ? newStats : prev;
    });
  }, []);

  // Effect to check if streak should reset on load
  useEffect(() => {
    const checkAndResetStreak = () => {
      if (!stats.lastActivityDate) return;

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const lastActivity = new Date(stats.lastActivityDate);
      const lastActivityDay = new Date(lastActivity.getFullYear(), lastActivity.getMonth(), lastActivity.getDate());

      const diffInMs = today.getTime() - lastActivityDay.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      if (diffInDays > 1) {
        setStats(prev => ({ ...prev, streak: 0 }));
      }
    };

    checkAndResetStreak();
  }, []);

  useEffect(() => {
    localStorage.setItem('dough_drills_stats', JSON.stringify(stats));
  }, [stats]);

  const allRecipes = [...INITIAL_RECIPES, ...(stats.userRecipes || [])];

  const updateStatsWithStreak = (prev: UserStats) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let newStreak = prev.streak;
    const lastActivity = prev.lastActivityDate ? new Date(prev.lastActivityDate) : null;
    const lastActivityDay = lastActivity ? new Date(lastActivity.getFullYear(), lastActivity.getMonth(), lastActivity.getDate()) : null;

    if (!lastActivityDay) {
      newStreak = 1;
    } else {
      const diffInMs = today.getTime() - lastActivityDay.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      if (diffInDays === 1) {
        newStreak += 1;
      } else if (diffInDays > 1) {
        newStreak = 1;
      }
    }

    return {
      newStreak,
      lastActivityDate: now.toISOString()
    };
  };

  const handleStartQuiz = (recipe: Recipe, difficulty: Difficulty) => {
    setSelectedRecipe(recipe);
    setSelectedDifficulty(difficulty);
    setStats(prev => ({ ...prev, preferredDifficulty: difficulty }));
    setView('quiz');
  };

  const handleStartReview = () => {
    setView('review');
  };

  const handleStartChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setView('challenge');
  };

  const handleSetPreferredDifficulty = (diff: Difficulty) => {
    setStats(prev => ({ ...prev, preferredDifficulty: diff }));
  };

  const handleSaveUserRecipe = (recipe: Recipe) => {
    setStats(prev => ({
      ...prev,
      userRecipes: [...(prev.userRecipes || []), recipe]
    }));
    setIsAddingRecipe(false);
  };

  const handleDeleteUserRecipe = (id: string) => {
    if (confirm('Are you sure you want to remove this custom recipe?')) {
      setStats(prev => ({
        ...prev,
        userRecipes: (prev.userRecipes || []).filter(r => r.id !== id)
      }));
    }
  };

  const handleQuizComplete = (results: QuizResult[]) => {
    const score = results.filter(r => r.isCorrect).length;
    const pointsEarned = score * 20 + (selectedDifficulty === 'Advanced' ? 100 : selectedDifficulty === 'Intermediate' ? 50 : 0);
    
    setLastQuizResults(results);

    setStats(prev => {
      const { newStreak, lastActivityDate } = updateStatsWithStreak(prev);
      const newBadges = [...prev.badges];
      let newSrsItems = [...prev.srsItems];

      results.forEach(res => {
        if (!res.isCorrect) {
          const existingIdx = newSrsItems.findIndex(item => item.question.id === res.question.id);
          const nextReviewDate = new Date();
          nextReviewDate.setDate(nextReviewDate.getDate() + SRS_INTERVALS[0]);

          const newItem: SRSItem = {
            question: res.question,
            recipeId: selectedRecipe?.id || 'unknown',
            recipeName: selectedRecipe?.name || 'Unknown Recipe',
            intervalIndex: 0,
            nextReviewDate: nextReviewDate.toISOString()
          };

          if (existingIdx > -1) {
            newSrsItems[existingIdx] = newItem;
          } else {
            newSrsItems.push(newItem);
          }
        } else {
          const existingIdx = newSrsItems.findIndex(item => item.question.id === res.question.id);
          if (existingIdx > -1) {
            const item = newSrsItems[existingIdx];
            const nextIdx = Math.min(item.intervalIndex + 1, SRS_INTERVALS.length - 1);
            const nextReviewDate = new Date();
            nextReviewDate.setDate(nextReviewDate.getDate() + SRS_INTERVALS[nextIdx]);
            
            newSrsItems[existingIdx] = {
              ...item,
              intervalIndex: nextIdx,
              nextReviewDate: nextReviewDate.toISOString()
            };
          }
        }
      });

      if (selectedRecipe?.category === 'Bread' && !newBadges.includes('yeast-master')) {
        newBadges.push('yeast-master');
      }
      if (score === results.length && results.length > 0 && selectedDifficulty === 'Advanced' && !newBadges.includes('oven-overlord')) {
        newBadges.push('oven-overlord');
      }

      return {
        ...prev,
        points: prev.points + pointsEarned,
        badges: newBadges,
        lastCompletedRecipe: selectedRecipe?.id,
        streak: newStreak,
        lastActivityDate,
        srsItems: newSrsItems
      };
    });

    setView('results');
  };

  const handleReviewComplete = (results: QuizResult[]) => {
    setStats(prev => {
      const { newStreak, lastActivityDate } = updateStatsWithStreak(prev);
      let newSrsItems = [...prev.srsItems];
      
      results.forEach(res => {
        const idx = newSrsItems.findIndex(item => item.question.id === res.question.id);
        if (idx > -1) {
          if (res.isCorrect) {
            const item = newSrsItems[idx];
            const nextIdx = Math.min(item.intervalIndex + 1, SRS_INTERVALS.length - 1);
            const nextReviewDate = new Date();
            nextReviewDate.setDate(nextReviewDate.getDate() + SRS_INTERVALS[nextIdx]);
            newSrsItems[idx] = { ...item, intervalIndex: nextIdx, nextReviewDate: nextReviewDate.toISOString() };
          } else {
            const nextReviewDate = new Date();
            nextReviewDate.setDate(nextReviewDate.getDate() + SRS_INTERVALS[0]);
            newSrsItems[idx] = { ...newSrsItems[idx], intervalIndex: 0, nextReviewDate: nextReviewDate.toISOString() };
          }
        }
      });
      
      return { 
        ...prev, 
        streak: newStreak, 
        lastActivityDate, 
        srsItems: newSrsItems 
      };
    });
    setView('dashboard');
  };

  const handleChallengeComplete = (score: number, timeBonus: number) => {
    const totalPoints = (score * 50) + timeBonus + (selectedChallenge?.bonusPoints || 0);
    
    setStats(prev => {
      const { newStreak, lastActivityDate } = updateStatsWithStreak(prev);
      const newBadges = [...prev.badges];
      if (!newBadges.includes('speed-baker')) newBadges.push('speed-baker');
      
      return {
        ...prev,
        points: prev.points + totalPoints,
        streak: newStreak,
        lastActivityDate,
        badges: newBadges,
        bestChallengeScore: Math.max(prev.bestChallengeScore || 0, totalPoints)
      };
    });

    setView('dashboard');
  };

  const dueReviews = stats.srsItems.filter(item => new Date(item.nextReviewDate) <= new Date());

  return (
    <div className="font-sans antialiased text-orange-950">
      <Layout stats={stats} onNavigate={v => setView(v)}>
        {view === 'dashboard' && (
          <Dashboard 
            stats={stats} 
            recipes={allRecipes} 
            onStartQuiz={handleStartQuiz}
            onStartReview={handleStartReview}
            onStartChallenge={handleStartChallenge}
            onSetPreferredDifficulty={handleSetPreferredDifficulty}
          />
        )}

        {view === 'library' && (
          <RecipeLibrary 
            recipes={allRecipes} 
            onSelectRecipe={handleStartQuiz}
            onAddRecipe={() => setIsAddingRecipe(true)}
            onDeleteRecipe={handleDeleteUserRecipe}
          />
        )}

        {isAddingRecipe && (
          <RecipeEditor 
            onSave={handleSaveUserRecipe}
            onCancel={() => setIsAddingRecipe(false)}
          />
        )}

        {view === 'quiz' && selectedRecipe && (
          <QuizInterface 
            recipe={selectedRecipe} 
            difficulty={selectedDifficulty} 
            onComplete={handleQuizComplete}
            onExit={() => setView('library')}
          />
        )}

        {view === 'challenge' && selectedChallenge && (
          <ChallengeInterface 
            challenge={selectedChallenge}
            recipes={INITIAL_RECIPES}
            onComplete={handleChallengeComplete}
            onExit={() => setView('dashboard')}
          />
        )}

        {view === 'review' && (
          <QuizInterface 
            recipe={INITIAL_RECIPES[0]} 
            difficulty={stats.preferredDifficulty} 
            onComplete={handleReviewComplete}
            onExit={() => setView('dashboard')}
            reviewQuestions={dueReviews.map(item => item.question)}
          />
        )}

        {view === 'results' && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in duration-500">
            <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center text-6xl mb-6 shadow-2xl shadow-orange-200">
              🎉
            </div>
            <h2 className="text-4xl font-serif mb-2">Drill Complete!</h2>
            <p className="text-xl text-orange-800 mb-8">
              You correctly answered <strong>{lastQuizResults.filter(r => r.isCorrect).length} / {lastQuizResults.length}</strong> questions.
            </p>
            
            {lastQuizResults.some(r => !r.isCorrect) && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl mb-8 max-w-md w-full text-left">
                <p className="text-red-800 text-sm font-bold mb-2">Scheduled for Review:</p>
                <ul className="text-xs text-red-600 list-disc list-inside">
                  {lastQuizResults.filter(r => !r.isCorrect).map((r, i) => (
                    <li key={i} className="mb-1 truncate">{r.question.question}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-12">
              <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm">
                <div className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">Points Gained</div>
                <div className="text-3xl font-serif text-orange-500">
                   +{lastQuizResults.filter(r => r.isCorrect).length * 20}
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm">
                <div className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">Recipe Level</div>
                <div className="text-3xl font-serif text-orange-900">UP!</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <button 
                onClick={() => setView('library')}
                className="flex-1 bg-orange-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-colors shadow-lg"
              >
                Back to Library
              </button>
              <button 
                onClick={() => setView('dashboard')}
                className="flex-1 bg-orange-50 text-orange-900 py-4 rounded-2xl font-bold hover:bg-orange-100 transition-colors border border-orange-200 shadow-sm"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default App;
