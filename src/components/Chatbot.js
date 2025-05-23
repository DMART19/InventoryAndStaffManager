import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [filesData, setFilesData] = useState([]); // Store extracted file data
  const [isLoading, setIsLoading] = useState(false); // Handle loading state
  const [userGuideContent, setUserGuideContent] = useState(''); // Store user guide content

  // Greet the user when the chatbot is initialized
  useEffect(() => {
    const greetUser = {
      sender: 'bot',
      text: 'Hello! How can I assist you today?',
    };
    setMessages([greetUser]);

    // Load the user guide content
    fetchUserGuide();
  }, []);

  // Function to fetch the user guide content
  const fetchUserGuide = async () => {
    try {
      const response = await fetch('InventoryManagement/UserGuide.txt');
      const text = await response.text();
      setUserGuideContent(text);
    } catch (error) {
      console.error('Error loading user guide:', error);
    }
  };

  // Receive file data from FileUploader
  const handleFilesProcessed = (files) => {
    setFilesData(files);
  };

  // Preprocess input to remove unnecessary spaces
  const preprocessInput = (input) => {
    return input.trim(); // You can add more preprocessing logic here
  };

  // Generate conversation history from previous messages
  const getConversationHistory = () => {
    return messages
      .map((msg) => `${msg.sender === 'user' ? 'User' : 'Bot'}: ${msg.text}`)
      .join('\n');
  };

  // Send message along with extracted document data
  const sendMessage = async () => {
    const userMessage = preprocessInput(input);
    if (!userMessage && filesData.length === 0) return;

    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);
    setIsTyping(true);
    setIsLoading(true);

    // Combine extracted text from files
    const fileContext = filesData.map(file => `File: ${file.name}\nContent: ${file.content}`).join("\n\n");

    // Get conversation history
    const conversationHistory = getConversationHistory();

    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'mistral', // Specify Mistral model in the request
        prompt: `
          You are a FAQ and user guide chatbot for Nexus Inventory. Your job is to assist users with their queries about using Nexus Inventory.
          Please provide concise and accurate responses based on the provided conversation history, user query, and document context.
          Do not deviate from the topic of Nexus Inventory.

          Conversation history:
          ${conversationHistory}

          User query:
          ${userMessage}

          Document context:
          ${fileContext}

          User Guide:
          ${userGuideContent}
        `,
        stream: false,
      });

      const botMessage = response.data.response || 'No response from model';
      setMessages([...newMessages, { sender: 'bot', text: botMessage }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { sender: 'bot', text: 'Sorry, I encountered an error.' }]);
    } finally {
      setInput('');
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <button className="close-button" onClick={onClose}>X</button>
        <span className="chatbot-title">Chatbot Assistant</span>
      </div>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <strong>{msg.sender === 'user' ? 'You: ' : 'Bot: '}</strong>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">Bot is typing...</div>}
        {isLoading && !isTyping && <div className="loading-indicator">Loading...</div>}
      </div>

      <div className="chatbot-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
