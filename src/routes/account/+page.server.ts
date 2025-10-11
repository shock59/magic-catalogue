import * as auth from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { getRequestEvent } from "$app/server";
import type { Actions, PageServerLoad, RequestEvent } from "./$types";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

let user: {
  id: string;
  username: string;
};

export const load: PageServerLoad = async () => {
  user = requireLogin();
  return { user };
};

export const actions: Actions = {
  logout,
  editUsername: async (event) => {
    const newUsername = (await event.request.formData()).get("username");
    if (!newUsername) {
      return fail(400, "Please specify a new username");
    }

    await db
      .update(table.user)
      .set({
        username: newUsername as string,
      })
      .where(eq(table.user.id, user.id));

    await logout(event);
  },
};

async function logout(event: RequestEvent) {
  if (!event.locals.session) {
    return fail(401);
  }
  await auth.invalidateSession(event.locals.session.id);
  auth.deleteSessionTokenCookie(event);

  return redirect(302, "/account/login");
}

function requireLogin() {
  const { locals } = getRequestEvent();

  if (!locals.user) {
    return redirect(302, "/account/login");
  }

  return locals.user;
}
