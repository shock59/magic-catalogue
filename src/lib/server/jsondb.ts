import { JSONFilePreset } from "lowdb/node";
const db = await JSONFilePreset<{
  spells: unknown[];
}>("db.json", { spells: [] });
export default db;
