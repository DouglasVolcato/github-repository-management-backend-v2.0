import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from './user/user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class Middleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        throw new Error('The token was not informed.');
      }

      const split = authorization.split(' ');

      if (!split || split[0] !== 'Bearer' || split.length !== 2) {
        throw new Error('Invalid token.');
      }

      jwt.verify(split[1], process.env.SECRET, async (err, decoded) => {
        try {
          if (err) {
            throw new Error('Invalid token.');
          }

          const userServices = new UserService();
          const user = await userServices.getById(decoded.id);

          if (!user || !user.id) {
            throw new Error('Invalid token.');
          }

          req.body.userId = user.id;

          return next();
        } catch (err) {
          return res
            .status(400)
            .send({ message: 'Authentication error. ' + err });
        }
      });
    } catch (err) {
      return res.status(400).send({ message: 'Authentication error. ' + err });
    }
  }
}
