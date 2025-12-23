
import React, { useState } from 'react';
import { Recipe, Difficulty } from '../types';

interface RecipeLibraryProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe, difficulty: Difficulty) => void;
  onAddRecipe: () => void;
  onDeleteRecipe?: (id: string) => void;
}

const RecipeLibrary: React.FC<RecipeLibraryProps> = ({ recipes, onSelectRecipe, onAddRecipe, onDeleteRecipe }) => {
  const [filter, setFilter] = useState<Recipe['category'] | 'All' | 'My Recipes'>('All');
  const categories: ('All' | 'My Recipes' | Recipe['category'])[] = ['All', 'My Recipes', 'Bread', 'Cakes', 'Cookies', 'Pastries', 'Pies'];

  const filteredRecipes = filter === 'All' 
    ? recipes 
    : filter === 'My Recipes' 
      ? recipes.filter(r => r.isUserCreated)
      : recipes.filter(r => r.category === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-serif text-orange-950">Recipe Library</h2>
          <p className="text-gray-500">Select a recipe to start your memory drill.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={onAddRecipe}
            className="bg-orange-600 text-white px-5 py-2.5 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 flex items-center gap-2 text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add My Own
          </button>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all border
                  ${filter === cat 
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-100' 
                    : 'bg-white text-orange-900 border-orange-100 hover:border-orange-300'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map(recipe => (
          <div 
            key={recipe.id}
            className={`group bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col
              ${recipe.isUserCreated ? 'border-orange-300' : 'border-orange-100'}
            `}
          >
            <div className="h-48 bg-orange-50 relative overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${recipe.id}/600/400`} 
                alt={recipe.name}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm
                  ${recipe.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : 
                    recipe.difficulty === 'Intermediate' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}
                `}>
                  {recipe.difficulty}
                </span>
                {recipe.isUserCreated && (
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                    Personal
                  </span>
                )}
              </div>
              
              {recipe.isUserCreated && onDeleteRecipe && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onDeleteRecipe(recipe.id); }}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-red-500 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              )}
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">{recipe.category}</span>
              <h3 className="text-xl font-serif text-orange-950 mb-2">{recipe.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-6">{recipe.description}</p>
              
              <div className="mt-auto space-y-3">
                <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                  <div className="flex items-center gap-1">
                    <span>⏱ {recipe.bakeTime || 'Var.'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🌡 {recipe.bakeTemp || 'Var.'}</span>
                  </div>
                </div>

                <div className="pt-4 grid grid-cols-3 gap-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as Difficulty[]).map(diff => (
                    <button
                      key={diff}
                      onClick={() => onSelectRecipe(recipe, diff)}
                      className={`text-[10px] py-2 rounded-lg font-bold border transition-all
                        ${diff === 'Beginner' ? 'hover:bg-green-500 hover:text-white border-green-100 text-green-600' :
                          diff === 'Intermediate' ? 'hover:bg-orange-500 hover:text-white border-orange-100 text-orange-600' :
                          'hover:bg-red-500 hover:text-white border-red-100 text-red-600'}
                      `}
                    >
                      {diff.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredRecipes.length === 0 && (
        <div className="text-center py-20 bg-orange-50/50 rounded-3xl border-2 border-dashed border-orange-100">
          <p className="text-orange-900 font-serif text-xl mb-2">No recipes found in this category.</p>
          <button onClick={onAddRecipe} className="text-orange-600 font-bold hover:underline">Add your first custom recipe!</button>
        </div>
      )}
    </div>
  );
};

export default RecipeLibrary;
