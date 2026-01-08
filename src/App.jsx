import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Play, Save, Bot, Zap, Code2, Lightbulb, Bug, Rocket,
  Home, BookOpen, Trophy, Settings, HelpCircle, TrendingUp, Users,
  Menu, Search, Bell, User, ChevronRight, Sparkles,
  CheckCircle, AlertCircle, Clock, Cpu, Terminal, Copy, RefreshCw
} from 'lucide-react';
import './index.css';
import Login from "./pages/Login";
import Signup from "./pages/Signup";


// ========== COMPONENTS ==========

function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button 
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={20} />
        </button>
        <div className="nav-logo">
          <span className="logo-icon">⟁</span>
          <span className="logo-text">RightPath</span>
        </div>
      </div>
      
      <div className="nav-center">
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search..."
          />
        </div>
      </div>
      
      
    </nav>
  );
}

function Sidebar({ isOpen }) {
  if (!isOpen) return null;
  
  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Code2 size={20} />, label: 'Editor', path: '/editor' },
  ];
  
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h3 className="sidebar-title">Navigation</h3>
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path}
                  className="nav-item"
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <ChevronRight size={16} className="chevron" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
                
        <div className="sidebar-section">
          <h3 className="sidebar-title">AI Stats</h3>
          <div className="ai-stats">
            <div className="stat-item">
              <span className="stat-label">Code Analyzed</span>
              <span className="stat-value">1,247</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Bugs Found</span>
              <span className="stat-value">89</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Time Saved</span>
              <span className="stat-value">42h</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ========== PAGES ==========

