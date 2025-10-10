import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import db from "$lib/server/jsondb";
import type { Feature, Component, Spell } from "./editorTypes";
import getUser from "$lib/getUser";

type FormData = {
  name: string;
  summary: string;
  [K: `feature-${bigint}-value`]: string;
  [K: `component-${bigint}-name`]: string;
  [K: `component-${bigint}-quantity`]: string;
  procedure: string;
  notes: string;
};

let user: {
  id: string;
  username: string;
} | null;

export const load: PageServerLoad = async () => {
  const spell = db.data.spells[0] ? (db.data.spells[0] as Spell) : undefined;
  user = getUser();
  if (user == null) {
    return redirect(302, "/login");
  }
  if (spell?.ownerId && user.id != spell?.ownerId) {
    return error(403, "You do not own that spell");
  }
  return { spell, user };
};

export const actions: Actions = {
  save: async (event) => {
    const formData = Object.fromEntries(await event.request.formData()) as FormData;

    const features: Feature[] = [];
    const components: Component[] = [];
    for (const key of Object.keys(formData) as (keyof FormData)[]) {
      const splitKey = key.split("-");
      if (splitKey.length != 3) continue;

      switch (splitKey[0]) {
        case "feature":
          features.push({
            name: "New feature",
            value: formData[key],
          });
          break;
        case "component":
          if (splitKey[2] != "name") continue;
          components.push({
            name: formData[key],
            quantity: Number(formData[`${splitKey[0]}-${splitKey[1]}-quantity` as keyof FormData]),
          });
      }
    }

    const spell: Spell = {
      ownerId: user!.id,
      name: formData.name,
      summary: formData.summary,
      features,
      components,
      procedure: formData.procedure,
      notes: formData.notes,
    };
    db.update(({ spells }) => (spells[0] = spell));

    return redirect(302, "/");
  },
};
