import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPost } from "~/app/services/post.api";
import { createPostSchema } from "~/app/services/post.schema";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export const Route = createFileRoute("/posts/create")({
  component: RouteComponent,
});

type CreatePostData = z.infer<typeof createPostSchema>;

function RouteComponent() {
  const router = useNavigate();

  const createPostForm = useForm<CreatePostData>({
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  const createCourseMutation = useMutation({
    mutationFn: (data: CreatePostData) => createPost({ data }),
    onSuccess: () => {
      createPostForm.reset();
      router({ to: "/" });
    },
  });

  async function onSubmit(values: CreatePostData) {
    createCourseMutation.mutate(values);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        className="cursor-pointer gap-1 text-md"
        variant="ghost"
        onClick={() => window.history.back()}
      >
        <ChevronLeft size={22} />
        Go back
      </Button>

      <Card className="w-[90%] max-w-md mx-auto mt-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Create Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...createPostForm}>
            <form
              onSubmit={createPostForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {["title", "imageUrl"].map((field, index) => (
                <FormField
                  key={index}
                  control={createPostForm.control}
                  name={field as keyof CreatePostData}
                  render={({ field: fieldProps }) => (
                    <FormItem>
                      <FormLabel>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Enter your ${field}`}
                          {...fieldProps}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <FormField
                control={createPostForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="cursor-pointer">
                Create
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
