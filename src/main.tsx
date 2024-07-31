import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import MyContextProvider from "./context/MyContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MyContextProvider>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </MyContextProvider>
);
