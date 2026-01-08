import { useState, useEffect, useRef, useCallback } from "react";
import "./index.css";

// AI Service Simulation
const AIService = {
  async analyzeProblem(question) {
    // Simulate AI analysis with intelligent response
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Analyze question content
    const lowerQuestion = question.toLowerCase();
    let difficulty = "Easy";
    let topics = [];
    let strategy = "";
    
    // Detect problem type and difficulty
    if (lowerQuestion.includes("leetcode") || lowerQuestion.includes("hard")) {
      difficulty = "Hard";
    } else if (lowerQuestion.includes("medium") || question.length > 200) {
      difficulty = "Medium";
    }
    
    // Detect topics
    const topicKeywords = {
      "Array": ["array", "list", "collection", "elements", "index"],
      "String": ["string", "text", "character", "substring", "palindrome"],
      "Dynamic Programming": ["dynamic programming", "dp", "memoization", "recursive"],
      "Graph": ["graph", "node", "edge", "tree", "dfs", "bfs"],
      "Sorting": ["sort", "order", "arrange", "quick sort", "merge sort"],
      "Searching": ["search", "find", "binary search", "linear search"],
      "Math": ["math", "number", "prime", "fibonacci", "factorial"],
      "Hash Table": ["hash", "map", "dictionary", "key-value"],
      "Two Pointers": ["two pointer", "pointer", "left right"],
      "Greedy": ["greedy", "optimal", "local optimum"]
    };
    
    Object.entries(topicKeywords).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => lowerQuestion.includes(keyword))) {
        topics.push(topic);
      }
    });
    
    if (topics.length === 0) topics = ["General"];
    
    // Generate strategy based on detected topics
    if (topics.includes("Array")) {
      strategy = "Consider using two pointers or sliding window technique for array problems. Think about edge cases like empty array and single element.";
    } else if (topics.includes("String")) {
      strategy = "String manipulation often involves checking character properties. Consider using built-in string methods or regex patterns.";
    } else if (topics.includes("Dynamic Programming")) {
      strategy = "Identify overlapping subproblems. Consider bottom-up or top-down approach with memoization. Start with brute force and optimize.";
    } else {
      strategy = "Start by understanding input/output requirements. Break down the problem into smaller subproblems. Consider time and space constraints.";
    }
    
    // Generate examples based on problem
    const examples = [];
    if (lowerQuestion.includes("sum")) {
      examples.push({
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      });
    } else if (lowerQuestion.includes("palindrome")) {
      examples.push({
        input: "s = 'racecar'",
        output: "true",
        explanation: "'racecar' reads the same forward and backward."
      });
    }
    
    return {
      name: question.split('\n')[0].substring(0, 50) + "...",
      difficulty,
      topics: topics.slice(0, 3),
      strategy,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      examples: examples.length > 0 ? examples : [{
        input: "Input example",
        output: "Output example",
        explanation: "Sample explanation"
      }],
      constraints: ["1 <= n <= 10^4", "Array is non-empty"],
      hints: ["Think about edge cases first", "Consider using a helper function"]
    };
  },
  
  async generateHints(problem, code, language) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const codeAnalysis = this.analyzeCode(code, language);
    const lines = code.split('\n').length;
    const complexity = this.calculateCodeComplexity(code);
    
    let hints = [];
    
    // Phase 1: Basic hints for beginner code
    if (lines < 5 || code.length < 50) {
      hints = [
        {
          type: "conceptual",
          level: "beginner",
          message: "Start by defining the main function with proper parameters and return type.",
          icon: "🧠",
          priority: "high",
          suggestion: `Define function: ${language === 'python' ? 'def solution(input):' : language === 'javascript' ? 'function solution(input) {' : 'public int solution(int[] input) {'}`
        },
        {
          type: "syntax",
          level: "beginner",
          message: "Make sure to handle edge cases like empty input or null values.",
          icon: "📝",
          priority: "medium",
          suggestion: "Add input validation at the beginning of your function."
        }
      ];
    }
    // Phase 2: Intermediate hints
    else if (lines < 15 || code.length < 150) {
      hints = [
        {
          type: "optimization",
          level: "intermediate",
          message: "Consider time complexity. Can you solve it in O(n) instead of O(n²)?",
          icon: "⚡",
          priority: "high",
          suggestion: "Look for nested loops that might be unnecessary."
        },
        {
          type: "debugging",
          level: "intermediate",
          message: "Add print statements to trace variable values at critical points.",
          icon: "🐛",
          priority: "medium",
          suggestion: `Add debug: ${language === 'python' ? 'print(f"Current value: {variable}")' : 'console.log("Current value:", variable);'}`
        },
        {
          type: "best-practice",
          level: "intermediate",
          message: "Use meaningful variable names that describe their purpose.",
          icon: "⭐",
          priority: "low",
          suggestion: "Rename variables like 'temp' to more descriptive names."
        }
      ];
    }
    // Phase 3: Advanced hints
    else {
      hints = [
        {
          type: "optimization",
          level: "advanced",
          message: `Current complexity: ${complexity}. Consider alternative data structures for better performance.`,
          icon: "🚀",
          priority: "high",
          suggestion: "Consider using a HashSet/Dictionary for O(1) lookups."
        },
        {
          type: "architecture",
          level: "advanced",
          message: "Your solution could be more modular. Consider separating concerns.",
          icon: "🏗️",
          priority: "medium",
          suggestion: "Extract repeated logic into helper functions."
        },
        {
          type: "testing",
          level: "advanced",
          message: "Add test cases for edge scenarios like large inputs or negative numbers.",
          icon: "🧪",
          priority: "medium",
          suggestion: "Add boundary tests and stress tests."
        },
        {
          type: "security",
          level: "advanced",
          message: "Consider input validation and error handling for production.",
          icon: "🔒",
          priority: "low",
          suggestion: "Add input validation and appropriate error messages."
        }
      ];
    }
    
    // Add specific hints based on code patterns
    if (code.includes("for") && code.includes("for")) {
      hints.push({
        type: "optimization",
        level: "critical",
        message: "⚠️ Nested loops detected! This could be O(n²). Consider alternative approaches.",
        icon: "⚠️",
        priority: "critical",
        suggestion: "Use hash maps or sorting to avoid nested loops."
      });
    }
    
    if (code.includes("recursive") || code.toLowerCase().includes("recursion")) {
      hints.push({
        type: "optimization",
        level: "advanced",
        message: "Recursive solution detected. Consider adding memoization to avoid repeated calculations.",
        icon: "🔄",
        priority: "high",
        suggestion: "Add a cache/memo dictionary to store computed results."
      });
    }
    
    return hints.slice(0, 4); // Return max 4 hints
  },
  
  analyzeCode(code, language) {
    const lines = code.split('\n').length;
    const functions = (code.match(/function|def|public|private/g) || []).length;
    const comments = (code.match(/\/\/|#|\/\*/g) || []).length;
    const complexity = (code.match(/for|while|recursive|nested/g) || []).length;
    
    return {
      lines,
      functions,
      comments,
      complexity,
      readability: comments > lines * 0.1 ? "good" : "needs improvement",
      structure: functions > 0 ? "modular" : "monolithic"
    };
  },
  
  calculateCodeComplexity(code) {
    const loops = (code.match(/for|while/g) || []).length;
    const nested = code.includes("for") && code.includes("for") ? 2 : 1;
    
    if (loops > 3) return "O(n³) or worse";
    if (loops > 1) return "O(n²)";
    if (loops === 1) return "O(n)";
    return "O(1)";
  },
  
  async getCodeSuggestions(code, language) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const suggestions = [];
    
    // Check for common issues
    if (!code.includes("def ") && !code.includes("function ") && !code.includes("public ")) {
      suggestions.push({
        type: "structure",
        message: "Add a proper function definition",
        fix: language === 'python' ? "def solve(input):" : 
              language === 'javascript' ? "function solve(input) {" :
              "public int solve(int[] input) {"
      });
    }
    
    if (code.includes("print(") || code.includes("console.log")) {
      suggestions.push({
        type: "debugging",
        message: "Remove debug prints before final submission",
        fix: "// Remove debug statements"
      });
    }
    
    if (code.split('\n').length > 30) {
      suggestions.push({
        type: "refactoring",
        message: "Consider breaking down into smaller functions",
        fix: "Extract repeated logic into helper functions"
      });
    }
    
    return suggestions;
  },
  
  async runTests(code, language, testCases) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple test simulation
    const results = testCases.map((testCase, index) => {
      const passed = Math.random() > 0.3; // 70% pass rate for simulation
      return {
        id: index,
        input: testCase.input,
        expected: testCase.output,
        actual: passed ? testCase.output : "Failed",
        passed,
        executionTime: Math.random() * 100 + 50, // ms
        memory: Math.random() * 10 + 5 // MB
      };
    });
    
    const passed = results.filter(r => r.passed).length;
    const total = results.length;
    
    return {
      results,
      summary: {
        passed,
        total,
        successRate: (passed / total) * 100,
        averageTime: results.reduce((sum, r) => sum + r.executionTime, 0) / total,
        peakMemory: Math.max(...results.map(r => r.memory))
      }
    };
  }
};

