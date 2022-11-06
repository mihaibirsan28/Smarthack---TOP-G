package maps

import (
	"context"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"map_svc_module/app"
)

var ctx = context.Background()

func GetDataForHotzones(c *fiber.Ctx) error {
	appInstance := app.GetSvcInstance()

	res, err := appInstance.RedisInstance.Do(ctx, "KEYS", "*").Result()
	if err != nil {
		return err
	}

	var results []string
	for _, val := range res.([]interface{}) {
		res := appInstance.RedisInstance.Get(ctx, fmt.Sprint(val))

		r, err := res.Result()
		if err != nil {
			return err
		}

		results = append(results, r)
	}

	return c.Status(200).JSON(results)
}
