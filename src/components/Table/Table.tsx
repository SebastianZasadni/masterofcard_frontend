import { useEffect, useState } from "react";
import CardList from "../CardList/CardList";
import Card from "../Card/Card";
import Player from "../Player/Player";
import css from "./Table.module.css";
import { CardTypes } from "../../types/CardTypes";
import DiscardPile from "../DiscardPile/DiscardPile";
import shuffleCards from "../../utils/shuffleCards";
import cards from "../../data/cards";

const Table = () => {
  const [isPlayerOnePlay, setIsPlayerOnePlay] = useState<boolean>();
  const [playerOneCards, setPlayerOneCards] = useState<CardTypes[]>([]);
  const [playerTwoCards, setPlayerTwoCards] = useState<CardTypes[]>([]);
  const [discardPileCards, setDiscardPileCards] = useState<CardTypes[]>([]);

  const handleThrowCard = (card: Card, player: string) => {
    const { id, symbol, letter, power } = card;

    const isNineKaroInDiscardPile = discardPileCards.find(
      (card) => card.symbol === "karo" && card.letter === "9"
    );

    const isLowerCard = () => {
      if (discardPileCards.length === 0) {
        return false;
      }
      return discardPileCards[discardPileCards.length - 1].power > power;
    };

    if (
      isLowerCard() ||
      (!isNineKaroInDiscardPile && !(symbol === "karo" && letter === "9"))
    ) {
      return;
    }

    setDiscardPileCards([...discardPileCards, card]);

    if (player === "one") {
      const filteredCards = playerOneCards.filter((card) => id !== card.id);
      setPlayerOneCards(filteredCards);
      setIsPlayerOnePlay(false);
    }
    if (player === "two") {
      const filteredCards = playerTwoCards.filter((card) => id !== card.id);
      setPlayerTwoCards(filteredCards);
      setIsPlayerOnePlay(true);
    }
    setIsPlayerOnePlay(!isPlayerOnePlay);
  };

  const handleTakeCards = (player: string) => {
    if (discardPileCards.length <= 1) {
      return;
    }
    const takenCards = discardPileCards.slice(
      discardPileCards.length - discardPileCards.length - 3
    );
    if (player === "one") {
      setPlayerOneCards([...playerOneCards, ...takenCards]);
      setIsPlayerOnePlay(false);
      if (discardPileCards.length === 1) return;
      if (discardPileCards.length === 2) {
        return setDiscardPileCards(
          discardPileCards.slice(
            0,
            discardPileCards.length - discardPileCards.length - 1
          )
        );
      }
      if (discardPileCards.length === 3) {
        return setDiscardPileCards(
          discardPileCards.slice(
            0,
            discardPileCards.length - discardPileCards.length - 2
          )
        );
      }

      setDiscardPileCards(
        discardPileCards.slice(
          0,
          discardPileCards.length - discardPileCards.length - 3
        )
      );
    }
    if (player === "two") {
      setPlayerTwoCards([...playerTwoCards, ...takenCards]);
      setIsPlayerOnePlay(true);
      setDiscardPileCards(
        discardPileCards.slice(
          0,
          discardPileCards.length - discardPileCards.length - 3
        )
      );
    }
  };

  const startGame = () => {
    const { firstPileOfCards, secondPileOfCards } = shuffleCards(cards);
    setPlayerOneCards(firstPileOfCards);
    setPlayerTwoCards(secondPileOfCards);
    setDiscardPileCards([]);
    const isPlayerOne = firstPileOfCards.find(
      (card) => card.letter === "9" && card.symbol === "karo"
    );
    isPlayerOne ? setIsPlayerOnePlay(true) : setIsPlayerOnePlay(false);
  };

  useEffect(() => {
    if (discardPileCards.length !== 0) {
      if (playerOneCards.length === 0) {
        return alert("Wygral gracz numer jeden!");
      } else if (playerTwoCards.length === 0) {
        return alert("Wygral gracz numer dwa!");
      }
    }
  }, [playerOneCards, discardPileCards, playerTwoCards]);

  return (
    <div className={css.tableContainer}>
      <button onClick={startGame}>start</button>
      {playerOneCards.length ? (
        <>
          {isPlayerOnePlay ? (
            <Player>
              <button type="button" onClick={() => handleTakeCards("one")}>
                I take
              </button>
              <CardList>
                {playerOneCards.map((card) => {
                  const { id, symbol, letter } = card;
                  return (
                    <li key={id}>
                      <Card
                        symbol={symbol}
                        letter={letter}
                        id={id}
                        handleClick={() => handleThrowCard(card, "one")}
                      />
                    </li>
                  );
                })}
              </CardList>
            </Player>
          ) : (
            <Player>
              <button type="button" onClick={() => handleTakeCards("two")}>
                I take
              </button>
              <CardList>
                {playerTwoCards.map((card) => {
                  const { id, symbol, letter } = card;
                  return (
                    <li key={id}>
                      <Card
                        symbol={symbol}
                        letter={letter}
                        id={id}
                        handleClick={() => handleThrowCard(card, "two")}
                      />
                    </li>
                  );
                })}
              </CardList>
            </Player>
          )}
          <DiscardPile cards={discardPileCards} handleClick={undefined} />
        </>
      ) : null}
    </div>
  );
};
export default Table;
