import { createHmac } from "crypto";
import { Request, Response } from "express";
import { TypeORMError } from "typeorm";
import { sign } from "jsonwebtoken";

import { UserService } from "../services/userService";
import { AuthService } from "../services/authService";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      const token = await AuthService.login(email, password);
      if (!token) {
        return res.status(400).json({
          message: "E-mail ou senha inválidos",
        });
      }
      res.cookie("authToken", token, {
        //secure: true,
        httpOnly: true,
        sameSite: "none",
      });
      return res.json({ token });
    } catch (e) {
      if (e instanceof TypeORMError) {
        return res.status(500).json({ message: "Erro: " + e.name });
      }
      return res.status(500).json({
        message: "Erro interno do servidor!",
      });
    }
  }
}
