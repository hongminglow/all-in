import { Outlet } from "react-router";
import { InnerHeader } from "./header/InnerHeader";

export const InnerLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <InnerHeader />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
