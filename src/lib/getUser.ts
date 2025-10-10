import { getRequestEvent } from "$app/server";

export default function getUser() {
  const { locals } = getRequestEvent();
  return locals.user;
}
