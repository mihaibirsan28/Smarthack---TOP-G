package app

import (
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"map_svc_module/models"
	"os"
)

type App struct {
	DatabaseInstance *gorm.DB
	RedisInstance    *redis.Client
	ServerInstance   *fiber.App
}

var svcInstance App

func GetSvcInstance() App {
	return svcInstance
}

func SetSvcInstance() error {
	db, err := gorm.Open(mysql.Open(os.Getenv("DB_CONNECTION_DNS")), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("[go-svc]: Can't connect to the database please check your DB health")
	}

	svcInstance = App{
		RedisInstance: redis.NewClient(&redis.Options{
			Addr:     os.Getenv("REDIS_HOST"),
			Password: os.Getenv("REDIS_PASSWORD"),
			DB:       0,
		}),
		DatabaseInstance: db,
		ServerInstance: fiber.New(fiber.Config{
			AppName: os.Getenv("APP_NAME"),
		}),
	}
	svcInstance.DatabaseInstance.Set("gorm:table_options", "ENGINE=InnoDB")
	svcInstance.DatabaseInstance.Set("gorm:table_options", "collation_connection=utf8_general_ci")

	svcInstance.DatabaseInstance.AutoMigrate(&models.AdminLocation{})
	return nil
}
