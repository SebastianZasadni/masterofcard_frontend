import { FormEvent } from "react";
import css from "./FormCreateGame.module.css";
import useGameStore from "../../zustand/gameStore";

const FormCreateGame = () => {
  const { createGame } = useGameStore();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { gameName, gameTime, numberOfPlayers } = form;
    const gameNameValue = gameName.value;
    const gameTimeValue = gameTime.value;
    const numberOfPlayersValue = numberOfPlayers.value;
    createGame(gameNameValue, gameTimeValue, numberOfPlayersValue);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Nazwa stołu
        <input type="text" name="gameName" className={css.inputText} />
      </label>
      <label className={css.label}>
        Czas gry
        <input
          type="number"
          name="gameTime"
          className={css.inputNumber}
          min="5"
          max="20"
        />
      </label>
      <label className={css.label}>
        Liczba graczy
        <input
          min="2"
          max="4"
          type="number"
          name="numberOfPlayers"
          className={css.inputNumber}
        />
      </label>
      <button type="submit" className={css.form__button}>
        Stwórz stół
      </button>
    </form>
  );
};

export default FormCreateGame;
