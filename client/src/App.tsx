import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { useEffect } from "react";
import { useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import ServiceList from "./pages/ServiceList";
import ServiceDetail from "./pages/ServiceDetail";
import WorksList from "./pages/WorksList";
import WorksDetail from "./pages/WorksDetail";
import SeminarList from "./pages/SeminarList";
import SeminarDetail from "./pages/SeminarDetail";
import DownloadList from "./pages/DownloadList";
import DownloadDetail from "./pages/DownloadDetail";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import Company from "./pages/Company";
import CompanyMessage from "./pages/CompanyMessage";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/service" component={ServiceList} />
        <Route path="/service/:slug" component={ServiceDetail} />
        <Route path="/works" component={WorksList} />
        <Route path="/works/:slug" component={WorksDetail} />
        <Route path="/seminar" component={SeminarList} />
        <Route path="/seminar/:id" component={SeminarDetail} />
        <Route path="/download" component={DownloadList} />
        <Route path="/download/:slug" component={DownloadDetail} />
        <Route path="/news" component={NewsList} />
        <Route path="/news/:id" component={NewsDetail} />
        <Route path="/company" component={Company} />
        <Route path="/company/message" component={CompanyMessage} />
        <Route path="/company/mvv">{() => { window.location.replace("/company"); return null; }}</Route>
        <Route path="/contact" component={Contact} />
        <Route path="/privacy-policy" component={Privacy} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
