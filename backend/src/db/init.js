import pool from "./pool.js";

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        student_id VARCHAR(50),
        role VARCHAR(20) DEFAULT 'student',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Users table ready.");
  } finally {
    client.release();
  }
};

createTables().then(() => {
  console.log("Database initialized.");
  process.exit(0);
}).catch((err) => {
  console.error("Init failed:", err);
  process.exit(1);
});
