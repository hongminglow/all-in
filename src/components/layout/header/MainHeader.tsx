import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { LogOut } from "lucide-react";
import { ROUTES } from "~/constant/route";
import { useNavigate } from "react-router";
import { useUserStore } from "~/store/useUserStore";
import { BalanceButton } from "~/components/base/button/BalanceButton";

export const MainHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const resetStore = useUserStore((store) => store.actions.reset);
  const user = useUserStore((store) => store.user);

  const handleLogout = () => {
    Cookies.remove("token");
    resetStore();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎲</span>
          </div>
          <div>
            <h1 className="text-white">{t("common.appName")}</h1>
            <p className="text-purple-300">
              Welcome, {user?.username.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <BalanceButton />
          {/* <Button
              onClick={navigateTestLab}
              className="bg-amber-600 hover:bg-amber-500 text-white border-0"
            >
              {t("common.lab")}
            </Button> */}
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white border-0"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t("login.logout")}
          </Button>
        </div>
      </div>
    </header>
  );
};
