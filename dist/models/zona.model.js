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
var Zona = /** @class */ (function (_super) {
    __extends(Zona, _super);
    function Zona() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Zona;
}(sequelize_1.Model));
// Initialize the model
Zona.init({
    id_zona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tbl_estados', // Nombre de la tabla de referencia
            key: 'id_estado', // Llave foránea en la tabla de referencia
        },
    },
    id_municipio: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tbl_municipios', // Nombre de la tabla de referencia
            key: 'id_municipio', // Llave foránea en la tabla de referencia
        },
    },
    vertices: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.DECIMAL)), // Arreglo de arreglos de decimales
        allowNull: true,
    },
    peligrosa: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    estatus: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Zona",
    tableName: "tbl_zonas",
    timestamps: false, // Adjust based on your preference
});
exports.default = Zona;
