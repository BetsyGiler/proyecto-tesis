import { User } from "src/user/entities/user.entity";
export interface IRegisterResponse {
    user: User;
    accessToken: string;
}
