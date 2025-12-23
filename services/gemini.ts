
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, QuizQuestion, Difficulty } from "../types";

// Always use the named parameter and direct process.env.API_KEY reference
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRecipeQuiz = async (recipe: Recipe, difficulty: Difficulty): Promise<QuizQuestion[]> => {
  // Use a random seed concept in the prompt to encourage different questions every time
  const randomSeed = Math.floor(Math.random() * 1000000);
  
  const prompt = `
    Generate a 5-question baking quiz for the recipe: "${recipe.name}".
    Difficulty Level: ${difficulty}.
    Random Seed: ${randomSeed}.
    
    Recipe context: ${JSON.stringify(recipe)}.
    
    CRITICAL INSTRUCTIONS:
    1. STRICT DIFFICULTY ADHERENCE:
       - Beginner: Focus on identifying core ingredients, basic temperatures, and major steps. Use multiple-choice.
       - Intermediate: Focus on specific quantities (math/ratios), nuances of technique (e.g., "folding" vs "stirring"), and timing. Use fill-in-blank or complex multiple-choice.
       - Advanced: Focus on the chemistry/science (why does this rise?), troubleshooting, and precise baker's percentages. Use free-response and difficult scenarios.
    
    2. VARIETY:
       - Do not repeat questions from previous sessions. 
       - Randomize which parts of the recipe are tested (Ingredients, Steps, Temps, or Logic).
       - Vary the phrasing.

    Return the result strictly as a JSON array of objects following the specified schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['multiple-choice', 'fill-in-blank', 'free-response'] },
              question: { type: Type.STRING },
              correctAnswer: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Required for multiple-choice type"
              },
              hint: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["id", "type", "question", "correctAnswer", "explanation"]
          }
        }
      }
    });

    const quizText = response.text;
    if (!quizText) throw new Error("Failed to generate quiz");
    
    return JSON.parse(quizText);
  } catch (error) {
    console.error("Gemini Quiz Generation Error:", error);
    return [{
      id: 'fallback',
      type: 'multiple-choice',
      question: `What is the main flour used in ${recipe.name}?`,
      correctAnswer: recipe.ingredients[0].name,
      options: [recipe.ingredients[0].name, 'Cornstarch', 'Rice Flour', 'Buckwheat'],
      explanation: `${recipe.ingredients[0].name} provides the essential structure.`
    }];
  }
};

export const evaluateFreeResponse = async (userAnswer: string, correctAnswer: string, question: string): Promise<{ isCorrect: boolean; feedback: string }> => {
  const prompt = `
    Evaluate if this baking answer is correct using "fuzzy matching". 
    Question: "${question}"
    Correct Answer: "${correctAnswer}"
    User Answer: "${userAnswer}"
    
    If the meaning is essentially the same (e.g., "plain flour" vs "all-purpose flour", or minor spelling errors), mark it correct.
    Return JSON: { "isCorrect": boolean, "feedback": "string explanation" }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            feedback: { type: Type.STRING }
          },
          required: ["isCorrect", "feedback"]
        }
      }
    });
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    return { isCorrect: userAnswer.toLowerCase() === correctAnswer.toLowerCase(), feedback: "Standard validation applied." };
  }
};

export const generateDetailedFeedback = async (question: string, userAnswer: string, correctAnswer: string): Promise<string> => {
  const prompt = `
    The user got a baking question wrong.
    Question: "${question}"
    User's Wrong Answer: "${userAnswer}"
    Correct Answer: "${correctAnswer}"
    
    Explain briefly (2-3 sentences) why their answer might be a common mistake and reinforce the correct scientific or culinary concept. Be encouraging but educational.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Keep practicing the fundamentals!";
  } catch (error) {
    return "Incorrect answer. Re-check the recipe details to master this step!";
  }
};
