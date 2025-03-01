import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Einfratech Systems India! How can I assist you?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [showQuestions, setShowQuestions] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [blinking, setBlinking] = useState(true);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const blinkingQuestions = ["Hi Einfra", "How can I help you?"];

  const faq = {
    "What services do you offer?": "We specialize in IT solutions, software development, and cloud services.",
    "Where is your company located?": "We are based in India with offices in multiple cities.",
    "How can I contact support?": "You can reach us at support@einfratech.com.",
    "What industries do you serve?": "We serve industries like finance, healthcare, and manufacturing.",
    "Do you provide custom software development?": "Yes, we offer tailored software solutions for businesses.",
    "Do you offer cloud services?": "Yes, we provide cloud computing and hosting solutions.",
    "How can I request a demo?": "You can request a demo by contacting us via email or phone.",
  };

  useEffect(() => {
    let interval;
    if (hovering) {
      interval = setInterval(() => {
        setBlinking((prev) => !prev);
      }, 800);
    } else {
      setBlinking(true);
    }
    return () => clearInterval(interval);
  }, [hovering]);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setHovering(true);
    }, 1500);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setHovering(false);
  };

  const handleUserMessage = (message) => {
    let botReply = faq[message] || "Sorry, I don't have an answer for that.";
    setShowQuestions(true);

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: message, sender: "user" },
      { id: prev.length + 2, text: botReply, sender: "bot" }
    ]);
  };

  return (
    <div>
      {hovering && (
        <div style={styles.blinkingContainer}>
          {blinkingQuestions.map((question, index) => (
            <div
              key={index}
              style={{ ...styles.blinkingQuestion, opacity: blinking ? 1 : 0 }}
              onClick={() => handleUserMessage(question)}
            >
              {question}
            </div>
          ))}
        </div>
      )}

      <button
        style={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        💬 Chat
      </button>

      {isOpen && (
        <div style={styles.popupContainer}>
          <div style={styles.card}>
            <div style={styles.header}>
              Einfratech Chatbot
              <button style={styles.closeButton} onClick={() => setIsOpen(false)}>✖</button>
            </div>

            <div style={styles.chatWindow}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    ...styles.message,
                    alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
                    backgroundColor: msg.sender === "bot" ? "#f0f0f0" : "#007bff",
                    color: msg.sender === "bot" ? "#000" : "#fff"
                  }}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {showQuestions && (
              <div style={styles.questionsContainer}>
                {Object.keys(faq).map((question, index) => (
                  <button key={index} style={styles.questionButton} onClick={() => handleUserMessage(question)}>
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div style={styles.inputContainer}>
              <input
                type="text"
                style={styles.input}
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUserMessage(input)}
              />
              <button style={styles.sendButton} onClick={() => handleUserMessage(input)}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  blinkingContainer: {
    position: "fixed", bottom: "100px", right: "20px",
    display: "flex", flexDirection: "column", gap: "5px",
    alignItems: "flex-end"
  },
  blinkingQuestion: {
    backgroundColor: "#ffcc00", padding: "10px 15px",
    borderRadius: "8px", color: "#000", fontWeight: "bold",
    cursor: "pointer", boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
  },
  chatButton: {
    position: "fixed", bottom: "20px", right: "20px",
    backgroundColor: "#007bff", color: "white",
    borderRadius: "50%", width: "50px", height: "50px",
    border: "none", fontSize: "20px", cursor: "pointer",
    display: "flex", justifyContent: "center", alignItems: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
  },
  popupContainer: {
    position: "fixed", bottom: "80px", right: "20px",
    width: "350px", backgroundColor: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)", borderRadius: "12px"
  },
  card: {
    display: "flex", flexDirection: "column", padding: "16px"
  },
  header: {
    fontSize: "18px", fontWeight: "bold", textAlign: "center",
    display: "flex", alignItems: "center", justifyContent: "space-between"
  },
  closeButton: {
    background: "none", border: "none", fontSize: "16px", cursor: "pointer"
  },
  chatWindow: {
    maxHeight: "250px", overflowY: "auto", padding: "8px",
    backgroundColor: "#e9ecef", borderRadius: "8px",
    display: "flex", flexDirection: "column"
  },
  message: {
    padding: "8px 12px", borderRadius: "8px",
    maxWidth: "75%", marginBottom: "8px"
  },
  questionsContainer: {
    marginTop: "12px", display: "flex", flexWrap: "wrap",
    gap: "8px", justifyContent: "center"
  },
  questionButton: {
    padding: "8px", border: "none", borderRadius: "6px",
    backgroundColor: "#007bff", color: "white",
    cursor: "pointer", transition: "0.3s", textAlign: "center"
  },
  inputContainer: {
    display: "flex", marginTop: "12px"
  },
  input: {
    flex: 1, padding: "8px", border: "1px solid #ccc",
    borderRadius: "6px 0 0 6px"
  },
  sendButton: {
    padding: "8px 12px", backgroundColor: "#007bff", color: "white",
    border: "none", borderRadius: "0 6px 6px 0", cursor: "pointer"
  }
};

export default Chatbot;
