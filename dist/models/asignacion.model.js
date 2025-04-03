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
var usuario_model_1 = require("./usuario.model");
// Define the model class
var Asignacion = /** @class */ (function (_super) {
    __extends(Asignacion, _super);
    function Asignacion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Asignacion;
}(sequelize_1.Model));
// Initialize the model
Asignacion.init({
    id_asignacion: {
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
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tbl_usuarios', // Nombre de la tabla de referencia
            key: 'id_usuario', // Llave foránea en la tabla de referencia
        },
    },
    fecha_hora_asignacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    fecha_hora_termino: {
        type: sequelize_1.DataTypes.DATE,
    },
    estatus: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Asignacion",
    tableName: "tbl_asignaciones",
    timestamps: false, // Adjust based on your preference
});
ruta_model_1.default.hasMany(Asignacion, {
    foreignKey: 'id_ruta',
    as: 'asignacionRuta', // Alias para referirse a los detalles de la ruta
});
Asignacion.belongsTo(ruta_model_1.default, {
    foreignKey: 'id_ruta',
    as: 'rutaAsignacion',
});
usuario_model_1.default.hasMany(Asignacion, {
    foreignKey: 'id_usuario',
    as: 'asignacionUsuario', // Alias para referirse a los detalles de la ruta
});
Asignacion.belongsTo(usuario_model_1.default, {
    foreignKey: 'id_usuario',
    as: 'usuarioAsignacion',
});
exports.default = Asignacion;
