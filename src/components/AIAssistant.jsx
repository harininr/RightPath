export default function AIAssistant({ response, isLoading }) {
  return (
    <div className="ai-assistant">
      <h3>AI Assistant</h3>
      
      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>AI is analyzing your code...</p>
        </div>
      ) : response ? (
        <div className="ai-response">
          <pre>{response}</pre>
        </div>
      ) : (
        <p>Click "AI Analyze" to get feedback on your code!</p>
      )}
    </div>
  );
}