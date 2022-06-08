import { Route, Routes as RoutesReact } from "react-router-dom";

import Home from "../pages/Home";
import NewRoom from "../pages/NewRoom";

function Routes() {
  return (
    <RoutesReact>
      <Route path="/" element={<Home />} />
      <Route path="/rooms/new" element={<NewRoom />} />
    </RoutesReact>
  );
}

export default Routes;
