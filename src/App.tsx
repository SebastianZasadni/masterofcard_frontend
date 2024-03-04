import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import useUserStore from "./zustand/userStore";
import SharedLayout from "./components/SharedLayout/SharedLayout";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const PanPage = lazy(() => import("./pages/PanPage/PanPage"));

const App = () => {
  const { refreshUser } = useUserStore();
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route
          index
          path="welcome"
          element={
            <RestrictedRoute redirectTo="/main" component={<WelcomePage />} />
          }
        />
        <Route
          element={
            <ProtectedRoute
              redirectTo="/welcome"
              component={<SharedLayout />}
            />
          }
        >
          <Route path="main" index element={<MainPage />} />
          <Route path="pan" index element={<PanPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
