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
var Ruta = /** @class */ (function (_super) {
    __extends(Ruta, _super);
    function Ruta() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Ruta;
}(sequelize_1.Model));
// Initialize the model
Ruta.init({
    id_ruta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario_creador: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tbl_usuarios', // Nombre de la tabla de referencia
            key: 'id_usuario', // Llave foránea en la tabla de referencia
        },
    },
    id_usuario_editor: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tbl_usuarios', // Nombre de la tabla de referencia
            key: 'id_usuario', // Llave foránea en la tabla de referencia
        },
    },
    id_ruta_previa: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tbl_rutas', // Nombre de la tabla de referencia
            key: 'id_ruta', // Llave foránea en la tabla de referencia
        },
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    direccion_inicio: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    id_estado_inicio: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tbl_estados', // Nombre de la tabla de referencia
            key: 'id_estado', // Llave foránea en la tabla de referencia
        },
    },
    id_municipio_inicio: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tbl_municipios', // Nombre de la tabla de referencia
            key: 'id_municipio', // Llave foránea en la tabla de referencia
        },
    },
    latitud_inicio: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    longitud_inicio: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    direccion_fin: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    id_estado_fin: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tbl_estados', // Nombre de la tabla de referencia
            key: 'id_estado', // Llave foránea en la tabla de referencia
        },
    },
    id_municipio_fin: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'tbl_municipios', // Nombre de la tabla de referencia
            key: 'id_municipio', // Llave foránea en la tabla de referencia
        },
    },
    latitud_fin: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    longitud_fin: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    polilinea: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.DECIMAL)), // Arreglo de arreglos de decimales
        allowNull: true,
    },
    distancia: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    tiempo: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fecha_hora_creacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    fecha_hora_ultima_modificacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    estatus: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Ruta",
    tableName: "tbl_rutas",
    timestamps: false, // Adjust based on your preference
});
exports.default = Ruta;
