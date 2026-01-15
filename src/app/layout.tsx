import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contraktor - Artisan Marketplace",
  description: "Find skilled artisans for your next project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
