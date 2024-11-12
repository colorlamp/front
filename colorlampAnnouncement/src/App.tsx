import { useEffect, useState } from "react";
import { AppProvider, type ThemeName } from "@channel.io/bezier-react";

import { getWamData } from "./utils/wam";
import { isMobile } from "./utils/userAgent";
import styled from "styled-components";
import { Router } from "./Router";

const PageWrapper = styled.div`
  padding: ${() => (isMobile() ? "16px" : "0 24px 24px 24px")};
`;

function App() {
  const [theme, setTheme] = useState<ThemeName>("light");

  useEffect(() => {
    const appearance = getWamData("appearance");
    setTheme(appearance === "dark" ? "dark" : "light");
  }, []);

  return (
    <AppProvider themeName={theme}>
      <PageWrapper>
        <Router />
      </PageWrapper>
    </AppProvider>
  );
}

export default App;
