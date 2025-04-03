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
var estado_model_1 = require("./estado.model"); // Importamos el modelo Estado
var Municipio = /** @class */ (function (_super) {
    __extends(Municipio, _super);
    function Municipio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Municipio;
}(sequelize_1.Model));
Municipio.init({
    id_municipio: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    municipio: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: estado_model_1.default, // Referencia a la tabla `tbl_estados`
            key: "id_estado",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
    },
}, {
    sequelize: connection_1.default,
    modelName: "Municipio",
    timestamps: false, // No utilizamos createdAt ni updatedAt
    tableName: "tbl_municipios", // Nombre real de la tabla en la base de datos
});
// Relación entre Municipio y Estado
Municipio.belongsTo(estado_model_1.default, { foreignKey: "id_estado" });
exports.default = Municipio;
