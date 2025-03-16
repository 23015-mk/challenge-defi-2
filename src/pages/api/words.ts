// src/pages/api/words.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const words = await prisma.word.findMany({ orderBy: { createdAt: 'desc' } });
      return res.status(200).json(words);
    } catch (error) {
      console.error('Error fetching words:', error);
      return res.status(500).json({ error: 'Error fetching words' });
    }
  } else if (req.method === 'POST') {
    const { word, definition } = req.body;
    try {
      const newWord = await prisma.word.create({
        data: { word, definition, status: 'pending' },
      });
      return res.status(201).json(newWord);
    } catch (error) {
      console.error('Error creating word:', error);
      return res.status(400).json({ error: 'Error creating word' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
