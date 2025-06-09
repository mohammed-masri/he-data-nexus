import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Institution from "./pages/Institution";
import InstitutionOnboarding from "./pages/InstitutionOnboarding";
import Regulator from "./pages/Regulator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/schesr/">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/institution" element={<Institution />} />
          <Route
            path="/institution/onboarding"
            element={<InstitutionOnboarding />}
          />
          <Route path="/regulator" element={<Regulator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
