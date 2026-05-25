import { useState } from "react";
import { motion } from "framer-motion";
import { education } from "../../data/portfolio";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const icons = { 0: "🎓", 1: "💻", 2: "☁️" };

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

function EducationCard({ item, index, isLast }) {
  const [expanded, setExpanded] = useState(index === 0);
  const [hovered,  setHovered]  = useState(false);

  return (
    <div style={{ display: "flex", gap: "0" }}>

      {/* Timeline spine */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", marginRight: "28px", flexShrink: 0,
      }}>
        <motion.div
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + index * 0.1, type: "spring", stiffness: 300 }}
          style={{
            width: "36px", height: "36px", borderRadius: "10px",
            backgroundColor: "rgba(245,158,11,0.1)",
            border: "1px solid rgba(245,158,11,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1rem", flexShrink: 0, marginTop: "4px",
          }}
        >{icons[index] ?? "📜"}</motion.div>

        {!isLast && (
          <div style={{
            width: "1px", flex: 1, marginTop: "8px",
            background: "linear-gradient(to bottom, rgba(245,158,11,0.25), rgba(255,255,255,0.04))",
            minHeight: "40px",
          }} />
        )}
      </div>

      {/* Card */}
      <motion.div
        {...fadeUp(0.1 + index * 0.1)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded((e) => !e)}
        style={{
          flex: 1, marginBottom: isLast ? 0 : "24px",
          padding: "28px", borderRadius: "14px", cursor: "pointer",
          border: `1px solid ${hovered ? "rgba(245,158,11,0.22)" : "rgba(255,255,255,0.07)"}`,
          backgroundColor: hovered ? "rgba(245,158,11,0.02)" : "rgba(255,255,255,0.02)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", flexWrap: "wrap", gap: "10px",
          marginBottom: "12px",
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.1rem", fontWeight: 700,
              color: "white", margin: "0 0 5px",
            }}>{item.degree}</h3>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.8rem", color: "#f59e0b", margin: 0,
            }}>{item.school}</p>
          </div>

          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem", color: "#71717a", margin: "0 0 4px",
            }}>{item.period}</p>
            <span style={{
              padding: "3px 10px", borderRadius: "999px",
              backgroundColor: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.25)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem", color: "#fbbf24",
            }}>{item.grade}</span>
          </div>
        </div>

        {/* Location + courses always visible */}
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.68rem", color: "#52525b",
          margin: "0 0 12px",
        }}>📍 {item.location}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: expanded ? "20px" : 0 }}>
          {item.courses.map((c) => <Tag key={c} label={c} />)}
        </div>

        {/* Expandable */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <p style={{
            fontSize: "0.88rem", color: "#a1a1aa",
            lineHeight: 1.75, margin: "0 0 16px",
          }}>{item.description}</p>

          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {item.highlights.map((h, i) => (
              <li key={i} style={{
                display: "flex", gap: "10px",
                alignItems: "flex-start", marginBottom: "9px",
              }}>
                <span style={{ color: "#f59e0b", marginTop: "2px", flexShrink: 0 }}>▸</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.82rem", color: "#a1a1aa", lineHeight: 1.65,
                }}>{h}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Expand hint */}
        <div style={{
          marginTop: "12px", textAlign: "right",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem", color: "#52525b", letterSpacing: "0.06em",
        }}>
          {expanded ? "▲ collapse" : "▼ expand"}
        </div>
      </motion.div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" style={{
      backgroundColor: "#0e0e10", padding: "100px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Glow */}
      <div style={{
        position: "absolute", bottom: "10%", left: "-180px",
        width: "460px", height: "460px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Section header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: "60px" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
            color: "#f59e0b", letterSpacing: "0.14em", marginBottom: "10px",
          }}>04. EDUCATION</p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 900, color: "white", whiteSpace: "nowrap",
            }}>Where I Studied</h2>
            <div style={{
              flex: 1, height: "1px",
              backgroundColor: "rgba(255,255,255,0.07)", maxWidth: "400px",
            }} />
          </div>
        </motion.div>

        {/* Timeline */}
        <div>
          {education.map((item, i) => (
            <EducationCard
              key={item.school + i}
              item={item}
              index={i}
              isLast={i === education.length - 1}
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