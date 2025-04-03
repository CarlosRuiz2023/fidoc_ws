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
var ruta_model_1 = require("./ruta.model");
var zona_model_1 = require("./zona.model");
var puntoDeControl_model_1 = require("./puntoDeControl.model");
var DetalleRuta = /** @class */ (function (_super) {
    __extends(DetalleRuta, _super);
    function DetalleRuta() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DetalleRuta;
}(sequelize_1.Model));
DetalleRuta.init({
    id_detalle_ruta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_ruta: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tbl_rutas', // Nombre de la tabla de referencia
            key: 'id_ruta', // Llave foránea en la tabla de referencia
        },
    },
    zona: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    id_detalle: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: "DetalleRuta",
    timestamps: false, // Si no estás usando createdAt/updatedAt
    tableName: "tbl_detalle_ruta", // Nombre real de la tabla
});
ruta_model_1.default.hasMany(DetalleRuta, {
    foreignKey: 'id_ruta',
    as: 'detallesRuta', // Alias para referirse a los detalles de la ruta
});
DetalleRuta.belongsTo(ruta_model_1.default, {
    foreignKey: 'id_ruta',
    as: 'rutaDetalle',
});
zona_model_1.default.hasMany(DetalleRuta, {
    foreignKey: 'id_detalle',
    as: 'detallesZona', // Alias para referirse a los detalles de la ruta
    constraints: false,
});
DetalleRuta.belongsTo(zona_model_1.default, {
    foreignKey: 'id_detalle',
    as: 'zonaDetalle', // Cambia el alias para evitar la colisión con el atributo 'zona'
    constraints: false,
});
puntoDeControl_model_1.default.hasMany(DetalleRuta, {
    foreignKey: 'id_detalle',
    as: 'detallesPuntoDeControl', // Alias para referirse a los detalles de la ruta
    constraints: false,
});
DetalleRuta.belongsTo(puntoDeControl_model_1.default, {
    foreignKey: 'id_detalle',
    as: 'puntoDeControlDetalle',
    constraints: false,
});
exports.default = DetalleRuta;
