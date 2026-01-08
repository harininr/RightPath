export default function CodeEditor({ code, setCode, language }) {
  return (
    <textarea
      className="code-editor"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder={`Write your ${language} code here...`}
      spellCheck="false"
    />
  );
}