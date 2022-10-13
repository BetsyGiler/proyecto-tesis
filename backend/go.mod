module olyndha

go 1.18

require olyndha/services v0.0.0-00010101000000-000000000000

require (
	github.com/go-sql-driver/mysql v1.6.0 // indirect
	golang.org/x/crypto v0.0.0-20221010152910-d6f0a8c073c2 // indirect
	olyndha/controllers v0.0.0-00010101000000-000000000000 // indirect
	olyndha/helpers v0.0.0-00010101000000-000000000000 // indirect
	olyndha/models v0.0.0-00010101000000-000000000000 // indirect
	olyndha/router v0.0.0-00010101000000-000000000000 // indirect
)

replace olyndha/helpers => ./src/helpers

replace olyndha/services => ./src/services

replace olyndha/controllers => ./src/controllers

replace olyndha/router => ./src/router

replace olyndha/models => ./src/models
