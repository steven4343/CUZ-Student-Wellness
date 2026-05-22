import pool from "./pool.js";

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

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

    const existing = await client.query("SELECT COUNT(*) FROM users");
    if (parseInt(existing.rows[0].count) === 0) {
      const { hashSync } = await import("bcrypt");
      const pw = hashSync("student123", 10);
      await client.query(
        `INSERT INTO users (email, password, full_name, student_id, role) VALUES
         ($1, $2, $3, $4, $5)`,
        ["student@cavendish.ac.zm", pw, "Test Student", "CUZ-2024-0001", "student"]
      );
      console.log("Seed user created: student@cavendish.ac.zm / student123");
    }

    await client.query("COMMIT");
    console.log("Migration complete.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Migration failed:", err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
