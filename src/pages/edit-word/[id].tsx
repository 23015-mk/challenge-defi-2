// src/pages/edit-word/[id].tsx
import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import Header from '../../components/Header';

export default function EditWordPage() {
  const router = useRouter();
  const { id } = router.query;
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/words/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setWord(data.word);
          setDefinition(data.definition);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/words/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, definition }),
      });
      if (res.ok) {
        router.push('/');
      } else {
        console.error('Error updating word:', await res.text());
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
            Edit Word
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
              Save
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
