import { useEffect, useRef, useState } from "react";


export default function CareerCoachChat() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi 👋 I’m your AI Career Coach. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // const sendMessage = async () => {
    //     const res = await fetch("https://api.openai.com/v1/responses",{ 
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_KEY}`
    //         },
    //         body: JSON.stringify({
    //             model: "gpt-4.1-mini",
    //             input: input
    //         })
    //     });

    //     const data = await res.json();
    //     console.log(data,"data")
    //     setMessages([...messages, {
    //         role: "ai",
    //         content: data.choices[0].message.content
    //     }]);
    // };
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
        <div className="coach-container">
            <h2 className="coach-header">🎯 AI Career Coach</h2>

            <div className="coach-chat">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`coach-message ${msg.role === "user" ? "user" : "ai"}`}
                    >
                        {msg.content}
                    </div>
                ))}

                {loading && <div className="coach-typing">AI is typing...</div>}
                <div ref={bottomRef} />
            </div>

            <div className="coach-input-box">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask about career, resume, interview..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
