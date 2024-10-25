import { NextApiRequest, NextApiResponse } from 'next';
import { authenticateUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = await authenticateUser(username, password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // In a real-world application, you'd set up a session or JWT here
  res.status(200).json({ user });
}
