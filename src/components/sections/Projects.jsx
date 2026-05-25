import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, projectCategories } from "../../data/portfolio";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

/* colour per category */
const catColor = {
  Fullstack: "#f59e0b", Frontend: "#38bdf8",
  Backend: "#a78bfa", "AI/ML": "#34d399", All: "#f59e0b",
};

function Tag({ label }) {
  return (
    <span style={{
      padding: "3px 10px", borderRadius: "999px",
      border: "1px solid rgba(255,255,255,0.1)",
      backgroundColor: "rgba(255,255,255,0.04)",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.63rem", color: "#a1a1aa", letterSpacing: "0.04em",
    }}>{label}</span>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const accent = catColor[project.category] ?? "#f59e0b";

  /* gradient placeholder when no image */
  const gradients = [
    "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    "linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #11998e 100%)",
    "linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #2a475e 100%)",
    "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #3d1515 100%)",
    "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    "linear-gradient(135deg, #16222a 0%, #3a6073 100%)",
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px", overflow: "hidden",
        border: `1px solid ${hovered ? `${accent}44` : "rgba(255,255,255,0.07)"}`,
        backgroundColor: "rgba(255,255,255,0.02)",
        transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 40px ${accent}18` : "none",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Image / placeholder */}
      <div style={{
        height: "180px", position: "relative", overflow: "hidden",
        background: gradients[index % gradients.length],
        flexShrink: 0,
      }}>
        {project.image && (
          <img src={project.image} alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}

        {/* Category badge */}
        <div style={{
          position: "absolute", top: "14px", left: "14px",
          padding: "3px 10px", borderRadius: "999px",
          backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
          border: `1px solid ${accent}55`,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.62rem", color: accent, letterSpacing: "0.08em",
        }}>{project.category}</div>

        {/* Featured badge */}
        {project.featured && (
          <div style={{
            position: "absolute", top: "14px", right: "14px",
            padding: "3px 10px", borderRadius: "999px",
            backgroundColor: "rgba(245,158,11,0.15)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(245,158,11,0.35)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.58rem", color: "#fbbf24", letterSpacing: "0.08em",
          }}>★ FEATURED</div>
        )}

        {/* Stars overlay on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          style={{
            position: "absolute", bottom: "12px", right: "14px",
            display: "flex", gap: "12px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.68rem", color: "rgba(255,255,255,0.7)",
          }}
        >
          <span>★ {project.stats.stars}</span>
          <span>⑂ {project.stats.forks}</span>
        </motion.div>
      </div>

      {/* Body */}
      <div style={{ padding: "22px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.1rem", fontWeight: 700,
          color: "white", margin: 0,
        }}>{project.title}</h3>

        <p style={{
          fontSize: "0.84rem", color: "#71717a",
          lineHeight: 1.7, margin: 0, flex: 1,
        }}>{project.description}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tags.map((t) => <Tag key={t} label={t} />)}
        </div>

        {/* Links */}
        <div style={{
          display: "flex", gap: "10px",
          paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          {project.github && (
            <LinkBtn href={project.github} label="GitHub" accent={accent} />
          )}
          {project.live && (
            <LinkBtn href={project.live} label="Live ↗" accent={accent} primary />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function LinkBtn({ href, label, accent, primary }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "6px 16px", borderRadius: "6px", fontSize: "0.75rem",
        fontFamily: "'JetBrains Mono', monospace", textDecoration: "none",
        border: `1px solid ${primary
          ? (hovered ? accent : `${accent}66`)
          : "rgba(255,255,255,0.1)"}`,
        backgroundColor: primary
          ? (hovered ? accent : `${accent}18`)
          : (hovered ? "rgba(255,255,255,0.07)" : "transparent"),
        color: primary ? (hovered ? "#0e0e10" : accent) : (hovered ? "white" : "#71717a"),
        transition: "all 0.2s ease",
      }}
    >{label}</a>
  );
}

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <section id="projects" style={{
      backgroundColor: "#0e0e10", padding: "100px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Glow */}
      <div style={{
        position: "absolute", top: "30%", right: "-200px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: "48px" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
            color: "#f59e0b", letterSpacing: "0.14em", marginBottom: "10px",
          }}>05. PROJECTS</p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 900, color: "white", whiteSpace: "nowrap",
            }}>What I've Built</h2>
            <div style={{
              flex: 1, height: "1px",
              backgroundColor: "rgba(255,255,255,0.07)", maxWidth: "400px",
            }} />
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div {...fadeUp(0.1)} style={{
          display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px",
        }}>
          {projectCategories.map((cat) => {
            const isActive = active === cat;
            const color = catColor[cat];
            return (
              <button key={cat} onClick={() => setActive(cat)}
                style={{
                  padding: "7px 18px", borderRadius: "999px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem", letterSpacing: "0.06em", cursor: "pointer",
                  border: `1px solid ${isActive ? color : "rgba(255,255,255,0.1)"}`,
                  backgroundColor: isActive ? `${color}18` : "transparent",
                  color: isActive ? color : "#71717a",
                  transition: "all 0.2s ease",
                }}
              >{cat}
                <span style={{
                  marginLeft: "6px", fontSize: "0.6rem",
                  color: isActive ? color : "#52525b",
                }}>
                  {cat === "All" ? projects.length
                    : projects.filter((p) => p.category === cat).length}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div layout style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div {...fadeUp(0.3)} style={{
          marginTop: "56px", textAlign: "center",
        }}>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem",
              color: "#71717a", textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "10px 24px", borderRadius: "8px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#71717a";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            See all projects on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}