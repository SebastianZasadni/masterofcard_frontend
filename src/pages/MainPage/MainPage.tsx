import { NavLink } from "react-router-dom";
import css from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className={css.mainPage__container}>
      <ul className={css.gamesList}>
        <li>
          <NavLink to="/pan" className={css.gameList__link}>Pan</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MainPage;
