import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import AppProvider from "./contexts/AppProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "愛心手工餅乾 | 手工製作的美味點心",
  description: "我們提供各種手工製作的精美餅乾，讓您品嚐最道地的手工甜點。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant-TW">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `@layer base, components, utilities;` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        style={{ 
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
        <AppProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <footer 
            style={{ 
              backgroundColor: 'var(--primary-light)',
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem',
              marginTop: '3rem'
            }}
          >
            <div className="container-custom text-center">
              <p>© 2024 愛心手工餅乾. 保留所有權利.</p>
            </div>
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
