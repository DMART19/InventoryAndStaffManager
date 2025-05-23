import React from "react";
import './Greeting.css';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const Greeting = ({ name }) => {
  return <h2 className="greeting-header">{getGreeting()}, {name}!</h2>;
};

export default Greeting;
