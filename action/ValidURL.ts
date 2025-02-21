"use server";

import * as z from "zod";

import { UrlSchema } from "@/schema";

export const valid = async (value: z.infer<typeof UrlSchema>) => {
  const Field = await UrlSchema.safeParseAsync(value);

  if (!Field.success) {
    return { error: "Invalid Fields" };
  }

  const { URL } = Field.data;

  const EncryptedUrl = await fetch("localhost:5000/enUrl", {
    method: "POST",
    body: JSON.stringify({ URL }),
  });
};

