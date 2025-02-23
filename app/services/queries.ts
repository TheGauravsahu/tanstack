import { queryOptions } from "@tanstack/react-query";
import { getPosts } from "./post.api";

export const postQueries = {
  list: () => queryOptions({ queryKey: ["posts"], queryFn: getPosts }),
};
