package controllers

import (
	"encoding/json"
	"fmt"
	"html"
	"net/http"
	"olyndha/helpers"
	"olyndha/models"

	"golang.org/x/crypto/bcrypt"
)

// Logs in the user into the system creating a token & storing it
// on the database. The client must save the token somewhere to be
// authorized to perform some requests
func HandleLogin(w http.ResponseWriter, r *http.Request) {

	var allowedMethods = []string{"POST"}

	// check if r.Method is on the allowedMethods slice
	if !helpers.IsMethodAllowed(r.Method, allowedMethods) {
		helpers.NotAllowedMethodResponse(w, r.Method)
		return
	}

	// Database instance
	db := helpers.GetMySQLInstance()

	// getting the email & password from the request body
	var email string = r.FormValue("email")
	// var password string = r.FormValue("password")

	query := `SELECT u.Cedula, u.Nombre, u.Correo, u.Contrasena, 
		a.Cedula as administrator, e.Cedula as employee 
		FROM Usuario u join Empleado e 
					   join Administrador a
					  on (e.Cedula = u.Cedula)
					  on (a.Cedula = u.Cedula)
	WHERE u.email = ?`

	// querying on MySQL
	results, err := db.Query(query, email)

	if err != nil {
		panic(err.Error())
	}

	// validating the results contains at least one row
	var userExists bool = false

	// If the DB does not return any value on the fields 'administrator'
	// and 'employee' then the user is a client.
	var isAdminsitrator string
	var isEmployee string
	var password string
	var cedula string
	var name string

	for results.Next() {
		userExists = true

		err = results.Scan(
			&cedula,
			&name,
			&email,
			&password,
			&isAdminsitrator,
			&isEmployee,
		)

		if err != nil {
			panic(err.Error())
		}

		if bcrypt.CompareHashAndPassword([]byte(password), []byte(password)) != nil {
			json.NewEncoder(w).Encode(map[string]string{
				"error": "Credenciales incorrectas",
			})
			return
		}
		break;
	}

	if !userExists {
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Credenciales incorrectas",
		})
	}

	// extracting the IP
	ip := helpers.ExtractIP(r)
	device := helpers.ExtractUserAgent(r)

	// verifying the user is not in session using the IP
	sessionQuery := `SELECT COUNT(*) FROM Session where IP = ? AND loggedOut is not null`
	sessionResult, sessionErr := db.Query(sessionQuery, ip)

	if sessionErr != nil {
		panic(sessionErr.Error())
	}

	// if there is at least one record, then the user is already in session
	var isAlreadyInSession bool = false
	for sessionResult.Next() {
		isAlreadyInSession = true
		break
	}

	// If the user is already in session an error is returned
	if isAlreadyInSession {
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Ya hay una sesión iniciada",
		})
		return
	}

	token := helpers.GenerateToken()

	updateTokenQuery := "insert into Session (Token, IP, Device, Cedula) Token = ?, IP = ?, Device = ?, Cedula = ? where email = ?"

	// querying on MySQL
	newResults, newErr := db.Exec(updateTokenQuery, token, email)

	if newErr != nil {
		panic(newErr.Error())
	}

	// validating the results contains at least one row
	var rowsAffected int64 = 0

	rowsAffected, _ = newResults.RowsAffected()

	if rowsAffected == 0 {
		json.NewEncoder(w).Encode(map[string]string{
			"error": "No se pudo iniciar sesión. Pruebe más tarde.",
		})
		return
	}

	// Creating the response

}
