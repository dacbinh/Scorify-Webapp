// src/app/routes/adminRoutes.tsx
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts/admin-layout";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* <Route index element={<AdminDashboardPage />} /> */}
      </Route>
    </Routes>
  );
}