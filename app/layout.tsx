import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GreenFrame Ads Studio',
  description: 'Agent wspierający tworzenie kreatywnych reklam internetowych dla stolarki mebli ogrodowych.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
