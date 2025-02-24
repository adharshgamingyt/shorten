import * as z from "zod";

export const UrlSchema = z.object({
  URL: z
    .string({
      message: "Invalid URL",
    })
    .url({
      message: "Enter a valid URL with http / https",
    }),
});
