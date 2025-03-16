import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Métadonnées simples
const metadata = {
  title: "Dictionnaire Hassaniya",
  description: "Dictionnaire collaboratif Hassaniya-Français",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
