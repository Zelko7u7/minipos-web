import { useState } from 'react'
import './App.css'
//Contenido de la pagina 
import DepartamentsPage from "./pages/DepartamentsPage";
import TestMenuOptionPage from "./pages/TestMenuOptionPage";
import About from "./pages/About";

import CustomersPage from './pages/CustomersPage'; "./pages/CustomersPage";
//Organizador de la interfaz
import MainLayout from "./layouts/MainLayout";
//Conenedor del menu
import SidebarMenu from "./components/SidebarMenu";
function App() {
  const [page, setPage] = useState("customers");
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
  return (
    <MainLayout
      sidebar={<SidebarMenu current={page} onChange={setPage} />
      }
      content={renderContent()} />
  )
}
export default App