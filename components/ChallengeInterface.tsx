
import React, { useState, useEffect, useRef } from 'react';
import { Challenge, Recipe, QuizQuestion, QuizResult } from '../types';
import { generateRecipeQuiz } from '../services/gemini';

interface ChallengeInterfaceProps {
  challenge: Challenge;
  recipes: Recipe[];
  onComplete: (score: number, timeBonus: number) => void;
  onExit: () => void;
}

const ChallengeInterface: React.FC<ChallengeInterfaceProps> = ({ challenge, recipes, onComplete, onExit }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  // Fix: Use ReturnType<typeof setInterval> instead of NodeJS.Timeout to avoid namespace errors in browser environments
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      const targetRecipes = recipes.filter(r => challenge.recipes.includes(r.id));
      const allQ: QuizQuestion[] = [];
      
      for (const recipe of targetRecipes) {
        const q = await generateRecipeQuiz(recipe, 'Intermediate');
        allQ.push(...q.slice(0, 3)); // 3 questions per recipe for blitz
      }
      
      setQuestions(allQ.sort(() => Math.random() - 0.5));
      setLoading(false);
      startTimer();
    };

    loadQuestions();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleGameOver = (timeUp: boolean) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsGameOver(true);
    const timeBonus = timeUp ? 0 : Math.floor(timeLeft * 2);
    onComplete(score, timeBonus);
  };

  const handleAnswerSubmit = (selectedAnswer?: string) => {
    if (isGameOver) return;
    
    const currentQ = questions[currentIndex];
    const answer = (selectedAnswer || userInput).trim();
    const isCorrect = answer.toLowerCase() === currentQ.correctAnswer.toLowerCase();

    if (isCorrect) {
      setScore(s => s + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
    } else {
      handleGameOver(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4" />
        <p className="text-orange-900 font-bold animate-pulse">PREPARING CHALLENGE: {challenge.title}...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-2xl border-4 border-orange-500 relative overflow-hidden">
      {/* Time Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
        <div 
          className={`h-full transition-all duration-1000 linear ${timeLeft < 10 ? 'bg-red-500' : 'bg-orange-500'}`}
          style={{ width: `${(timeLeft / challenge.timeLimit) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center mb-8">
        <button onClick={onExit} className="text-gray-400 hover:text-red-500 font-bold">EXIT</button>
        <div className={`text-3xl font-serif font-bold ${timeLeft < 10 ? 'text-red-600 animate-bounce' : 'text-orange-900'}`}>
          0:{timeLeft.toString().padStart(2, '0')}
        </div>
        <div className="text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full text-sm">
          SCORE: {score}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-[10px] font-bold text-orange-300 uppercase mb-1">
          <span>Progress</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="w-full bg-orange-50 h-2 rounded-full overflow-hidden">
          <div className="bg-orange-400 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h2 className="text-2xl font-serif text-orange-950 mb-8">{currentQ.question}</h2>

      <div className="space-y-4">
        {currentQ.type === 'multiple-choice' && currentQ.options?.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswerSubmit(opt)}
            className="w-full p-5 text-left rounded-2xl border-2 border-orange-100 hover:border-orange-500 hover:bg-orange-50 transition-all font-bold text-orange-900"
          >
            {opt}
          </button>
        ))}

        {(currentQ.type === 'fill-in-blank' || currentQ.type === 'free-response') && (
          <div className="space-y-4">
            <input
              autoFocus
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type fast!"
              className="w-full p-5 rounded-2xl border-2 border-orange-100 focus:border-orange-500 outline-none text-xl font-bold"
              onKeyDown={(e) => e.key === 'Enter' && userInput.trim() && handleAnswerSubmit()}
            />
            <button
              disabled={!userInput.trim()}
              onClick={() => handleAnswerSubmit()}
              className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 shadow-lg"
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeInterface;
