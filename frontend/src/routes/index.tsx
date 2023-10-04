import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/home/index";
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="*" element={<Navigate to={"/home"} />}></Route>
    </Routes>
  );
};
