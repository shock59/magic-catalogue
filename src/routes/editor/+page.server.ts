import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  save: async (event) => {
    const formData = await event.request.formData();

    console.log(formData);

    return redirect(302, "/");
  },
};
