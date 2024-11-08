import { useEffect, useState } from "react";
import { AppProvider, type ThemeName } from "@channel.io/bezier-react";

import { getWamData } from "./utils/wam";
import { Router } from "./Router";
function App() {
  const [theme, setTheme] = useState<ThemeName>("light");

  useEffect(() => {
    const appearance = getWamData("appearance");
    setTheme(appearance === "dark" ? "dark" : "light");
  }, []);

  return (
    <AppProvider themeName={theme}>
      <Router />
    </AppProvider>
  );
}

export default App;
