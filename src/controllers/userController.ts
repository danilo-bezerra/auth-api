import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { TypeORMError } from "typeorm";
import { User } from "../models/User";
import { UserService } from "../services/userService";

/*
criar
obter
atualizar - nome, email, senha, foto, bio
apagar
*/
export class UserController {
  static async insert(req: Request, res: Response) {
    try {
      const { name, email, password, c_password } = req.body;
      if (!name || !email || !password || !c_password) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }
      if (password != c_password) {
        return res.status(400).json({ message: "As senhas não conferem" });
      }
      
      const user = new User();
      user.email = email;
      user.password = password;
      user.name = name;
     

      const newUser = await UserService.insert(user);

      return res.status(201).json(newUser);
    } catch (e) {
      if (e instanceof TypeORMError) {
        return res.status(500).json({ message: "Erro: " + e.name });
      }
      return res.status(500).json({ message: "Erro interno do servidor!" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, bio, phoneNumber } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Id não fornecido" });
      }
      const filename = req.file?.filename
      const user = new User();
      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }
      if (bio) {
        user.bio = bio;
      }
      if (phoneNumber) {
        user.phoneNumber = phoneNumber;
      }
      if (filename) {
         user.profilePhoto = filename;
      }
      await UserService.update(Number(id), user);

      return res.status(201).send();
    } catch (e) {
      if (e instanceof TypeORMError) {
        return res.status(500).json({ message: "Erro: " + e.name });
      }
      return res.status(500).json({ message: "Erro interno do servidor!" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Id não fornecido" });
      }

      await UserService.delete(Number(id));
      return res.status(204).send();
    } catch (e) {
      if (e instanceof TypeORMError) {
        return res.status(500).json({ message: "Erro: " + e.name });
      }
      return res.status(500).json({ message: "Erro interno do servidor!" });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Id não fornecido" });
      }

      const obj = await UserService.findById(Number(id));
      res.json(obj);
    } catch (e) {
      if (e instanceof TypeORMError) {
        return res.status(500).json({ message: "Erro: " + e.name });
      }
      return res.status(500).json({ message: "Erro interno do servidor!" });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const objs = await UserService.findAll();
      return res.json(objs);
    } catch (e) {
      if (e instanceof TypeORMError) {
        return res.status(500).json({ message: "Erro: " + e.name });
      }
      return res.status(500).json({ message: "Erro interno do servidor!" });
    }
  }
}
