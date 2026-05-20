import type { Metadata } from "next";
import MeditationLayout from "@/components/MeditationLayout";

export const metadata: Metadata = {
  title: "Mein Konto — VISULARA",
  description: "Verwalte dein VISULARA Abonnement und Guthaben.",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MeditationLayout>{children}</MeditationLayout>;
}
