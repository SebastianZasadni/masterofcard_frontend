import { MouseEventHandler } from "react";
import css from "./Card.module.css";

interface Props {
  symbol: string;
  letter: string;
  id: number;
  handleClick: MouseEventHandler<HTMLDivElement> | undefined;
}

const CardComponent = ({ letter, symbol, handleClick }: Props) => {
  return (
    <div className={css.cardComponent__container} onClick={handleClick}>
      <div className={css.cardLetterAndSymbol__box}>
        <p className={`${css.cardLetter} ${css[symbol]}`}>{letter}</p>
        <svg className={`${css.cardIcon}`}>
          <use href={`/assets/icons.svg#${symbol}`} />
        </svg>
      </div>
      <svg className={`${css.cardIconMiddle}`}>
        <use href={`/assets/icons.svg#${symbol}`} />
      </svg>
    </div>
  );
};

export default CardComponent;
