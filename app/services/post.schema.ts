import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(50, "Name must be at least 50 characters"),
  imageUrl: z.string().min(6, "Image url be at least 6 characters"),
});
