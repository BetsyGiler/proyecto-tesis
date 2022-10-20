import {Sex} from "../../core/enums/sex";
import UserEntity from "../../domain/entity/user";

export default class UserModel implements UserEntity {
	cedula?: string | undefined;
	name?: string | undefined;
	cellphone?: string | undefined;
	email: string;
	sex?: Sex | undefined;
	address?: string | undefined;
	isActive: boolean;
	birthday?: Date | undefined;

	constructor(data: UserEntity) {
		this.cedula = data.cedula;
		this.name = data.name;
		this.cellphone = data.cellphone;
		this.email = data.email;
		this.sex = data.sex;
		this.address = data.address;
		this.isActive = data.isActive;
		this.birthday = data.birthday;
	}

	copyWidth(data: UserEntity): UserModel {
		return new UserModel({
			...this,
			...data,
		});
	}
}
