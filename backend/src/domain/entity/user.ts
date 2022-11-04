import {Sex} from "../../core/enums/sex";

interface UserEntity {
	cedula?: string;
	name?: string;
	cellphone?: string;
	email: string;
	sex?: Sex;
	address?: string;
	isActive: boolean;
	birthday?: Date;
	description?: string;
}

export default UserEntity;
