import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ColorSchemeProvider, MantineProvider, Text } from "@mantine/core";
import { FirebaseProvider } from "./context/Firebase";
import { BrowserRouter } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <NotificationsProvider position="top-right" zIndex={2077}>

    <ColorSchemeProvider
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <FirebaseProvider>
          <App />
        </FirebaseProvider>
      </MantineProvider>
    </ColorSchemeProvider>
   </NotificationsProvider>

  </BrowserRouter>
);
