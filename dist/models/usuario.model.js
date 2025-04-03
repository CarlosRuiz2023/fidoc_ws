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
var Usuario = /** @class */ (function (_super) {
    __extends(Usuario, _super);
    function Usuario() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Usuario;
}(sequelize_1.Model));
// Initialize the model
Usuario.init({
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    clave_empleado: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    id_rol: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tbl_roles', // Nombre de la tabla de referencia
            key: 'id_rol', // Llave foránea en la tabla de referencia
        },
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    contrasenia: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    plataforma: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    telefono: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
    token: {
        type: sequelize_1.DataTypes.TEXT,
    },
    estatus: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Usuario",
    tableName: "tbl_usuarios",
    timestamps: false, // Adjust based on your preference
});
exports.default = Usuario;
