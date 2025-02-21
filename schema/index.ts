import * as z from "zod";

export const UrlSchema = z.object({
  URL: z
    .string({
      message: "Invalid URL",
    })
    .url({
      message: "The text must be a URL",
    }),
});
