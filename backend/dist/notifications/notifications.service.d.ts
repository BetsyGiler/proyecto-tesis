import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
export declare class NotificationsService {
    private readonly notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
    create(createNotificationDto: CreateNotificationDto): Promise<CreateNotificationDto & Notification>;
    findAllByUser(userId: string): Promise<Notification[]>;
    findOne(id: number): string;
    markAsReaded(id: string): Promise<{
        id: string;
        isActive: false;
    } & Notification>;
    remove(id: number): string;
}
