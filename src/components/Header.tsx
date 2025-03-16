// src/components/Header.tsx
import { AppBar, Toolbar, Typography, Button, Box, TextField } from '@mui/material';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main', px: 2 }}>
      <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FFF', mr: 2 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Hassaniya Dictionary
          </Link>
        </Typography>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mr: 2 }}>
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <TextField
              placeholder="Search words..."
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'transparent' } }
              }}
            />
          </Box>
        </Box>
        <Link href="/submit-word" style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ backgroundColor: '#2563EB', textTransform: 'none', ':hover': { backgroundColor: '#1E40AF' } }}>
            Add Word
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
