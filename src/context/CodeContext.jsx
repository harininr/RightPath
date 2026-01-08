import { createContext, useContext, useState } from 'react';

const CodeContext = createContext();

export function CodeProvider({ children }) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [savedSessions, setSavedSessions] = useState([]);

  const runCode = async (codeToRun, lang) => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    try {
      // Simulate API call to code execution service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock execution results
      const mockOutputs = {
        javascript: `> Code executed successfully!
> Output: [0, 1]
> Execution time: 45ms
> Memory used: 12.5MB`,
        python: `>>> Code executed successfully!
>>> Output: [0, 1]
>>> Execution time: 38ms`,
        java: `Code compiled and executed successfully!
Output: [0, 1]
Execution time: 120ms`,
        cpp: `Program executed successfully!
Output: [0, 1]
Execution time: 15ms`
      };
      
      setOutput(mockOutputs[lang] || mockOutputs.javascript);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const saveSession = (name) => {
    const session = {
      id: Date.now(),
      name,
      code,
      language,
      timestamp: new Date().toISOString()
    };
    setSavedSessions(prev => [...prev, session]);
  };

  const value = {
    code,
    setCode,
    language,
    setLanguage,
    output,
    setOutput,
    isRunning,
    runCode,
    savedSessions,
    saveSession
  };

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
}

export function useCode() {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error('useCode must be used within CodeProvider');
  }
  return context;
}