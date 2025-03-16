// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1D4ED8' },
    secondary: { main: '#2563EB' },
    background: { default: '#F9FAFB', paper: '#FFFFFF' },
    text: { primary: '#1F2937', secondary: '#4B5563' },
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
});

export default theme;
