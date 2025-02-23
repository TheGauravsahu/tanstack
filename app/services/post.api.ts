import { createServerFn } from "@tanstack/start";
import { createPostSchema } from "./post.schema";
import { db } from "~/lib/server/db";
import { authenticateMiddleware } from "~/lib/server/auth";

export const createPost = createServerFn()
  .validator(createPostSchema)
  .middleware([authenticateMiddleware])
  .handler(async ({ data, context }) => {
    const post = await db.post.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        userId: context.userId,
      },
    });
    return post;
  });
