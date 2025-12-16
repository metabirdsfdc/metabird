import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import MetabirdLanding from "./components/MetabirdLanding";
import PageSpinner from "./components/modals/PageSpinner";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Deployments from "./pages/Deployments";
import Help from "./pages/Help";
import History from "./pages/History";
import Organizations from "./pages/Organizations";
import Personalization from "./pages/Personalization";
import Settings from "./pages/Settings";

const App: React.FC = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <PageSpinner />;
  return (
    <Routes>
      {!isAuthenticated && <Route path="/" element={<MetabirdLanding />} />}
      {isAuthenticated && (
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="deployments" element={<Deployments />} />
            <Route path="history" element={<History />} />
            <Route path="organizations" element={<Organizations />} />

            <Route path="settings" element={<Settings />} />
            <Route path="personalization" element={<Personalization />} />
            <Route path="help" element={<Help />} />
          </Route>
        </Route>
      )}
      <Route path="*" element={<div>404 – Page Not Found</div>} />
    </Routes>
  );
};

export default App;
