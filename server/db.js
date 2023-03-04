import { Database } from "fakebase";

const db = new Database("./data");

export const Tasks = db.table("tasks");
