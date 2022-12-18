import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ColorSchemeProvider, MantineProvider, Text } from "@mantine/core";
import { FirebaseProvider } from "./context/Firebase";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ColorSchemeProvider
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <FirebaseProvider>
          <App />
        </FirebaseProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  </BrowserRouter>
);
