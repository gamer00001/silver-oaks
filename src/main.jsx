import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./context";
import { Toaster } from "react-hot-toast";
import { Provider as StoreProvider } from "react-redux";
import { store, persistedStore } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { CheckTokenSession, Loader } from "@/components/common";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <StoreProvider store={store}>
        <PersistGate
          persistor={persistedStore}
          loading={<Loader type="screen" />}
        >
          <CheckTokenSession>
            <GlobalContextProvider>
              <App />
            </GlobalContextProvider>
          </CheckTokenSession>
        </PersistGate>
      </StoreProvider>
    </BrowserRouter>

    <Toaster
      toastOptions={{
        position: "top-center",
        style: { fontSize: "1.6rem" },
      }}
    />
  </>
);
