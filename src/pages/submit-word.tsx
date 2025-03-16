// src/pages/submit-word.tsx
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import Header from '../components/Header';

export default function SubmitWord() {
  const router = useRouter();
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, definition }),
      });
      if (res.ok) {
        router.push('/');
      } else {
        console.error('Error creating word:', await res.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Header />
      <Container sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ p: 4, width: '100%', maxWidth: 500 }}>
          <Typography variant="h5" gutterBottom>
            Submit a New Word
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Word"
              variant="outlined"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              required
            />
            <TextField
              label="Definition"
              variant="outlined"
              multiline
              rows={4}
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              required
            />
            <Button variant="contained" type="submit" sx={{ textTransform: 'none' }}>
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
