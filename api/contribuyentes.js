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
    const db = await connectToDatabase();
    const { q = '' } = req.query;

    console.log('Search query:', q);

    if (!q.trim()) {
      return res.json({ results: [] });
    }

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
      message: error.message
    });
  }
}