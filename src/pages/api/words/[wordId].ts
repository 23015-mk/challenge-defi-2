// src/pages/api/words/[wordId].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { wordId } = req.query;
  const id = Number(wordId);

  if (req.method === 'GET') {
    try {
      const word = await prisma.word.findUnique({ where: { id } });
      if (!word) return res.status(404).json({ error: 'Word not found' });
      return res.status(200).json(word);
    } catch (error) {
      console.error('Error fetching word:', error);
      return res.status(500).json({ error: 'Error fetching word' });
    }
  } else if (req.method === 'PUT') {
    const { word, definition, status } = req.body;
    try {
      const updated = await prisma.word.update({
        where: { id },
        data: { word, definition, status },
      });
      return res.status(200).json(updated);
    } catch (error) {
      console.error('Error updating word:', error);
      return res.status(400).json({ error: 'Error updating word' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.word.delete({ where: { id } });
      return res.status(204).end();
    } catch (error) {
      console.error('Error deleting word:', error);
      return res.status(400).json({ error: 'Error deleting word' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
