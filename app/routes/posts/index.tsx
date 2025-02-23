import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "~/components/ui/button";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-6xl mx-auto mt-2">
      <div className="w-full flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold my-4">Recent Posts.</h1>
        <Link
          to="/posts/create"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Create Post.
        </Link>
      </div>
    </div>
  );
}
