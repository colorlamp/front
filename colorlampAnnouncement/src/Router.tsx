import { BrowserRouter, Routes, Route } from "react-router-dom";
import Announcement from "./pages/Announcement";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Announcement />} />
      </Routes>
    </BrowserRouter>
  );
};
