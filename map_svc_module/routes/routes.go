package routes

import (
	"github.com/gofiber/fiber/v2"
	"map_svc_module/actions/maps"
)

type ActionFunctions []fiber.Handler

type Route struct {
	Protocol string
	Path     string
	Action   ActionFunctions
}

var RoutesInstances = []Route{
	{
		Protocol: "GET",
		Path:     "/admin-locations",
		Action: ActionFunctions{
			maps.GetAdminMapStores,
		},
	},
	{
		Protocol: "GET",
		Path:     "/heatzone-data",
		Action: ActionFunctions{
			maps.GetDataForHotzones,
		},
	},
	{
		Protocol: "POST",
		Path:     "/admin-locations",
		Action: ActionFunctions{
			maps.CreateAdminMapStore,
		},
	},
	{
		Protocol: "DELETE",
		Path:     "/admin-locations/:id",
		Action: ActionFunctions{
			maps.DeleteAdminMapStore,
		},
	},
}
