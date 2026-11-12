const mysql = require('mysql2/promise');
(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'testdb'
  });
  try {
    await connection.execute('CREATE TABLE IF NOT EXISTS timesample (id INT AUTO_INCREMENT PRIMARY KEY, value VARCHAR(255) NOT NULL)');
    await connection.execute('INSERT INTO timesample (value) VALUES (?)', ['CI-MySQL-Verified']);
    console.log('MySQL seeded successfully');
  } finally {
    await connection.end();
  }
})().catch(error => { console.error(error); process.exit(1); });
