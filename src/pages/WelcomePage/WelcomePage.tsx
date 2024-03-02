import { FormEvent } from "react";
import css from "./WelcomePage.module.css";
import useUserStore from "../../zustand/userStore";

const WelcomePage = () => {
  const { login } = useUserStore();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.nick.value;
    login(name);
  };

  return (
    <div className={css.welcomePage__container}>
      <form className={css.welcomePage__form} onSubmit={handleSubmit}>
        <input className={css.welcomePage__input} name="nick" />
        <button type="submit" className={css.welcomePage__button}>
          Zaloguj jako gość
        </button>
      </form>
    </div>
  );
};

export default WelcomePage;
