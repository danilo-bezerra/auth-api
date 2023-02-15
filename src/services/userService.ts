import { Request, Response } from "express";
import { User } from "../models/User";
import { userRepository } from "../repositories/userRepository";
import { FindOptionsWhere } from "typeorm";

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

  static async findWhere(where: FindOptionsWhere<User>) {
    return await userRepository.findOne({
      where,
    });
  }

  static async findById(id: number) {
    if (!id) {
      return null;
    }
    return await userRepository.findOne({
      where: {
        id,
      },
    });
  }

  static async findByEmail(email: string) {
    if (!email) {
      return null;
    }
    return await userRepository.findOne({
      where: {
        email,
      },
    });
  }

  static async findAll() {
    return await userRepository.find();
  }
}
