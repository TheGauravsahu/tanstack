import { Link } from "@tanstack/react-router";
import { useStore } from "better-auth/react";
import ThemeToggle from "../ThemeToggle";
import authClient from "~/lib/utils/auth-client";
import { Button } from "../ui/button";

export default function Header() {
  const { data: session } = useStore(authClient.useSession);

  return (
    <header className="fixed top-16 transform -translate-1/2 left-1/2 p-4  z-50 border rounded-lg bg-background w-[90%] md:w-2xl flex items-center justify-between">
      <div>
        <Link to="/">
          <h1 className="text-xl font-extrabold">Tanstack</h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <nav className="flex items-center gap-4 *:font-light">
          <Link to="/">Posts</Link>
          {session?.user ? (
            <Button
              className="cursor-pointer"
              onClick={async () => {
                await authClient.signOut();
              }}
            >
              Signout
            </Button>
          ) : (
            <Link to="/signin">Signin</Link>
          )}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
