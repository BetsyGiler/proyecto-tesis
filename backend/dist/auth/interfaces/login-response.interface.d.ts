import { User } from "src/user/entities/user.entity";
export interface ILoginResponse {
    user: User;
    accessToken: string;
}
