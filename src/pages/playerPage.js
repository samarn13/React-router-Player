import {
  Form,
  Link,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import { getPlayers } from "../playerData";
import "../App.css";

const PlayerPages = () => {
  const players = useLoaderData();
  const list = players.map((e) => (
    <Link key={e.id} to={e.id}>
      <li title={e.leagues}>{e.name}</li>
    </Link>
  ));

  const nums = useLoaderData();
  const num = nums.map((e) => (
    <Link key={e.id} to={e.id}>
      <li title={e.leagues}>{e.id}</li>
    </Link>
  ));

  const imags = useLoaderData();
  const img = imags.map((e) => (
    <Link key={e.id} to={e.id}>
      <li title={e.leagues}>{e.img}</li>
    </Link>
  ));
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  console.log(q);

  const submit = useSubmit();
  const resetSearch = (e) => {
    const param = searchParams.get("q");
    if (param) {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
  };

  return (
    <>
      <Form id="search-form" role={"search"}>
        <fieldset>
          <legend>Search</legend>
          <input
            defaultValue={q}
            id="q"
            placeholder="Search"
            type={"search"}
            name="q"
            onChange={(event) => {
              const isFistSearch = q == null;
              submit(event.currentTarget.form, { replace: !isFistSearch });
            }}
          />
          <input id="reset-bt" type={"reset"} onClick={resetSearch} />
        </fieldset>
      </Form>
      {players.length ? (
        // <ul className="list-item">{list}</ul>
        <div className="cantent-table">
          <table id="table-data">
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Images</th>
            </tr>
            <tr>
              <td>{num}</td>
              <td>{list}</td>
              <td>{img}</td>
            </tr>
          </table>
        </div>
      ) : (
        "No product available"
      )}
    </>
  );
};

export default PlayerPages;

export async function playerLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  const players = await getPlayers(q);
  return players;
}
