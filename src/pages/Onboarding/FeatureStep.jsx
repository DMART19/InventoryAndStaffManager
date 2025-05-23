import React from "react";

const FeatureStep = ({ title, features, image, onNext, onPrevious, isLastStep }) => {
  return (
    <div className="feature-step">
      <h2>{title}</h2>
      <div className="feature-content">
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <div className="snapshot">
          <img src={image} alt={title} />
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={onPrevious}>Previous</button>
        <button onClick={onNext}>
          {isLastStep ? "Finish" : "Next"} {/* Show "Finish" on the last step */}
        </button>
      </div>
    </div>
  );
};

export default FeatureStep;