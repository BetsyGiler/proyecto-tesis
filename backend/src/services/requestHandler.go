package services

import (
	"fmt"
	"log"
	"net/http"
	"olyndha/helpers"
	"olyndha/services/api"
)

func HandleNetworkTraffic() {
	fmt.Println("Starting server")
	// Handle requests for the auth service (login, logout, etc.)
	api.HandleAuth()

	// Port where to serve the API
	port := helpers.ReadEnv("API_PORT", "8800")

	fmt.Printf("Server running on port %s\n", port)

	// Creates logs for all requests and listen to the port defined 
	// for the API
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}
