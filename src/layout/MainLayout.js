import { NavLink, Outlet } from "react-router-dom";
import "../css/nav.css";
const MainLayout = () => {
  return (
    <>
      <div className="container">
        <nav>
          <NavLink to="/">Home</NavLink>&nbsp;
          <NavLink to="/players">Player</NavLink>&nbsp;
          <NavLink to="/about">About</NavLink>&nbsp;
        </nav>
        <div className="container">
          <Outlet />
        </div>
        <footer>-----------This is a footer-----------</footer>
      </div>
    </>
  );
};

export default MainLayout;
