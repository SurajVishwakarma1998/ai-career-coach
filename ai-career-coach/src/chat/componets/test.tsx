import { useEffect, useRef, useState } from "react";

const SYSTEM_PROMPT = `
You are a professional Career Coach AI.
You help users with:
- Career guidance
- Resume & LinkedIn improvement
- Interview preparation
- Skill roadmap
- Job switch strategy
Keep answers clear, actionable, and supportive.
`;

export default function CareerCoachChat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 I’m your AI Career Coach. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // 🔹 MOCK AI RESPONSE (replace with real API later)
    setTimeout(() => {
      const aiReply = {
        role: "assistant",
        content: `Great question! Here's how I'd approach this:\n\n1. Clarify your career goal\n2. Identify skill gaps\n3. Build a focused learning plan\n4. Apply with targeted strategy\n\nTell me more about your background so I can guide you better.`
      };
      setMessages((prev) => [...prev, aiReply]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🎯 AI Career Coach</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#2563eb" : "#e5e7eb",
              color: msg.role === "user" ? "#fff" : "#000"
            }}
          >
            {msg.content}
          </div>
        ))}

        {loading && <div style={styles.typing}>AI is typing...</div>}
        <div ref={bottomRef} />
      </div>

      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about career, resume, interview..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    fontFamily: "sans-serif"
  },
  header: {
    padding: 16,
    borderBottom: "1px solid #e5e7eb",
    textAlign: "center"
  },
  chatBox: {
    padding: 16,
    height: 350,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  message: {
    padding: "10px 14px",
    borderRadius: 12,
    maxWidth: "80%",
    whiteSpace: "pre-line"
  },
  typing: {
    fontSize: 12,
    color: "#6b7280"
  },
  inputBox: {
    display: "flex",
    gap: 8,
    padding: 12,
    borderTop: "1px solid #e5e7eb"
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #d1d5db"
  },
  button: {
    padding: "10px 16px",
    borderRadius: 8,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }
};
