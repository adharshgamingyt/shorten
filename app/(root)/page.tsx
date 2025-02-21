"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UrlSchema } from "@/schema";
import { valid } from "@/action/ValidURL";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [loading, setLoading] = useTransition();
  const [error, setError] = useState<string | null>("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>("");

  const form = useForm<z.infer<typeof UrlSchema>>({
    resolver: zodResolver(UrlSchema),
    defaultValues: {
      URL: "",
    },
  });

  const onSubmit = (value: z.infer<typeof UrlSchema>) => {
    setLoading(() => {
      valid(value);
    });
  };

  return (
    <div className="flex h-full w-full max-w-full flex-col items-center justify-center space-y-16">
      <div className="font-Poppins flex items-center text-balance text-5xl font-bold text-blue-600 sm:text-3xl md:text-5xl">
        Shorten URL
      </div>
      <Card className="mx-auto flex flex-col bg-slate-50 sm:w-fit md:w-[520px]">
        <CardHeader className="items-center justify-center">
          <CardTitle className="font-Ubuntu text-2xl">
            Paste your URL Here!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex w-full flex-col items-center justify-center p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={form.control}
                name="URL"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="www.shorten.com"
                        {...field}
                        className="w-full"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="my-5 w-full"
                variant={"default"}
                size={"lg"}
                type="submit"
              >
                Shorten
              </Button>
            </form>
          </Form>
          <p className="my-5 text-sm text-slate-800">
            want a dashboard to manage urls?{" "}
            <span className="cursor-pointer text-sm text-sky-700 hover:underline">
              {" "}
              sign-in
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
