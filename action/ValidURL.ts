"use server";

import * as z from "zod";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { db } from "@/lib/prisma";
import { UrlSchema } from "@/schema";

export const valid = async (value: z.infer<typeof UrlSchema>) => {
  const Field = await UrlSchema.safeParseAsync(value);

  if (!Field.success) {
    return { error: "Invalid Fields" };
  }

  const { URL } = Field.data;
  const encryptedUrl = await bcryptjs.hash(URL, 16);

  function randomString(length: number, chars: string) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars!.length)];
    return result;
  }
  var shortenedUrl = randomString(
    6,
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  );

  const dup = await db.url.findFirst({
    where: {
      shortened: shortenedUrl,
    },
  });

  if (dup) {
    await db.url.delete({
      where: {
        shortened: dup.shortened,
      },
    });
  }

  try {
    const Result = await db.url.create({
      data: {
        url: encryptedUrl,
        shortened: shortenedUrl,
        createdAt: new Date(),
      },
    });

    return { URL: Result };
  } catch (error) {
    console.log(error);
    return { error: "Failed to create URL" };
  }
};
