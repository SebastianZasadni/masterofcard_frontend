import { create } from "zustand";
import { Notify, Loading } from "notiflix";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// Określenie interfejsu dla stanu autoryzacji
interface AuthState {
  token: string | null;
  isLogged: boolean;
  login: any;
  refreshUser: any;
}

// Początkowy stan autoryzacji
const initialState: AuthState = {
  token: null,
  isLogged: false,
  login: async () => {},
  refreshUser: async () => {},
};

// Utworzenie hooka zustand dla stanu autoryzacji
export const useUserStore = create<AuthState>((set) => ({
  ...initialState,

  login: async (name: string) => {
    Loading.standard("Logging in...");
    try {
      const response = await axios.post("/users/loginGuest", { name });
      const { guest } = response.data;
      set({ token: guest.token, isLogged: true });
      localStorage.setItem("token", guest.token);
      setAuthHeader(guest.token);
      Loading.remove();
      Notify.success("Logged in successfully.");
      return response.data;
    } catch (error) {
      Loading.remove();
      Notify.failure("Invalid email or password.");
      throw new Error("Invalid email or password.");
    }
  },

  refreshUser: async () => {
    Loading.standard("Logging in...");
    try {
      const persistedToken = localStorage.getItem("token") || "";
      if (!persistedToken) {
        throw new Error("Token not found");
      }
      set({ token: persistedToken, isLogged: true });
      setAuthHeader(persistedToken);
      const response = await axios.get("/users/current");
      Loading.remove();
      return response.data;
    } catch (error) {
      Loading.remove();
      throw new Error("Unable to fetch user");
    }
  },
  logout: async () => {
    Loading.standard("Logging in...");
    try {
      await axios.get("/users/logout");
      localStorage.clear();
      set({ token: null, isLogged: false });
      Notify.success("Logged out successfully.");
      Loading.remove();
      clearAuthHeader();
    } catch (error) {
      Loading.remove();
      throw new Error("Unable to fetch user");
    }
  },
}));

export default useUserStore;
