// src/pages/index.tsx
import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box, Button } from '@mui/material';
import Header from '../components/Header';
import WordCard from '../components/WordCard';
import Link from 'next/link';

interface Word {
  id: number;
  word: string;
  definition: string;
  status: string;
}

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    fetch('/api/words')
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header />
      <Box
        sx={{
          py: 6,
          px: 2,
          textAlign: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
          Build Your Hassaniya Dictionary
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
          Discover, propose, and edit words collaboratively.
        </Typography>
        <Link href="/submit-word">
          <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
            Get Started
          </Button>
        </Link>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Word List
        </Typography>
        <Grid container spacing={3}>
          {words.map((word) => (
            <Grid item xs={12} sm={6} md={3} key={word.id}>
              <WordCard word={word}>
                <Link href={`/edit-word/${word.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" sx={{ mt: 2, textTransform: 'none' }} fullWidth>
                    Edit
                  </Button>
                </Link>
              </WordCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
