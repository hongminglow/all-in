import { useLocation, useParams } from "react-router";
import { BackButton } from "~/components/base/button/BackButton";
import { BalanceButton } from "~/components/base/button/BalanceButton";
import { useUserStore } from "~/store/useUserStore";

export const InnerHeader = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const user = useUserStore((store) => store.user);

  const state = (location.state as { roomName?: string } | null) ?? null;
  const roomName = state?.roomName;

  return (
    <header className="bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h2 className="text-white">{roomName}</h2>
            <p className="text-purple-300">Room: {roomId}</p>
            <p className="text-purple-300">
              Player: {user?.username?.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <BalanceButton />
        </div>
      </div>
    </header>
  );
};
