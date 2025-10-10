import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import db from "$lib/server/jsondb";
import getUser from "$lib/getUser";

export const load: PageServerLoad = async ({ params }) => {
  const spell = db.data.spells.find((s) => s.id == params.id);
  if (!spell) {
    return error(404, "That spell does not exist");
  }

  const user = getUser();

  return { spell, user };
};
