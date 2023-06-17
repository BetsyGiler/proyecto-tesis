import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtStrategyOutput } from "../interfaces/strategy-output.interface";
import { Roles as RolesEnum } from "../enums/roles";
import { Role } from "src/user/entities/roles.entity";
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
    const { user } = await this.userService.findOne(guardOutput);

    // The user will always exist so we don't have to make that condition here
    const role: Role | undefined = user.roles?.find(
      role => role.name === RolesEnum.ADMIN
    );

    if (!role) {
      return false;
    }

    return true;
  }

}
