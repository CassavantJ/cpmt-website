import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const ContactPage = ({ isVisible }) => {
  const { t } = useTheme();
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "", interest: "general" });

  return (
    <section id="contact" data-animate style={{
      padding: "140px clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)",
      maxWidth: 1600,
      margin: "0 auto",
    }}>
      <div style={{
        opacity: isVisible("contact") ? 1 : 0,
        transform: isVisible("contact") ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "clamp(40px, 6vw, 80px)",
        }}>
          <div>
            <div className="section-label">Get In Touch</div>
            <h2 style={{ fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 800, letterSpacing: -2, marginBottom: 20 }}>
              Let's Find Your<br />
              <span style={{ color: "#C12033" }}>Next Machine</span>
            </h2>
            <p style={{ color: t.textTertiary, fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
              Whether you're quoting a single machine or outfitting an entire facility, our team is ready to help.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { label: "Call Us", value: "(602) 555-0180", icon: "☎" },
                { label: "Email", value: "sales@cpmtools.com", icon: "✉" },
                { label: "Visit", value: "Phoenix, AZ", icon: "◉" },
              ].map((info) => (
                <div key={info.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: t.bgCard,
                    border: `1px solid ${t.borderPrimary}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}>
                    {info.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: t.textTertiary, fontFamily: "'Space Mono', monospace", letterSpacing: 1, textTransform: "uppercase" }}>{info.label}</div>
                    <div style={{ fontSize: 17, fontWeight: 600 }}>{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: t.bgCard,
            border: `1px solid ${t.borderPrimary}`,
            borderRadius: 16,
            padding: "clamp(28px, 4vw, 44px)",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: t.textTertiary, fontFamily: "'Space Mono', monospace", letterSpacing: 1, display: "block", marginBottom: 6 }}>NAME</label>
                <input
                  className="input-field"
                  placeholder="John Smith"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: t.textTertiary, fontFamily: "'Space Mono', monospace", letterSpacing: 1, display: "block", marginBottom: 6 }}>EMAIL</label>
                <input
                  className="input-field"
                  placeholder="john@company.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: t.textTertiary, fontFamily: "'Space Mono', monospace", letterSpacing: 1, display: "block", marginBottom: 6 }}>PHONE</label>
              <input
                className="input-field"
                placeholder="(602) 555-0000"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: t.textTertiary, fontFamily: "'Space Mono', monospace", letterSpacing: 1, display: "block", marginBottom: 6 }}>INTEREST</label>
              <select
                className="input-field"
                value={contactForm.interest}
                onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                style={{ cursor: "pointer" }}
              >
                <option value="general">General Inquiry</option>
                <option value="new-machine">New Machine Quote</option>
                <option value="used-machine">Pre-Owned Machine</option>
                <option value="service">Service & Repair</option>
                <option value="automation">Automation Solutions</option>
                <option value="financing">Financing</option>
              </select>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, color: t.textTertiary, fontFamily: "'Space Mono', monospace", letterSpacing: 1, display: "block", marginBottom: 6 }}>MESSAGE</label>
              <textarea
                className="input-field"
                placeholder="Tell us about your application..."
                rows={4}
                style={{ resize: "vertical", fontFamily: "'Outfit', sans-serif" }}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              />
            </div>
            <button className="cta-primary" style={{ width: "100%", justifyContent: "center" }}>
              Submit Inquiry →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
