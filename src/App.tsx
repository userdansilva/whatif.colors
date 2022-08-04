import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";

import Routes from "./routes";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
