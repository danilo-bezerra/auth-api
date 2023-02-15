import { db } from "../database/dataSource";
import { User } from "../models/User";

export const userRepository = db.getRepository(User);
