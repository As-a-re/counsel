import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SourceDrawerProvider } from "./components/SourceDrawerContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AppShell } from "./components/AppShell";
import { Landing } from "./pages/Landing";
import { Onboarding } from "./pages/Onboarding";
import { Dashboard } from "./pages/Dashboard";
import { MatterDetail } from "./pages/MatterDetail";
import { AskCounsel } from "./pages/AskCounsel";
import { Documents } from "./pages/Documents";
import { ConversationAnalyzer } from "./pages/ConversationAnalyzer";
import { SourceLibrary } from "./pages/SourceLibrary";
import { LegalAidDirectory } from "./pages/LegalAidDirectory";
import { SettingsPage } from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <SourceDrawerProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/app" element={<AppShell />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/:matterId" element={<MatterDetail />} />
              <Route path="ask" element={<AskCounsel />} />
              <Route path="documents" element={<Documents />} />
              <Route path="conversations" element={<ConversationAnalyzer />} />
              <Route path="sources" element={<SourceLibrary />} />
              <Route path="legal-aid" element={<LegalAidDirectory />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </SourceDrawerProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
