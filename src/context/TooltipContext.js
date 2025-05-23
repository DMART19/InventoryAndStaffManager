// src/contexts/TooltipContext.js
import { createContext, useContext, useState } from 'react';

const TooltipContext = createContext({
  tooltipsEnabled: true,
  toggleTooltips: () => {},
});

export const TooltipProvider = ({ children }) => {
  const [tooltipsEnabled, setTooltipsEnabled] = useState(true);

  const toggleTooltips = () => {
    setTooltipsEnabled(prev => !prev);
  };

  return (
    <TooltipContext.Provider value={{ tooltipsEnabled, toggleTooltips }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltips = () => useContext(TooltipContext);