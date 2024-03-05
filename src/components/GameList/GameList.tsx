import { GameState } from "../../zustand/gameStore";
import css from "./GameList.module.css";

const GameList = ({ gameList }: { gameList: GameState[] }) => {
  return (
    <ul className={css.gamesList}>
      {gameList.length
        ? gameList.map((game) => {
            return (
              <li key={game._id} className={css.gamesList__item}>
                <>
                  <p>Nazwa gry: </p>
                  <p>{game.name}</p>
                </>
                <>
                  <p>Czas gry: </p>
                  <p>{game.playTime}</p>
                </>
                <>
                  <p>Liczba graczy: </p>
                  <p>{game.numberOfPlayers}</p>
                </>
              </li>
            );
          })
        : null}
    </ul>
  );
};

export default GameList;
