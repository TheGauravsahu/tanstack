import { Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="space-y-2 p-2 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <p>The page you are looking for does not exist.</p>
      <p className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={() => window.history.back()}>
          Go back
        </Button>
        <Button asChild variant="secondary">
          <Link to="/">Home</Link>
        </Button>
      </p>
    </div>
  );
}
