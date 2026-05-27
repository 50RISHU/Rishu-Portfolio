import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, personal } from "../../data/portfolio";
import { useScrollSpy } from "../../hooks/useScrollSpy";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

const styles = {
  header: (scrolled) => ({
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    height: "64px",
    backgroundColor: scrolled ? "rgba(14,14,16,0.95)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
    transition: "all 0.3s ease",
  }),
  nav: {
    maxWidth: "1100px", margin: "0 auto", padding: "0 24px",
    height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  logo: {
    fontFamily: "'Playfair Display', serif", fontSize: "1.3rem",
    fontWeight: 700, color: "white", textDecoration: "none",
  },
  navList: {
    display: "flex", alignItems: "center", gap: "2px",
    listStyle: "none", margin: 0, padding: 0,
  },
  navBtn: (isActive) => ({
    position: "relative", padding: "6px 12px", background: "none",
    border: "none", cursor: "pointer", borderRadius: "6px",
    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem",
    letterSpacing: "0.04em", color: isActive ? "#f59e0b" : "#a1a1aa",
    transition: "color 0.2s",
  }),
  activePill: {
    position: "absolute", inset: 0, borderRadius: "6px",
    background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)",
  },
  githubBtn: {
    padding: "7px 18px", fontSize: "0.78rem", textDecoration: "none",
    fontFamily: "'JetBrains Mono', monospace", color: "#f59e0b",
    border: "1px solid rgba(245,158,11,0.5)", borderRadius: "6px",
    transition: "all 0.2s",
  },
  drawer: {
    position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 50,
    width: "260px", backgroundColor: "#0e0e10",
    borderLeft: "1px solid rgba(255,255,255,0.08)",
    display: "flex", flexDirection: "column",
    padding: "80px 28px 28px",
  },
  drawerBtn: (isActive) => ({
    width: "100%", textAlign: "left", padding: "13px 0",
    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.95rem",
    color: isActive ? "#f59e0b" : "#d4d4d8", background: "none",
    border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)",
    cursor: "pointer", display: "flex", alignItems: "center", gap: "10px",
  }),
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const scrollTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const NavLinks = ({ drawer = false }) =>
    navLinks.map(({ label, href }, i) => {
      const isActive = activeId === href.replace("#", "");
      return (
        <motion.li key={href}
          initial={{ opacity: 0, ...(drawer ? { x: 20 } : { y: -8 }) }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: i * 0.06 }}
          style={drawer ? {} : { listStyle: "none" }}
        >
          <button onClick={() => scrollTo(href)}
            style={drawer ? styles.drawerBtn(isActive) : styles.navBtn(isActive)}
            onMouseEnter={(e) => { if (!isActive && !drawer) e.currentTarget.style.color = "white"; }}
            onMouseLeave={(e) => { if (!isActive && !drawer) e.currentTarget.style.color = "#a1a1aa"; }}
          >
            {drawer && <span style={{ color: "rgba(245,158,11,0.4)", fontSize: "0.7rem" }}>0{i + 1}.</span>}
            {isActive && !drawer && (
              <motion.span layoutId="pill" style={styles.activePill}
                transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
          </button>
        </motion.li>
      );
    });

  return (
    <>
      <motion.header style={styles.header(scrolled)}
        initial={{ y: -64, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav style={styles.nav}>

          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }} style={styles.logo}>
            {personal.name.split(" ")[0]}<span style={{ color: "#f59e0b" }}>.</span>
          </a>

          {/* Desktop nav */}
          {!isMobile && (
            <ul style={styles.navList}><NavLinks /></ul>
          )}

          {/* GitHub button — desktop | Hamburger — mobile */}
          {!isMobile ? (
            <a href={personal.socials.github} target="_blank" rel="noopener noreferrer"
              style={styles.githubBtn}
              onMouseEnter={(e) => { e.target.style.background = "#f59e0b"; e.target.style.color = "#0e0e10"; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#f59e0b"; }}
            >⌥ GitHub</a>
          ) : (
            <button onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu"
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "4px" }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span key={i}
                  animate={menuOpen
                    ? i === 0 ? { rotate: 45, y: 7 } : i === 1 ? { opacity: 0 } : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }}
                  style={{ display: "block", width: "22px", height: "2px", background: "white", borderRadius: "2px" }}
                />
              ))}
            </button>
          )}
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            />
            <motion.div key="drawer"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={styles.drawer}
            >
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <NavLinks drawer />
              </ul>
              <a href={personal.socials.github} target="_blank" rel="noopener noreferrer"
                style={{ ...styles.githubBtn, marginTop: "24px", textAlign: "center", display: "block" }}
              >⌥ GitHub</a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}