import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isMobile } from "./utils/userAgent";
import Send from "./pages/Send";
import JoinEvent from "./pages/JoinEvent";
import Form from "./pages/Form";
import FinishForm from "./pages/FinishForm";

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
        <Route path="/joinEvent/" element={<JoinEvent />} />
        <Route path="/form/:eventId" element={<Form />} />
        <Route path="/finishForm/:eventTitle" element={<FinishForm />} />
        <Route path="*" element={<JoinEvent />} />
      </Routes>
    </BrowserRouter>
  );
};
