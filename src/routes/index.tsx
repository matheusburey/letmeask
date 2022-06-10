import { Route, Routes as RoutesReact } from "react-router-dom";

import Home from "../pages/Home";
import NewRoom from "../pages/NewRoom";
import Room from "../pages/Room";

function Routes() {
  return (
    <RoutesReact>
      <Route path="/" element={<Home />} />
      <Route path="/rooms/new" element={<NewRoom />} />
      <Route path="/rooms/:id" element={<Room />} />
    </RoutesReact>
  );
}

export default Routes;
