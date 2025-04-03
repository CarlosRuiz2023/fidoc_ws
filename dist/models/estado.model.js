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
var Estado = /** @class */ (function (_super) {
    __extends(Estado, _super);
    function Estado() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Estado;
}(sequelize_1.Model));
Estado.init({
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Estado",
    timestamps: false, // No utilizamos createdAt ni updatedAt
    tableName: "tbl_estados", // Nombre de la tabla en la base de datos
});
exports.default = Estado;
