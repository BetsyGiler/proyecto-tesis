import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { Session } from 'src/auth/entities/session.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAllClients(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(session: Session, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
