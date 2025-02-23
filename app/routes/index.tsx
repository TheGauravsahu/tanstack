import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function Home() {
  const { user } = Route.useLoaderData();

  return (
    <div>
      <h1>Tanstack is working.</h1>
      <Button>Hello</Button>

      <div className="flex items-center justify-center"></div>
    </div>
  );
}
