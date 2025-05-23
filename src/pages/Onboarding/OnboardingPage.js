import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./OnboardingPage.css";
import WelcomeStep from "./WelcomeStep"; // Import WelcomeStep
import FeatureStep from "./FeatureStep"; // Import FeatureStep

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const steps = [
    {
      title: "Welcome to Company Manager!",
      description:
        "Take control of your business operations with our all-in-one management platform. From scheduling to inventory, staff, and tasks, we’ve got you covered. Let’s get started!",
      cta: "Get Started",
    },
    {
      title: "Your Business at a Glance",
      features: [
        "Track key metrics like staff availability and inventory levels.",
        "Visualize data with interactive charts and graphs.",
        "Monitor recent activities and updates in real-time.",
        "Customize your dashboard to focus on what matters most.",
      ],
      image: "dashboard-snapshot.jpg",
    },
    {
      title: "Manage Your Team with Ease",
      features: [
        "Store and update staff details in one place.",
        "Track training progress and certification deadlines.",
        "Stay updated with staff activities and task assignments.",
        "Visualize team performance and engagement with insightful charts.",
      ],
      image: "staff-snapshot.jpg",
    },
    {
      title: "Effortless Inventory Management",
      features: [
        "Track stock levels and receive alerts when items run low.",
        "Log maintenance activities to keep everything running smoothly.",
        "Scan barcodes to update inventory or check items in/out.",
        "Visualize inventory trends with easy-to-read charts.",
      ],
      image: "inventory-snapshot.jpg",
    },
    {
      title: "Boost Productivity with Task Management",
      features: [
        "Create, assign, and track tasks with ease.",
        "Log task-related activities for better accountability.",
        "Use pre-built templates for common workflows.",
        "Visualize task progress and trends over time.",
      ],
      image: "task-snapshot.jpg",
    },
    {
      title: "Stay Organized with Our Calendar",
      features: [
        "Plan and manage events effortlessly.",
        "Set reminders and attach files to keep everything in one place.",
        "Filter events by team, category, or search for quick access.",
        "Export your schedule to CSV or PDF for easy sharing.",
        "Sync with Google Calendar or Outlook for seamless integration.",
      ],
      image: "calendar-snapshot.jpg",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1); // Move to the next step
    } else {
      // Redirect to the Quick Actions Menu after onboarding
      navigate("/quick-actions-menu");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1); // Move to the previous step
    }
  };

  return (
    <div className="onboarding-container">
      {currentStep === 0 ? (
        <WelcomeStep
          title={steps[currentStep].title}
          description={steps[currentStep].description}
          onNext={handleNext}
        />
      ) : (
        <FeatureStep
          title={steps[currentStep].title}
          features={steps[currentStep].features}
          image={steps[currentStep].image}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isLastStep={currentStep === steps.length - 1} // Pass whether it's the last step
        />
      )}
    </div>
  );
};

export default OnboardingPage;