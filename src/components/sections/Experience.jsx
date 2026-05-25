import { useState } from "react";
import { motion } from "framer-motion";
import { experience } from "../../data/portfolio";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

function Tag({ label }) {
  return (
    <span style={{
      padding: "3px 10px", borderRadius: "999px",
      border: "1px solid rgba(245,158,11,0.2)",
      backgroundColor: "rgba(245,158,11,0.06)",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.65rem", color: "#d4d4d8", letterSpacing: "0.04em",
    }}>{label}</span>
  );
}

function ExperienceCard({ item, index, isLast }) {
  const [expanded, setExpanded] = useState(index === 0);
  const [hovered,  setHovered]  = useState(false);

  return (
    <div style={{ display: "flex", gap: "0" }}>

      {/* Timeline spine */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", marginRight: "28px", flexShrink: 0,
      }}>
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + index * 0.1, type: "spring", stiffness: 300 }}
          style={{
            width: "14px", height: "14px", borderRadius: "50%", flexShrink: 0,
            backgroundColor: item.current ? "#f59e0b" : "#3f3f46",
            border: `2px solid ${item.current ? "#f59e0b" : "#52525b"}`,
            boxShadow: item.current ? "0 0 12px rgba(245,158,11,0.5)" : "none",
            marginTop: "6px",
          }}
        />
        {/* Line */}
        {!isLast && (
          <div style={{
            width: "1px", flex: 1, marginTop: "8px",
            background: "linear-gradient(to bottom, rgba(245,158,11,0.3), rgba(255,255,255,0.05))",
            minHeight: "40px",
          }} />
        )}
      </div>

      {/* Card */}
      <motion.div
        {...fadeUp(0.1 + index * 0.1)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flex: 1, marginBottom: isLast ? 0 : "24px",
          padding: "28px", borderRadius: "14px",
          border: `1px solid ${hovered ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.07)"}`,
          backgroundColor: hovered ? "rgba(245,158,11,0.02)" : "rgba(255,255,255,0.02)",
          transition: "all 0.3s ease", cursor: "pointer",
        }}
        onClick={() => setExpanded((e) => !e)}
      >
        {/* Header row */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", flexWrap: "wrap", gap: "10px",
          marginBottom: "10px",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "4px" }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.15rem", fontWeight: 700,
                color: "white", margin: 0,
              }}>{item.role}</h3>
              {item.current && (
                <span style={{
                  padding: "2px 10px", borderRadius: "999px",
                  backgroundColor: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem", color: "#86efac", letterSpacing: "0.08em",
                }}>CURRENT</span>
              )}
            </div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.8rem", color: "#f59e0b", margin: 0,
            }}>{item.company}
              <span style={{ color: "#52525b", margin: "0 8px" }}>·</span>
              <span style={{ color: "#71717a" }}>{item.type}</span>
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem", color: "#71717a", margin: 0, marginBottom: "4px",
            }}>{item.period}</p>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem", color: "#52525b", margin: 0,
            }}>📍 {item.location}</p>
          </div>
        </div>

        {/* Stack tags always visible */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: expanded ? "20px" : 0 }}>
          {item.stack.map((t) => <Tag key={t} label={t} />)}
        </div>

        {/* Expandable bullets */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {item.bullets.map((b, i) => (
              <li key={i} style={{
                display: "flex", gap: "10px", alignItems: "flex-start",
                marginBottom: "10px",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                <span style={{ color: "#f59e0b", marginTop: "2px", flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: "0.85rem", color: "#a1a1aa", lineHeight: 1.7 }}>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Expand toggle hint */}
        <div style={{
          marginTop: expanded ? "12px" : "14px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem", color: "#52525b",
          textAlign: "right", letterSpacing: "0.06em",
        }}>
          {expanded ? "▲ collapse" : "▼ expand"}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" style={{
      backgroundColor: "#0e0e10", padding: "100px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Glow */}
      <div style={{
        position: "absolute", top: "20%", right: "-200px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Section header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: "60px" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
            color: "#f59e0b", letterSpacing: "0.14em", marginBottom: "10px",
          }}>03. EXPERIENCE</p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 900, color: "white", whiteSpace: "nowrap",
            }}>Where I've Worked</h2>
            <div style={{
              flex: 1, height: "1px",
              backgroundColor: "rgba(255,255,255,0.07)", maxWidth: "400px",
            }} />
          </div>
        </motion.div>

        {/* Timeline */}
        <div>
          {experience.map((item, i) => (
            <ExperienceCard
              key={item.company}
              item={item}
              index={i}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p {...fadeUp(0.4)} style={{
          marginTop: "48px", textAlign: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem", color: "#3f3f46", letterSpacing: "0.06em",
        }}>
          ── Click any card to expand / collapse details ──
        </motion.p>
      </div>
    </section>
  );
}