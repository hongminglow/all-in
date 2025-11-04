import Cookies from "js-cookie";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Users, Crown, Zap, LogOut, Wallet } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "~/constant/route";

interface Room {
  id: string;
  name: string;
  minBet: number;
  maxBet: number;
  players: number;
  maxPlayers: number;
  type: "standard" | "vip" | "turbo";
}

const rooms: Room[] = [
  {
    id: "room-1",
    name: "Beginner's Luck",
    minBet: 10,
    maxBet: 100,
    players: 124,
    maxPlayers: 500,
    type: "standard",
  },
  {
    id: "room-2",
    name: "High Roller Suite",
    minBet: 500,
    maxBet: 10000,
    players: 45,
    maxPlayers: 100,
    type: "vip",
  },
  {
    id: "room-3",
    name: "Lightning Rounds",
    minBet: 50,
    maxBet: 500,
    players: 289,
    maxPlayers: 1000,
    type: "turbo",
  },
  {
    id: "room-4",
    name: "Private Lounge",
    minBet: 1000,
    maxBet: 50000,
    players: 12,
    maxPlayers: 50,
    type: "vip",
  },
  {
    id: "room-5",
    name: "Fortune Hall",
    minBet: 25,
    maxBet: 250,
    players: 567,
    maxPlayers: 1000,
    type: "standard",
  },
  {
    id: "room-6",
    name: "Speed Dice Arena",
    minBet: 100,
    maxBet: 1000,
    players: 198,
    maxPlayers: 500,
    type: "turbo",
  },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const [, setSelectedRoom] = useState("");

  const getRoomIcon = (type: string) => {
    switch (type) {
      case "vip":
        return <Crown className="w-5 h-5" />;
      case "turbo":
        return <Zap className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  const getRoomColor = (type: string) => {
    switch (type) {
      case "vip":
        return "from-yellow-600 to-orange-600";
      case "turbo":
        return "from-cyan-600 to-blue-600";
      default:
        return "from-purple-600 to-indigo-600";
    }
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoom(roomId);
    navigate("/bet");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎲</span>
            </div>
            <div>
              <h1 className="text-white">DiceRoll Casino</h1>
              <p className="text-purple-300">Welcome, Hong Ming</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <Wallet className="w-5 h-5 text-yellow-400" />
              <span className="text-white">$10,000.00</span>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white border-0"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Banner - Moved to Top */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-yellow-600/40 to-orange-600/40 backdrop-blur-lg border-2 border-yellow-500/50 rounded-xl p-8 text-center shadow-2xl">
            <div className="text-5xl text-yellow-300 mb-3">1,248</div>
            <div className="text-yellow-100">Active Players</div>
          </div>
          <div className="bg-gradient-to-br from-green-600/40 to-emerald-600/40 backdrop-blur-lg border-2 border-green-500/50 rounded-xl p-8 text-center shadow-2xl">
            <div className="text-5xl text-green-300 mb-3">$2.4M</div>
            <div className="text-green-100">Won Today</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-600/40 to-blue-600/40 backdrop-blur-lg border-2 border-cyan-500/50 rounded-xl p-8 text-center shadow-2xl">
            <div className="text-5xl text-cyan-300 mb-3">15,678</div>
            <div className="text-cyan-100">Games Played</div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-white mb-2">Choose Your Room</h2>
          <p className="text-purple-300">Select a room to start playing</p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card
              key={room.id}
              className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => handleSelectRoom(room.id)}
            >
              {/* Room Header with Gradient */}
              <div
                className={`bg-gradient-to-r ${getRoomColor(
                  room.type
                )} p-4 flex items-center justify-between`}
              >
                <div className="flex items-center gap-2 text-white">
                  {getRoomIcon(room.type)}
                  <span>{room.name}</span>
                </div>
                {room.type === "vip" && (
                  <Badge className="bg-yellow-500 text-black">VIP</Badge>
                )}
                {room.type === "turbo" && (
                  <Badge className="bg-cyan-400 text-black">FAST</Badge>
                )}
              </div>

              {/* Room Details */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-purple-200">
                    <span>Min Bet:</span>
                    <span className="text-yellow-400">${room.minBet}</span>
                  </div>
                  <div className="flex justify-between text-purple-200">
                    <span>Max Bet:</span>
                    <span className="text-yellow-400">${room.maxBet}</span>
                  </div>
                  <div className="flex justify-between text-purple-200">
                    <span>Players:</span>
                    <span className="text-green-400">
                      {room.players}/{room.maxPlayers}
                    </span>
                  </div>
                </div>

                {/* Player Count Bar */}
                <div className="mb-4">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(room.players / room.maxPlayers) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                  Join Room
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};
