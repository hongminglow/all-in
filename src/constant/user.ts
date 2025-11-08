import type { TUserDetails } from "~/types/user";
import { PERMISSIONS, ROLES } from "./auth";

export const USER_OVERALL_INFORMATION: TUserDetails = {
  username: "admin",
  email: "admin@example.com",
  avatar: "https://avatar.iran.liara.run/username?username=hm",
  roles: ROLES.VVIP_PLAYER,
  permissions: [
    PERMISSIONS.VIEW_HOME,
    PERMISSIONS.JOIN_ROOM,
    PERMISSIONS.FREE_TICKET,
    PERMISSIONS.REGULAR_BET,
    PERMISSIONS.SPECIAL_BET,
    PERMISSIONS.DOUBLE_BET,
  ],
};

export const USER_INITIAL_BALANCE = 1000000;
