import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";

import ErrorPage from "./pages/ErrorPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { HomePage } from "./pages/HomePage";
import { BetPage } from "./pages/BetPage";
import SignUpPage from "./pages/auth/SignUpPage";
import { ROUTES } from "./constant/route";
import { AuthLayout } from "./components/layout/AuthLayout";
import { ProtectedLayout } from "./components/layout/ProtectedLayout";
import { TestingPage } from "./pages/lab/TestingPage";
import { RootLayout } from "./components/layout/RootLayout";
import { InnerLayout } from "./components/layout/InnerLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route element={<RootLayout />}>
            <Route index path={ROUTES.HOME} element={<HomePage />} />
          </Route>

          <Route element={<InnerLayout />}>
            <Route path={ROUTES.BET} element={<BetPage />} />
            <Route path={ROUTES.TESTING} element={<TestingPage />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
