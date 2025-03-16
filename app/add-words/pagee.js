'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function AddWord() {
  const [formData, setFormData] = useState({ word: '', definition: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/add-word', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push('/'); // Redirection après ajout
    }
  };

  return (
    <div>
      <h1>Ajouter un mot</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Mot" 
          value={formData.word} 
          onChange={(e) => setFormData({ ...formData, word: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          placeholder="Définition" 
          value={formData.definition} 
          onChange={(e) => setFormData({ ...formData, definition: e.target.value })} 
          required 
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

// Insérer dans la base de données (sans API)
export async function getServerSideProps(context) {
  if (context.req.method === 'POST') {
    const { word, definition } = await context.req.body;
    await db.query('INSERT INTO words (word, definition, status) VALUES (?, ?, "En attente")', [word, definition]);
    return { redirect: { destination: '/', permanent: false } };
  }

  return { props: {} };
}

