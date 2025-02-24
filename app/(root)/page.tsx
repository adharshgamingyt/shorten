"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition, useState } from "react";
import { AlertCircle as Alert, Clipboard } from "lucide-react";
import { useRouter } from "next/navigation";

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
import { toast } from "sonner";

const HomePage = () => {
  const [isPending, startTransition] = useTransition();
  const [shortenedUrl, setShortenedUrl] = useState<string | undefined>("");

  const site = "https://localhost:3000/u/";
  const router = useRouter();

  const form = useForm<z.infer<typeof UrlSchema>>({
    resolver: zodResolver(UrlSchema),
    defaultValues: {
      URL: "",
    },
  });

  const onSubmit = (value: z.infer<typeof UrlSchema>) => {
    startTransition(() => {
      valid(value).then((data) => {
        if (data.error) {
          toast(data.error);
        }
        if (data.URL) {
          setShortenedUrl(data.URL.shortened);
        }
      });
    });
  };

  return (
    <div className="flex h-full w-full max-w-full flex-col items-center justify-center space-y-16">
      <div className="flex items-center text-balance font-Poppins text-5xl font-bold text-blue-600 sm:text-3xl md:text-5xl">
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
                        placeholder="https://example.com"
                        {...field}
                        className="w-full"
                        required
                        disabled={isPending}
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
                disabled={isPending}
              >
                Shorten
              </Button>
            </form>
          </Form>
          {shortenedUrl && (
            <div className="relative flex h-10 w-full flex-col items-center justify-center rounded-md">
              <Input
                className="mr-auto h-full w-[90%] border-slate-950 font-Ubuntu text-lg text-slate-950 hover:cursor-pointer hover:underline"
                readOnly
                onClick={() => router.push(site + shortenedUrl)}
                value={site + shortenedUrl}
              />
              <Button
                size={"icon"}
                variant={"outline"}
                className="absolute right-0 border-slate-950"
                onClick={() => {
                  window.navigator.clipboard.writeText(site + shortenedUrl);
                  toast("Successfully copied to clipboard!");
                }}
              >
                <Clipboard />
              </Button>
            </div>
          )}
          <p className="my-5 text-center text-sm text-slate-800">
            want a dashboard to manage urls?{" "}
            <span className="cursor-pointer text-sm text-sky-700 hover:underline">
              {" "}
              sign-in
            </span>
          </p>
          <p className="flex items-center text-center text-xs text-yellow-500">
            <Alert className="mx-2 size-5" />
            Note: If you'r not logged in, the shortened URL will be deleted in
            24 hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
