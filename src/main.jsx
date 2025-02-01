import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    <ToastContainer
      position="bottom-left"
      autoClose={1500}
      hideProgressBar={true}
      closeOnClick={true}
      pauseOnHover={false}
      draggable={true}
      theme="dark"
    />
  </StrictMode>
);
