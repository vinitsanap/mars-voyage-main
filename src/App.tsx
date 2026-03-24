import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();
type PageComponent = () => JSX.Element;
type PageModule = { default: PageComponent };

const pageModules = import.meta.glob<PageModule>("./pages/*.tsx", { eager: true });
const generatedRoutes = Object.entries(pageModules)
  .map(([filePath, module]) => {
    const fileName = filePath.split("/").pop()?.replace(".tsx", "");
    if (!fileName || fileName === "NotFound") return null;

    const Component = module.default;
    const routePath = fileName.toLowerCase() === "index" ? "/" : `/${fileName.toLowerCase()}`;
    return { routePath, Component };
  })
  .filter((route): route is { routePath: string; Component: PageComponent } => Boolean(route));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          {generatedRoutes.map(({ routePath, Component }) => (
            <Route key={routePath} path={routePath} element={<Component />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
