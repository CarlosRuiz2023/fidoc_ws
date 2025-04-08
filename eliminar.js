const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');

try {
    fs.rmdirSync(distPath, { recursive: true });
    console.log('Carpeta dist eliminada correctamente.');
} catch (err) {
    if (err.code !== 'ENOENT') {
        console.error('Error al eliminar la carpeta dist:', err);
    }
}