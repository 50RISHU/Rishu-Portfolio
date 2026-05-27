import { useState } from "react";
import { motion } from "framer-motion";
import { personal } from "../../data/portfolio";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const contactInfo = [
  {
    icon: "✉",
    label: "Email",
    value: personal.socials.email,
    href: `mailto:${personal.socials.email}`,
  },
  {
    icon: "⌥",
    label: "GitHub",
    value: "github.com/yourusername",
    href: personal.socials.github,
  },
  {
    icon: "in",
    label: "LinkedIn",
    value: "linkedin.com/in/yourname",
    href: personal.socials.linkedin,
  },
  { icon: "📍", label: "Location", value: personal.location, href: null },
];

/* ── Single input / textarea field ── */
function Field({ label, name, type = "text", value, onChange, error, rows }) {
  const [focused, setFocused] = useState(false);
  const Tag = rows ? "textarea" : "input";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          color: "#71717a",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </label>
      <Tag
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          backgroundColor: "rgba(255,255,255,0.03)",
          border: `1px solid ${error ? "#f87171" : focused ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "10px",
          padding: "12px 16px",
          color: "white",
          fontSize: "0.9rem",
          fontFamily: "'JetBrains Mono', monospace",
          outline: "none",
          resize: rows ? "vertical" : undefined,
          transition: "border-color 0.2s ease",
          width: "100%",
          boxSizing: "border-box",
          minHeight: rows ? "120px" : undefined,
        }}
        placeholder={
          name === "name"
            ? "John Doe"
            : name === "email"
              ? "john@example.com"
              : name === "subject"
                ? "Project Inquiry"
                : "Tell me about your project..."
        }
      />
      {error && (
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "#f87171",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

/* ── Contact info card ── */
function InfoCard({ icon, label, value, href }) {
  const [hovered, setHovered] = useState(false);
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href ?? undefined}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "16px 20px",
        borderRadius: "12px",
        border: `1px solid ${hovered && href ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.07)"}`,
        backgroundColor:
          hovered && href ? "rgba(245,158,11,0.04)" : "rgba(255,255,255,0.02)",
        textDecoration: "none",
        cursor: href ? "pointer" : "default",
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "9px",
          flexShrink: 0,
          backgroundColor: "rgba(245,158,11,0.1)",
          border: "1px solid rgba(245,158,11,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.85rem",
          color: "#f59e0b",
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "#52525b",
            letterSpacing: "0.08em",
            margin: "0 0 3px",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8rem",
            color: hovered && href ? "#f59e0b" : "#a1a1aa",
            margin: 0,
            transition: "color 0.2s",
          }}
        >
          {value}
        </p>
      </div>
    </Tag>
  );
}

/* ── Main ── */
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((ev) => ({ ...ev, [e.target.name]: "" }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setStatus("sending");
    /* ── swap this fetch for EmailJS / Formspree ── */
    // Formspree (free, no backend)
    await fetch("https://formspree.io/f/xpqnjkvv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: "#0e0e10",
        padding: "100px 24px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-180px",
          width: "460px",
          height: "460px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: "60px" }}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "#f59e0b",
              letterSpacing: "0.14em",
              marginBottom: "10px",
            }}
          >
            06. CONTACT
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 900,
                color: "white",
                whiteSpace: "nowrap",
              }}
            >
              Get In Touch
            </h2>
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.07)",
                maxWidth: "400px",
              }}
            />
          </div>
          <p
            style={{
              marginTop: "16px",
              fontSize: "0.95rem",
              color: "#71717a",
              lineHeight: 1.7,
              maxWidth: "480px",
            }}
          >
            Have a project in mind or just want to say hi? My inbox is always
            open. I'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Two-col layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Left — info cards */}
          <motion.div
            {...fadeUp(0.1)}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {contactInfo.map((c) => (
              <InfoCard key={c.label} {...c} />
            ))}

            {/* Availability card */}
            <div
              style={{
                marginTop: "8px",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid rgba(34,197,94,0.2)",
                backgroundColor: "rgba(34,197,94,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                    boxShadow: "0 0 8px #22c55e",
                    animation: "pulse 2s infinite",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    color: "#86efac",
                    letterSpacing: "0.08em",
                  }}
                >
                  AVAILABLE FOR WORK
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "#52525b",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Currently open to full-time roles and freelance projects.
                Response time: &lt; 24h.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            {...fadeUp(0.2)}
            style={{
              padding: "32px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.07)",
              backgroundColor: "rgba(255,255,255,0.02)",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.3rem",
                    color: "white",
                    margin: 0,
                  }}
                >
                  Message Sent!
                </h3>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.78rem",
                    color: "#71717a",
                    margin: 0,
                  }}
                >
                  Thanks for reaching out. I'll reply within 24h.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    marginTop: "8px",
                    padding: "8px 24px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: "transparent",
                    color: "#a1a1aa",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                  }}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <Field
                    label="NAME"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <Field
                    label="EMAIL"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </div>
                <Field
                  label="SUBJECT"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />
                <Field
                  label="MESSAGE"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  error={errors.message}
                  rows={5}
                />

                <SendButton status={status} onClick={handleSubmit} />
              </>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </section>
  );
}

function SendButton({ status, onClick }) {
  const [hovered, setHovered] = useState(false);
  const sending = status === "sending";
  return (
    <button
      onClick={onClick}
      disabled={sending}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "13px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: sending
          ? "rgba(245,158,11,0.4)"
          : hovered
            ? "#d97706"
            : "#f59e0b",
        color: "#0e0e10",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.82rem",
        fontWeight: 600,
        letterSpacing: "0.06em",
        cursor: sending ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        boxShadow:
          hovered && !sending ? "0 0 24px rgba(245,158,11,0.35)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      {sending ? (
        <>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{ display: "inline-block" }}
          >
            ⟳
          </motion.span>
          SENDING...
        </>
      ) : (
        "SEND MESSAGE →"
      )}
    </button>
  );
}
