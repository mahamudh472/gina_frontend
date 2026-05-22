import type { Metadata } from "next";
import { AuthProvider } from "@/lib/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "VISULARA — KI-Meditationen, die dich wirklich kennen",
  description:
    "Entfalte dein Potenzial mit personalisierten KI-Meditationen. Wähle deine Absicht, deine Stimme und lass VISULARA eine einzigartige Meditation nur für dich erschaffen.",
  keywords: "Meditation, KI, Entspannung, Achtsamkeit, Visulara",
  openGraph: {
    title: "VISULARA — KI-Meditationen",
    description: "Personalisierte Meditationen, die dich wirklich kennen.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

