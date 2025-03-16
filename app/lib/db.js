import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hassaniya_dict',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;

// export async function fetchWords() {
//   return new Promise((resolve, reject) => {
//     db.query('SELECT * FROM words', (error, results) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// }

// export async function addWord(mot_hassaniya, explication_francais) {
//   return new Promise((resolve, reject) => {
//     const query = 'INSERT INTO words (mot_hassaniya, explication_francais) VALUES (?, ?)';
//     db.query(query, [mot_hassaniya, explication_francais], (error, results) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// }
