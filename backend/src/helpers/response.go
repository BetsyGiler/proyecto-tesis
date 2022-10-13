package helpers

import (
	"encoding/json"
	"net/http"
)

func NotAllowedMethodResponse(w http.ResponseWriter, method string) {
	// Specifying on the headers the method is not allowed to notify the
	// web client
	w.WriteHeader(http.StatusMethodNotAllowed)
	// Telling the client the response is of type JSON
	w.Header().Set("Content-Type", "application/json")

	// Writing the response
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Method not allowed",
		"method":  method,
	})
}

func IsMethodAllowed(method string, allowedMethods []string) bool {
	for _, allowedMethod := range allowedMethods {
		if method == allowedMethod {
			return true
		}
	}
	return false
}
