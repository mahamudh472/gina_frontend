import Sidebar from "@/components/Sidebar";
import styles from "./MeditationLayout.module.css";

export default function MeditationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      {/* Fixed cosmic background */}
      <div className={styles.cosmicBg} />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
