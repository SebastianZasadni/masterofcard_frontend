import { useEffect } from "react";
import FormCreateGame from "../../components/FormCreateGame/FormCreateGame";
import GameList from "../../components/GameList/GameList";
import css from "./PanPage.module.css";
import useGameStore from "../../zustand/gameStore";

const PanPage = () => {
  const { getListGames, gameList } = useGameStore();
  useEffect(() => {
    getListGames();
  }, [getListGames]);

  return (
    <div className={css.panPage__container}>
      <FormCreateGame />
      <GameList gameList={gameList} />
    </div>
  );
};

export default PanPage;
