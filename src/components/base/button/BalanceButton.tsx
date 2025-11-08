import formatCurrency from "~/utils/format";
import { useUserStore } from "~/store/useUserStore";
import { Wallet } from "lucide-react";

export const BalanceButton = () => {
  const balance = useUserStore((store) => store.balance);

  return (
    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
      <Wallet className="w-5 h-5 text-yellow-400" />
      <span className="text-white">${formatCurrency(balance)}</span>
    </div>
  );
};
