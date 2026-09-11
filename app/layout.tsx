import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Random Fun Machine",
  description: "Press the button. Embrace the nonsense.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}