import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isMobile } from "./utils/userAgent";
import Send from "./pages/Send";
import ManageEvent from "./pages/ManageEvent";
import JoinEvent from "./pages/JoinEvent";
import Announcement from "./pages/Announcement";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: isMobile() ? "16px" : "0 24px 24px 24px" }}>
              <Send />
            </div>
          }
        />
        <Route path="/manageEvent" element={<ManageEvent />} />
        <Route path="/joinEvent" element={<JoinEvent />} />
        <Route path="/announcement" element={<Announcement />} />
      </Routes>
    </BrowserRouter>
  );
};
