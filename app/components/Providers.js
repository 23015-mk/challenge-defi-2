'use client';
import { DictionaryProvider } from '../context/DictionaryContext';

export default function Providers({ children }) {
  return <DictionaryProvider>{children}</DictionaryProvider>;
} 