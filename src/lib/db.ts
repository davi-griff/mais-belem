import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';

const db = new Database('database.sqlite');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users_type (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    username TEXT UNIQUE,
    password TEXT,
    user_type INTEGER,
    FOREIGN KEY (user_type) REFERENCES users_type(id)
  );
`);

// Insert default user types if they don't exist
const insertUserType = db.prepare('INSERT OR IGNORE INTO users_type (id, name, type) VALUES (?, ?, ?)');
insertUserType.run(1, 'Admin', 'admin');
insertUserType.run(2, 'User', 'user');

// Helper function to hash passwords
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Helper function to verify passwords
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export default db;
