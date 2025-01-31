import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import Route from "./Shared/Route";
import AuthProviders from "./Shared/AuthProviders";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoryProvider from "./Shared/CateContext";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProviders>
          <CategoryProvider>
            <RouterProvider router={Route} />
          </CategoryProvider>
        </AuthProviders>
      </HelmetProvider>
    </QueryClientProvider>
    <Toaster position="bottom-center" />
  </StrictMode>
);
