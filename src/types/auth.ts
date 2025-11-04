import type { PERMISSIONS, ROLES } from "~/constant/auth";

export type TRoles = (typeof ROLES)[keyof typeof ROLES];
export type TPermissions = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
