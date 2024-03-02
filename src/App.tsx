import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Table from "./components/Table/Table";
import useUserStore from "./zustand/userStore";
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
            <RestrictedRoute redirectTo="/table" component={<WelcomePage />} />
          }
        />
        <Route
          path="table"
          index
          element={
            <ProtectedRoute redirectTo="/welcome" component={<Table />} />
          }
        />
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
