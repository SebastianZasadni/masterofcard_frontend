import css from "./CardList.module.css";
import { ChildrenJSX } from "../../types/Children";

const CardList = ({ children }: ChildrenJSX) => {
  return <ul className={css.cardList}>{children}</ul>;
};

export default CardList;
