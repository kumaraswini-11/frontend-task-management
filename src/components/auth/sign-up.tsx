import { Link, useNavigate } from "react-router-dom";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "./auth-layout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { signUpSchema } from "@/schemas/sign-up-schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { baseUrl } from "@/lib/constants";

export const SignupComponent = () => {
  const navigate = useNavigate();

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, status } = useMutation({
    mutationFn: async (signUpData) => {
      const response = await fetch(`${baseUrl}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Signup successful! Please log in.");
      console.log("Signup successful!");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error signing up:", error);
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    mutate(values as any);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
        <Card className="h-full w-full border-none shadow-none md:w-[487px]">
          <CardHeader className="flex items-center justify-center p-7 text-center">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              By signing up, you agree to our{" "}
              <Link to="/privacy-policy">
                <span className="text-blue-700">Privacy Policy</span>
              </Link>{" "}
              and{" "}
              <Link to="/terms-condition">
                <span className="text-blue-700">Terms of Service</span>
              </Link>
            </CardDescription>
          </CardHeader>
          <div className="px-7">
            <DottedSeparator />
          </div>
          <CardContent className="p-7">
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  name="name"
                  control={signUpForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="email"
                  control={signUpForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="password"
                  control={signUpForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <Button
                  disabled={status === "pending"}
                  size="lg"
                  className="w-full bg-blue-500 shadow-inner hover:bg-blue-700"
                >
                  {status === "pending" ? "Signing Up..." : "Sign Up"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <div className="px-7">
            <DottedSeparator />
          </div>
          <CardContent className="flex items-center justify-center p-7">
            <p>
              Alredy have an account?{" "}
              <Link to="/login">
                <span className="text-blue-700">Log In</span>
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};
