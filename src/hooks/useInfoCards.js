import { useState } from "react";

const useInfoCards = (initialCards, allCards) => {
  const [selectedCards, setSelectedCards] = useState(initialCards);

  const addCard = (card) => {
    setSelectedCards((prev) => (prev.length < 8 ? [...prev, card] : prev));
  };

  const removeCard = (cardKey) => {
    setSelectedCards((prev) => prev.filter((card) => card.key !== cardKey));
  };

  return { selectedCards, addCard, removeCard, allCards };
};

export default useInfoCards;