import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("GMT");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [customColors, setCustomColors] = useState({
    primary: "#007bff",
    background: "#f9f9f9",
  });

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.body.className = newTheme === "light" ? "light-mode" : "dark-mode";
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    document.body.style.fontSize =
      size === "small" ? "14px" : size === "large" ? "18px" : "16px";
  };

  const handleColorChange = (key, value) => {
    setCustomColors((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme: handleThemeChange,
        fontSize,
        setFontSize: handleFontSizeChange,
        language,
        setLanguage,
        timezone,
        setTimezone,
        dateFormat,
        setDateFormat,
        customColors,
        setCustomColors: handleColorChange,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};