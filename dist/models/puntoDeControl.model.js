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
var PuntoDeControl = /** @class */ (function (_super) {
    __extends(PuntoDeControl, _super);
    function PuntoDeControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PuntoDeControl;
}(sequelize_1.Model));
PuntoDeControl.init({
    id_punto_de_control: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(255),
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
    dias_activo: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
        allowNull: true,
    },
    hora_activacion: {
        type: sequelize_1.DataTypes.TIME,
    },
    hora_desactivacion: {
        type: sequelize_1.DataTypes.TIME,
    },
    latitud: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    longitud: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    estatus: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    sequelize: connection_1.default,
    modelName: "PuntoDeControl",
    timestamps: false, // Si no estás usando createdAt/updatedAt
    tableName: "tbl_puntos_de_control", // Nombre real de la tabla
});
exports.default = PuntoDeControl;
