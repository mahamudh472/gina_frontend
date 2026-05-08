"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="VISULARA" className={styles.logoImg} />
        </Link>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          <li><Link href="/service" className={styles.navLink}>Stimmen</Link></li>
          <li><Link href="/#preise" className={styles.navLink}>Preise</Link></li>
          <li><Link href="/#faq" className={styles.navLink}>FAQ</Link></li>
          <li><Link href="/#ueber" className={styles.navLink}>Über uns</Link></li>
        </ul>

        {/* CTA */}
        <div className={styles.cta}>
          <Link href="/meditation/neue-meditation" className="btn-primary">
            Kostenlos starten
          </Link>
          <button
            className={styles.menuBtn}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={styles.mobileMenu}>
          <Link href="/service" className={styles.mobileLink} onClick={() => setOpen(false)}>Stimmen</Link>
          <Link href="/#preise" className={styles.mobileLink} onClick={() => setOpen(false)}>Preise</Link>
          <Link href="/#faq" className={styles.mobileLink} onClick={() => setOpen(false)}>FAQ</Link>
          <Link href="/#ueber" className={styles.mobileLink} onClick={() => setOpen(false)}>Über uns</Link>
          <Link href="/meditation/neue-meditation" className="btn-primary" onClick={() => setOpen(false)}>
            Kostenlos starten
          </Link>
        </div>
      )}
    </nav>
  );
}
