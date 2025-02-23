import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
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

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/",
      });
    }
  },
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupData = z.infer<typeof signupSchema>;

function RouteComponent() {
  const signupForm = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupData) {
    const { data, error } = await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          signupForm.reset();
          toast.success("Account created");
        },
        onError: (ctx) => {
          console.error("Signup Error:", ctx.error);
          toast.error(ctx.error.message);
        },
      }
    );
    console.log(data, error, "-----Better auth response.-----");
  }

  return (
    <Form {...signupForm}>
      <form
        onSubmit={signupForm.handleSubmit(onSubmit)}
        className="space-y-8 w-[90%] md:max-w-2xl mx-auto mt-4"
      >
        <h1 className="font-extrabold text-2xl">Create Your Account.</h1>
        {["name", "email", "password"].map((field, index) => (
          <FormField
            key={index}
            control={signupForm.control}
            name={field as keyof SignupData}
            render={({ field: fieldProps }) => (
              <FormItem>
                <FormLabel>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    type={
                      field.includes("password")
                        ? "password"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    placeholder={`Enter your ${field}`}
                    {...fieldProps}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button className="mt-4" type="submit">
          Signup
        </Button>
        <div className="flex gap-2">
          Already have an account ?{" "}
          <Link to="/signin" className="text-green-400">
            Signin here.
          </Link>
        </div>
      </form>
    </Form>
  );
}
