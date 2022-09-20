package controllers

import (
	"fmt"
	"html"
	"net/http"
	"olyndha/helpers"
	"olyndha/models"
)

// Logs in the user into the system creating a token & storing it
// on the database. The client must save the token somewhere to be
// authorized to perform some requests
func HandleLogin(w http.ResponseWriter, r *http.Request) {

	// Database instance
	db := helpers.GetMySQLInstance()

	results, err := db.Query("SELECT * FROM Usuario")

	if err != nil {
		panic(err.Error())
	}

	for results.Next() {
		var user models.Administrador

		err = results.Scan(&user.Cedula, &user.Nombre, &user.Correo)

		if err != nil {
			panic(err.Error())
		}

		fmt.Println(user.Cedula, user.Nombre, user.Correo)
	}

	fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
}
