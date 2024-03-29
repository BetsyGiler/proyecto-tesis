import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UserService } from "src/user/user.service";
export declare class ClientGuard implements CanActivate {
    private readonly userService;
    constructor(userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
