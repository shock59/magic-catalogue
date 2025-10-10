import { JSONFilePreset } from "lowdb/node";
const db = await JSONFilePreset<{
  spells: Spell[];
}>("db.json", { spells: [] });
export default db;
