'use client';
import { createContext, useContext, useState } from 'react';

const DictionaryContext = createContext();

export function DictionaryProvider({ children }) {
  const [words, setWords] = useState([
    { 
      id: 1, 
      motHassaniya: "gbal",
      explicationFrancais: "tambour",
      statut: "En attente", 
      date: "2024-03-20" 
    },
    { 
      id: 2, 
      motHassaniya: "8ark",
      explicationFrancais: "danse",
      statut: "En cours de révision", 
      date: "2024-03-21" 
    },
    { 
      id: 3, 
      motHassaniya: "gbeyl",
      explicationFrancais: "petit tambour",
      statut: "En attente", 
      date: "2024-03-22" 
    },
  ]);

  const addWord = (newWord) => {
    setWords([...words, {
      ...newWord,
      id: words.length + 1,
      date: new Date().toISOString().split('T')[0],
      statut: "En attente"
    }]);
  };

  const updateWordStatus = (id, newStatus) => {
    setWords(words.map(word => 
      word.id === id ? {...word, statut: newStatus} : word
    ));
  };

  return (
    <DictionaryContext.Provider value={{ words, addWord, updateWordStatus }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  return useContext(DictionaryContext);
} 