import { useState } from "react";
import "./App.css";

import MainLayout from "./layouts/MainLayout";
import CustomersPage from "./pages/CustomersPage";
import DepartamentsPage from "./pages/DepartamentsPage";
import TestMenuOptionPage from "./pages/TestMenuOptionPage";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import { storage } from "./utils/storage";

function App() {
  const [page, setPage] = useState("customers");
  const [isLogged, setIsLogged] = useState(!!storage.getToken());

  function renderContent() {
    switch (page) {
      case "customers":
        return <CustomersPage />;
      case "departments":
        return <DepartamentsPage />;
      case "TestMenuOptionPage":
        return <TestMenuOptionPage />;
      case "About":
        return <About />;
      default:
        return <CustomersPage />;
    }
  }

  if (!isLogged) {
    return <LoginPage onSuccess={() => setIsLogged(true)} />;
  }

  return (
    <MainLayout
      current={page}
      onChange={setPage}
      content={renderContent()}
    />
  );
}

export default App;