function Dashboard() {
  const [stats, setStats] = useState({
    problemsSolved: 24,
    streakDays: 7,
    accuracy: 85,
    timeSpent: 42
  });

  const recentProblems = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', solved: true, time: '15 min' },
    { id: 2, title: 'Palindrome', difficulty: 'Easy', solved: true, time: '10 min' },
    { id: 3, title: 'Merge Sort', difficulty: 'Medium', solved: false, time: '25 min' },
  ];

  const achievements = [
    { title: 'First Blood', desc: 'Solved your first problem' },
    { title: 'Week Warrior', desc: '7-day coding streak' },
    { title: 'Code Master', desc: 'Solved 20+ problems'},
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1> Welcome back, Coder!</h1>
        <p>Ready to level up your coding skills today?</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <h3>{stats.problemsSolved}</h3>
            <p>Problems Solved</p>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <h3>{stats.streakDays} days</h3>
            <p>Coding Streak</p>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <h3>{stats.accuracy}%</h3>
            <p>Accuracy</p>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <h3>{stats.timeSpent}h</h3>
            <p>Time Spent</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <Link to="/editor" className="action-btn">
              <Code2 size={20} />
              <span>Start Coding</span>
            </Link>
            <Link to="/problems" className="action-btn">
              <BookOpen size={20} />
              <span>Browse Problems</span>
            </Link>
            <Link to="/learn" className="action-btn">
              <Lightbulb size={20} />
              <span>Learn Concepts</span>
            </Link>
            <Link to="/challenges" className="action-btn">
              <Trophy size={20} />
              <span>Take Challenge</span>
            </Link>
          </div>
        </div>

        <div className="card">
          <h3>Recent Problems</h3>
          <div className="problems-list">
            {recentProblems.map(problem => (
              <div key={problem.id} className="problem-item">
                <div className="problem-info">
                  <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                  <h4>{problem.title}</h4>
                </div>
                <div className="problem-status">
                  {problem.solved ? (
                    <span className="solved">✓ Solved</span>
                  ) : (
                    <span className="unsolved">Continue</span>
                  )}
                  <span className="time">{problem.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Achievements</h3>
          <div className="achievements-list">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-content">
                  <h4>{achievement.title}</h4>
                  <p>{achievement.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>AI Insights</h3>
          <div className="ai-insights">
            <div className="insight">
              <Sparkles size={20} />
              <p>Your code quality has improved by 25% this week!</p>
            </div>
            <div className="insight">
              <TrendingUp size={20} />
              <p>You're solving Medium problems 40% faster than last month.</p>
            </div>
            <div className="insight">
              <Bot size={20} />
              <p>Try a "Graph" problem next to expand your skills.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Editor({ user }) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [aiThinking, setAiThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [question, setQuestion] = useState('');
  const [problemType, setProblemType] = useState('');
  const [isAnalyzingQuestion, setIsAnalyzingQuestion] = useState(false);
  const [pathCheck, setPathCheck] = useState(null);
  

  const requestApiKey = () => {
  const key = prompt('Enter your OpenRouter API key (not stored)');
  if (!key) return;
  setApiKey(key);
};

  // Real-time path checking
  useEffect(() => {
    if (code.length > 50 && question && !aiThinking) {
      const timer = setTimeout(() => {
        checkIfOnRightPath();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [code, question]);

  const analyzeQuestion = async () => {
    if (!question.trim() || !apiKey) return;
    
    setIsAnalyzingQuestion(true);
    try {
      // Call OpenRouter API to analyze problem type
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: `Analyze this coding problem and identify: 
            1. Problem type (Array, String, DP, Graph, etc.)
            2. Difficulty level
            3. Key concepts needed
            4. Common approaches
            
            Problem: ${question}`
          }],
          temperature: 0.7,
          max_tokens: 500
        })
      });
      
      const data = await response.json();
      const analysis = data.choices[0].message.content;
      
      // Extract problem type
      const types = ['Array', 'String', 'Dynamic Programming', 'Graph', 'Tree', 'Linked List', 'Hash Table', 'Two Pointers', 'Sliding Window', 'Binary Search', 'Backtracking'];
      const detectedType = types.find(type => analysis.includes(type)) || 'General';
      
      setProblemType(detectedType);
      setAiResponse(`## 🔍 Problem Analysis\n\n${analysis}\n\n**Detected Type:** ${detectedType}\n\n**AI is now ready to guide your solution!**`);
      setActiveTab('ai');
      
    } catch (error) {
      console.error('Question analysis failed:', error);
      setProblemType('General');
      setAiResponse('## ⚡ Ready to Code!\n\nAI will guide you as you code. Paste your problem above and start coding!');
    } finally {
      setIsAnalyzingQuestion(false);
    }
  };

  const checkIfOnRightPath = async () => {
    if (!question || !code.trim() || !apiKey) return;
    
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: `Problem: ${question}
            
            User's current code (${language}):
            ${code}
            
            Is the user on the right path? Provide:
            1. ✅ Correct aspects
            2. ⚠️ Warnings if going wrong direction
            3. 🎯 Next immediate step
            4. Confidence score (1-100)
            
            Respond in JSON format:
            {
              "isOnRightPath": boolean,
              "confidence": number,
              "correctAspects": ["..."],
              "warnings": ["..."],
              "nextStep": "...",
              "suggestion": "..."
            }`
          }],
          temperature: 0.7,
          max_tokens: 800,
          response_format: { type: "json_object" }
        })
      });
      
      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content);
      setPathCheck(result);
      
      // Show warnings if not on right path
      if (result.warnings && result.warnings.length > 0) {
        setAiResponse(prev => 
          `## 🚨 Path Check Alert!\n\n` +
          `**Confidence:** ${result.confidence}%\n` +
          `**Status:** ${result.isOnRightPath ? '✅ On track' : '⚠️ Needs adjustment'}\n\n` +
          `**Warnings:**\n${result.warnings.map(w => `• ${w}`).join('\n')}\n\n` +
          `**Next Step:** ${result.nextStep}\n\n` +
          (prev && !prev.includes('Path Check Alert') ? `\n---\n${prev}` : '')
        );
      }
      
    } catch (error) {
      console.error('Path check failed:', error);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Executing code...\n\n');
    
    try {
      // Simulate execution
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockOutput = `>Code executed successfully!
> 
> 📊 Live Analysis:
> ${pathCheck ? `• Path Confidence: ${pathCheck.confidence}%` : '• No path analysis yet'}
> • Execution time: 2.3ms
> • Memory usage: 4.8MB
> 
> 📝 Output:
> ${code.includes('console.log') ? 'Check browser console' : 'No output generated'}
> 
> ${pathCheck?.isOnRightPath ? '✅ You\'re on the right track!' : '⚠️ Review AI suggestions'}`;
      
      setOutput(mockOutput);
      
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const getAIGuidance = async () => {
    if (!apiKey) {
      setAiResponse('🔒 API key required. Please enter it for this session.');
      return;
    }
    
    setAiThinking(true);
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: `Problem: ${question || 'General coding problem'}
            
            Current code (${language}):
            ${code}
            
            Provide specific guidance:
            1. What should be implemented next?
            2. Any critical mistakes?
            3. Optimization suggestions
            4. Code example for next step
            
            Be concise and actionable.`
          }],
          temperature: 0.7,
          max_tokens: 600
        })
      });
      
      const data = await response.json();
      setAiResponse(data.choices[0].message.content);
      setActiveTab('ai');
      
    } catch (error) {
      setAiResponse('⚠️ Could not get AI guidance. Check API key.');
    } finally {
      setAiThinking(false);
    }
  };

  const quickActions = [
    { icon: <Bot size={16} />, label: 'AI Guidance', action: getAIGuidance, color: 'purple' },
    { icon: <Code2 size={16} />, label: 'Analyze Qn', action: analyzeQuestion, color: 'blue' },
    { icon: <Zap size={16} />, label: 'Check Path', action: checkIfOnRightPath, color: 'yellow' },
    { icon: <Play size={16} />, label: 'Run Code', action: handleRunCode, color: 'green' },
  ];

  return (
    <div className="editor-page">
      <div className="editor-header">
        <div className="header-left">
          <div className="problem-detection">
            <div className="problem-type-badge">
              {problemType ? ` ${problemType}` : ' Paste Question'}
            </div>
            <div className="path-status">
              {pathCheck && (
                <span className={`confidence ${pathCheck.confidence > 70 ? 'high' : pathCheck.confidence > 40 ? 'medium' : 'low'}`}>
                  {pathCheck.confidence}% Confidence
                </span>
              )}
            </div>
          </div>
          <div className="language-selector">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="language-select"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>
        </div>
        
        <div className="header-right">
          <div className="api-status">
  {apiKey ? (
    <span className="api-connected">🟢 AI Connected (Session Only)</span>
  ) : (
    <button className="api-warning" onClick={requestApiKey}>
      🔑 Enter API Key
    </button>
  )}
</div>

          
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`action-btn ${action.color}`}
                onClick={action.action}
                disabled={aiThinking || (action.label === 'Analyze Qn' && isAnalyzingQuestion)}
              >
                {action.icon}
                {isAnalyzingQuestion && action.label === 'Analyze Qn' ? 'Analyzing...' : action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="editor-container">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="question-input-section">
            <div className="question-header">
              <h4> Problem Statement</h4>
              <button 
                onClick={analyzeQuestion}
                disabled={!question.trim() || isAnalyzingQuestion}
                className="analyze-btn"
              >
                {isAnalyzingQuestion ? ' Analyzing...' : ' AI Analyze'}
              </button>
            </div>
            <textarea
              className="question-textarea"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Paste your coding problem here... (AI will detect type and guide you)"
              rows={4}
            />
            {problemType && (
              <div className="detected-info">
                <span className="detected-type">Detected: {problemType}</span>
                {pathCheck && (
                  <span className={`path-status ${pathCheck.isOnRightPath ? 'on-track' : 'off-track'}`}>
                    {pathCheck.isOnRightPath ? '✅ On track' : '⚠️ Needs adjustment'}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="editor-tabs">
            <button 
              className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
              onClick={() => setActiveTab('editor')}
            >
              <Code2 size={16} /> Code Editor
            </button>
            <button 
              className={`tab ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              <Bot size={16} /> AI Path Guide
              {aiThinking && <span className="thinking-dot"></span>}
              {pathCheck && !pathCheck.isOnRightPath && <span className="warning-badge">⚠️</span>}
            </button>
            <button 
              className={`tab ${activeTab === 'output' ? 'active' : ''}`}
              onClick={() => setActiveTab('output')}
            >
              <Terminal size={16} /> Output
            </button>
          </div>

          <div className="editor-content">
            {activeTab === 'editor' && (
              <div className="code-editor">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                  placeholder={`Start coding your solution here...\n\n💡 AI will check your path in real-time\n🚀 Press Ctrl+Space for suggestions\n✅ Write at least 50 characters for path analysis`}
                  className="code-textarea"
                />
                {pathCheck && pathCheck.warnings && pathCheck.warnings.length > 0 && (
                  <div className="live-warnings">
                    <div className="warning-header">
                      <AlertCircle size={16} />
                      <span>AI Warnings:</span>
                    </div>
                    {pathCheck.warnings.map((warning, i) => (
                      <div key={i} className="warning-item">{warning}</div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'ai' && (
              <div className="ai-panel">
                {aiThinking ? (
                  <div className="ai-thinking">
                    <div className="spinner"></div>
                    <div className="thinking-text">
                      <Sparkles size={20} />
                      <span>AI is analyzing your path...</span>
                    </div>
                  </div>
                ) : aiResponse ? (
                  <div className="ai-response">
                    <div className="response-header">
                      <Bot size={20} />
                      <h3>AI Path Guidance</h3>
                      {pathCheck && (
                        <div className="confidence-badge">
                          {pathCheck.confidence}% confidence
                        </div>
                      )}
                    </div>
                    <div className="response-content">
                      <pre>{aiResponse}</pre>
                      {pathCheck && (
                        <div className="path-summary">
                          <div className="summary-item">
                            <strong>Status:</strong> {pathCheck.isOnRightPath ? '✅ On track' : '⚠️ Needs adjustment'}
                          </div>
                          <div className="summary-item">
                            <strong>Next Step:</strong> {pathCheck.nextStep}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="ai-empty">
                    <Bot size={48} />
                    <h3>AI Path Guide Ready</h3>
                    <p>Paste a problem above and start coding</p>
                    <p className="ai-hint">AI will check if you're on the right path every 2 seconds</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'output' && (
              <div className="output-panel">
                <div className="output-header">
                  <h4>Console Output</h4>
                  <button className="clear-btn" onClick={() => setOutput('')}>
                    <RefreshCw size={14} /> Clear
                  </button>
                </div>
                <div className="output-console">
                  <pre>{output || 'Run your code to see output here'}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Real-time Guidance */}
        <div className="right-panel">
          <div className="guidance-section">
            <h3> Live Path Check</h3>
            
            <div className="path-indicator">
              {pathCheck ? (
                <>
                  <div className="confidence-meter">
                    <div 
                      className="confidence-fill" 
                      style={{ width: `${pathCheck.confidence}%` }}
                    ></div>
                  </div>
                  <div className="confidence-text">
                    <span>Path Confidence: </span>
                    <strong>{pathCheck.confidence}%</strong>
                  </div>
                  
                  <div className="status-indicator">
                    {pathCheck.isOnRightPath ? (
                      <div className="status-good">
                        <CheckCircle size={20} />
                        <span>You're on the right path!</span>
                      </div>
                    ) : (
                      <div className="status-warning">
                        <AlertCircle size={20} />
                        <span>Adjust your approach</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="no-analysis">
                  <p>Code at least 50 characters for path analysis</p>
                </div>
              )}
            </div>
            
            {pathCheck && (
              <div className="guidance-details">
                <h4>What's Working:</h4>
                <ul>
                  {pathCheck.correctAspects?.map((aspect, i) => (
                    <li key={i}>✅ {aspect}</li>
                  )) || <li>Keep implementing...</li>}
                </ul>
                
                {pathCheck.warnings && pathCheck.warnings.length > 0 && (
                  <>
                    <h4>⚠️ Warnings:</h4>
                    <ul>
                      {pathCheck.warnings.map((warning, i) => (
                        <li key={i}>⚠️ {warning}</li>
                      ))}
                    </ul>
                  </>
                )}
                
                <div className="next-step-card">
                  <h4>🎯 Next Step:</h4>
                  <p>{pathCheck.nextStep || 'Continue implementing...'}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="suggestions-section">
            <h3>💡 Quick Suggestions</h3>
            <div className="suggestions-list">
              <button className="suggestion-btn" onClick={() => {
                if (problemType.includes('Array')) {
                  setCode(prev => prev + '\n// Consider using hash map for O(1) lookups');
                }
              }}>
                {problemType.includes('Array') ? 'Use Hash Map' : 'Optimize Logic'}
              </button>
              <button className="suggestion-btn" onClick={() => {
                setCode(prev => prev + '\n// Add edge case handling');
              }}>
                Handle Edge Cases
              </button>
              <button className="suggestion-btn" onClick={getAIGuidance}>
                Get AI Hint
              </button>
            </div>
          </div>
          
          <div className="action-buttons">
            <button 
              className="btn-run"
              onClick={handleRunCode}
              disabled={isRunning}
            >
              {isRunning ? (
                <>
                  <div className="spinner-small"></div>
                  Running...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Run & Check
                </>
              )}
            </button>
            <button className="btn-ai" onClick={getAIGuidance}>
              <Lightbulb size={16} />
              AI Guidance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== OTHER PAGES (Simplified) ==========

function Problems() {
  return (
    <div className="problems-page">
      <h1> Coding Problems</h1>
      <p>Browse and solve coding challenges</p>
    </div>
  );
}

function Learn() {
  return (
    <div className="learn-page">
      <h1>Learn & Practice</h1>
      <p>Master programming concepts</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <p>Track your progress and achievements</p>
    </div>
  );
}

// ========== MAIN APP ==========

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className="app-container" data-theme={theme}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="main-content">
          <Sidebar isOpen={sidebarOpen} />
          <div className={`page-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/problems" element={<Problems />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/challenges" element={<Problems />} />
              <Route path="/progress" element={<Profile />} />
              <Route path="/community" element={<Learn />} />
              <Route path="/settings" element={<Profile />} />
              <Route path="/help" element={<Learn />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;