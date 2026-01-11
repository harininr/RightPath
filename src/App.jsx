import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Play, Save, Bot, Zap, Code2, Lightbulb, Bug, Rocket,
  Home, BookOpen, Trophy, Settings, HelpCircle, TrendingUp, Users,
  Menu, Search, Bell, User, ChevronRight, Sparkles,
  CheckCircle, AlertCircle, Clock, Cpu, Terminal, Copy, RefreshCw,
  Maximize2, Minimize2, ChevronDown, Hash, Type, Braces, FileCode,
  Columns, SplitSquareVertical, X, Plus, Minus, Eye, EyeOff,
  Download, Upload, Share2, ThumbsUp, MessageSquare, Star
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
          <span className="logo-beta">BETA</span>
        </div>
      </div>
      
      <div className="nav-center">
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search problems, concepts..."
          />
        </div>
      </div>
      
      <div className="nav-right">
        <button className="nav-icon-btn notification-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <div className="user-avatar">
          <User size={20} />
        </div>
      </div>
    </nav>
  );
}

function Sidebar({ isOpen }) {
  if (!isOpen) return null;
  
  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/', active: true },
    { icon: <Code2 size={20} />, label: 'Editor', path: '/editor' },
    { icon: <BookOpen size={20} />, label: 'Problems', path: '/problems' },
    { icon: <Lightbulb size={20} />, label: 'Learn', path: '/learn' },
    { icon: <Trophy size={20} />, label: 'Challenges', path: '/challenges' },
    { icon: <TrendingUp size={20} />, label: 'Progress', path: '/progress' },
    { icon: <Users size={20} />, label: 'Community', path: '/community' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
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
                  className={`nav-item ${item.active ? 'active' : ''}`}
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
          <h3 className="sidebar-title">Today's Focus</h3>
          <div className="focus-card">
            <div className="focus-icon">🎯</div>
            <div className="focus-content">
              <h4>Array Problems</h4>
              <p>Master hash map techniques</p>
              <div className="focus-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '65%' }}></div>
                </div>
                <span>65%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-title">Quick Stats</h3>
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
        
        <div className="sidebar-section">
          <div className="ai-status">
            <div className="ai-status-indicator">
              <div className="status-dot online"></div>
              <span>AI Assistant Online</span>
            </div>
            <button className="ai-help-btn">
              <HelpCircle size={16} />
            </button>
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
    { id: 1, title: 'Two Sum', difficulty: 'Easy', solved: true, time: '15 min', type: 'Array' },
    { id: 2, title: 'Palindrome', difficulty: 'Easy', solved: true, time: '10 min', type: 'String' },
    { id: 3, title: 'Merge Sort', difficulty: 'Medium', solved: false, time: '25 min', type: 'Sorting' },
    { id: 4, title: 'Binary Tree', difficulty: 'Medium', solved: true, time: '30 min', type: 'Tree' },
  ];

  const achievements = [
    { title: 'First Blood', desc: 'Solved your first problem', icon: '🏆', color: 'pink' },
    { title: 'Week Warrior', desc: '7-day coding streak', icon: '🔥', color: 'orange' },
    { title: 'Code Master', desc: 'Solved 20+ problems', icon: '👨‍💻', color: 'purple' },
    { title: 'Speed Demon', desc: 'Fastest solution', icon: '⚡', color: 'yellow' },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, Alex! 👋</h1>
          <p>Your coding journey is looking great today. Ready for a challenge?</p>
        </div>
        <div className="header-actions">
          <button className="header-btn primary">
            <Plus size={16} />
            New Challenge
          </button>
          <button className="header-btn">
            <Share2 size={16} />
            Share Progress
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--pastel-blue)' }}>
            <Trophy size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.problemsSolved}</h3>
            <p>Problems Solved</p>
            <span className="stat-change positive">+3 this week</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--pastel-green)' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.streakDays} days</h3>
            <p>Coding Streak</p>
            <span className="stat-change positive">🔥 Keep going!</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--pastel-purple)' }}>
            <Target size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.accuracy}%</h3>
            <p>Accuracy Rate</p>
            <span className="stat-change positive">↑ 5% from last week</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--pastel-orange)' }}>
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.timeSpent}h</h3>
            <p>Total Learning</p>
            <span className="stat-change">Consistent</span>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="main-left">
          <div className="card">
            <div className="card-header">
              <h3>Continue Learning</h3>
              <Link to="/problems" className="view-all">View All →</Link>
            </div>
            <div className="problems-list">
              {recentProblems.map(problem => (
                <div key={problem.id} className="problem-item">
                  <div className="problem-main">
                    <div className="problem-type">{problem.type}</div>
                    <h4>{problem.title}</h4>
                    <div className="problem-meta">
                      <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                        {problem.difficulty}
                      </span>
                      <span className="time">
                        <Clock size={14} />
                        {problem.time}
                      </span>
                    </div>
                  </div>
                  <div className="problem-actions">
                    {problem.solved ? (
                      <button className="action-btn solved">
                        <CheckCircle size={16} />
                        Solved
                      </button>
                    ) : (
                      <button className="action-btn continue">
                        Continue
                      </button>
                    )}
                    <button className="action-btn secondary">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Your Achievements</h3>
              <div className="achievement-count">4 unlocked</div>
            </div>
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-card" style={{ borderColor: `var(--pastel-${achievement.color})` }}>
                  <div className="achievement-icon" style={{ background: `var(--pastel-${achievement.color})` }}>
                    {achievement.icon}
                  </div>
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="main-right">
          <div className="card">
            <div className="card-header">
              <h3>AI Insights</h3>
              <div className="ai-status-tag">
                <div className="status-dot"></div>
                Active
              </div>
            </div>
            <div className="ai-insights">
              <div className="insight-item">
                <div className="insight-icon" style={{ background: 'var(--pastel-pink)' }}>
                  <Sparkles size={20} />
                </div>
                <div className="insight-content">
                  <h4>Great Progress!</h4>
                  <p>Your code quality has improved by 25% this week!</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon" style={{ background: 'var(--pastel-blue)' }}>
                  <TrendingUp size={20} />
                </div>
                <div className="insight-content">
                  <h4>Speed Increase</h4>
                  <p>Solving Medium problems 40% faster than last month.</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon" style={{ background: 'var(--pastel-green)' }}>
                  <Bot size={20} />
                </div>
                <div className="insight-content">
                  <h4>Next Challenge</h4>
                  <p>Try a "Graph" problem to expand your skills.</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon" style={{ background: 'var(--pastel-yellow)' }}>
                  <Lightbulb size={20} />
                </div>
                <div className="insight-content">
                  <h4>Learning Tip</h4>
                  <p>Review hash map techniques for better optimization.</p>
                </div>
              </div>
            </div>
            <button className="ai-chat-btn">
              <MessageSquare size={16} />
              Chat with AI Assistant
            </button>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="quick-actions-grid">
              <Link to="/editor" className="action-card">
                <div className="action-icon" style={{ background: 'var(--pastel-purple)' }}>
                  <Code2 size={24} />
                </div>
                <span>Start Coding</span>
              </Link>
              <Link to="/problems" className="action-card">
                <div className="action-icon" style={{ background: 'var(--pastel-blue)' }}>
                  <BookOpen size={24} />
                </div>
                <span>Browse Problems</span>
              </Link>
              <Link to="/learn" className="action-card">
                <div className="action-icon" style={{ background: 'var(--pastel-green)' }}>
                  <Lightbulb size={24} />
                </div>
                <span>Learn Concepts</span>
              </Link>
              <Link to="/challenges" className="action-card">
                <div className="action-icon" style={{ background: 'var(--pastel-orange)' }}>
                  <Trophy size={24} />
                </div>
                <span>Take Challenge</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Editor() {
  const [code, setCode] = useState(`def two_sum(nums, target):
    """
    Find two numbers that sum to target.
    Returns indices of the two numbers.
    """
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`);
  
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [question, setQuestion] = useState(`Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]`);
  
  const [problemType, setProblemType] = useState('Array & Hash Map');
  const [isAnalyzingQuestion, setIsAnalyzingQuestion] = useState(false);
  const [pathCheck, setPathCheck] = useState({
    isOnRightPath: true,
    confidence: 92,
    correctAspects: ['Optimal O(n) solution', 'Correct hash map usage', 'Proper edge case handling'],
    warnings: ['Add more test cases'],
    nextStep: 'Add complexity analysis comments',
    suggestion: 'Consider adding a brute force comparison for learning purposes'
  });
  const [layout, setLayout] = useState('split');
  const [activeTab, setActiveTab] = useState('editor');
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(14);

  const languageTemplates = {
    python: `def solve(nums, target):
    # Your solution here
    pass`,
    
    javascript: `function solve(nums, target) {
    // Your solution here
}`,

    java: `class Solution {
    public int[] solve(int[] nums, int target) {
        // Your solution here
    }
}`,

    cpp: `class Solution {
public:
    vector<int> solve(vector<int>& nums, int target) {
        // Your solution here
    }
};`
  };

  const formatCode = (code, lang) => {
    const lines = code.split('\n');
    let indentLevel = 0;
    let inMultilineComment = false;
    
    return lines.map(line => {
      const trimmed = line.trim();
      
      // Handle multiline comments
      if (trimmed.includes('"""') || trimmed.includes("'''") || trimmed.includes('/*') || trimmed.includes('*/')) {
        inMultilineComment = !inMultilineComment;
      }
      
      if (inMultilineComment) {
        return '    '.repeat(indentLevel) + trimmed;
      }
      
      // Python specific
      if (lang === 'python') {
        if (trimmed.endsWith(':') && !trimmed.startsWith('#')) {
          const result = '    '.repeat(indentLevel) + trimmed;
          indentLevel++;
          return result;
        }
        if (trimmed.startsWith('return') || trimmed.startsWith('elif ') || trimmed.startsWith('else:') || 
            trimmed.startsWith('except ') || trimmed.startsWith('finally:')) {
          indentLevel = Math.max(0, indentLevel - 1);
          return '    '.repeat(indentLevel) + trimmed;
        }
        return '    '.repeat(indentLevel) + trimmed;
      }
      
      // JavaScript/Java/C++
      if (trimmed.endsWith('{')) {
        const result = '    '.repeat(indentLevel) + trimmed;
        indentLevel++;
        return result;
      }
      if (trimmed.startsWith('}')) {
        indentLevel = Math.max(0, indentLevel - 1);
        return '    '.repeat(indentLevel) + trimmed;
      }
      return '    '.repeat(indentLevel) + trimmed;
    }).join('\n');
  };

  useEffect(() => {
    setCode(formatCode(code, language));
  }, [language]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setTimeout(() => {
      const formatted = formatCode(newCode, language);
      if (formatted !== newCode) {
        setCode(formatted);
      }
    }, 300);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('🚀 Running your code...\n\n');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockOutput = `✨ Code executed successfully!

✅ All test cases passed:
✓ Test 1: [2,7,11,15], target=9 → [0,1]
✓ Test 2: [3,2,4], target=6 → [1,2]  
✓ Test 3: [3,3], target=6 → [0,1]

📊 Performance:
• Execution time: 0.045s
• Memory usage: 12.4 MB
• Time complexity: O(n) ✓
• Space complexity: O(n) ✓

🎯 AI Analysis:
Your solution is optimal! The hash map approach is perfect for this problem.`;

      setOutput(mockOutput);
      setActiveTab('output');
      
      setPathCheck(prev => ({
        ...prev,
        confidence: 95,
        correctAspects: [...prev.correctAspects, 'All test cases passed', 'Optimal performance'],
        nextStep: 'Try adding more edge cases'
      }));
      
    } catch (error) {
      setOutput(`❌ Execution Error\n\n${error.message}\n\nCheck your code syntax and try again.`);
    } finally {
      setIsRunning(false);
    }
  };

  const getAIGuidance = async () => {
    setAiThinking(true);
    setActiveTab('ai');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const guidance = `## 🧠 AI Path Guidance Report

### ✅ **Current Status: Excellent!**
Your solution is on the right track with **92% confidence**.

### 📊 **What's Working Well:**
1. **Optimal Algorithm** - O(n) time complexity using hash map
2. **Clean Implementation** - Readable and well-structured
3. **Edge Cases Handled** - Returns empty list for no solution
4. **Efficient** - Single pass through array

### 💡 **Suggestions for Improvement:**

#### 1. **Add More Test Cases**
Consider adding:
\`\`\`python
# Edge cases:
print(two_sum([], 5))           # Should return []
print(two_sum([1], 5))          # Should return []
print(two_sum([-1, -2, -3, -4], -6))  # Negative numbers
\`\`\`

#### 2. **Add Complexity Analysis**
\`\`\`python
# Time Complexity: O(n) - Single pass through array
# Space Complexity: O(n) - Hash map storage
\`\`\`

#### 3. **Alternative Approaches for Learning**
Try implementing:
- Brute force O(n²) solution for comparison
- Two-pointer approach (if array sorted)

### 🎯 **Next Steps:**
1. Add detailed comments explaining each step
2. Implement a test suite
3. Try solving variations of the problem

### 🔧 **Quick Fixes:**
- Consider using \`enumerate()\` for cleaner index handling
- Add type hints for better documentation`;

      setAiResponse(guidance);
      
    } catch (error) {
      setAiResponse('## ⚠️ Temporary Service Issue\n\nAI guidance is temporarily unavailable. Here are some manual tips:\n\n1. Review your algorithm\'s time complexity\n2. Add more test cases\n3. Check edge case handling\n4. Add comments for clarity');
    } finally {
      setAiThinking(false);
    }
  };

  const analyzeQuestion = async () => {
    setIsAnalyzingQuestion(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const analysis = `## 🔍 **Problem Analysis Complete**

### **Problem Type:** Array / Hash Table
### **Difficulty:** Easy
### **Category:** Two Sum

### **📚 Key Concepts:**
1. **Hash Maps** - For O(1) lookups
2. **Complementary Numbers** - target - current = needed
3. **Single Pass Optimization** - O(n) time complexity

### **🎯 Optimal Approach:**
\`\`\`python
def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []
\`\`\`

### **⚡ Complexity Analysis:**
- **Time:** O(n) - Single pass through array
- **Space:** O(n) - Hash map storage

### **⚠️ Common Pitfalls:**
1. Using nested loops (O(n²) solution)
2. Forgetting to handle empty/none inputs
3. Not considering negative numbers
4. Returning wrong indices

### **💡 Learning Objectives:**
- Master hash map usage
- Understand complementary pairs
- Practice edge case handling`;

      setProblemType('Array / Hash Table');
      setAiResponse(analysis);
      
    } catch (error) {
      setAiResponse('Unable to analyze question. Please try again.');
    } finally {
      setIsAnalyzingQuestion(false);
    }
  };

  const insertSnippet = (snippet) => {
    const lines = code.split('\n');
    const lastLine = lines[lines.length - 1];
    const indentMatch = lastLine.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1] : '';
    setCode(code + '\n' + indent + snippet);
  };

  return (
    <div className="editor-page">
      {/* Top Bar */}
      <div className="editor-topbar">
        <div className="topbar-left">
          <div className="problem-info">
            <div className="problem-tag">
              <FileCode size={16} />
              <span>{problemType}</span>
            </div>
            <h2>Two Sum Problem</h2>
          </div>
        </div>
        
        <div className="topbar-right">
          <div className="topbar-actions">
            <select 
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setCode(languageTemplates[e.target.value]);
              }}
              className="language-picker"
            >
              <option value="python">🐍 Python</option>
              <option value="javascript">🟨 JavaScript</option>
              <option value="java">☕ Java</option>
              <option value="cpp">🔷 C++</option>
            </select>
            
            <button className="topbar-btn" onClick={() => setFontSize(f => Math.min(f + 1, 20))}>
              <Plus size={16} />
            </button>
            <button className="topbar-btn" onClick={() => setFontSize(f => Math.max(f - 1, 12))}>
              <Minus size={16} />
            </button>
            
            <button className="topbar-btn layout-btn" onClick={() => setLayout(l => l === 'split' ? 'code' : 'split')}>
              {layout === 'split' ? <SplitSquareVertical size={16} /> : <Columns size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="editor-main">
        {/* Left Panel - Problem */}
        <div className={`editor-panel problem-panel ${layout === 'code' ? 'hidden' : ''}`}>
          <div className="panel-header">
            <h3>
              <BookOpen size={18} />
              Problem Statement
            </h3>
            <div className="panel-actions">
              <button 
                className="panel-btn primary"
                onClick={analyzeQuestion}
                disabled={isAnalyzingQuestion}
              >
                {isAnalyzingQuestion ? 'Analyzing...' : 'AI Analyze'}
              </button>
              <button className="panel-btn">
                <Star size={16} />
              </button>
            </div>
          </div>
          
          <div className="problem-content">
            <div className="problem-description">
              <p>{question}</p>
            </div>
            
            <div className="problem-details">
              <div className="detail-card">
                <h4>Difficulty</h4>
                <span className="difficulty-badge easy">Easy</span>
              </div>
              <div className="detail-card">
                <h4>Category</h4>
                <span className="category-tag">{problemType}</span>
              </div>
              <div className="detail-card">
                <h4>Success Rate</h4>
                <span className="success-rate">85%</span>
              </div>
            </div>
            
            <div className="test-cases">
              <h4>Example Test Cases</h4>
              <div className="test-case">
                <div className="test-input">
                  <strong>Input:</strong> nums = [2,7,11,15], target = 9
                </div>
                <div className="test-output">
                  <strong>Output:</strong> [0,1]
                </div>
              </div>
              <div className="test-case">
                <div className="test-input">
                  <strong>Input:</strong> nums = [3,2,4], target = 6
                </div>
                <div className="test-output">
                  <strong>Output:</strong> [1,2]
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Panel - Code Editor */}
        <div className="editor-panel code-panel">
          <div className="panel-header">
            <div className="code-tabs">
              <button 
                className={`code-tab ${activeTab === 'editor' ? 'active' : ''}`}
                onClick={() => setActiveTab('editor')}
              >
                <Code2 size={16} />
                Editor
              </button>
              <button 
                className={`code-tab ${activeTab === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveTab('ai')}
              >
                <Bot size={16} />
                AI Guide
                {aiThinking && <span className="thinking-indicator"></span>}
              </button>
              <button 
                className={`code-tab ${activeTab === 'output' ? 'active' : ''}`}
                onClick={() => setActiveTab('output')}
              >
                <Terminal size={16} />
                Output
                {output && <span className="output-indicator"></span>}
              </button>
            </div>
            
            <div className="code-actions">
              <button 
                className="code-action-btn"
                onClick={() => navigator.clipboard.writeText(code)}
                title="Copy code"
              >
                <Copy size={16} />
              </button>
              <button 
                className="code-action-btn"
                onClick={() => setCode(languageTemplates[language])}
                title="Reset code"
              >
                <RefreshCw size={16} />
              </button>
              <button 
                className="code-action-btn run-btn"
                onClick={handleRunCode}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <div className="spinner"></div>
                    Running...
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    Run Code
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="panel-content">
            {activeTab === 'editor' && (
              <div className="code-editor-wrapper">
                <div className="code-meta">
                  <span>solution.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : language === 'java' ? 'java' : 'cpp'}</span>
                  <span>{code.split('\n').length} lines • {code.length} chars</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className="code-textarea"
                  style={{ fontSize: `${fontSize}px` }}
                  spellCheck="false"
                  placeholder={`Start coding your solution in ${language}...\n\n💡 Press Tab for indentation\n🚀 AI will check your path in real-time`}
                />
                <div className="line-numbers">
                  {code.split('\n').map((_, i) => (
                    <div key={i} className="line-number">{i + 1}</div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'ai' && (
              <div className="ai-guidance-wrapper">
                {aiThinking ? (
                  <div className="ai-loading">
                    <div className="spinner-large"></div>
                    <p>AI is analyzing your solution...</p>
                  </div>
                ) : aiResponse ? (
                  <div className="ai-response-content">
                    <div className="ai-response-header">
                      <Bot size={24} />
                      <h3>AI Path Guidance</h3>
                      {pathCheck && (
                        <div className="confidence-badge">
                          {pathCheck.confidence}% Confidence
                        </div>
                      )}
                    </div>
                    <div className="markdown-content">
                      <pre>{aiResponse}</pre>
                    </div>
                    <div className="ai-actions">
                      <button className="ai-action-btn">
                        <ThumbsUp size={16} />
                        Helpful
                      </button>
                      <button className="ai-action-btn" onClick={getAIGuidance}>
                        <RefreshCw size={16} />
                        Refresh
                      </button>
                      <button className="ai-action-btn primary">
                        <Download size={16} />
                        Export
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="ai-empty-state">
                    <div className="ai-empty-icon">
                      <Sparkles size={48} />
                    </div>
                    <h3>AI Path Guide Ready</h3>
                    <p>Get intelligent feedback on your code</p>
                    <button className="get-guidance-btn" onClick={getAIGuidance}>
                      <Lightbulb size={18} />
                      Get AI Guidance
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'output' && (
              <div className="output-wrapper">
                <div className="output-header">
                  <h4>Execution Results</h4>
                  <div className="output-actions">
                    <button className="output-btn" onClick={() => setOutput('')}>
                      <RefreshCw size={14} />
                      Clear
                    </button>
                    <button className="output-btn" onClick={() => navigator.clipboard.writeText(output)}>
                      <Copy size={14} />
                      Copy
                    </button>
                  </div>
                </div>
                <div className="output-content">
                  <pre>{output || 'Run your code to see output here'}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - AI Assistant */}
        <div className="editor-panel assistant-panel">
          <div className="panel-header">
            <h3>
              <Sparkles size={18} />
              AI Assistant
            </h3>
            <div className="assistant-status">
              <div className="status-dot online"></div>
              Online
            </div>
          </div>
          
          <div className="panel-content">
            {/* Path Confidence */}
            <div className="path-confidence-card">
              <div className="confidence-header">
                <h4>Path Confidence</h4>
                <div className="confidence-score">{pathCheck.confidence}%</div>
              </div>
              <div className="confidence-meter">
                <div 
                  className="confidence-fill" 
                  style={{ width: `${pathCheck.confidence}%` }}
                ></div>
              </div>
              <div className="confidence-status">
                {pathCheck.isOnRightPath ? (
                  <span className="status-good">
                    <CheckCircle size={16} />
                    On the right track!
                  </span>
                ) : (
                  <span className="status-warning">
                    <AlertCircle size={16} />
                    Needs adjustment
                  </span>
                )}
              </div>
            </div>
            
            {/* What's Working */}
            <div className="working-card">
              <h4>✅ What's Working</h4>
              <ul>
                {pathCheck.correctAspects.map((aspect, i) => (
                  <li key={i}>{aspect}</li>
                ))}
              </ul>
            </div>
            
            {/* Quick Suggestions */}
            <div className="suggestions-card">
              <h4>💡 Quick Suggestions</h4>
              <div className="suggestion-buttons">
                <button 
                  className="suggestion-btn"
                  onClick={() => insertSnippet(language === 'python' ? '# Add more test cases' : '// Add more test cases')}
                >
                  Add Test Cases
                </button>
                <button 
                  className="suggestion-btn"
                  onClick={() => insertSnippet(language === 'python' ? '# TODO: Add edge case handling' : '// TODO: Add edge case handling')}
                >
                  Handle Edge Cases
                </button>
                <button 
                  className="suggestion-btn"
                  onClick={() => insertSnippet(language === 'python' ? '# Time: O(n), Space: O(n)' : '// Time: O(n), Space: O(n)')}
                >
                  Add Complexity
                </button>
                <button 
                  className="suggestion-btn primary"
                  onClick={getAIGuidance}
                >
                  Get Full Analysis
                </button>
              </div>
            </div>
            
            {/* Next Step */}
            <div className="next-step-card">
              <h4>🎯 Next Step</h4>
              <p>{pathCheck.nextStep}</p>
              <button 
                className="apply-suggestion-btn"
                onClick={() => {
                  if (pathCheck.suggestion) {
                    insertSnippet(pathCheck.suggestion);
                  }
                }}
              >
                Apply Suggestion
              </button>
            </div>
            
            {/* Code Stats */}
            <div className="code-stats-card">
              <h4>📊 Code Statistics</h4>
              <div className="stats-grid">
                <div className="stat">
                  <div className="stat-value">{code.split('\n').length}</div>
                  <div className="stat-label">Lines</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{code.length}</div>
                  <div className="stat-label">Characters</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{language}</div>
                  <div className="stat-label">Language</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{fontSize}px</div>
                  <div className="stat-label">Font Size</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="editor-bottombar">
        <div className="bottombar-left">
          <div className="file-info">
            <span className="language-badge">
              {language === 'python' ? '🐍' : language === 'javascript' ? '🟨' : language === 'java' ? '☕' : '🔷'}
              {language.toUpperCase()}
            </span>
            <span className="auto-save">Auto-save enabled</span>
          </div>
        </div>
        
        <div className="bottombar-center">
          <div className="progress-indicators">
            <div className="progress-item">
              <span>Path Confidence</span>
              <div className="progress-small">
                <div className="progress-fill-small" style={{ width: `${pathCheck.confidence}%` }}></div>
              </div>
            </div>
            <div className="progress-item">
              <span>Code Quality</span>
              <div className="progress-small">
                <div className="progress-fill-small" style={{ width: '88%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bottombar-right">
          <div className="action-buttons">
            <button className="action-btn" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="action-btn" onClick={() => window.print()}>
              <Save size={16} />
            </button>
            <button className="action-btn primary" onClick={handleRunCode} disabled={isRunning}>
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for Target icon
function Target(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

// ========== OTHER PAGES ==========

function Problems() {
  return (
    <div className="problems-page">
      <h1>Coding Problems</h1>
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

  return (
    <Router>
      <div className="app-container">
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