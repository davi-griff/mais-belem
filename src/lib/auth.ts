import db, { verifyPassword } from './db';

export async function authenticateUser(username: string, password: string) {
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;

  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function getUserType(userId: number) {
  return db.prepare('SELECT ut.id FROM users u JOIN users_type ut ON u.user_type = ut.id WHERE u.id = ?').get(userId);
}
