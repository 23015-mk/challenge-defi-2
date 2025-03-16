'use client';
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    motHassaniya: '',
    explicationFrancais: ''
  });

  const documents = [
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
      statut: "Accepté", 
      date: "2024-03-22" 
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Ici vous pouvez ajouter la logique pour sauvegarder les données
    setFormData({ motHassaniya: '', explicationFrancais: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      {/* En-tête stylisé */}
      <h1 className="text-3xl font-bold text-indigo-800 mb-8 text-center">
        Dictionnaire Hassaniya - Français
      </h1>
      
      {/* Formulaire */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-12 hover:shadow-xl transition-shadow duration-300 border border-indigo-100">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Ajouter un nouveau mot</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-indigo-600 mb-2">
              Mot en Hassaniya
            </label>
            <input
              type="text"
              value={formData.motHassaniya}
              onChange={(e) => setFormData({...formData, motHassaniya: e.target.value})}
              className="w-full px-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              required
              placeholder="Entrez le mot en Hassaniya"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-indigo-600 mb-2">
              Explication en Français
            </label>
            <input
              type="text"
              value={formData.explicationFrancais}
              onChange={(e) => setFormData({...formData, explicationFrancais: e.target.value})}
              className="w-full px-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              required
              placeholder="Entrez l'explication en Français"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Ajouter le mot
            </button>
          </div>
        </form>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100">
        <div className="p-6 border-b border-indigo-100">
          <h2 className="text-2xl font-semibold text-indigo-700">Liste des mots</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-800">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-800">Mot en Hassaniya</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-800">Explication en Français</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-800">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-800">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-indigo-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm text-gray-800">{doc.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-indigo-700">{doc.motHassaniya}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{doc.explicationFrancais}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-medium inline-block ${
                        doc.statut === "En attente"
                          ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                          : doc.statut === "En cours de révision"
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "bg-green-100 text-green-700 border border-green-200"
                      }`}
                    >
                      {doc.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
