import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../../data/portfolio";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

/* Animated bar that fills when it enters viewport */
function SkillBar({ name, level, index }) {
  const [filled, setFilled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setFilled(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const color =
    level >= 85 ? "#f59e0b" :
    level >= 70 ? "#fb923c" : "#a78bfa";

  return (
    <div ref={ref} style={{ marginBottom: "18px" }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "baseline", marginBottom: "7px",
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.8rem", color: "#d4d4d8", letterSpacing: "0.02em",
        }}>{name}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.68rem", color: color, letterSpacing: "0.06em",
        }}>{level}%</span>
      </div>

      {/* Track */}
      <div style={{
        height: "5px", backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: "999px", overflow: "hidden",
      }}>
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: filled ? `${level}%` : 0 }}
          transition={{ duration: 1, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "100%", borderRadius: "999px",
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}

/* Category card */
function CategoryCard({ category, icon, skills, cardIndex }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      {...fadeUp(0.1 + cardIndex * 0.1)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px", borderRadius: "16px",
        border: `1px solid ${hovered ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.07)"}`,
        backgroundColor: hovered ? "rgba(245,158,11,0.03)" : "rgba(255,255,255,0.02)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Card header */}
      <div style={{
        display: "flex", alignItems: "center", gap: "12px",
        marginBottom: "28px",
      }}>
        <span style={{
          fontSize: "1.3rem", color: "#f59e0b",
          lineHeight: 1,
        }}>{icon}</span>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.15rem", fontWeight: 700,
          color: "white", margin: 0,
        }}>{category}</h3>
        <span style={{
          marginLeft: "auto",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem", color: "#52525b",
        }}>{skills.length} skills</span>
      </div>

      {/* Skill bars */}
      {skills.map((s, i) => (
        <SkillBar key={s.name} name={s.name} level={s.level} index={i} />
      ))}
    </motion.div>
  );
}

export default function Skills() {
  /* Derived totals for summary strip */
  const totalSkills = skillCategories.reduce((acc, c) => acc + c.skills.length, 0);
  const avgLevel    = Math.round(
    skillCategories.flatMap((c) => c.skills).reduce((a, s) => a + s.level, 0) /
    totalSkills
  );

  return (
    <section id="skills" style={{
      backgroundColor: "#0e0e10", padding: "100px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Glow left */}
      <div style={{
        position: "absolute", top: "30%", left: "-200px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Section header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: "60px" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
            color: "#f59e0b", letterSpacing: "0.14em", marginBottom: "10px",
          }}>02. SKILLS</p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 900, color: "white", whiteSpace: "nowrap",
            }}>What I Work With</h2>
            <div style={{
              flex: 1, height: "1px",
              backgroundColor: "rgba(255,255,255,0.07)", maxWidth: "400px",
            }} />
          </div>
        </motion.div>

        {/* Summary strip */}
        <motion.div {...fadeUp(0.1)} style={{
          display: "flex", flexWrap: "wrap", gap: "12px",
          marginBottom: "52px",
        }}>
          {[
            { label: "Categories", value: skillCategories.length },
            { label: "Total Skills", value: totalSkills },
            { label: "Avg Proficiency", value: `${avgLevel}%` },
          ].map(({ label, value }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "8px 18px", borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.08)",
              backgroundColor: "rgba(255,255,255,0.02)",
            }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem", fontWeight: 700, color: "#f59e0b",
              }}>{value}</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem", color: "#71717a", letterSpacing: "0.06em",
              }}>{label}</span>
            </div>
          ))}

          {/* Legend */}
          <div style={{
            marginLeft: "auto", display: "flex",
            alignItems: "center", gap: "16px", flexWrap: "wrap",
          }}>
            {[
              { color: "#f59e0b", label: "Expert (85%+)"   },
              { color: "#fb923c", label: "Proficient (70%+)" },
              { color: "#a78bfa", label: "Learning"         },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: color }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem", color: "#71717a",
                }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {skillCategories.map((cat, i) => (
            <CategoryCard key={cat.category} {...cat} cardIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}