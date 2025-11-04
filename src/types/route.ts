import type { ROUTES } from "~/constant/route";

export type TRoute = (typeof ROUTES)[keyof typeof ROUTES];
