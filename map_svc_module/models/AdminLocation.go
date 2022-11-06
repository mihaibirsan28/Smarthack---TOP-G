package models

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type AdminLocation struct {
	gorm.Model
	ID          uint `gorm:"primaryKey"`
	ShopID      string
	ShopName    string
	Coordonates datatypes.JSON
	Floor       uint
}
