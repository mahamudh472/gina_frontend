"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, BookOpen, CreditCard } from "lucide-react";
import styles from "./Sidebar.module.css";

const navItems = [
  { href: "/meditation/startseite", label: "Startseite", icon: Home },
  { href: "/meditation/neue-meditation", label: "Neue Meditation", icon: Sparkles },
  { href: "/meditation/archiv", label: "Archiv", icon: BookOpen },
  { href: "/meditation/abonnement", label: "Abonnement", icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <Link href="/" className={styles.logo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="VISULARA" className={styles.logoImg} />
      </Link>

      {/* Navigation */}
      <nav className={styles.nav}>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`${styles.navItem} ${active ? styles.active : ""}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom user hint */}
      <div className={styles.bottom}>
        <div className={styles.userBadge}>
          <div className={styles.userAvatar}>G</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Gast</span>
            <span className={styles.userPlan}>Kostenlos</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
