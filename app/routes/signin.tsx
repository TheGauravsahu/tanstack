import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import authClient from "~/lib/utils/auth-client";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/",
      });
    }
  },
});

 const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SigninData = z.infer<typeof signinSchema>;

function RouteComponent() {
  const signinForm = useForm<SigninData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SigninData) {
    const { data, error } = await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          signinForm.reset();
          toast.success("Signed in.");
        },
        onError: (ctx) => {
          console.error("Signin Error:", ctx.error);
          toast.error(ctx.error.message);
        },
      }
    );
    console.log(data, error, "----Better auth response.-----");
  }

  return (
    <Form {...signinForm}>
      <form
        onSubmit={signinForm.handleSubmit(onSubmit)}
        className="space-y-8 w-[90%] md:max-w-2xl mx-auto mt-4"
      >
        <h1 className="font-extrabold text-2xl">Signin.</h1>

        {/* email */}
        <FormField
          control={signinForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter you email." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* passoword */}
        <FormField
          control={signinForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter you password."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Signin</Button>
        <div className="flex gap-2">
          Don&apos;t have an account ?{" "}
          <Link to="/signup" className="text-green-400">
            Signup here.
          </Link>
        </div>
      </form>
    </Form>
  );
}
