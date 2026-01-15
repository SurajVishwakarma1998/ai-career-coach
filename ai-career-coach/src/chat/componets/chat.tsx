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

    const sendMessage = async () => {
        const res = await fetch("https://api.openai.com/v1/responses",{ 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                input: messages.content
            })
        });

        const data = await res.json();
        setMessages([...messages, {
            role: "ai",
            content: data.choices[0].message.content
        }]);
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
