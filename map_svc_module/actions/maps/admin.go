package maps

import (
	"encoding/json"
	"github.com/gofiber/fiber/v2"
	"gorm.io/datatypes"
	"map_svc_module/app"
	"map_svc_module/models"
	"strconv"
)

func GetAdminMapStores(c *fiber.Ctx) error {
	appInstance := app.GetSvcInstance()

	var AdminLocations []models.AdminLocation
	appInstance.DatabaseInstance.Find(&AdminLocations)

	return c.Status(200).JSON(AdminLocations)
}

func CreateAdminMapStore(c *fiber.Ctx) error {
	appInstance := app.GetSvcInstance()
	payload := struct {
		ShopID      string `json:"shop_id"`
		Floor       string `json:"floor"`
		Coordonates string `json:"coordonates"`
	}{}

	json.Unmarshal(c.Body(), &payload)
	converted, err := strconv.ParseUint(payload.Floor, 10, 0)
	if err != nil {
		return err
	}

	adminLocation := models.AdminLocation{
		ShopID:      payload.ShopID,
		Floor:       uint(converted),
		Coordonates: datatypes.JSON([]byte(payload.Coordonates)),
	}

	appInstance.DatabaseInstance.Create(&adminLocation)
	return c.Status(201).JSON(adminLocation)
}

func DeleteAdminMapStore(c *fiber.Ctx) error {
	id := c.Params("id")
	appInstance := app.GetSvcInstance()

	converted, err := strconv.ParseUint(id, 10, 0)
	if err != nil {
		return err
	}

	var adminLocation models.AdminLocation
	result := appInstance.DatabaseInstance.Delete(&adminLocation, uint(converted))

	if result.RowsAffected == 0 {
		return c.SendStatus(404)
	}

	return c.SendStatus(200)
}
