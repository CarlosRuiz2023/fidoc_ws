"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_1 = require("../db/connection");
// Define the model class
var TipoVehiculo = /** @class */ (function (_super) {
    __extends(TipoVehiculo, _super);
    function TipoVehiculo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TipoVehiculo;
}(sequelize_1.Model));
// Initialize the model
TipoVehiculo.init({
    id_tipo_vehiculo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    tonelada: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    altura: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    ancho: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    largo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    imagen: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    estatus: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    sequelize: connection_1.default,
    modelName: "TipoVehiculo",
    tableName: "tbl_tipos_de_vehiculos",
    timestamps: false, // Adjust based on your preference
});
exports.default = TipoVehiculo;
