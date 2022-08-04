import { Route, Routes as Switch } from "react-router-dom";

import { CreateUpdate } from "./pages/CreateUpdate";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

function Routes(): JSX.Element {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateUpdate />} />
      <Route path="/edit/:themeId" element={<CreateUpdate />} />
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}

export default Routes;
