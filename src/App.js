import "./App.css";
import "./css/home.css";
import "./css/nav.css";
import "./css/playerDetail.css";
import "./css/player.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/HomePage";
import PlayerLayout from "./layout/playerLayout";
import PlayerPages, { playerLoader } from "./pages/playerPage";
import PlayerDetailPage, {
  loader as deteilLoader,
} from "./pages/playerDetailPage";
import ErrorPage from "./componet/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="players" element={<PlayerLayout />}>
        <Route index element={<PlayerPages />} loader={playerLoader} />
        <Route
          path=":id"
          element={<PlayerDetailPage />}
          loader={deteilLoader}
          errorElement={<ErrorPage />}
        />
      </Route>
    </Route>
  )
);
const App = () => <RouterProvider router={router} />;
export default App;
