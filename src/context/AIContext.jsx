import { createContext, useContext, useState, useCallback } from "react";

const AIContext = createContext(null);

export function AIProvider({ children }) {
  const [aiThinking, setAiThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiHistory, setAiHistory] = useState([]);

  /**
   * Generic AI executor (mock for now)
   * Later you can replace this with OpenRouter / local LLM
   */
  const runAI = useCallback(async ({ type, payload, delay, response }) => {
    setAiThinking(true);
    setAiResponse("");

    try {
      // Simulate AI thinking time
      await new Promise((resolve) => setTimeout(resolve, delay));

      setAiResponse(response);

      setAiHistory((prev) => [
        ...prev,
        {
          type,
          payload,
          response,
          timestamp: Date.now(), // Serializable
        },
      ]);
    } catch (err) {
      setAiResponse("❌ Error: AI request failed. Please try again.");
    } finally {
      setAiThinking(false);
    }
  }, []);

  // ============================
  // AI Actions
  // ============================

  const analyzeCode = useCallback((code, language) => {
    return runAI({
      type: "analysis",
      payload: { code, language },
      delay: 1500,
      response: `✅ **Code Analysis Complete**

**Overall Score:** 85/100  
**Status:** Good implementation with room for optimization

**Strengths:**
✓ Correct algorithm implementation  
✓ Proper edge case handling  
✓ Clean code structure  

**Suggestions:**
1. Use Map for O(1) lookups  
2. Add input validation  
3. Improve error handling  

**Complexity:**
- Time: O(n) ✓  
- Space: O(n) ⚠️  

**Next Steps:**  
Try the two-pointer approach.`,
    });
  }, [runAI]);

  const generateSolution = useCallback((problem, language) => {
    return runAI({
      type: "solution",
      payload: { problem, language },
      delay: 2000,
      response: `**Generated Solution:**  

\`\`\`javascript
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];

    if (map.has(needed)) {
      return [map.get(needed), i];
    }

    map.set(nums[i], i);
  }

  return [];
}
\`\`\`

**Time:** O(n)  
**Space:** O(n)`,
    });
  }, [runAI]);

  const debugCode = useCallback((code, language) => {
    return runAI({
      type: "debug",
      payload: { code, language },
      delay: 1000,
      response: `🔍 **Debug Report**

**Issues Found:**
1. Missing semicolon  
2. Unused variable  
3. No input validation  

**Fixed Code:**
\`\`\`javascript
function safeTwoSum(nums, target) {
  if (!Array.isArray(nums)) {
    throw new Error("Input must be an array");
  }

  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (map.has(need)) return [map.get(need), i];
    map.set(nums[i], i);
  }
  return [];
}
\`\`\``,
    });
  }, [runAI]);

  const optimizeCode = useCallback((code, language) => {
    return runAI({
      type: "optimization",
      payload: { code, language },
      delay: 1200,
      response: `⚡ **Optimization Summary**

**Before:** O(n²)  
**After:** O(n)

**Optimized Code:**
\`\`\`javascript
function optimizedTwoSum(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];
    if (seen[needed] !== undefined) {
      return [seen[needed], i];
    }
    seen[nums[i]] = i;
  }
  return [];
}
\`\`\`

🚀 Faster & cleaner`,
    });
  }, [runAI]);

  const clearAIResponse = useCallback(() => {
    setAiResponse("");
  }, []);

  const value = {
    aiThinking,
    aiResponse,
    aiHistory,
    analyzeCode,
    generateSolution,
    debugCode,
    optimizeCode,
    clearAIResponse,
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}

export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAI must be used within AIProvider");
  }
  return context;
}
