package main

import (
	"context"
	"encoding/json"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/websocket/v2"
	env "github.com/joho/godotenv"
	"log"
	"map_svc_module/app"
	"map_svc_module/routes"
	"os"
)

var ctx = context.Background()

type TrackingResults struct {
	UUID    string `json:"uuid"`
	oldTime int    `json:"oldTime"`
	newTime int    `json:"newTime"`
	diff    int    `json:"diff"`
}

func main() {
	err := env.Load()
	if err != nil {
		log.Fatal("[go-svc]: Can't fetch the env variables please check your .env file")
	}

	err = app.SetSvcInstance()
	if err != nil {
		log.Fatalf("[go-svc]: %v", err)
	}

	appInstance := app.GetSvcInstance()
	appInstance.ServerInstance.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	appInstance.ServerInstance.Get("/ws", websocket.New(func(c *websocket.Conn) {
		for {
			mt, msg, err := c.ReadMessage()
			if err != nil {
				log.Println("read:", err)
				break
			}
			in := []byte(msg)
			var trackingResults TrackingResults

			err = json.Unmarshal(in, &trackingResults)
			if err != nil {
				break
			}

			appInstance.RedisInstance.Set(ctx, trackingResults.UUID, string(msg), 0)
			log.Printf("recv: %s", msg)
			err = c.WriteMessage(mt, msg)
			if err != nil {
				log.Println("write:", err)
				break
			}
		}
	}))

	for _, route := range routes.RoutesInstances {
		switch {
		case route.Protocol == "GET":
			appInstance.ServerInstance.Get(route.Path, route.Action...)
		case route.Protocol == "POST":
			appInstance.ServerInstance.Post(route.Path, route.Action...)
		case route.Protocol == "DELETE":
			appInstance.ServerInstance.Delete(route.Path, route.Action...)
		}
	}

	err = appInstance.ServerInstance.Listen(os.Getenv("APP_PORT"))
	if err != nil {
		log.Fatalf("[go-svc]: Can't start listening, reason: %v", err)
	}
}
