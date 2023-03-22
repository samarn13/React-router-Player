import { Outlet } from "react-router-dom";
import "../App.css";

function PlayerLayout() {
  return (
    <>
      <div>
        <div className="title-content">THE BEST PLAYER</div>
        <Outlet />
      </div>
    </>
  );
}
export default PlayerLayout;
