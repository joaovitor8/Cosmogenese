import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tabela Periódica · HUD Radioativo",
  description:
    "Uma tabela periódica interativa com estética de console radioativo. Filtre por categoria, inspecione cada elemento e descubra o easter egg cósmico.",
  applicationName: "Tabela Periódica HUD",
  authors: [{ name: "João Vitor" }],
  keywords: [
    "tabela periódica",
    "química",
    "elementos químicos",
    "Next.js",
    "interativo",
  ],
};

export const viewport: Viewport = {
  themeColor: "#040704",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
