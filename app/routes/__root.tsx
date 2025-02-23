import type { ReactNode } from "react";
import {
  Outlet,
  HeadContent,
  Scripts,
  ScriptOnce,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import appCss from "~/lib/styles/app.css?url";
import Header from "~/components/Tanstack/Header";
import { Toaster } from "~/components/ui/sonner";
import type { QueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import { getWebRequest } from "@tanstack/start/server";
import { auth } from "~/lib/server/auth";
import { User } from "better-auth";

const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const { headers } = getWebRequest()!;
  const session = await auth.api.getSession({ headers });

  return session?.user || null;
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient; user: User }>()(
  {
    beforeLoad: async () => {
      const user = await getUser();
      return { user };
    },
    head: () => ({
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: "TanStack Start Starter",
        },
      ],
      links: [{ rel: "stylesheet", href: appCss }],
    }),
    component: RootComponent,
  }
);

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ScriptOnce>
          {`document.documentElement.classList.toggle(
          "dark",
          localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-schema: dark)').matches)
          )`}
        </ScriptOnce>
        <Header  />
        <main className="pt-28">{children}</main>
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}
