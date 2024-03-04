import { NavLink } from "react-router-dom";
import useUserStore from "../../zustand/userStore";
import css from "./Header.module.css";

const Header = () => {
  const { name, logout } = useUserStore();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className={css.header__container}>
      <div className={css.header__logo}>
        <NavLink to="/main">MOF</NavLink>
      </div>
      <p className={css.userName}>{name}</p>
      <button
        type="button"
        onClick={handleLogout}
        className={css.header__button}
      >
        Wyloguj się
      </button>
    </div>
  );
};

export default Header;
