package controllers

import (
	"fmt"
	"html"
	"net/http"
)

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
}
