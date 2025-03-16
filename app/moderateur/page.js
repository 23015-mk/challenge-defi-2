'use client';
import { useState, useEffect } from "react";

export default function Moderateur() {
  const [documents, setDocuments] = useState([]);

  // Charger les documents au montage du composant
  useEffect(() => {
    fetchDocuments();
  }, []);

  // Récupérer les documents depuis l'API
  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/moderateur');
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut : ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        setDocuments(result.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des documents :', error);
    }
  };

  // Mettre à jour le statut d'un document
  const handleStatusChange = async (id, newStatus) => {
    try {
      console.log('Envoi de la requête :', { id, status: newStatus }); // Log les données envoyées
  
      const response = await fetch('/api/moderateur', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut : ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        // Rafraîchir la liste des documents après la mise à jour
        fetchDocuments();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut :', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      {/* En-tête */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-center mb-4">
          Espace Modérateur
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Gérez et validez les contributions au dictionnaire Hassaniya - Français
        </p>
      </div>

      {/* Tableau des mots à modérer */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white">
          <div className="p-6 md:p-8 border-b border-indigo-100">
            <h2 className="text-2xl md:text-3xl font-semibold text-indigo-800">Mots à modérer</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <th className="px-6 py-5 text-left text-sm font-semibold text-indigo-900">ID</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-indigo-900">Mot en Hassaniya</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-indigo-900">Explication en Français</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-indigo-900">Statut</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-indigo-900">Date</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-indigo-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-indigo-50/50 transition-colors duration-200">
                    <td className="px-6 py-5 text-sm text-gray-800">{doc.id}</td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                        {doc.word}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-800">{doc.definition}</td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium inline-block ${
                          doc.status === "En attente"
                            ? "bg-amber-100 text-amber-700 border border-amber-200"
                            : doc.status === "En cours de révision"
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : doc.status === "Rejeté"
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {doc.created_at}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(doc.id, "Accépter")}
                          className="px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                          Accepter
                        </button>
                        <button
                          onClick={() => handleStatusChange(doc.id, "En cours de révision")}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Réviser
                        </button>
                        <button
                          onClick={() => handleStatusChange(doc.id, "réjeter")}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Rejeter
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}