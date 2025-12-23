
import React, { useState } from 'react';
import { UserStats, Recipe, SRSItem, Challenge, Difficulty } from '../types';
import { BADGES, CHALLENGES } from '../constants';

interface DashboardProps {
  stats: UserStats;
  recipes: Recipe[];
  onStartQuiz: (recipe: Recipe, difficulty: Difficulty) => void;
  onStartReview: () => void;
  onStartChallenge: (challenge: Challenge) => void;
  onSetPreferredDifficulty: (diff: Difficulty) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  stats, 
  recipes, 
  onStartQuiz, 
  onStartReview, 
  onStartChallenge,
  onSetPreferredDifficulty
}) => {
  const [shareToast, setShareToast] = useState<string | null>(null);
  const lastRecipe = recipes.find(r => r.id === stats.lastCompletedRecipe) || recipes[0];
  
  const dueReviews = stats.srsItems.filter(item => {
    const nextReview = new Date(item.nextReviewDate);
    return nextReview <= new Date();
  });

  const handleRandomDrill = () => {
    const randomIdx = Math.floor(Math.random() * recipes.length);
    onStartQuiz(recipes[randomIdx], stats.preferredDifficulty);
  };

  const handleShareBadge = async (badge: typeof BADGES[0]) => {
    const shareText = `I just earned the "${badge.name}" badge on Dough Drills! 🍞🔥\n\n"${badge.description}"\n\nJoin me in mastering the art of baking!`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Dough Drills Achievement',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setShareToast(`Link for "${badge.name}" copied!`);
        setTimeout(() => setShareToast(null), 3000);
      } catch (err) {
        console.error('Clipboard error:', err);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-orange-900 text-white px-6 py-3 rounded-full shadow-2xl animate-in slide-in-from-bottom-4 font-bold text-sm">
          {shareToast}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-serif mb-2">Welcome Back, Baker!</h2>
            <p className="opacity-90 max-w-md">Your current skill level is set to <strong>{stats.preferredDifficulty}</strong>. Ready to drill?</p>
          </div>
          
          <div className="relative z-10 mt-8 flex flex-wrap gap-4">
            <button 
              onClick={() => onStartQuiz(lastRecipe, stats.preferredDifficulty)}
              className="bg-white text-orange-600 px-6 py-3 rounded-2xl font-bold hover:bg-orange-50 transition-colors shadow-lg"
            >
              Continue {lastRecipe.name}
            </button>
            <button 
              onClick={handleRandomDrill}
              className="bg-orange-950 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition-colors shadow-lg flex items-center gap-2"
            >
              🎲 Surprise Me: Random Drill
            </button>
          </div>

          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22,12C22,17.5 17.5,22 12,22C6.5,22 2,17.5 2,12C2,6.5 6.5,2 12,2C12,2 12,2.25 12,3C12,4.5 11,5.5 10,5.5C9,5.5 8,4.5 8,3C8,2.25 8,2 8,2C3.5,4 2,8.5 4,13C6,17.5 10.5,19 15,17C19.5,15 21,10.5 19,6C18.5,4.5 17.5,3.5 16,3C16,3 16,3.25 16,4C16,5.5 17,6.5 18,6.5C19,6.5 20,5.5 20,4C20,3.25 20,3 20,3C21.25,5.5 22,8.5 22,12Z" />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-full mb-6">
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-3">Your Skill Level</p>
            <div className="flex gap-1">
              {(['Beginner', 'Intermediate', 'Advanced'] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => onSetPreferredDifficulty(diff)}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all
                    ${stats.preferredDifficulty === diff 
                      ? 'bg-orange-500 text-white border-orange-500 shadow-sm' 
                      : 'bg-orange-50 text-orange-600 border-orange-100 hover:border-orange-200'}
                  `}
                >
                  {diff.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
          <div className="w-px h-8 bg-orange-100 my-2" />
          <div className="text-4xl font-serif text-orange-950 mb-1">{stats.streak}</div>
          <div className="text-orange-500 font-bold uppercase tracking-widest text-xs">Day Streak</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-serif text-orange-950">Active Challenges</h3>
            <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full animate-pulse font-bold">TIMED</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CHALLENGES.map(challenge => (
              <div key={challenge.id} className="bg-white border-2 border-orange-100 rounded-3xl p-6 hover:border-orange-500 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-serif text-orange-900 mb-1">{challenge.title}</h4>
                    <p className="text-sm text-gray-500">{challenge.description}</p>
                  </div>
                  <div className="text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full text-xs">
                    {challenge.timeLimit}s
                  </div>
                </div>
                <button 
                  onClick={() => onStartChallenge(challenge)}
                  className="w-full bg-orange-50 text-orange-600 py-3 rounded-xl font-bold group-hover:bg-orange-500 group-hover:text-white transition-all"
                >
                  Accept Challenge
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-serif text-orange-950 mb-6">Review Deck</h3>
          <div className="bg-white rounded-3xl border border-orange-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">Scheduled Items</span>
              <span className="text-orange-900 font-bold text-sm">
                {dueReviews.length > 0 ? `${dueReviews.length} items due!` : 'All clear!'}
              </span>
            </div>
            {dueReviews.length > 0 ? (
              <button 
                onClick={onStartReview}
                className="w-full mb-4 bg-red-50 text-red-600 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all border border-red-100"
              >
                Clear Review Queue
              </button>
            ) : null}
            <div className="space-y-2">
              {stats.srsItems.slice(0, 3).map((item, idx) => (
                <div key={idx} className="p-3 bg-orange-50 rounded-xl flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-orange-900 truncate max-w-[150px]">{item.recipeName}</span>
                    <span className="text-[10px] text-gray-500 italic truncate max-w-[200px]">{item.question.question}</span>
                  </div>
                  <div className="text-[10px] font-bold text-orange-600 bg-white px-2 py-1 rounded-full border border-orange-100">
                    {new Date(item.nextReviewDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {stats.srsItems.length === 0 && (
                <div className="text-center py-4 text-sm text-gray-400">
                  Mistakes will appear here for scheduled review.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <section>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-xl font-serif text-orange-950">Achievements</h3>
          <span className="text-orange-500 text-sm font-bold">{stats.badges.length} / {BADGES.length}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
          {BADGES.map(badge => {
            const earned = stats.badges.includes(badge.id);
            return (
              <div 
                key={badge.id} 
                className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all relative group overflow-hidden
                  ${earned ? 'bg-orange-50 border-orange-200 shadow-sm cursor-pointer' : 'bg-gray-50 border-gray-100 grayscale opacity-40 cursor-help'}
                `}
                onClick={() => earned && handleShareBadge(badge)}
              >
                <span className="text-3xl mb-2">{badge.icon}</span>
                <span className="text-[10px] font-bold text-orange-900 leading-tight">{badge.name}</span>
                
                {earned && (
                   <div className="absolute inset-0 bg-orange-600/90 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      <span className="text-[10px] font-bold">SHARE</span>
                   </div>
                )}

                {/* Tooltip for unearned */}
                {!earned && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    {badge.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
