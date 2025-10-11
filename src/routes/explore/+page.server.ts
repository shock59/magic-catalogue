import type { PageServerLoad } from "./$types";
import jsondb from "$lib/server/jsondb";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  const spells = jsondb.data.spells;
  return {
    spells: await Promise.all(
      spells.map(async (spell) => {
        const results = await db.select().from(table.user).where(eq(table.user.id, spell.ownerId));

        const user = results.at(0);
        if (!user) {
          return fail(500);
        }

        return {
          ...spell,
          ownerUsername: user.username,
        };
      }),
    ),
  };
};
