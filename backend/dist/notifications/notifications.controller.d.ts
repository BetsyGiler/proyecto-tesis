import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): Promise<CreateNotificationDto & import("./entities/notification.entity").Notification>;
    findAllByUser(usuarioObjetivo: string): Promise<import("./entities/notification.entity").Notification[]>;
    findOne(id: string): string;
    markReaded(id: string): Promise<{
        id: string;
        isActive: false;
    } & import("./entities/notification.entity").Notification>;
    remove(id: string): string;
}
