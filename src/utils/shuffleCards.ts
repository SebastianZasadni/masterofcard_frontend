import { Card } from "../types/CardTypes";

const shuffleCards = (cards: Card[]) => {
  const compareRandom = () => {
    return Math.random() - 0.5;
  };
  const shuffledCards = cards.sort(compareRandom);
  const compareIdsDescending = (a: { id: number }, b: { id: number }) =>
    b.id - a.id;
  const firstPileOfCards = shuffledCards
    .slice(0, 12)
    .sort(compareIdsDescending);
  const secondPileOfCards = shuffledCards
    .slice(12, 24)
    .sort(compareIdsDescending);

  return { firstPileOfCards, secondPileOfCards };
};

export default shuffleCards;
