// src/components/WordCard.tsx
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { ReactNode } from 'react';

interface WordCardProps {
  word: { id: number; word: string; definition: string; status: string };
  children?: ReactNode;
}

export default function WordCard({ word, children }: WordCardProps) {
  const getStatusColor = () => {
    switch (word.status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card elevation={1} sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          {word.word}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          {word.definition}
        </Typography>
        <Chip label={word.status} color={getStatusColor()} />
        {children}
      </CardContent>
    </Card>
  );
}
