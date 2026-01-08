import { useState, useEffect, useRef } from 'react';
import { useCode } from '../context/CodeContext';
import { useAI } from '../context/AIContext';
import MonacoEditor from '@monaco-editor/react';
import { 
  Play, 
  Save, 
  Bot, 
  Zap, 
  Code2, 
  Lightbulb, 
  Bug, 
  Rocket,
  Clock,
  Cpu,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function Editor() {
  const { 
    code, 
    setCode, 
    language, 
    setLanguage, 
    output, 
    setOutput, 
    isRunning,
    runCode 
  } = useCode();

  const { 
    analyzeCode, 
    generateSolution, 
    debugCode, 
    optimizeCode,
    aiThinking,
    aiResponse 
  } = useAI();

  const [activeTab, setActiveTab] = useState('editor');
  const [problem, setProblem] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const editorRef = useRef(null);

  // Sample problems
  const sampleProblems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      solution: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
      testCases: [
        { input: "twoSum([2,7,11,15], 9)", expected: "[0,1]" },
        { input: "twoSum([3,2,4], 6)", expected: "[1,2]" }
      ]
    },
    {
      id: 2,
      title: "Valid Palindrome",
      difficulty: "Easy",
      description: "Given a string s, return true if it is a palindrome, or false otherwise.",
      solution: `function isPalindrome(s) {
    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
}`,
      testCases: [
        { input: 'isPalindrome("racecar")', expected: "true" },
        { input: 'isPalindrome("hello")', expected: "false" }
      ]
    }
  ];

  useEffect(() => {
    // Load first problem
    if (sampleProblems[0]) {
      loadProblem(sampleProblems[0]);
    }
  }, []);

  const loadProblem = (problem) => {
    setProblem(problem);
    setCode(problem.solution);
    setTestCases(problem.testCases);
    setOutput('');
    setTestResults(null);
  };

  const handleRunTests = () => {
    const results = testCases.map((test, index) => {
      try {
        // In real app, this would execute the code
        const passed = Math.random() > 0.3; // Simulated
        return {
          id: index,
          testCase: test.input,
          expected: test.expected,
          actual: passed ? test.expected : "Error",
          passed,
          time: Math.random() * 100 + 50
        };
      } catch (error) {
        return {
          id: index,
          testCase: test.input,
          expected: test.expected,
          actual: "Error: " + error.message,
          passed: false,
          time: 0
        };
      }
    });

    setTestResults({
      results,
      passed: results.filter(r => r.passed).length,
      total: results.length,
      successRate: (results.filter(r => r.passed).length / results.length) * 100
    });
    setActiveTab('tests');
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const quickActions = [
    { icon: <Bot size={16} />, label: "AI Analyze", action: () => analyzeCode(code, language), color: "purple" },
    { icon: <Code2 size={16} />, label: "Generate", action: () => generateSolution(problem?.description, language), color: "blue" },
    { icon: <Bug size={16} />, label: "Debug", action: () => debugCode(code, language), color: "red" },
    { icon: <Zap size={16} />, label: "Optimize", action: () => optimizeCode(code, language), color: "yellow" },
    { icon: <Rocket size={16} />, label: "Run All", action: handleRunTests, color: "green" },
  ];

  return (
    <div className="editor-page">
      {/* Header */}
      <div className="editor-header">
        <div className="header-left">
          <div className="problem-selector">
            <select 
              className="problem-select"
              onChange={(e) => {
                const selected = sampleProblems.find(p => p.id === parseInt(e.target.value));
                if (selected) loadProblem(selected);
              }}
            >
              {sampleProblems.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.difficulty})
                </option>
              ))}
            </select>
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
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`action-btn ${action.color}`}
                onClick={action.action}
                disabled={aiThinking}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="editor-container">
        {/* Left: Editor */}
        <div className="editor-section">
          <div className="editor-tabs">
            <button 
              className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
              onClick={() => setActiveTab('editor')}
            >
              <Code2 size={16} /> Editor
            </button>
            <button 
              className={`tab ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              <Bot size={16} /> AI Assistant
              {aiThinking && <span className="thinking-indicator"></span>}
            </button>
            <button 
              className={`tab ${activeTab === 'tests' ? 'active' : ''}`}
              onClick={() => setActiveTab('tests')}
            >
              <CheckCircle size={16} /> Tests
              {testResults && (
                <span className={`test-badge ${testResults.passed === testResults.total ? 'success' : 'warning'}`}>
                  {testResults.passed}/{testResults.total}
                </span>
              )}
            </button>
          </div>

          <div className="editor-content">
            {activeTab === 'editor' && (
              <div className="monaco-container">
                <MonacoEditor
                  height="100%"
                  language={language}
                  value={code}
                  onChange={setCode}
                  onMount={handleEditorDidMount}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    automaticLayout: true,
                  }}
                />
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="ai-panel">
                {aiThinking ? (
                  <div className="ai-thinking">
                    <div className="thinking-spinner"></div>
                    <div className="thinking-text">
                      <Sparkles size={20} />
                      <span>AI is analyzing your code...</span>
                    </div>
                  </div>
                ) : aiResponse ? (
                  <div className="ai-response">
                    <div className="response-header">
                      <Bot size={20} />
                      <h3>AI Analysis</h3>
                      <span className="timestamp">Just now</span>
                    </div>
                    <div className="response-content">
                      <div className="ai-message">
                        <div className="message-bubble">
                          {aiResponse}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="ai-empty">
                    <Bot size={48} />
                    <h3>AI Assistant Ready</h3>
                    <p>Click "AI Analyze" to get feedback on your code</p>
                    <div className="ai-suggestions">
                      <button className="suggestion-btn" onClick={() => analyzeCode(code, language)}>
                        Analyze Code Quality
                      </button>
                      <button className="suggestion-btn" onClick={() => optimizeCode(code, language)}>
                       Suggest Optimizations
                      </button>
                      <button className="suggestion-btn" onClick={() => debugCode(code, language)}>
                       Debug Issues
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tests' && (
              <div className="tests-panel">
                {testResults ? (
                  <>
                    <div className="test-summary">
                      <div className="summary-card success">
                        <div className="summary-icon">
                          <CheckCircle size={24} />
                        </div>
                        <div className="summary-content">
                          <h4>{testResults.passed} / {testResults.total}</h4>
                          <p>Tests Passed</p>
                        </div>
                      </div>
                      <div className="summary-card">
                        <div className="summary-icon">
                          <Clock size={24} />
                        </div>
                        <div className="summary-content">
                          <h4>{(testResults.results.reduce((a, b) => a + b.time, 0) / testResults.results.length).toFixed(1)}ms</h4>
                          <p>Average Time</p>
                        </div>
                      </div>
                      <div className="summary-card">
                        <div className="summary-icon">
                          <Cpu size={24} />
                        </div>
                        <div className="summary-content">
                          <h4>{testResults.successRate.toFixed(1)}%</h4>
                          <p>Success Rate</p>
                        </div>
                      </div>
                    </div>

                    <div className="test-results-list">
                      {testResults.results.map((result) => (
                        <div key={result.id} className={`test-result ${result.passed ? 'passed' : 'failed'}`}>
                          <div className="test-result-header">
                            <div className="test-status">
                              {result.passed ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                              <span>Test #{result.id + 1}</span>
                            </div>
                            <span className="test-time">{result.time.toFixed(1)}ms</span>
                          </div>
                          <div className="test-details">
                            <div><strong>Input:</strong> <code>{result.testCase}</code></div>
                            <div><strong>Expected:</strong> <code>{result.expected}</code></div>
                            <div><strong>Got:</strong> <code>{result.actual}</code></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="no-tests">
                    <CheckCircle size={48} />
                    <h3>No Tests Run Yet</h3>
                    <p>Run tests to see results here</p>
                    <button className="run-tests-btn" onClick={handleRunTests}>
                      <Play size={16} /> Run Tests
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Problem & Output */}
        <div className="sidebar-section">
          <div className="problem-section">
            <h3>
              {problem?.title} 
              <span className={`difficulty-badge ${problem?.difficulty?.toLowerCase()}`}>
                {problem?.difficulty}
              </span>
            </h3>
            <p className="problem-description">{problem?.description}</p>
            
            <div className="problem-examples">
              <h4>Examples:</h4>
              {problem?.testCases?.map((test, index) => (
                <div key={index} className="example">
                  <div className="example-input">
                    <strong>Input:</strong> <code>{test.input}</code>
                  </div>
                  <div className="example-output">
                    <strong>Output:</strong> <code>{test.expected}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="output-section">
            <h4>Console Output</h4>
            <div className="output-console">
              {output ? (
                <pre>{output}</pre>
              ) : (
                <div className="empty-output">
                  <Code2 size={24} />
                  <p>Run your code to see output here</p>
                </div>
              )}
            </div>
            
            <div className="action-buttons">
              <button 
                className="btn-run" 
                onClick={() => runCode(code, language)}
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
                    Run Code
                  </>
                )}
              </button>
              <button className="btn-save">
                <Save size={16} />
                Save
              </button>
              <button 
                className="btn-ai"
                onClick={() => analyzeCode(code, language)}
              >
                <Lightbulb size={16} />
                AI Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}