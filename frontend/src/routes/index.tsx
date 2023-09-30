import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/home/index";
import { Room } from "../pages/room/index";
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/room/:id" element={<Room />}></Route>
      <Route path="*" element={<Navigate to={"/home"} />}></Route>
    </Routes>
  );
};
