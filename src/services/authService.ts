import { Request, Response } from "express";
import { User } from "../models/User";
import { userRepository } from "../repositories/userRepository";
import { FindOptionsWhere } from "typeorm";
import { UserService } from "./userService";
import { createHmac } from "crypto";
import { sign } from "jsonwebtoken";

/*
criar
obter
atualizar - nome, email, senha, foto, bio
apagar
*/
export class AuthService {
  static async login(email: string, password: string) {
    const user = await UserService.findWhere({
      email,
      password: createHmac("sha256", password).digest("hex"),
    });
    if (!user) {
        return null
    }
    const token = sign({ email: user.email }, process.env.JWT_KEY!, {
      expiresIn: "3h",
    });

    return token
  }
}
