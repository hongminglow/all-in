export const ROLES = {
  VVIP_PLAYER: "vvip-player",
  VIP_PLAYER: "vip-player",
  REGULAR_PLAYER: "player",
} as const;

export const PERMISSIONS = {
  VIEW_HOME: "home:view",
  JOIN_ROOM: "home:join",
  FREE_TICKET: "home:free-ticket",
  REGULAR_BET: "bet:regular",
  SPECIAL_BET: "bet:special",
  DOUBLE_BET: "bet:double",
} as const;
