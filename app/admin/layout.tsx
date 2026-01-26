import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Admin Panel - Nes HaTamar',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="antialiased bg-cream text-dark min-h-screen">
        {children}
      </body>
    </html>
  );
}
