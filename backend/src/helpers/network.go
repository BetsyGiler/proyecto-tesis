package helpers

import (
	"net"
	"net/http"
)

// Extracts the IP from the client browser where the request was 
// generated
func ExtractIP(r *http.Request) string {
	ip, _, _ := net.SplitHostPort(r.RemoteAddr)

	return ip
}

// TODO: document
func ExtractUserAgent(r *http.Request) string {
	return r.UserAgent()
}
