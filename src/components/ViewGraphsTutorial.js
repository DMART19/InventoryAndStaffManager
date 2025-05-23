import React, { useEffect } from "react";
import introJs from "intro.js";
import "intro.js/introjs.css";
import { useNavigate } from "react-router-dom";

const ViewGraphsTutorial = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const steps = [
      {
        element: "#graphs-section",
        intro: "This section displays interactive charts to visualize your data.",
      },
      {
        element: "#chart-toggle-button",
        intro: "Use this button to show or hide the chart options panel.",
      },
    ];

    introJs()
      .setOptions({
        steps: steps,
        showProgress: true,
        showBullets: false,
        scrollToElement: true,
        disableInteraction: true,
      })
      .onexit(() => {
        navigate("/quick-actions-menu"); // Return to the Quick Actions Menu after the tutorial
      })
      .start();
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default ViewGraphsTutorial;