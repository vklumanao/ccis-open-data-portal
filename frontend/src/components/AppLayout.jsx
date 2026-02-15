import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "../styles/layout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
