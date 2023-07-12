import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtStrategyOutput } from "../interfaces/strategy-output.interface";
import { UserService } from "src/user/user.service";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private readonly userService: UserService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // extracting a valid session
    const guardOutput = request['user'] as JwtStrategyOutput;

    // checking if the user is an admin
    const user = await this.userService.findOne(guardOutput.session.userId);

    if (user.rol !== 'admin') {
      return false;
    }

    return true;
  }

}
