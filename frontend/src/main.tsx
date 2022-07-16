import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { App } from "./App";
import { Providers } from "./providers";

import theme from "./style/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Providers>
    </BrowserRouter>
  </React.StrictMode>
);
