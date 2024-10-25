import { NextApiRequest, NextApiResponse } from 'next';
import db, { hashPassword } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, username, password, userType } = req.body;

  if (!firstName || !lastName || !username || !password || !userType) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = await hashPassword(password);

  try {
    const insertUser = db.prepare('INSERT INTO users (first_name, last_name, username, password, user_type) VALUES (?, ?, ?, ?, ?)');
    const result = insertUser.run(firstName, lastName, username, hashedPassword, userType);

    res.status(201).json({ message: 'User created successfully', userId: result.lastInsertRowid });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
}
