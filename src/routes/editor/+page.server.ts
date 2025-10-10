import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import db from "$lib/server/jsondb";

type FormData = {
  name: string;
  summary: string;
  [K: `feature-${bigint}-value`]: string;
  [K: `component-${bigint}-name`]: string;
  [K: `component-${bigint}-quantity`]: string;
  procedure: string;
  notes: string;
};

type Feature = {
  name: string;
  value: string;
};

type Component = {
  quantity: number;
  name: string;
};

type Spell = {
  name: string;
  summary: string;
  features: Feature[];
  components: Component[];
  procedure: string;
  notes: string;
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
