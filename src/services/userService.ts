import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { User } from "../models/User";
import { userRepository } from "../repositories/userRepository";

/*
criar
obter
atualizar - nome, email, senha, foto, bio
apagar
*/
export class UserService {
  static async insert(user: User) {
    return await userRepository.save(user);
  }

  static async update(id: number, userUpdated: User) {
    const user = await this.findById(id);
    return await userRepository.save({ ...user, ...userUpdated });
  }

  static async delete(id: number) {
    await userRepository.delete(id);
  }

  static async findById(id: number) {
    return await userRepository.findOne({
      where: {
        id,
      },
    });
  }

  static async findAll() {
    return await userRepository.find();
  }
}
