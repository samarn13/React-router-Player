import { Link, useLocation } from "react-router-dom";
import "./BreadCrambs.css";

const BreadCrumbs = () => {
  const location = useLocation();
  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumbs) => crumbs !== "")
    .map((crumbs) => {
      currentLink += `/${crumbs}`;

      return (
        <div className="crumb" key={crumbs}>
          <Link to={currentLink}>{crumbs}</Link>
        </div>
      );
    });

  return <div className="breadcrumbs">{crumbs}</div>;
};
export default BreadCrumbs;
