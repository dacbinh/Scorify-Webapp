import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/landing-page";
import { SignUpPage } from "./pages/signup-page";
import { LoginPage } from "./pages/login-page";
import { DashboardPage } from "./pages/Teacher/teacher-workspace-page";
import { PaymentPage } from "./pages/payment-page";
import { Layout } from "./layouts/layout";
import { AdminLayout } from "./layouts/admin-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: LandingPage },
      { path: "signup", Component: SignUpPage },
      { path: "login", Component: LoginPage },
      { path: "dashboard", Component: DashboardPage },




      { path: "payment", Component: PaymentPage },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [

    ],
  },
]);
