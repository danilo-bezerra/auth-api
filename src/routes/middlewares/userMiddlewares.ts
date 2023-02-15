import { NextFunction, Request, Response } from "express";
import { TypeORMError } from "typeorm";
import { UserService } from "../../services/userService";

export class UserMiddleware {
  static async emailAvailable(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await UserService.findByEmail(email);
      if (user) {
        return res.status(400).json({ message: "E-mail não disponível" });
      }

      return next();
    } catch (e) {
      if (e instanceof TypeORMError) {
        return res.status(500).json({ message: "Erro: " + e.name });
      }
      return res.status(500).json({ message: "Erro interno do servidor!" });
    }
  }
}
