package main

import (
	"olyndha/services"
)

func main() {
	// This is the entry point for the API service and will be deferred since 
	// the API service will be running in the background after all the other 
	// services have been started.
	defer services.HandleNetworkTraffic()
}
