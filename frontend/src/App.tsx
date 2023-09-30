import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/index";

import "./socket";
export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
