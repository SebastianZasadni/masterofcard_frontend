import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Table from "./components/Table/Table";
import useUserStore from "./zustand/userStore";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import MainPage from "./pages/MainPage/MainPage";
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));

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
        </Route>
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
