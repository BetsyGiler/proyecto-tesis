CREATE TABLE IF NOT EXISTS Usuario(
	Cedula char(10),
    Nombre Varchar(100) not null,
    Telefono char(10) not null,
    Correo varchar(100) not null,
    Contrasena char(64) not null,
    sexo enum('M','F') not null, 
    FechaNacimento date,
    Direccion Varchar(150),
    Active boolean null default true,
    constraint CP_USUARIO primary key (Cedula)
)ENGINE = InnoDB;

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
