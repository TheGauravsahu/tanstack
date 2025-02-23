import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "~/components/ui/button";
import { postQueries } from "../services/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { formatDate } from "~/lib/utils";
import { Skeleton } from "~/components/ui/skeleton";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: ({ context }) => {
    context.queryClient.ensureQueryData(postQueries.list());
  },
  loader: async ({ context }) => {
    return { user: context.user };
  },
});

const skeletons = Array.from({ length: 2 });

function Home() {
  const postQuery = useSuspenseQuery(postQueries.list());

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

      {/* lists */}
      <div className="flex items-center gap-8 flex-wrap mt-4">
        {postQuery.isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <PostSkeleton key={index} />
            ))
          : postQuery.data.map((post) => (
              <Card key={post.id} className="w-[350px] h-[400px]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {post.user.image && (
                      <img
                        src={post.user.image}
                        alt={post.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>
                        By {post.user.name} •{" "}
                        {formatDate(post.createdAt, "short")}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                {post.imageUrl && (
                  <CardContent>
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </CardContent>
                )}

                <CardFooter>
                  <p>{post.description.slice(0, 80)} ...</p>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
}

function PostSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
