import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { personal } from "../../data/portfolio";

/* ── Typewriter ── */
function Typewriter({ words }) {
  const [index, setIndex]   = useState(0);
  const [text, setText]     = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    const speed   = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 1600);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
        return;
      }
      setText((t) => deleting ? t.slice(0, -1) : current.slice(0, t.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span style={{ color: "#f59e0b" }}>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        style={{ display: "inline-block", width: "2px", height: "1em",
          backgroundColor: "#f59e0b", marginLeft: "3px", verticalAlign: "middle" }}
      />
    </span>
  );
}

/* ── Floating grid dots background ── */
function GridBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />
      {/* Radial glow center */}
      <div style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px", height: "500px",
        background: "radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "220px",
        background: "linear-gradient(to bottom, transparent, #0e0e10)",
      }} />
    </div>
  );
}

/* ── Social Link ── */
function SocialLink({ href, label, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "42px", height: "42px", borderRadius: "10px",
        border: `1px solid ${hovered ? "rgba(245,158,11,0.6)" : "rgba(255,255,255,0.1)"}`,
        color: hovered ? "#f59e0b" : "#a1a1aa",
        textDecoration: "none", fontSize: "1.1rem",
        backgroundColor: hovered ? "rgba(245,158,11,0.08)" : "transparent",
        transition: "all 0.2s ease",
      }}
    >{icon}</a>
  );
}

/* ── CTA Button ── */
function CTAButton({ href, label, primary, onClick }) {
  const [hovered, setHovered] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: "12px 28px", borderRadius: "8px", fontSize: "0.88rem",
    fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
    textDecoration: "none", cursor: "pointer", border: "none",
    transition: "all 0.2s ease", letterSpacing: "0.03em",
  };
  const primaryStyle = {
    backgroundColor: hovered ? "#d97706" : "#f59e0b",
    color: "#0e0e10",
    boxShadow: hovered ? "0 0 28px rgba(245,158,11,0.45)" : "0 0 16px rgba(245,158,11,0.2)",
  };
  const secondaryStyle = {
    backgroundColor: "transparent",
    color: hovered ? "white" : "#a1a1aa",
    border: `1px solid ${hovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)"}`,
  };

  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...base, ...(primary ? primaryStyle : secondaryStyle) }}
      {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >{label}</Tag>
  );
}

/* ── Main Hero ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Hero() {
  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToProjects = () =>
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      backgroundColor: "#0e0e10", overflow: "hidden",
      padding: "0 24px",
    }}>
      <GridBackground />

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: "820px", width: "100%",
        textAlign: "center",
      }}>

        {/* Available badge */}
        {personal.available && (
          <motion.div {...fadeUp(0.1)} style={{ marginBottom: "28px", display: "flex", justifyContent: "center" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 16px", borderRadius: "999px",
              border: "1px solid rgba(34,197,94,0.3)",
              backgroundColor: "rgba(34,197,94,0.07)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem", color: "#86efac", letterSpacing: "0.06em",
            }}>
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 8px #22c55e",
                animation: "pulse 2s infinite",
              }} />
              AVAILABLE FOR WORK
            </span>
          </motion.div>
        )}

        {/* Greeting */}
        <motion.p {...fadeUp(0.2)} style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.85rem", color: "#f59e0b",
          letterSpacing: "0.12em", marginBottom: "16px",
        }}>
          Hi there, I'm
        </motion.p>

        {/* Name */}
        <motion.h1 {...fadeUp(0.3)} style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
          fontWeight: 900, lineHeight: 1.05,
          color: "white", marginBottom: "20px",
          letterSpacing: "-0.02em",
        }}>
          {personal.name}
        </motion.h1>

        {/* Typewriter roles */}
        <motion.div {...fadeUp(0.4)} style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(1rem, 3vw, 1.4rem)",
          marginBottom: "28px", minHeight: "2rem",
          color: "#71717a",
        }}>
          <Typewriter words={personal.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p {...fadeUp(0.5)} style={{
          fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
          color: "#71717a", lineHeight: 1.7,
          maxWidth: "560px", margin: "0 auto 40px",
        }}>
          {personal.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div {...fadeUp(0.6)} style={{
          display: "flex", gap: "14px", justifyContent: "center",
          flexWrap: "wrap", marginBottom: "52px",
        }}>
          <CTAButton label="View My Work →" primary onClick={scrollToProjects} />
          <CTAButton label="Get In Touch" onClick={scrollToContact} />
        </motion.div>

        {/* Socials */}
        <motion.div {...fadeUp(0.7)} style={{
          display: "flex", gap: "12px", justifyContent: "center",
          alignItems: "center",
        }}>
          <SocialLink href={personal.socials.github}   label="GitHub"   icon="⌥" />
          <SocialLink href={personal.socials.linkedin} label="LinkedIn" icon="in" />
          <SocialLink href={`mailto:${personal.socials.email}`} label="Email" icon="@" />

          <div style={{ width: "1px", height: "30px", backgroundColor: "rgba(255,255,255,0.1)", margin: "0 4px" }} />

          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem", color: "#52525b", letterSpacing: "0.06em",
          }}>
            📍 {personal.location}
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute", bottom: "32px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "8px",
        }}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem", color: "#3f3f46", letterSpacing: "0.1em",
        }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "20px", height: "32px", borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex", justifyContent: "center", paddingTop: "6px",
          }}
        >
          <div style={{ width: "3px", height: "7px", borderRadius: "2px", backgroundColor: "#f59e0b" }} />
        </motion.div>
      </motion.div>

      {/* Pulse keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}