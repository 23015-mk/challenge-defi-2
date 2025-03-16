import pool from '../../lib/db';

// Récupérer tous les documents à modérer
export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM words WHERE status IN ("En attente", "En cours de révision")');
    connection.release();

    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}



// Mettre à jour le statut d'un document
export async function PUT(request) {
    try {
      const { id, status } = await request.json();
      console.log('Données reçues :', { id, status }); // Log les données reçues
  
      if (!id || !status) {
        throw new Error('ID ou statut manquant dans la requête');
      }
  
      const connection = await pool.getConnection();
      console.log('Connexion à la base de données réussie'); // Log la connexion
  
      const query = 'UPDATE words SET status = ? WHERE id = ?';
      const values = [status, id];
      console.log('Requête SQL :', query, values); // Log la requête SQL
  
      const [result] = await connection.query(query, values);
      connection.release();
      console.log('Résultat de la requête :', result); // Log le résultat
  
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Erreur dans /api/moderateur :', error); // Log l'erreur
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }