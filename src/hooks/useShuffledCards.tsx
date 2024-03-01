import { useEffect, useState } from "react";
import shuffleCards from "../utils/shuffleCards";
import cards from "../data/cards";
import { Card } from "../types/CardTypes";

const useShuffledCards = () => {
  const [firstPileOfCards, setFirstPileOfCards] = useState<Card[]>([]);
  const [secondPileOfCards, setSecondPileOfCards] = useState<Card[]>([]);

  const shuffledCards = shuffleCards(cards);
  const compareIdsDescending = (a: { id: number }, b: { id: number }) =>
    b.id - a.id;
  setFirstPileOfCards(shuffledCards.slice(0, 12).sort(compareIdsDescending));
  setSecondPileOfCards(shuffledCards.slice(12, 24).sort(compareIdsDescending));

  return { firstPileOfCards, secondPileOfCards };
};

export default useShuffledCards;
