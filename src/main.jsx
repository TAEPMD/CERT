import React from "react";
import { createRoot } from "react-dom/client";
import { useNavigation } from "./hooks/useNavigation";
import { useCertificateRegistry } from "./hooks/useCertificateRegistry";
import { LandingPage } from "./components/Pages/LandingPage";
import { PublicVerifyPage } from "./components/Pages/PublicVerifyPage";
import { AdminApp } from "./components/Pages/AdminApp";
import "./styles.css";

function RootApp() {
  const { path, navigate } = useNavigation();
  const { rows, setRows, isLoading, error } = useCertificateRegistry();

  if (path.startsWith("/admin")) {
    return (
      <AdminApp
        navigate={navigate}
        rows={rows}
        setRows={setRows}
        isRegistryLoading={isLoading}
        registryError={error}
      />
    );
  }

  if (path.startsWith("/verify")) {
    return (
      <PublicVerifyPage
        navigate={navigate}
        rows={rows}
        isRegistryLoading={isLoading}
        registryError={error}
      />
    );
  }

  return <LandingPage navigate={navigate} />;
}

createRoot(document.getElementById("root")).render(<RootApp />);
