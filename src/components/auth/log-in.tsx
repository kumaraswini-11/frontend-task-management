import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "./auth-layout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "@/lib/constants";
import { toast } from "sonner";
import { LoginSchema } from "@/schemas/sign-up-schema";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useUserStore } from "@/store/useStore";

export const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const LoginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, status } = useMutation({
    mutationFn: async (LoginData) => {
      const response = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginData),
      });

      if (!response.ok) {
        throw new Error("Failed to login.");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      setUser(data?.data);
      toast.success("Login successfull.");
      navigate("/tasks");
    },
    onError: (error) => {
      console.error("Error Loging in:", error);
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    mutate(values as any);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
        <Card className="h-full w-full border-none shadow-none md:w-[487px]">
          <CardHeader className="flex items-center justify-center p-7 text-center">
            <CardTitle className="text-2xl">Welcome back!</CardTitle>
          </CardHeader>
          <div className="px-7">
            <DottedSeparator />
          </div>
          <CardContent className="p-7">
            <Form {...LoginForm}>
              <form
                onSubmit={LoginForm.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  name="email"
                  control={LoginForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Email" />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="password"
                  control={LoginForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                {/* TODO: Implimemt forgot password - with email magic link */}
                {/* <div className="my-1">
                  <Link
                    to="/forgot-password"
                    className="text-blue-700 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div> */}
                <Button
                  disabled={status === "pending"}
                  size="lg"
                  className="w-full bg-blue-500 shadow-inner hover:bg-blue-700"
                >
                  {status === "pending" ? "Loging..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>

          {/* TODO: Implement Google login in the future */}
          {/* 
          <div className="px-7">
            <DottedSeparator />
          </div>
          <CardContent className="flex flex-col gap-y-4 p-7">
            <Button
              disabled={false}
              variant="secondary"
              size="lg"
              className="w-full border-white bg-white shadow-md"
            >
              <FcGoogle className="mr-2 size-5" />
              Login with Google
            </Button>
          </CardContent>
          */}

          <div className="px-7">
            <DottedSeparator />
          </div>
          <CardContent className="flex items-center justify-center p-7">
            <p>
              Don't have an account?{" "}
              <Link to="/sign-up">
                <span className="text-blue-700">Sign Up</span>
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};
