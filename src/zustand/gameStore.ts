import { create } from "zustand";
import { Notify, Loading } from "notiflix";
import axios from "axios";
import { CardTypes } from "../types/CardTypes";

axios.defaults.baseURL = "http://localhost:5000/api";

export interface GameState {
  _id: string;
  name: string;
  playTime: number;
  onwerId: string;
  numberOfPlayers: number;
  discardPileCards: CardTypes[] | [];
  playerOneCards: CardTypes[] | [];
  playerTwoCards: CardTypes[] | [];
  playerThreeCards: CardTypes[] | [];
  playerFourCards: CardTypes[] | [];
}

interface InitialState {
  gameList: GameState[];
  createGame: any;
  getListGames: any;
}

const initialState: InitialState = {
  gameList: [],
  createGame: async () => {},
  getListGames: async () => {},
};

const useGameStore = create<InitialState>((set) => ({
  ...initialState,
  createGame: async (
    name: string,
    playTime: number,
    numberOfPlayers: number
  ) => {
    Loading.standard("Adding game...");
    try {
      const response = await axios.post("/game/createGame", {
        name,
        playTime,
        numberOfPlayers,
      });
      Loading.remove();
      Notify.success("Game has been created.");
      set((state) => ({
        ...state,
        gameList: [...state.gameList, response.data.data],
      }));
    } catch (error: any) {
      if (error.response.data.message === "Name is taken") {
        Loading.remove();
        return Notify.info("Name of game is taken");
      } else {
        Loading.remove();
        Notify.failure("You can only create one game.");
      }
    }
  },
  getListGames: async () => {
    try {
      const response = await axios.post("/game/getListGames");
      set(() => ({ gameList: response.data.data }));
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useGameStore;
