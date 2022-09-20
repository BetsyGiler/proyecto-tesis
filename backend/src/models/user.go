package models

// The model corresponding to the user schema on the database
type user struct {
	Cedula          string `json:"Cedula"` // Accepts only EC format
	Nombre          string `json:"Nombre"`
	Telefono        string `json:"Telefono"` // Accepts only EC formats with +593
	Correo          string `json:"Correo"`
	Contrasena      string `json:"Contrasena"`      // this will be encrypted
	FechaNacimiento int64  `json:"FechaNacimiento"` // Unix format (nanoseconds)
	Direccion       string `json:"Direccion"`
	Token           string `json:"Token"`  // Session token (only one per device)
	Active          bool   `json:"Active"` // Used to virtually delete a record on DB
}

// Since [user] is a private structure here we'll use a child
// structure to simulate a kind of inheriance similar to OOP. This
// model will belong exclusively to the client who access the system
// and wants to buy some service.
type Cliente struct {
	user               // anonymus field to simulate inheritance
	Descripcion string // About previous treatments & other relevant data
}

// The role with the highest privileges on the system. It cannot be created
// on the registering page, so an administrator role needs to be created by
// another administrator or by the IT team.
type Administrador struct {
	user
}

// An employee for the system to attend meetings with the clients and brings
// support.
type Empleado struct {
	user
}
