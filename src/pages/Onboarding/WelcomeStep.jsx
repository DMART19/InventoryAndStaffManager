import React from "react";

function WelcomeStep({ title, description, onNext }) {
  return (
    <div className="welcome-step">
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default WelcomeStep;