import { Link } from "@tanstack/react-router";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-16 transform -translate-1/2 left-1/2 p-4  z-50 border rounded-lg bg-background w-[90%] md:w-2xl flex items-center justify-between">
      <div>
        <Link to="/">
          <h1 className="text-xl font-extrabold">Tanstack</h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <nav className="flex items-center gap-4 *:font-light">
          <Link to="/posts">Posts</Link>
          <Link to="/signin">Signin</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
