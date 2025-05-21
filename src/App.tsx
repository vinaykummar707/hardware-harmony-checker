import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ConnectionComponent from "./components/ConnectionComponent";
import TabsPAge from "./pages/TabsPage";
import { ToastContainer } from "react-toastify";
import { PortCheck } from "./components/PortCheck";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import TabsPage from "./pages/TabsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/tests" element={<TabsPage />} />
            <Route path="/" element={<Navigate to="/tests" replace />} />
          </Route>
          <Route path="/connect" element={<ConnectionComponent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
