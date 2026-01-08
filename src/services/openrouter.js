const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export const analyzeCodeWithAI = async (code, language, problemContext) => {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key not found');
  }
  
  const prompt = `Analyze this ${language} code for the problem: ${problemContext}

  CODE:
  \`\`\`${language}
  ${code}
  \`\`\`

  Provide:
  1. Is the approach correct?
  2. Any bugs or issues?
  3. Suggestions for improvement
  4. Time/space complexity
  
  Keep response concise and helpful.`;
  
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'CodeCompanion'
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert coding assistant. Analyze code and provide helpful feedback."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API Error:', error);
    throw error;
  }
};

export const generateCodeWithAI = async (problemDescription, language) => {
  const prompt = `Generate a ${language} solution for this problem:

  ${problemDescription}

  Provide clean, well-commented code with proper function signature and edge case handling.`;
  
  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'CodeCompanion'
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert programmer. Generate clean, correct code."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    })
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
};

export const debugCodeWithAI = async (code, language) => {
  const prompt = `Debug this ${language} code:

  \`\`\`${language}
  ${code}
  \`\`\`

  Identify bugs and provide corrected code.`;
  
  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'CodeCompanion'
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a debugging expert. Find and fix code issues."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    })
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
};

export const checkApiConnection = async () => {
  if (!OPENROUTER_API_KEY) return false;
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'CodeCompanion'
      }
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};