import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Por favor define MONGODB_URI en las variables de entorno');
}

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db('rnc_db');
  cachedDb = db;
  return db;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { q = '' } = req.query;
  
  if (!q.trim()) {
    return res.json({ results: [] });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection('contribuyentes');

    const query = {
      $or: [
        { ruc: { $regex: q, $options: 'i' } },
        { nombre: { $regex: q, $options: 'i' } }
      ]
    };

    const results = await collection
      .find(query)
      .limit(10)
      .toArray();

    res.json({ results });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}