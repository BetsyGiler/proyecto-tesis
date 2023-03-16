CREATE TABLE IF NOT EXISTS Usuario(
	Cedula char(10),
    Nombre Varchar(100) not null,
    Telefono char(10) not null,
    Correo varchar(100) unique not null,
    Contrasena char(64) not null,
    sexo enum('M','F') not null, 
    FechaNacimiento date,
    Direccion Varchar(150),
    Active boolean null default true,
    Rol enum('cliente', 'empleado', 'administrador'),
    constraint CP_USUARIO primary key (Cedula)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Session(
	Cedula char(10),
	Token varchar(64) not null,
	IP varchar(16) null default 'desconocida',
	Device varchar(150) null default 'desconocido',
	CreatedAt datetime not null,
	LoggedOut datetime null,
	constraint CP_SESSION primary key (Token),
	constraint FK_Usuario foreign key(Cedula) references Usuario(Cedula)
	on update cascade on delete no action
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Cliente(
	Cedula char(10),
    Descripcion text not null,
    Active boolean null default true,
    constraint CP_CLIENTE Primary Key(Cedula),
	constraint Cf_CEDULA_USUARIO_CLIENTE foreign key(Cedula)
		references Usuario(Cedula)
			on update cascade on delete no action
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Administrador(
	Cedula char(10),
    Active boolean null default true,
    constraint CP_ADMINISTRADOR Primary Key(Cedula),
	constraint Cf_CEDULA_USUARIO__ADMINISTRADOR foreign key(Cedula)
		references Usuario(Cedula)
			on update cascade on delete no action
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Empleado(
	Cedula char(10), 
    Especialidad Varchar(100) not null,
    ExperienciaLaboral text not null,
    Active boolean null default true,
    constraint CP_EMPLEADO Primary Key(Cedula),
	constraint Cf_CEDULA_USUARIO_EMPLEADO foreign key(Cedula)
		references Usuario(Cedula)
			on update cascade on delete no action
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Horario(
	Id char(36),
    CedulaEmpleado char(10)not null, 
    FechaInicio datetime not null,
    FechaFin datetime not null,
    Active boolean null default true,
	constraint CP_HORARIO primary key (Id),
    constraint CF_CEDULA_EMPLEADO_HORARIO foreign key(CedulaEmpleado)
		references Empleado(Cedula)
			on update cascade on delete no action
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Cita(
	Id char(36),
    CedulaCliente char(10)not null,
    CedulaEmpleado char(10)not null, 
    FechaReservacion datetime not null,
    Id_Horario Char(36) not null,
    FechaAtencion datetime not null,
    Estado enum('Pendiente', 'Atendida', 'Cancelada', 'Retrasada', 'No_Atendida') not null,
    Descripcion text not null,
    Active boolean null default true,
    constraint CP_Cita primary key (Id),
    constraint CF_CEDULA_CLIENTE_CITA foreign key(CedulaCliente)
		references Cliente(Cedula)
			on update cascade on delete no action,
	constraint CF_CEDULA_EMPLEADO_CITA foreign key(CedulaEmpleado)
		references Empleado(Cedula)
			on update cascade on delete no action,
	constraint CF_ID_HORARIO_CITA foreign key(Id_Horario)
		references Horario(Id)
			on update cascade on delete no action
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Servicio(
	Id char(36),
    Nombre Varchar(100) not null,
    Tipo enum('Tratamiento', 'Retoque', 'Otro') not null,
    Costo Decimal(6,2) not null,
    Descripcion text not null,
    Active boolean null default true,
    constraint CP_SERVICIO primary key (Id)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Reserva(
	Id_Cita char(36),
    Id_Servicio char(36),
    constraint CP_RESERVA primary key (Id_Cita, Id_Servicio),
    constraint CF_ID_CITA_RESERVA foreign key(Id_Cita)
		references Cita(Id)
			on update cascade on delete no action,
	constraint CF_ID_SERVICIO_RESERVA foreign key(Id_Servicio)
		references Servicio(Id)
			on update cascade on delete no action
    )ENGINE = InnoDB;
    
CREATE TABLE IF NOT EXISTS Producto(
	Id char(36),
    Nombre Varchar(100) not null,
    Costo Decimal(6,2) not null,
    Descripcion text not null,
    Active boolean null default true,
    constraint CP_PRODUCTO primary key (Id)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS ServicioProducto(
    Id_Servicio char(36),
    Id_Producto char(36),
	constraint CP_ServicioProducto primary key (Id_Servicio, Id_Producto),
    constraint CF_ID_SERVICIO_ServicioProducto foreign key(Id_Servicio)
		references Servicio(Id)
			on update cascade on delete no action,
	constraint CF_ID_PRODUCTO_ServicioProducto foreign key(Id_Producto)
		references Producto(Id)
			on update cascade on delete no action
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Proveedor(
	Cedula char(10),
    Nombre Varchar(100) not null,
    Telefono char(10) not null,
    Correo varchar(100) not null,
    Active boolean null default true,
    constraint CP_PROVEEDOR primary key (Cedula)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS ProductoProveedor(
    Id_Producto char(36),
    CedulaProveedor char(36),
    Fecha date not null,
    Cantidad int not null,
    CostoTotal Decimal(6,2) not null,
	constraint CP_ProductoProveedor primary key (Id_Producto, CedulaProveedor, fecha),
    constraint CF_ID_PRODUCTO_ProductoProveedor foreign key(Id_Producto)
		references Producto(Id)
			on update cascade on delete no action,
	constraint CF_CEDULA_PROVEEDOR_ProductoProveedor foreign key(CedulaProveedor)
		references Proveedor(Cedula)
			on update cascade on delete no action
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Imagen(
	Id char(36),
    URL Varchar(255) not null,
    Descripcion Varchar(100) not null,
    Entidad_Padre_Id Varchar(36) not null,
    constraint CP_IMAGEN primary key (Id)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS EmpleadoHorario(
    CedulaEmpleado char(10)not null, 
    Id_Horario char(36) not null,
    constraint CF_CEDULA_EMPLEADO_HORARIO_EmpleadoHorario foreign key(CedulaEmpleado)
		references Empleado(Cedula)
			on update cascade on delete no action,
	constraint CF_ID_HORARIO_EmpleadoHorario foreign key(Id_Horario)
		references Horario(Id)
			on update cascade on delete no action
)ENGINE = InnoDB;

-- functions
delimiter //
drop function if exists getRol;
create function getRol(Cedula char(10)) returns varchar(10) deterministic
begin
	declare role varchar(10);
	-- determining the role
	select Cedula
		from Administrador a
		left join Empleado e on a.cedula = e.cedula
		where a.cedula = Cedula
		limit 1 into role;
	
	if role is not null then
		return 'admin';
	end if;

	select Cedula
		from Empleado e
		where e.cedula = Cedula
		limit 1 into role;

	if role is not null then
		return 'empleado';
	end if;

	select Cedula
		from Cliente c
		where c.cedula = Cedula
		limit 1 into role;

	if role is not null then
		return 'cliente';
	end if;

	return role;
end //
delimiter ;
-- Procedures

drop procedure if exists checkSession;
delimiter //
create procedure checkSession(
	IN Token char(64)
)
begin
	set @cedula = null;
	set @token = null;
	set @name = null;
	set @email = null;
	-- selecting all the records from token and saving into a variable
	select Usuario.Cedula, Token, Nombre, Correo from Session join Usuario on Session.Cedula = Usuario.Cedula
		where Token = Token 
		and LoggedOut is NULL
		limit 1 into @cedula, @token, @name, @email;

	-- if the variable is empty, then the token is not valid
	if @cedula is NULL then
		-- raising an error
		signal sqlstate '45000' set message_text = 'invalid_session';
	end if;

	-- extracting role 
	select getRol(@cedula) into @rol;

	select @cedula as Cedula, @token as Token, @rol as Rol, @name as Nombre, @email as Correo;
end //
delimiter ;

drop procedure if exists login;
delimiter //
create procedure login(
	IN Email varchar(255),
	IN Password char(64),
	IN IP char(15),
	IN UserAgent text
)
begin
	-- checking if there is not a session already
	set @token = null;
	select Token from Session 
		where IP = IP 
		and Device = UserAgent 
		and LoggedOut is NULL
		limit 1 into @token;

	-- if @token is not null, then there is a session already
	if @token is not null then
		-- raising an error
		signal sqlstate '45000' set message_text = 'already_on_session';
	end if;

	set @cedula = null;
	set @password = null;
	set @nombre = null;
	-- selecting all the records from token and saving into a variable
	select Contrasena, Cedula, Nombre from Usuario
		where Correo = Email
		limit 1 into @password, @cedula, @nombre;

	-- if the @password is emoty then the email is not valid
	if @password is NULL then
		-- raising an error
		signal sqlstate '45000' set message_text = 'invalid_credentials';
	end if;

	-- checking if the password is correct
	if @password != Password then
		-- raising an error
		signal sqlstate '45000' set message_text = 'invalid_credentials';
	end if;

	set @activo = null;
	-- checking if the user is Active
	select Active from Usuario
		where Correo = Email
		limit 1 into @activo;

	-- if @activo is false then the user deleted the account
	if @activo = 0 then
		-- raising an error
		signal sqlstate '45000' set message_text = 'user_inactive';
	end if;

	-- updating the session table
	start transaction;
		-- generating a random 64 character string
		set @token = md5(rand());
		-- inserting a new record into token
		insert into Session (Cedula, Token, IP, Device, CreatedAt) 
					 values (@cedula, @token, IP, UserAgent, now());
		-- determining the role
		select getRol(@cedula) into @rol;
		-- if the role is null, then the user is not valid, so we should rollback
		if @rol is NULL then
			rollback;
			-- raising an error
			signal sqlstate '45000' set message_text = 'problem_getting_role_contact_TI';
		end if;
	commit;

	-- returning the token and the role
	select @token as Token, @rol as Rol, @nombre as Nombre;

end //
delimiter ;

delimiter //
drop procedure if exists standardSignup;
-- este proceso se encarga del registro normal de cliente
create procedure standardSignup(
	IN Nombre varchar(100),
	IN ICedula char(10),
	IN ICorreo varchar(255),
	IN Contrasena char(64),
	IN Telefono char(10),
	IN Direccion varchar(255),
	IN FechaNacimiento date,
	IN Descripcion text
)
BEGIN
	-- Verifying the Cedula is not null and is not taken
	if ICedula is NULL then
		-- raising an error
		signal sqlstate '45000' set message_text = 'missing_cedula';
	end if;

	-- checking the FechaNacimiento is before today
	if FechaNacimiento > now() then
		-- raising an error
		signal sqlstate '45000' set message_text = 'malformed_birthday';
	end if;

	set @cedula = null;
	select Cedula from Usuario
		where Cedula = ICedula
		and Active = 1
		limit 1 into @cedula;

	-- if the @cedula is not null, then the cedula is taken
	if @cedula is not NULL then
		-- raising an error
		signal sqlstate '45000' set message_text = 'cedula_already_taken';
	end if;

	if ICorreo is NULL then
		-- raising an error
		signal sqlstate '45000' set message_text = 'missing_email';
	end if;

	set @correo = null;
	-- checking if the email is taken
	select Correo from Usuario
		where Correo = ICorreo
		and Active = 1
		limit 1 into @correo;

	-- if the @correo is not null, then the email is taken
	if @correo is not NULL then
		-- raising an error
		signal sqlstate '45000' set message_text = 'email_already_taken';
	end if;

	-- checking the email structure is correct
	if not (ICorreo like '%@%' and ICorreo like '%.%') then
		-- raising an error
		signal sqlstate '45000' set message_text = 'malformed_email';
	end if;

	-- NOTE: The password will come already hashed by the API
	-- Registering the user
	start transaction;
		insert into Usuario (
			Cedula, Nombre,
			Correo, Contrasena, Telefono,
			Direccion, FechaNacimiento
		) values (
			ICedula, Nombre,
			ICorreo, Contrasena, Telefono,
			Direccion, FechaNacimiento
		);

		-- inserting into the Cliente table 
		insert into Cliente (Cedula, Descripcion) values (ICedula, Descripcion);
		select "user_created_successfully" as message;
	commit;
END //
delimiter ;

drop procedure if exists logout;
delimiter //
create procedure logout(
	IN IToken char(32)
)
begin
	set @cedula = null;

	-- checking if the token is valid
	select Cedula from Session
		where Token = IToken
		and LoggedOut is NULL
		limit 1 into @cedula;

	-- if the @cedula is null, then the token is not valid
	if @cedula is NULL then
		-- raising an error
		signal sqlstate '45000' set message_text = 'no_active_session';
	end if;

	-- updating the session table
	start transaction;
		update Session set LoggedOut = now()
			where Token = IToken;
		select "logout_successfully" as message;
	commit;
end //
delimiter ;

-- TODO: remove it
-- call login('joel@joel.com', '12323232', '12312312', 'sadasdas');
-- call checkSession('token', 'ip', 'userAgent');
-- call standardSignup('Joel', '1234567890', 'vetzy@olyndha.com','123', '1234567890', 'Calle 1', '1700-01-01', 'Descripción');
--
