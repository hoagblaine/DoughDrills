
import React, { useState } from 'react';
import { Recipe, Ingredient, Step, Difficulty } from '../types';

interface RecipeEditorProps {
  onSave: (recipe: Recipe) => void;
  onCancel: () => void;
  initialRecipe?: Recipe;
}

const RecipeEditor: React.FC<RecipeEditorProps> = ({ onSave, onCancel, initialRecipe }) => {
  const [name, setName] = useState(initialRecipe?.name || '');
  const [category, setCategory] = useState<Recipe['category']>(initialRecipe?.category || 'Bread');
  const [difficulty, setDifficulty] = useState<Difficulty>(initialRecipe?.difficulty || 'Beginner');
  const [description, setDescription] = useState(initialRecipe?.description || '');
  const [bakeTemp, setBakeTemp] = useState(initialRecipe?.bakeTemp || '');
  const [bakeTime, setBakeTime] = useState(initialRecipe?.bakeTime || '');
  
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialRecipe?.ingredients || [
    { name: '', amount: '', unit: '', importance: '' }
  ]);
  
  const [steps, setSteps] = useState<Step[]>(initialRecipe?.steps || [
    { id: 1, text: '' }
  ]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: '', importance: '' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const addStep = () => {
    setSteps([...steps, { id: steps.length + 1, text: '' }]);
  };

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, id: i + 1 }));
    setSteps(newSteps);
  };

  const updateStep = (index: number, text: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], text };
    setSteps(newSteps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipe: Recipe = {
      id: initialRecipe?.id || `user-${Date.now()}`,
      name,
      category,
      difficulty,
      description,
      bakeTemp,
      bakeTime,
      ingredients: ingredients.filter(i => i.name.trim() !== ''),
      steps: steps.filter(s => s.text.trim() !== ''),
      isUserCreated: true
    };
    onSave(recipe);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-orange-950/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <form 
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        <div className="p-6 md:p-8 border-b border-orange-50 bg-orange-50/30 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif text-orange-950">Add Custom Recipe</h2>
            <p className="text-orange-600/70 text-sm">Create a recipe to drill and master.</p>
          </div>
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-orange-900 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-orange-900 uppercase tracking-widest mb-1">Recipe Name</label>
                <input required value={name} onChange={e => setName(e.target.value)} className="w-full p-3 rounded-xl border border-orange-100 focus:border-orange-500 outline-none" placeholder="e.g. Grandma's Apple Pie" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-orange-900 uppercase tracking-widest mb-1">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value as any)} className="w-full p-3 rounded-xl border border-orange-100 outline-none">
                    <option>Bread</option>
                    <option>Cakes</option>
                    <option>Cookies</option>
                    <option>Pastries</option>
                    <option>Pies</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-orange-900 uppercase tracking-widest mb-1">Difficulty</label>
                  <select value={difficulty} onChange={e => setDifficulty(e.target.value as any)} className="w-full p-3 rounded-xl border border-orange-100 outline-none">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-orange-900 uppercase tracking-widest mb-1">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 rounded-xl border border-orange-100 focus:border-orange-500 outline-none h-[115px]" placeholder="A short story or tip about this recipe..." />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-orange-900 uppercase tracking-widest mb-1">Bake Temp</label>
              <input value={bakeTemp} onChange={e => setBakeTemp(e.target.value)} className="w-full p-3 rounded-xl border border-orange-100 outline-none" placeholder="e.g. 180°C" />
            </div>
            <div>
              <label className="block text-xs font-bold text-orange-900 uppercase tracking-widest mb-1">Bake Time</label>
              <input value={bakeTime} onChange={e => setBakeTime(e.target.value)} className="w-full p-3 rounded-xl border border-orange-100 outline-none" placeholder="e.g. 30-35 mins" />
            </div>
          </div>

          <hr className="border-orange-50" />

          {/* Ingredients */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-xl text-orange-950">Ingredients</h3>
              <button type="button" onClick={addIngredient} className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full hover:bg-orange-100">+ Add Ingredient</button>
            </div>
            <div className="space-y-3">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex gap-2 items-start animate-in slide-in-from-left-2 duration-200">
                  <input required value={ing.name} onChange={e => updateIngredient(idx, 'name', e.target.value)} className="flex-[2] p-2 rounded-lg border border-orange-50 outline-none text-sm" placeholder="Ingredient name" />
                  <input required value={ing.amount} onChange={e => updateIngredient(idx, 'amount', e.target.value)} className="flex-1 p-2 rounded-lg border border-orange-50 outline-none text-sm" placeholder="Amt" />
                  <input required value={ing.unit} onChange={e => updateIngredient(idx, 'unit', e.target.value)} className="flex-1 p-2 rounded-lg border border-orange-50 outline-none text-sm" placeholder="Unit" />
                  <button type="button" onClick={() => removeIngredient(idx)} className="p-2 text-red-300 hover:text-red-500">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-xl text-orange-950">Steps</h3>
              <button type="button" onClick={addStep} className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full hover:bg-orange-100">+ Add Step</button>
            </div>
            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-3 items-start animate-in slide-in-from-left-2 duration-200">
                  <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">{idx + 1}</span>
                  <textarea required value={step.text} onChange={e => updateStep(idx, e.target.value)} className="flex-1 p-2 rounded-lg border border-orange-50 outline-none text-sm" placeholder="Describe this step..." />
                  <button type="button" onClick={() => removeStep(idx)} className="p-2 text-red-300 hover:text-red-500">✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-orange-50/30 flex justify-end gap-4">
          <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl font-bold text-orange-900 hover:bg-orange-100 transition-colors">Cancel</button>
          <button type="submit" className="px-8 py-3 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-100 transition-all">Save Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeEditor;
