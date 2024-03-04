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
  name: string | null;
  login: any;
  refreshUser: any;
  logout: any;
}

const initialState: AuthState = {
  token: null,
  isLogged: false,
  name: "",
  login: async () => {},
  refreshUser: async () => {},
  logout: async () => {},
};

export const useUserStore = create<AuthState>((set) => ({
  ...initialState,

  login: async (name: string) => {
    Loading.standard("Logging in...");
    try {
      const response = await axios.post("/users/loginGuest", { name });
      const { guest } = response.data;
      set({ token: guest.token, isLogged: true, name: guest.name });
      localStorage.setItem("token", guest.token);
      localStorage.setItem("name", guest.name);
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
      const name = localStorage.getItem("name") || "";
      if (!persistedToken) {
        throw new Error("Token not found");
      }
      set({ token: persistedToken, isLogged: true, name });

      setAuthHeader(persistedToken);
      const response = await axios.get("/users/current");
      console.log(response.data.name);

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
      set({ token: null, isLogged: false, name: null });
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
