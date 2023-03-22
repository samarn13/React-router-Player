import { useLoaderData } from "react-router-dom";
import { getPlayer } from "../playerData";
import "../App.css";
import "../css/playerDetail.css";
import BreadCrumbs from "../componet/BreadCrambs";

const PlayerDetailPage = () => {
  const player = useLoaderData();

  return (
    <>
      <div className="item">
        <BreadCrumbs />
        {player ? (
          <>
            <div className="content-item">
              <img
                src={require(`../img/${player.img}`)}
                alt={player.img}
                style={{ width: "500px", height: "auto" }}
              />
            </div>
            <h2 className="title">{player.name}</h2>
            <div className="item-id">
              <span>Number : </span>
              {player.id}
            </div>
            <div className="item-team">
              <span>Team : </span>
              {player.team}
            </div>
            <div className="item-leages">
              <span>Leagues : </span>
              {player.leagues}
            </div>
            <div className="item-nation">
              <span>Nationlity : </span>
              {player.nationality}
            </div>
            <div className="item-age">
              <span>Age : </span>
              {player.age}
            </div>
            <div className="item-desc">
              <span>Desc : </span>
              {player.desc}
            </div>
          </>
        ) : (
          <div className="item-no">No such product!</div>
        )}
      </div>
    </>
  );
};
export default PlayerDetailPage;
export async function loader({ params }) {
  const res = await getPlayer(params.id);
  return res;
}
