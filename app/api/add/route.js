import pool from '../../lib/db';

export async function POST(request) {
  try {
    const { motHassaniya, explicationFrancais } = await request.json();

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO words (word, definition) VALUES (?, ?)',
      [motHassaniya, explicationFrancais]
    );
    connection.release();

    return new Response(JSON.stringify({ success: true, id: result.insertId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur dans /api/add :', error); // Log l'erreur
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}