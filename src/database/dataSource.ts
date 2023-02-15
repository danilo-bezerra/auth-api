import { DataSource } from "typeorm";
import { User } from "../models/User";

export const db = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [User],
  synchronize: true,
});
