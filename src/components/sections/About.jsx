import { useState } from "react";
import { motion } from "framer-motion";
import { personal } from "../../data/portfolio";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const stats = [
  { value: "3+",  label: "Years Experience" },
  { value: "20+", label: "Projects Shipped" },
  { value: "10+", label: "Happy Clients"    },
  { value: "5+",  label: "Open Source Contributions" },
];

const traits = ["Clean Code", "Fast Learner", "Team Player", "Detail Oriented", "Problem Solver"];

export default function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" style={{
      backgroundColor: "#0e0e10", padding: "100px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* subtle side glow */}
      <div style={{
        position: "absolute", top: "20%", right: "-200px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Section label */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: "60px" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
            color: "#f59e0b", letterSpacing: "0.14em", marginBottom: "10px",
          }}>01. ABOUT ME</p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900,
              color: "white", whiteSpace: "nowrap",
            }}>Who I Am</h2>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.07)", maxWidth: "400px" }} />
          </div>
        </motion.div>

        {/* Main grid — photo + text */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "60px", alignItems: "center", marginBottom: "72px",
        }}>

          {/* Photo */}
          <motion.div {...fadeUp(0.1)} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "260px", height: "260px", flexShrink: 0 }}>
              {/* Decorative border offset */}
              <div style={{
                position: "absolute", inset: 0,
                border: "1px solid rgba(245,158,11,0.35)",
                borderRadius: "16px", transform: "translate(10px, 10px)",
              }} />
              {/* Avatar */}
              <div style={{
                position: "relative", width: "100%", height: "100%",
                borderRadius: "16px", overflow: "hidden",
                backgroundColor: "#1a1a1d",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                {!imgError ? (
                  <img
                    src="/avatar.jpg"
                    alt={personal.name}
                    onError={() => setImgError(true)}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  /* Fallback initials */
                  <div style={{
                    width: "100%", height: "100%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "4rem", fontWeight: 900, color: "#f59e0b",
                  }}>
                    {personal.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}
              </div>
              {/* Available dot */}
              {personal.available && (
                <div style={{
                  position: "absolute", bottom: "12px", right: "12px",
                  display: "flex", alignItems: "center", gap: "6px",
                  backgroundColor: "rgba(14,14,16,0.9)", backdropFilter: "blur(8px)",
                  padding: "5px 10px", borderRadius: "999px",
                  border: "1px solid rgba(34,197,94,0.3)",
                }}>
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    backgroundColor: "#22c55e", boxShadow: "0 0 6px #22c55e",
                    animation: "pulse 2s infinite",
                  }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem", color: "#86efac", letterSpacing: "0.06em",
                  }}>Open to work</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div {...fadeUp(0.2)}>
            <p style={{
              fontSize: "1.05rem", color: "#a1a1aa", lineHeight: 1.85,
              marginBottom: "20px",
            }}>
              Hey! I'm <strong style={{ color: "white" }}>{personal.name}</strong>, a passionate
              developer based in <strong style={{ color: "white" }}>{personal.location}</strong>.
              I love building things that live on the internet — from sleek UIs to robust backends.
            </p>
            <p style={{
              fontSize: "1.05rem", color: "#a1a1aa", lineHeight: 1.85,
              marginBottom: "32px",
            }}>
              When I'm not pushing pixels or wrangling APIs, you'll find me exploring new
              technologies, contributing to open source, or brewing a perfect cup of coffee ☕
            </p>

            {/* Trait tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "36px" }}>
              {traits.map((t) => (
                <span key={t} style={{
                  padding: "5px 14px", borderRadius: "999px",
                  border: "1px solid rgba(245,158,11,0.25)",
                  backgroundColor: "rgba(245,158,11,0.06)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem", color: "#d4d4d8", letterSpacing: "0.04em",
                }}>{t}</span>
              ))}
            </div>

            {/* Mini info rows */}
            {[
              { label: "Location", value: personal.location },
              { label: "Email",    value: personal.socials.email },
              { label: "Status",   value: personal.available ? "✅ Available for hire" : "🔴 Not available" },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: "flex", gap: "12px", alignItems: "baseline",
                marginBottom: "10px",
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem", color: "#f59e0b",
                  letterSpacing: "0.08em", minWidth: "72px",
                }}>{label}</span>
                <span style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>{value}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div {...fadeUp(0.3)} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1px", backgroundColor: "rgba(255,255,255,0.06)",
          borderRadius: "16px", overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          {stats.map(({ value, label }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
              style={{
                padding: "32px 24px", textAlign: "center",
                backgroundColor: "#0e0e10",
              }}
            >
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.4rem", fontWeight: 900,
                color: "#f59e0b", lineHeight: 1,
                marginBottom: "8px",
              }}>{value}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem", color: "#71717a",
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </section>
  );
}