export default function App() {
  // Core states
  const [question, setQuestion] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [problem, setProblem] = useState(null);
  const [hints, setHints] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingHints, setIsGeneratingHints] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [codeMetrics, setCodeMetrics] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [customTest, setCustomTest] = useState("");
  const [activeTab, setActiveTab] = useState("hints");
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState(14);
  const [autoSave, setAutoSave] = useState(true);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [collaborationMode, setCollaborationMode] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);

  const questionRef = useRef(null);
  const codeRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize with sample data for demo
  useEffect(() => {
    const sampleProblem = `Write a function to check if a number is even or odd.
    
    Input: integer n
    Output: boolean true if even, false if odd
    
    Example:
    Input: n = 15
    Output: false
    
    Input: n = 44
    Output: true`;
    
    const sampleCode = `def is_even(n):
    # finding remainder of n
    rem = n % 2
    if rem == 0:
        return True
    else:
        return False
    
if __name__ == "__main__":
    n = 15
    if is_even(n):
        print("true")
    else:
        print("false")`;
    
    setQuestion(sampleProblem);
    setCode(sampleCode);
    
    // Load from localStorage if available
    const savedQuestion = localStorage.getItem('rightpath_question');
    const savedCode = localStorage.getItem('rightpath_code');
    const savedLanguage = localStorage.getItem('rightpath_language');
    
    if (savedQuestion) setQuestion(savedQuestion);
    if (savedCode) setCode(savedCode);
    if (savedLanguage) setLanguage(savedLanguage);
    
    // Start analysis after a delay
    setTimeout(() => {
      handleQuestionChange(sampleProblem);
    }, 1000);
  }, []);

  // Auto-save feature
  useEffect(() => {
    if (autoSave) {
      const saveData = () => {
        localStorage.setItem('rightpath_question', question);
        localStorage.setItem('rightpath_code', code);
        localStorage.setItem('rightpath_language', language);
      };
      
      const debounceTimer = setTimeout(saveData, 2000);
      return () => clearTimeout(debounceTimer);
    }
  }, [question, code, language, autoSave]);

  // Calculate code metrics
  useEffect(() => {
    const calculateMetrics = () => {
      const lines = code.split('\n').length;
      const chars = code.length;
      const words = code.split(/\s+/).filter(w => w.length > 0).length;
      const functions = (code.match(/def |function |public |private /g) || []).length;
      const complexity = AIService.calculateCodeComplexity(code);
      
      setCodeMetrics({
        lines,
        chars,
        words,
        functions,
        complexity,
        lastUpdated: new Date().toLocaleTimeString()
      });
    };
    
    calculateMetrics();
  }, [code]);

  // Handle problem analysis
  const handleQuestionChange = useCallback(async (text) => {
    setQuestion(text);
    if (text.length < 10) {
      setProblem(null);
      setHints([]);
      return;
    }
    
    setIsAnalyzing(true);
    try {
      const analysis = await AIService.analyzeProblem(text);
      setProblem(analysis);
      setTestCases(analysis.examples || []);
      
      // Add to history
      setSessionHistory(prev => [{
        type: "analysis",
        content: `Analyzed: ${analysis.name}`,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  // Handle code changes with intelligent hint generation
  const handleCodeChange = useCallback(async (text) => {
    setCode(text);
    
    if (!problem || text.length < 20) {
      setHints([]);
      return;
    }
    
    setIsGeneratingHints(true);
    try {
      const newHints = await AIService.generateHints(problem, text, language);
      setHints(newHints);
      
      // Get code suggestions
      const codeSuggestions = await AIService.getCodeSuggestions(text, language);
      setSuggestions(codeSuggestions);
      
      // Add to history
      if (newHints.length > 0) {
        setSessionHistory(prev => [{
          type: "hints",
          content: `Generated ${newHints.length} hints`,
          timestamp: new Date().toLocaleTimeString()
        }, ...prev.slice(0, 9)]);
      }
    } catch (error) {
      console.error("Hints generation error:", error);
    } finally {
      setIsGeneratingHints(false);
    }
  }, [problem, language]);

  // Run tests
  const handleRunTests = async () => {
    if (!code || !problem) return;
    
    setIsTesting(true);
    try {
      const tests = [...testCases];
      if (customTest.trim()) {
        try {
          const testObj = JSON.parse(customTest);
          tests.push(testObj);
        } catch {
          // If not JSON, create simple test
          tests.push({
            input: customTest,
            output: "Expected output",
            explanation: "Custom test case"
          });
        }
      }
      
      const results = await AIService.runTests(code, language, tests);
      setTestResults(results);
      
      // Add to history
      setSessionHistory(prev => [{
        type: "testing",
        content: `Tests: ${results.summary.passed}/${results.summary.total} passed`,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error("Testing error:", error);
    } finally {
      setIsTesting(false);
    }
  };

  // Export code
  const handleExport = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution.${language === 'python' ? 'py' : language === 'javascript' ? 'js' : language === 'java' ? 'java' : 'cpp'}`;
    a.click();
  };

  // Import code
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setCode(e.target.result);
    };
    reader.readAsText(file);
  };

  // Format code
  const handleFormat = () => {
    // Simple formatting logic
    const formatted = code
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map((line, i) => {
        if (line.startsWith('if ') || line.startsWith('def ') || line.startsWith('function ')) {
          return '    ' + line;
        }
        return line;
      })
      .join('\n');
    
    setCode(formatted);
  };

  // Add test case
  const handleAddTest = () => {
    if (!customTest.trim()) return;
    
    const newTest = {
      input: customTest,
      output: "Expected output",
      explanation: "Custom test case"
    };
    
    setTestCases([...testCases, newTest]);
    setCustomTest("");
  };

  // Clear everything
  const handleClearAll = () => {
    setQuestion("");
    setCode("");
    setProblem(null);
    setHints([]);
    setSuggestions([]);
    setTestResults(null);
    setTestCases([]);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Calculate statistics
  const stats = codeMetrics || {
    lines: code.split('\n').length,
    chars: code.length,
    words: code.split(/\s+/).filter(w => w.length > 0).length,
    functions: 0,
    complexity: "O(1)"
  };

  return (
    <div className={`app ${theme}`}>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">⟁</span>
            <h1>RightPath Code Companion</h1>
            <span className="beta-badge">AI-Powered</span>
          </div>
          <div className="header-actions">
            <button className="btn btn-icon" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button className="btn btn-secondary" onClick={() => setShowTutorial(!showTutorial)}>
              {showTutorial ? 'Hide Tutorial' : 'Show Tutorial'}
            </button>
          </div>
        </div>
        
        <div className="header-right">
          <div className="status-indicators">
            <div className={`status ${isAnalyzing ? 'analyzing' : 'idle'}`}>
              {isAnalyzing ? '🔍 Analyzing...' : '✅ Ready'}
            </div>
            <div className={`status ${isGeneratingHints ? 'thinking' : 'idle'}`}>
              {isGeneratingHints ? '🤔 Thinking...' : '💡 Hints Ready'}
            </div>
            <div className="auto-save">
              <label>
                <input 
                  type="checkbox" 
                  checked={autoSave} 
                  onChange={(e) => setAutoSave(e.target.checked)}
                />
                Auto-save
              </label>
            </div>
          </div>
          
          <div className="header-buttons">
            <button className="btn btn-danger" onClick={handleClearAll}>
              Clear All
            </button>
            <button className="btn btn-primary" onClick={handleExport}>
              Export
            </button>
            <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>
              Import
            </button>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImport}
              accept=".py,.js,.java,.cpp,.txt"
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </header>

      {/* Tutorial Banner */}
      {showTutorial && (
        <div className="tutorial-banner">
          <div className="tutorial-content">
            <p>💡 <strong>How to use:</strong> 1) Paste problem statement 2) Write code 3) Get AI hints 4) Test your solution</p>
            <button className="btn btn-small" onClick={() => setShowTutorial(false)}>Got it!</button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        <div className="layout">
          {/* Left Panel - Problem */}
          <section className="panel problem-panel">
            <div className="panel-header">
              <h2>📋 PROBLEM STATEMENT</h2>
              <div className="panel-actions">
                {problem && (
                  <span className="badge analyzed">✓ Analyzed</span>
                )}
                {isAnalyzing && (
                  <span className="loading">Analyzing...</span>
                )}
              </div>
            </div>
            
            <div className="panel-content">
              <textarea
                ref={questionRef}
                className="problem-input"
                placeholder="Paste your coding problem here (min 10 chars for AI analysis)..."
                value={question}
                onChange={(e) => handleQuestionChange(e.target.value)}
                rows={10}
              />
              
              <div className="input-stats">
                <span className={`stat ${question.length >= 10 ? 'good' : 'warning'}`}>
                  {question.length} chars
                </span>
                {question.length > 0 && question.length < 10 && (
                  <span className="hint">Add {10 - question.length} more chars for analysis</span>
                )}
              </div>

              {problem && (
                <div className="problem-analysis">
                  <div className="problem-title">
                    <h3>{problem.name}</h3>
                    <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  
                  <div className="topics">
                    <strong>Topics:</strong>
                    <div className="topic-tags">
                      {problem.topics.map((topic, i) => (
                        <span key={i} className="topic-tag">{topic}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="strategy">
                    <strong>Strategy:</strong>
                    <p>{problem.strategy}</p>
                  </div>
                  
                  <div className="examples">
                    <strong>Examples:</strong>
                    {problem.examples.map((example, i) => (
                      <div key={i} className="example">
                        <div className="example-input">
                          <strong>Input:</strong> {example.input}
                        </div>
                        <div className="example-output">
                          <strong>Output:</strong> {example.output}
                        </div>
                        {example.explanation && (
                          <div className="example-explanation">
                            <strong>Explanation:</strong> {example.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="complexity">
                    <div className="complexity-item">
                      <strong>Time:</strong> <code>{problem.timeComplexity}</code>
                    </div>
                    <div className="complexity-item">
                      <strong>Space:</strong> <code>{problem.spaceComplexity}</code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Center Panel - Code Editor */}
          <section className="panel editor-panel">
            <div className="panel-header">
              <div className="editor-header">
                <h2>💻 YOUR SOLUTION</h2>
                <div className="editor-controls">
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="language-select"
                  >
                    <option value="python">🐍 Python</option>
                    <option value="javascript">⚡ JavaScript</option>
                    <option value="java">☕ Java</option>
                    <option value="cpp">⚙️ C++</option>
                  </select>
                  
                  <button className="btn btn-small" onClick={handleFormat} disabled={!code}>
                    Format
                  </button>
                  
                  <div className="font-control">
                    <button className="btn-icon" onClick={() => setFontSize(f => Math.max(12, f - 1))}>A-</button>
                    <span>{fontSize}px</span>
                    <button className="btn-icon" onClick={() => setFontSize(f => Math.min(24, f + 1))}>A+</button>
                  </div>
                </div>
              </div>
              
              <div className="code-stats">
                <div className="stat">
                  <span className="stat-label">Lines:</span>
                  <span className="stat-value">{stats.lines}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Chars:</span>
                  <span className="stat-value">{stats.chars}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Complexity:</span>
                  <span className="stat-value complexity">{stats.complexity}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Functions:</span>
                  <span className="stat-value">{stats.functions}</span>
                </div>
              </div>
            </div>
            
            <div className="panel-content">
              <div className="editor-container">
                <textarea
                  ref={codeRef}
                  className="code-editor"
                  style={{ fontSize: `${fontSize}px` }}
                  placeholder={`Start coding your solution in ${language}...\n(AI hints will appear after 20+ characters)`}
                  value={code}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  spellCheck="false"
                />
                
                <div className="editor-overlay">
                  <div className="language-badge">
                    {language === 'python' && '🐍'}
                    {language === 'javascript' && '⚡'}
                    {language === 'java' && '☕'}
                    {language === 'cpp' && '⚙️'}
                    <span>{language}</span>
                  </div>
                  
                  {code.length < 20 && code.length > 0 && (
                    <div className="progress-overlay">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${(code.length / 20) * 100}%` }}
                        />
                      </div>
                      <span>{20 - code.length} more chars for AI hints</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="editor-actions">
                <div className="action-group">
                  <button 
                    className="btn btn-success" 
                    onClick={handleRunTests}
                    disabled={!code || !problem || isTesting}
                  >
                    {isTesting ? '🔄 Testing...' : '▶️ Run Tests'}
                  </button>
                  
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setActiveTab(activeTab === 'hints' ? 'suggestions' : 'hints')}
                  >
                    {activeTab === 'hints' ? '💡 Show Suggestions' : '✨ Show Hints'}
                  </button>
                </div>
                
                <div className="action-group">
                  <input
                    type="text"
                    className="test-input"
                    placeholder="Add custom test case..."
                    value={customTest}
                    onChange={(e) => setCustomTest(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTest()}
                  />
                  <button className="btn btn-small" onClick={handleAddTest}>
                    Add Test
                  </button>
                </div>
              </div>
              
              {/* Suggestions Panel */}
              {activeTab === 'suggestions' && suggestions.length > 0 && (
                <div className="suggestions-panel">
                  <h4>💡 Code Suggestions</h4>
                  {suggestions.map((suggestion, i) => (
                    <div key={i} className="suggestion">
                      <div className="suggestion-header">
                        <span className="suggestion-type">{suggestion.type}</span>
                        <button 
                          className="btn btn-small"
                          onClick={() => {
                            // Apply suggestion logic would go here
                            alert(`Apply: ${suggestion.fix}`);
                          }}
                        >
                          Apply
                        </button>
                      </div>
                      <p>{suggestion.message}</p>
                      <code className="suggestion-fix">{suggestion.fix}</code>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Right Panel - AI Mentor */}
          <section className="panel mentor-panel">
            <div className="panel-header">
              <div className="mentor-header">
                <h2>🤖 AI MENTOR</h2>
                <div className="mentor-status">
                  {isGeneratingHints ? (
                    <span className="thinking">🤔 Generating hints...</span>
                  ) : hints.length > 0 ? (
                    <span className="ready">✅ {hints.length} hints ready</span>
                  ) : null}
                </div>
              </div>
              
              <div className="mentor-tabs">
                <button 
                  className={`tab ${activeTab === 'hints' ? 'active' : ''}`}
                  onClick={() => setActiveTab('hints')}
                >
                  Hints
                </button>
                <button 
                  className={`tab ${activeTab === 'tests' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tests')}
                >
                  Tests
                </button>
                <button 
                  className={`tab ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveTab('history')}
                >
                  History
                </button>
              </div>
            </div>
            
            <div className="panel-content">
              {/* Hints Tab */}
              {activeTab === 'hints' && (
                <div className="hints-container">
                  {hints.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">💡</div>
                      <h3>Waiting for your code</h3>
                      <p>
                        {problem 
                          ? `Write at least 20 characters of ${language} code to get AI-powered hints`
                          : "First, paste and analyze a problem statement"}
                      </p>
                    </div>
                  ) : (
                    <>
                      {hints.map((hint, i) => (
                        <div key={i} className={`hint-card ${hint.priority}`}>
                          <div className="hint-header">
                            <span className="hint-icon">{hint.icon}</span>
                            <span className="hint-type">{hint.type}</span>
                            <span className={`hint-level ${hint.level}`}>{hint.level}</span>
                            {hint.priority === 'critical' && (
                              <span className="priority-badge">⚠️ Critical</span>
                            )}
                          </div>
                          <p className="hint-message">{hint.message}</p>
                          {hint.suggestion && (
                            <div className="hint-suggestion">
                              <strong>Suggestion:</strong> 
                              <code>{hint.suggestion}</code>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <div className="mentor-tips">
                        <h4>💡 Pro Tips:</h4>
                        <ul>
                          <li>Start with brute force, then optimize</li>
                          <li>Test edge cases thoroughly</li>
                          <li>Consider time & space complexity trade-offs</li>
                          <li>Use meaningful variable names</li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {/* Tests Tab */}
              {activeTab === 'tests' && (
                <div className="tests-container">
                  <div className="test-results-header">
                    <h3>Test Results</h3>
                    {testResults && (
                      <div className="test-summary">
                        <span className={`summary ${testResults.summary.successRate >= 80 ? 'success' : 'warning'}`}>
                          {testResults.summary.passed}/{testResults.summary.total} passed
                        </span>
                        <span className="summary">Avg: {testResults.summary.averageTime.toFixed(1)}ms</span>
                      </div>
                    )}
                  </div>
                  
                  {testResults ? (
                    <div className="test-results">
                      {testResults.results.map((result, i) => (
                        <div key={i} className={`test-result ${result.passed ? 'passed' : 'failed'}`}>
                          <div className="test-header">
                            <span className="test-id">Test #{i + 1}</span>
                            <span className={`test-status ${result.passed ? 'passed' : 'failed'}`}>
                              {result.passed ? '✅ Passed' : '❌ Failed'}
                            </span>
                          </div>
                          <div className="test-details">
                            <div><strong>Input:</strong> {result.input}</div>
                            <div><strong>Expected:</strong> {result.expected}</div>
                            {!result.passed && (
                              <div><strong>Actual:</strong> {result.actual}</div>
                            )}
                            <div className="test-metrics">
                              <span>Time: {result.executionTime.toFixed(1)}ms</span>
                              <span>Memory: {result.memory.toFixed(1)}MB</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">🧪</div>
                      <h3>No tests run yet</h3>
                      <p>Click "Run Tests" to execute your code against test cases</p>
                    </div>
                  )}
                  
                  <div className="test-cases">
                    <h4>Test Cases</h4>
                    {testCases.map((testCase, i) => (
                      <div key={i} className="test-case">
                        <div className="test-case-header">
                          <span>Case #{i + 1}</span>
                          <button 
                            className="btn-icon"
                            onClick={() => setTestCases(tc => tc.filter((_, idx) => idx !== i))}
                          >
                            ✕
                          </button>
                        </div>
                        <div><strong>Input:</strong> {testCase.input}</div>
                        <div><strong>Output:</strong> {testCase.output}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* History Tab */}
              {activeTab === 'history' && (
                <div className="history-container">
                  <h3>Session History</h3>
                  {sessionHistory.length === 0 ? (
                    <div className="empty-state">
                      <p>No history yet. Start coding!</p>
                    </div>
                  ) : (
                    <div className="history-list">
                      {sessionHistory.map((item, i) => (
                        <div key={i} className="history-item">
                          <span className="history-type">{item.type === 'analysis' ? '🔍' : item.type === 'hints' ? '💡' : '🧪'}</span>
                          <span className="history-content">{item.content}</span>
                          <span className="history-time">{item.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="ai-status">
              {isAnalyzing || isGeneratingHints ? '🤖 AI Processing...' : '🤖 AI Ready'}
            </span>
            <span className="connection-status connected">
              ● Connected
            </span>
          </div>
          
          <div className="footer-center">
            <span className="stats">
              {problem ? `Problem: ${problem.name}` : 'No problem analyzed'}
            </span>
          </div>
          
          <div className="footer-right">
            <span className="code-stats-footer">
              {codeMetrics ? 
                `${codeMetrics.lines} lines • ${codeMetrics.chars} chars • ${codeMetrics.complexity}` :
                'No code'
              }
            </span>
            <button 
              className="btn btn-small"
              onClick={() => setCollaborationMode(!collaborationMode)}
            >
              {collaborationMode ? '👥 Collaborating' : '👥 Share'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}