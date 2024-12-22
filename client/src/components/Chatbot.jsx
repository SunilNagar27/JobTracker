import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Popup visibility state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Toggle Popup
  const handleToggle = () => setIsOpen(!isOpen);

  // Send Message to OpenAI API
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [...messages, userMessage],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const botMessage = { role: "assistant", content: response.data.choices[0].message.content };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      const errorMessage = { role: "assistant", content: "Sorry, I couldn't process that." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInput(""); // Clear input field
  };

  return (
    <div>
      {/* Chat Button */}
      <button className="chatbot-toggle" onClick={handleToggle}>
        Chat with AI
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-modal-content">
            <div className="chatbot-header">
              <h3>AI Chatbot</h3>
              <button className="chatbot-close" onClick={handleToggle}>
                &times;
              </button>
            </div>
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chatbot-message ${
                    message.role === "user" ? "user-message" : "bot-message"
                  }`}
                >
                  {message.content}
                </div>
              ))}
            </div>
            <div className="chatbot-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
