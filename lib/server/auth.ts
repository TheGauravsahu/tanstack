import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { createMiddleware } from "@tanstack/start";
import { getWebRequest } from "@tanstack/start/server";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(db, {
    provider: "sqlite",
  }),

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 * 7, // 7 days (every 7 days the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});

export const authenticateMiddleware = createMiddleware().server(
  async ({ next }) => {
    const { headers } = getWebRequest()!;
    const session = await auth.api.getSession({ headers });
    const user = session?.user;
    return next({
      context: {
        userId: user?.id as string,
      },
    });
  }
);
