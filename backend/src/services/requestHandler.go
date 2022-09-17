package services

import (
	"log"
	"net/http"
	"olyndha/services/api"
)

func HandleNetworkTraffic() {
	// Handle requests for the auth service (login, logout, etc.)
	api.HandleAuth()

	// Creates logs for all requests and listen to the port defined 
	// for the API
	log.Fatal(http.ListenAndServe(":8600", nil))
}
