import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const melodrama = localFont({
  src: "../public/fonts/Melodrama-Light.otf",
  variable: "--font-melodrama",
  weight: "300",
  fallback: ["Georgia", "serif"],
});

const estrella = localFont({
  src: "../public/fonts/Estrella-Early.otf",
  variable: "--font-estrella",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Pit & Pitch",
  description: "Track you favourite football team and f1 drivers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${melodrama.variable} ${estrella.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <header className="border-b border-foreground/10">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-heading text-xl">
              Pit &amp; Pitch
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/f1" className="hover:underline">
                F1
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}