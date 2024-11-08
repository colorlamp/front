import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageEvent from "./pages/ManageEvent";
import EventDetail from "./pages/EventDetail";
import FormCreate from "./pages/FormCreate";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ManageEvent />} />
        <Route path="/details/:eventId" element={<EventDetail />} />
        <Route path="/form/new" element={<FormCreate />} />
      </Routes>
    </BrowserRouter>
  );
};
