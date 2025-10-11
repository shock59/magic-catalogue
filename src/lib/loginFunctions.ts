import { hash } from "@node-rs/argon2";

export function validateUsername(username: unknown): username is string {
  return (
    typeof username === "string" &&
    username.length >= 3 &&
    username.length <= 31 &&
    /^[a-zA-Z0-9_-]+$/.test(username)
  );
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
