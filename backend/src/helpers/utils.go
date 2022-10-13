// Provides some basic operations to use in the development
package helpers

import (
	"math/rand"
	"os"
)

// define the given charset, char only for token generation
var charset = []byte("+#./-@abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

// Reads an environment variable from a .env file or
// from the OS environment variables (also applies
// for Docker.
func ReadEnv(key string, defaultValue string) string {
	variable, isPresent := os.LookupEnv(key)

	// If no variable is present then use the default 
	// value to avoid pointing to null references
	if !isPresent {
		variable = defaultValue
	}

	return variable
}

// n is the length of random string we want to generate
func randStr(n int) string {
	b := make([]byte, n)
	for i := range b {
		// randomly select 1 character from given charset
		b[i] = charset[rand.Intn(len(charset))]
	}
	return string(b)
}

// Generates a 64 bytes long random string to work as a token. Use it 
// to save session info
func GenerateToken() string {
	return randStr(64)
}
