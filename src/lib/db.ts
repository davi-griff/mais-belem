import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import path from 'path';

const dbPath = process.env.NODE_ENV === 'production'
  ? '/tmp/database.sqlite'  // Path para produção na Vercel
  : path.join(process.cwd(), 'database.sqlite'); // Path local

const db = new Database(dbPath);

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

  -- Insert admin user type if it doesn't exist
  INSERT OR IGNORE INTO users_type (id, name, type) VALUES (1, 'Admin', 'admin');
  INSERT OR IGNORE INTO users_type (id, name, type) VALUES (2, 'User', 'user');

  -- Insert admin user if it doesn't exist
  INSERT OR IGNORE INTO users (first_name, last_name, username, password, user_type)
  VALUES ('Admin', 'User', 'admin', '${await hashPassword('admin123')}', 1);
`);

// Helper function to hash passwords
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Helper function to verify passwords
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export default db;
