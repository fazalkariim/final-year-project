"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "./card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";

const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .length(8, { message: "Password must be exactly 8 characters long" })
    .refine((value) => (value.match(/[a-zA-Z]/g) || []).length >= 5, {
      message: "Password must contain at least 5 alphabets",
    })
    .refine((value) => (value.match(/\d/g) || []).length >= 2, {
      message: "Password must contain at least 2 digits",
    })
    .refine((value) => (value.match(/[^a-zA-Z0-9]/g) || []).length >= 1, {
      message: "Password must contain at least 1 special character",
    }),
});

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 8) {
      form.setValue("password", value);
      setPassword(value);
      setIsTyping(true);
    }
  };

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const checkGuideline = (regex: RegExp, minCount: number) => {
    return (password.match(regex) || []).length >= minCount;
  };

  return (
    <div>
      <CardWrapper
        headerLabel="Create an Account"
        backButtonLabel="Already have an Account?"
        backButtonHref="/auth/login"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="fazal"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="fazal@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          value={field.value}
                          disabled={isPending}
                          placeholder="*******"
                          type={isPasswordVisible ? "text" : "password"}
                          onChange={handlePasswordInput}
                          onFocus={() => setIsTyping(true)} // Show guidelines on focus
                        />
                        <div
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {isPasswordVisible ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password Guidelines */}
            {isTyping && (
              <div className="space-y-1">
                <p
                  className={`text-sm ${
                    checkGuideline(/[a-zA-Z]/g, 5)
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                at least 5 alphabets
                </p>
                <p
                  className={`text-sm ${
                    checkGuideline(/\d/g, 2) ? "text-green-500" : "text-red-500"
                  }`}
                >
                  at least 2 numbers
                </p>
                <p
                  className={`text-sm ${
                    checkGuideline(/[^a-zA-Z0-9]/g, 1)
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                   at least 1 special character
                </p>
              </div>
            )}

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full hover:bg-orange-300 bg-sky-400"
            >
              Create an account
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
