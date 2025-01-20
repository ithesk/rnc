import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}

// Configuración de la conexión con cache
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  // Si ya tenemos una conexión, la reusamos
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Si no hay conexión, creamos una nueva
  const client = new MongoClient(MONGODB_URI, {
    maxPoolSize: 10,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    const db = client.db('rnc_db'); // Asegúrate que este es el nombre correcto de tu DB

    // Guardamos la conexión para reusarla
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Conectamos a la base de datos
    const { db } = await connectToDatabase();
    const { q = '' } = req.query;

    console.log('Search query:', q);

    if (!q.trim()) {
      return res.json({ results: [] });
    }

    // Realizamos la búsqueda
    const results = await db.collection('contribuyentes')
      .find({
        $or: [
          { ruc: { $regex: q, $options: 'i' } },
          { nombre: { $regex: q, $options: 'i' } }
        ]
      })
      .limit(10)
      .toArray();

    console.log('Results found:', results.length);
    res.json({ results });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}