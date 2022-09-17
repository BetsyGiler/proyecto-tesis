package api

import (
	"net/http"
	"olyndha/controllers"
	"olyndha/router"
)

func HandleAuth() {
	// Handle the request for the Login action in the Auth controller
	http.HandleFunc(string(router.Login), controllers.HandleLogin)
}
