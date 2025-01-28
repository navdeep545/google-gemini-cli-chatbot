import { GoogleGenerativeAI } from '@google/generative-ai';
import {getKey} from './config.js';

export const generateResponse = async (query) => {
    const apiKey = getKey();
    
    if (!apiKey) {
      throw new Error('API key not found. Please configure first.');
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(query);
      return result.response.text();
    } catch (error) {
      throw new Error(`API Error: ${error.message}`);
    }
  } ;