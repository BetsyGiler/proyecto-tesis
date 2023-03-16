import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  use(req: any, _: Response, next: Function) {
    // extracting the token from the authorization
    const { authorization } = req.headers;

    // validating the token
    if (!authorization) {
      throw new UnauthorizedException('Debe proveer un token de autenticación');
    }

    // calling the next middleware
    next();
  }
}
