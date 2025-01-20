import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

let contribuyentesCache = null;
let lastLoadTime = null;
const CACHE_DURATION = 1000 * 60 * 60;

async function loadContribuyentes() {
    try {
        if (!contribuyentesCache || !lastLoadTime || Date.now() - lastLoadTime > CACHE_DURATION) {
            console.log('Cargando archivo DGII_RNC.txt...');
            const data = await fs.readFile(join(__dirname, 'DGII_RNC.txt'), 'utf8');
            
            // Debug: mostrar las primeras líneas del archivo
            console.log('Primeras líneas del archivo:');
            console.log(data.split('\n').slice(0, 3));

            contribuyentesCache = data
                .split('\n')
                .filter(line => line.trim()) // Eliminar líneas vacías
                .map(line => {
                    const parts = line.split('|');
                    if (parts.length < 2) {
                        console.log('Línea con formato incorrecto:', line);
                        return null;
                    }

                    return {
                        ruc: parts[0]?.trim() || '',
                        nombre: parts[1]?.trim() || '',
                        nombreComercial: parts[2]?.trim() || '',
                        actividad: parts[3]?.trim() || '',
                        estado: parts[parts.length - 2]?.trim() || '',
                        tipo: parts[parts.length - 1]?.trim() || ''
                    };
                })
                .filter(item => item && item.ruc); // Filtrar elementos nulos o sin RUC

            lastLoadTime = Date.now();
            console.log(`Datos cargados: ${contribuyentesCache.length} registros válidos`);
        }
        return contribuyentesCache;
    } catch (error) {
        console.error('Error al cargar o procesar DGII_RNC.txt:', error);
        console.error('Ruta del archivo:', join(__dirname, 'DGII_RNC.txt'));
        throw error;
    }
}

app.get('/api/contribuyentes', async (req, res) => {
    try {
        const { q, limit = 10 } = req.query;
        const contribuyentes = await loadContribuyentes();
        
        if (!q || !contribuyentes) {
            return res.json({ results: [] });
        }

        const searchTerm = q.toLowerCase();
        const results = contribuyentes
            .filter(c => 
                (c.ruc && c.ruc.includes(searchTerm)) ||
                (c.nombre && c.nombre.toLowerCase().includes(searchTerm))
            )
            .slice(0, parseInt(limit));

        res.json({
            results,
            total: results.length,
            limit: parseInt(limit)
        });
    } catch (error) {
        console.error('Error en búsqueda:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            message: error.message
        });
    }
});

// Endpoint de prueba
app.get('/api/test', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    // Intentar cargar los datos al iniciar
    loadContribuyentes()
        .then(() => console.log('Carga inicial completada'))
        .catch(err => console.error('Error en carga inicial:', err));
});