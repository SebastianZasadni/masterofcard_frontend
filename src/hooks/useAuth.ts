import useUserStore from "../zustand/userStore";

const useAuth = () => {
  const { isLogged } = useUserStore();
  return isLogged;
};

export default useAuth;
