
import React, { useState, useEffect } from 'react';
import { Recipe, QuizQuestion, Difficulty, QuizResult } from '../types';
import { generateRecipeQuiz, evaluateFreeResponse, generateDetailedFeedback } from '../services/gemini';

interface QuizInterfaceProps {
  recipe: Recipe;
  difficulty: Difficulty;
  onComplete: (results: QuizResult[]) => void;
  onExit: () => void;
  reviewQuestions?: QuizQuestion[]; // For SRS review mode
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ recipe, difficulty, onComplete, onExit, reviewQuestions }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(!reviewQuestions);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; feedback: string } | null>(null);
  const [detailedInsight, setDetailedInsight] = useState<string | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);

  useEffect(() => {
    if (reviewQuestions) {
      setQuestions(reviewQuestions);
      setLoading(false);
    } else {
      const loadQuiz = async () => {
        const q = await generateRecipeQuiz(recipe, difficulty);
        setQuestions(q);
        setLoading(false);
      };
      loadQuiz();
    }
  }, [recipe, difficulty, reviewQuestions]);

  const handleAnswerSubmit = async (selectedAnswer?: string) => {
    const currentQ = questions[currentIndex];
    const answer = (selectedAnswer || userInput).trim();
    
    setIsEvaluating(true);
    let result = { isCorrect: false, feedback: '' };

    if (currentQ.type === 'free-response') {
      const evaluation = await evaluateFreeResponse(answer, currentQ.correctAnswer, currentQ.question);
      result = { isCorrect: evaluation.isCorrect, feedback: evaluation.feedback };
    } else {
      const isCorrect = answer.toLowerCase() === currentQ.correctAnswer.toLowerCase();
      result = { isCorrect, feedback: isCorrect ? 'Perfect!' : `The correct answer was: ${currentQ.correctAnswer}` };
    }

    setFeedback(result);
    setResults(prev => [...prev, { question: currentQ, isCorrect: result.isCorrect }]);
    setShowExplanation(true);
    setIsEvaluating(false);

    if (reviewQuestions && !result.isCorrect) {
      setIsGeneratingFeedback(true);
      const insight = await generateDetailedFeedback(currentQ.question, answer || "No answer provided", currentQ.correctAnswer);
      setDetailedInsight(insight);
      setIsGeneratingFeedback(false);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setFeedback(null);
      setDetailedInsight(null);
      setShowExplanation(false);
    } else {
      onComplete(results);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4" />
        <p className="text-orange-900 font-medium animate-pulse">Gemini is whisking up your quiz questions...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-orange-100">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onExit} className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
           ✕ Exit Quiz
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-orange-400 uppercase tracking-widest">Question {currentIndex + 1} / {questions.length}</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="w-full bg-orange-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-orange-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-serif text-orange-950 mb-6">{currentQ.question}</h2>

      <div className="space-y-4 mb-8">
        {currentQ.type === 'multiple-choice' && currentQ.options?.map((opt, i) => (
          <button
            key={i}
            disabled={showExplanation}
            onClick={() => {
              setUserInput(opt);
              handleAnswerSubmit(opt);
            }}
            className={`w-full p-4 text-left rounded-2xl border-2 transition-all flex justify-between items-center
              ${feedback && opt === currentQ.correctAnswer ? 'border-green-500 bg-green-50 text-green-900' : ''}
              ${feedback && feedback.isCorrect === false && userInput === opt ? 'border-red-500 bg-red-50 text-red-900' : ''}
              ${!feedback ? 'border-orange-50 hover:border-orange-300 hover:bg-orange-50 text-gray-700' : ''}
            `}
          >
            <span className="font-medium">{opt}</span>
            {feedback && opt === currentQ.correctAnswer && <span className="text-green-600 font-bold">✓</span>}
            {feedback && !feedback.isCorrect && userInput === opt && <span className="text-red-600 font-bold">✕</span>}
          </button>
        ))}

        {(currentQ.type === 'fill-in-blank' || currentQ.type === 'free-response') && (
          <div className="space-y-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={showExplanation || isEvaluating}
              placeholder="Type your answer here..."
              className="w-full p-4 rounded-2xl border-2 border-orange-100 focus:border-orange-500 outline-none transition-all text-lg"
              onKeyDown={(e) => e.key === 'Enter' && userInput.trim() && handleAnswerSubmit()}
            />
            {!showExplanation && (
              <button
                disabled={!userInput.trim() || isEvaluating}
                onClick={() => handleAnswerSubmit()}
                className={`w-full py-4 rounded-2xl font-bold text-white transition-all
                  ${!userInput.trim() || isEvaluating ? 'bg-orange-200 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200'}
                `}
              >
                {isEvaluating ? 'Evaluating...' : 'Submit Answer'}
              </button>
            )}
          </div>
        )}
      </div>

      {showExplanation && (
        <div className={`p-6 rounded-2xl mb-8 animate-in slide-in-from-bottom-4 border-l-4
          ${feedback?.isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}
        `}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className={`font-bold text-lg ${feedback?.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {feedback?.isCorrect ? '✨ Perfect!' : '🥧 Not quite...'}
              </p>
              <p className="text-gray-700 text-sm mt-1">{feedback?.feedback}</p>
            </div>
          </div>

          {!feedback?.isCorrect && (
            <div className="mt-4 pt-4 border-t border-red-100">
              <h4 className="text-xs font-bold text-red-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Baker's Insight
              </h4>
              {isGeneratingFeedback ? (
                <div className="flex items-center gap-2 text-red-400 text-xs animate-pulse">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" />
                  Analyzing the dough...
                </div>
              ) : (
                <p className="text-gray-800 text-sm italic leading-relaxed">
                  "{detailedInsight || currentQ.explanation}"
                </p>
              )}
            </div>
          )}

          {feedback?.isCorrect && (
            <p className="text-gray-600 text-sm mt-4 italic border-t border-green-100 pt-4">
              {currentQ.explanation}
            </p>
          )}

          <button
            onClick={nextQuestion}
            disabled={isGeneratingFeedback}
            className="w-full mt-6 bg-orange-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50"
          >
            {currentIndex === questions.length - 1 ? 'Finish Session' : 'Next Question →'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizInterface;
