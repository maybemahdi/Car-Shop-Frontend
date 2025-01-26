import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReduxStoreProvider from "./redux/ReduxStoreProvider.tsx";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import ConfigProviderForAntd from "./Providers/ConfigProviderForAntd.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxStoreProvider>
      <ConfigProviderForAntd>
        <RouterProvider router={router} />
        <Toaster />
      </ConfigProviderForAntd>
    </ReduxStoreProvider>
  </StrictMode>
);
