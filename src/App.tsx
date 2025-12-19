import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import MetabirdLanding from "./components/MetabirdLanding";
import PageSpinner from "./components/modals/PageSpinner";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import PublicRoute from "./context/PublicRoute";
import MainLayout from "./layouts/MainLayout";

import Deployments from "./pages/Deployments";
import NotFound from "./pages/NotFound";
import Organizations from "./pages/Organizations";
import Settings from "./pages/Settings";

const App: React.FC = () => {
  const { loading } = useContext(AuthContext);

  if (loading) return <PageSpinner />;

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<MetabirdLanding />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Deployments />} />
          <Route path="orgs" element={<Organizations />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
