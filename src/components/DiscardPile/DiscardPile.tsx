import { MouseEventHandler } from "react";
import CardComponent from "../Card/Card";
import { Card } from "../../types/CardTypes";

const DiscardPile = ({
  cards,
  handleClick,
}: {
  cards: Card[];
  handleClick: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <ul>
      {cards.map((card) => {
        const { id, symbol, letter } = card;
        return (
          <li key={id}>
            <CardComponent
              symbol={symbol}
              letter={letter}
              id={id}
              handleClick={handleClick}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default DiscardPile;
