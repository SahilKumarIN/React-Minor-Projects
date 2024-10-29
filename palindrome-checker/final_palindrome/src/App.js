import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");

  const handleCheckPalindrome = () => {
    const cleanedText = inputText.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const reversedText = cleanedText.split("").reverse().join("");

    if (cleanedText === reversedText) {
      setResult("Yes, it's a palindrome!");
    } else {
      setResult("No, it's not a palindrome.");
    }
  };

  // Define CSS as JavaScript objects
  const appContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", // Gradient background
  };

  const boxStyle = {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "2em",
    color: "#333",
    marginBottom: "20px",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    maxWidth: "500px",
    border: "2px solid #ddd",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.3s",
  };

  const buttonStyle = {
    padding: "10px 20px",
    marginTop: "20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  };

  const resultTextStyle = {
    fontSize: "18px",
    color: "#333",
    marginTop: "20px",
  };

  return (
    <div style={appContainerStyle}>
      <div style={boxStyle}>
        <h1 style={headingStyle}>Palindrome Checker</h1>
        <input
          type="text"
          placeholder="Enter text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleCheckPalindrome} style={buttonStyle}>
          Check
        </button>
        <p style={resultTextStyle}>{result}</p>
      </div>
    </div>
  );
}

export default App;
