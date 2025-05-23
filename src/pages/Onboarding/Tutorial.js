import React, { useEffect } from "react";
import introJs from "intro.js";
import "intro.js/introjs.css"; // Import Intro.js CSS
import { useNavigate } from "react-router-dom";

const Tutorial = ({ steps, page }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the tutorial when the component mounts
    introJs()
      .setOptions({
        steps: steps,
        showProgress: true,
        showBullets: false,
        scrollToElement: true, // Auto-scroll to highlighted elements
        disableInteraction: true, // Disable interaction with non-highlighted elements
      })
      .onexit(() => {
        navigate("/quick-actions-menu"); // Return to the Quick Actions Menu after the tutorial
      })
      .start();

    // Cleanup when the component unmounts
    return () => {
      introJs().exit(); // Exit the tutorial
    };
  }, [steps, page, navigate]);

  return null; // This component doesn't render anything
};

export default Tutorial;