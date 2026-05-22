import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Support from "./pages/Support";
import Appointments from "./pages/Appointments";
import Chat from "./pages/Chat";
import Resources from "./pages/Resources";
import PerformanceTracking from "./pages/PerformanceTracking";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/support",
    Component: Support,
  },
  {
    path: "/appointments",
    Component: Appointments,
  },
  {
    path: "/chat",
    Component: Chat,
  },
  {
    path: "/resources",
    Component: Resources,
  },
  {
    path: "/performance",
    Component: PerformanceTracking,
  },
]);
