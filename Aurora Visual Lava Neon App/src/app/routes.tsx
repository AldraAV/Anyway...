import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { AppLayout } from "./components/AppLayout";
import { Dashboard } from "./components/Dashboard";
import { TranscriptionDetail } from "./components/TranscriptionDetail";
import { SettingsPage } from "./components/SettingsPage";

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "transcription/:id", Component: TranscriptionDetail },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);
