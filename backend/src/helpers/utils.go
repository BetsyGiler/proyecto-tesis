// Provides some basic operations to use in the development
package helpers

import "os"

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
