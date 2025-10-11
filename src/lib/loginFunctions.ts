import { hash } from "@node-rs/argon2";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function validateUsername(
  username: unknown,
  registering: boolean = true,
): Promise<boolean> {
  const meetsRequirements =
    typeof username === "string" &&
    username.length >= 3 &&
    username.length <= 31 &&
    /^[a-zA-Z0-9_-]+$/.test(username);

  if (!registering) return meetsRequirements;
  if (!meetsRequirements) return false;

  const results = await db.select().from(table.user).where(eq(table.user.username, username));
  const existingUser = results.at(0);
  if (existingUser) {
    return false;
  }
  return true;
}

// TODO: Make it actually properly validate the email
export function validateEmail(email: unknown) {
  return typeof email === "string";
}

export function validatePassword(password: unknown): password is string {
  return typeof password === "string" && password.length >= 6 && password.length <= 255;
}

export function genPasswordHash(password: string) {
  return hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
}
