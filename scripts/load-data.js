import { MongoClient } from 'mongodb';
import { createReadStream } from 'fs';
import readline from 'readline';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const BATCH_SIZE = 1000;

async function processFile() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Conectado a MongoDB');
    
    const db = client.db('rnc_db');
    const collection = db.collection('contribuyentes');
    
    // Crear índices
    await collection.createIndex({ ruc: 1 });
    await collection.createIndex({ nombre: 'text' });
    
    // Limpiar colección existente
    await collection.deleteMany({});
    console.log('Colección limpiada');
    
    const fileStream = createReadStream('DGII_RNC.txt');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    
    let batch = [];
    let count = 0;
    let errorCount = 0;
    
    for await (const line of rl) {
      try {
        if (!line.trim()) continue;

        const parts = line.split('|');
        
        // Verificar que tengamos suficientes partes
        if (parts.length < 4) {
          console.log('Línea con formato incorrecto:', line);
          errorCount++;
          continue;
        }

        const [ruc, nombre, nombreComercial, actividad, ...rest] = parts;

        // Verificar que los campos requeridos existan
        if (!ruc || !nombre) {
          console.log('Línea sin RNC o nombre:', line);
          errorCount++;
          continue;
        }

        const doc = {
          ruc: ruc.trim(),
          nombre: nombre.trim(),
          nombreComercial: nombreComercial ? nombreComercial.trim() : '',
          actividad: actividad ? actividad.trim() : '',
          estado: rest[rest.length - 2] ? rest[rest.length - 2].trim() : '',
          tipo: rest[rest.length - 1] ? rest[rest.length - 1].trim() : ''
        };
        
        batch.push(doc);
        
        if (batch.length >= BATCH_SIZE) {
          await collection.insertMany(batch);
          count += batch.length;
          console.log(`Procesados ${count} registros`);
          batch = [];
        }
      } catch (lineError) {
        console.error('Error procesando línea:', lineError);
        errorCount++;
        continue;
      }
    }
    
    // Insertar registros restantes
    if (batch.length > 0) {
      await collection.insertMany(batch);
      count += batch.length;
    }
    
    console.log(`Proceso completado.`);
    console.log(`Total de registros procesados: ${count}`);
    console.log(`Total de errores: ${errorCount}`);
    
  } catch (error) {
    console.error('Error general:', error);
  } finally {
    await client.close();
    console.log('Conexión cerrada');
  }
}

// Ejecutar el script
console.log('Iniciando proceso de carga...');
processFile()
  .then(() => console.log('Proceso finalizado'))
  .catch(error => console.error('Error fatal:', error));