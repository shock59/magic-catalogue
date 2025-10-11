import * as auth from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad, RequestEvent } from "./$types";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import getUser from "$lib/getUser";
import {
  genPasswordHash,
  validateEmail,
  validatePassword,
  validateUsername,
} from "$lib/loginFunctions";
import assert from "assert";

let user: App.Locals["user"];

export const load: PageServerLoad = async () => {
  user = requireLogin();
  return { user };
};

export const actions: Actions = {
  logout,
  editUsername: async (event) => await updateUserDetail("username", event),
  editEmail: async (event) => await updateUserDetail("email", event),
  editPassword: async (event) => await updateUserDetail("password", event),
};

async function logout(event: RequestEvent) {
  if (!event.locals.session) {
    return fail(401);
  }
  await auth.invalidateSession(event.locals.session.id);
  auth.deleteSessionTokenCookie(event);

  return redirect(302, "/account/login");
}

function updateUser(toSet: { username?: string; email?: string; passwordHash?: string }) {
  assert(user);
  return db.update(table.user).set(toSet).where(eq(table.user.id, user.id));
}

async function updateUserDetail(toUpdate: "email" | "username" | "password", event: RequestEvent) {
  if (!user) {
    return fail(401);
  }

  const formData = (await event.request.formData()).get(toUpdate);
  if (!formData) {
    return fail(400, `Please specify a new ${toUpdate}`);
  }

  if (
    typeof formData != "string" || // Stop TypeScript whining even though the other two functions already check this
    (toUpdate == "username" && !validateUsername(formData)) ||
    (toUpdate == "email" && !validateEmail(formData)) ||
    (toUpdate == "password" && !validatePassword(formData))
  ) {
    return fail(400, { message: `Invalid ${toUpdate}` });
  }

  const passwordHash = toUpdate == "password" ? await genPasswordHash(formData) : undefined;

  await await updateUser(
    toUpdate == "username"
      ? {
          username: formData,
        }
      : toUpdate == "email"
        ? {
            email: formData,
          }
        : {
            passwordHash,
          },
  );

  await logout(event);
}

function requireLogin() {
  const user = getUser();
  if (!user) {
    return redirect(302, "/account/login");
  }

  return user;
}
