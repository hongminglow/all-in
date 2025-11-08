import { MainHeader } from "./header/MainHeader";
import { Outlet } from "react-router";

export const RootLayout = () => (
  <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
    <MainHeader />

    <main className="max-w-7xl mx-auto px-4 py-8">
      <Outlet />
    </main>
  </div>
);
