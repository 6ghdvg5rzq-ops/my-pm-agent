import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PM Agent Portfolio",
  description: "AI Powered Product Manager Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}