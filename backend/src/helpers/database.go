package helpers

import (
	"database/sql"
	"fmt"
	"sync"
	_ "github.com/go-sql-driver/mysql"
)

var once sync.Once

// the instance to be used everywhere
var instance *sql.DB

// Creates a DB connection with MySQL on the Docker network
// using environment variables as credentials
func createConnection() *sql.DB {
	// Reading credentials from envitonment variables
	username := ReadEnv("MYSQL_USERNAME", "root")
	password := ReadEnv("MYSQL_PASSWORD", "")
	database := ReadEnv("MYSQL_DATABASE", "example")
	host := ReadEnv("MYSQL_HOST", "localhost")

	fmt.Println("Connecting to MySQL database...")
	fmt.Println(username, password, database, host)

	// Connection string for MySQL container
	conn := fmt.Sprintf(
		"%s:%s@tcp(%s)/%s",
		username, password, host, database,
	)

	// databse connection with Docker
	db, err := sql.Open("mysql", conn)

	// Panic the application & creates a log (on the server Log)
	if err != nil {
		panic(err.Error())
	}

	// This will be closed at the end of the API lifecycle
	// defer db.Close()
	return db
}

// Returns a singleton instance of the database connection
func GetMySQLInstance() *sql.DB {
	// executes the creation of the connection exactly once
	once.Do(func() {
		instance = createConnection()
	})

	return instance
}
