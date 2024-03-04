import { Suspense } from "react";
import Header from "../Header/Header";
import css from "./SharedLayout.module.css";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <div className={css.sharedLayout__container}>
      <Header />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default SharedLayout;
