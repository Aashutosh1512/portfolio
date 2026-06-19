import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import "./App.css";

/* -------------------------
   Small reusable Motion wrapper
   ------------------------- */
const Section = ({ id, children }) => (
  <motion.section
    id={id}
    className="section"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.section>
);

/* -------------------------
   Bubble-like split text (minimal hover)
   ------------------------- */
const SplittedTitle = ({ text }) => (
  <h1 className="title">
    {text.split("").map((c, i) => (
      <span key={i} className="title-char">
        {c}
      </span>
    ))}
  </h1>
);

/* -------------------------
   Main App
   ------------------------- */
export default function App() {
  const [dark, setDark] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const floatingDots = Array.from({ length: 14 });

  // enable smooth scroll behavior via JS (also set in CSS)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // Track mouse position for light interaction
  const handleMouseMove = (e) => {
    const hero = e.currentTarget;
    const rect = hero.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  // Smooth scroll handler for navigation with custom slow speed
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - 80;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500; // 1.5 seconds for slow, smooth scroll
      let start = null;

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(
          timeElapsed,
          startPosition,
          distance,
          duration
        );
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      const easeInOutCubic = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <>
      <motion.div
        className={`page ${dark ? "dark" : "light"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* background dots */}

        {/* NAV */}
        <nav className="nav">
          <div className="nav-left">
            <div className="brand">Aashutosh Goyal</div>
          </div>

          <div className="nav-center">
            {[
              "About",
              "Experience",
              "Projects",
              "Skills",
              "Achievements",
              "Contact",
            ].map((s) => (
              <a
                key={s}
                className="nav-link"
                href={`#${s.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, s.toLowerCase())}
              >
                {s}
              </a>
            ))}
          </div>

          <div className="nav-right">
            <button className="theme" onClick={() => setDark((d) => !d)}>
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </nav>

        {/* HERO */}
        <header
          className="hero"
          id="home"
          role="banner"
          style={{ position: "relative", overflow: "hidden" }}
          onMouseMove={handleMouseMove}
        >
          {/* Ambient glow effect radiating from center */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x * 0.08,
              y: mousePosition.y * 0.08,
            }}
            transition={{
              delay: 0.3,
              duration: 1.5,
              ease: [0.43, 0.13, 0.23, 0.96],
              x: { duration: 0.4, ease: "easeOut" },
              y: { duration: 0.4, ease: "easeOut" },
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "800px",
              height: "800px",
              background: dark
                ? "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(6, 182, 212, 0.3) 20%, rgba(6, 182, 212, 0.15) 40%, transparent 70%)"
                : "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 20%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(40px)",
              zIndex: -3,
              pointerEvents: "none",
            }}
          />

          {/* Secondary glow layer */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x * 0.1,
              y: mousePosition.y * 0.1,
            }}
            transition={{
              delay: 0.5,
              duration: 1.3,
              ease: [0.43, 0.13, 0.23, 0.96],
              x: { duration: 0.5, ease: "easeOut" },
              y: { duration: 0.5, ease: "easeOut" },
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "600px",
              background: dark
                ? "radial-gradient(circle, rgba(34, 211, 238, 0.6) 0%, rgba(6, 182, 212, 0.4) 25%, rgba(6, 182, 212, 0.2) 50%, transparent 75%)"
                : "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0.3) 25%, rgba(59, 130, 246, 0.15) 50%, transparent 75%)",
              borderRadius: "50%",
              filter: "blur(25px)",
              zIndex: -2,
              pointerEvents: "none",
            }}
          />

          {/* Bright core glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x * 0.12,
              y: mousePosition.y * 0.12,
            }}
            transition={{
              delay: 0.7,
              duration: 1,
              ease: [0.43, 0.13, 0.23, 0.96],
              x: { duration: 0.6, ease: "easeOut" },
              y: { duration: 0.6, ease: "easeOut" },
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "400px",
              height: "400px",
              background: dark
                ? "radial-gradient(circle, rgba(34, 211, 238, 0.8) 0%, rgba(34, 211, 238, 0.5) 30%, rgba(6, 182, 212, 0.3) 60%, transparent 100%)"
                : "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.4) 30%, rgba(59, 130, 246, 0.2) 60%, transparent 100%)",
              borderRadius: "50%",
              filter: "blur(15px)",
              zIndex: -1,
              pointerEvents: "none",
            }}
          />

          <div className="hero-inner">
            <SplittedTitle text={"Hey There  !!"} />
            <motion.p
              className="sub"
              animate={{ opacity: 8, y: 1, x: 1 }}
              transition={{ delay: 0.25, duration: 0.7 }}
            >
              Full Stack Developer focused on scalable microservices, secure
              authentication, and high-performance web applications.
            </motion.p>

            <div className="hero-cta">
              <div className="socials">
                <a
                  href="https://github.com/Aashutosh1512"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github />
                </a>
                <a
                  href="https://www.linkedin.com/in/aashutosh-goyal-91942a1ba/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin />
                </a>
                <a href="mailto:aashutosh89660@gmail.com" aria-label="Email">
                  <Mail />
                </a>
              </div>
              <a className="btn" href="/Aashutosh__Resume.pdf" download>
                Download Resume
              </a>
            </div>
          </div>
        </header>

        {/* ABOUT */}
        <Section id="about">
          <h2 className="section-title">About</h2>
          <p className="lead">
            Innovative Full Stack Developer with a track record of architecting
            resilient microservices, modernizing authentication systems (Azure
            AD SSO), and automating end-to-end workflows. Passionate about
            converting complex problems into production-ready solutions.
          </p>
        </Section>

       {/* EXPERIENCE */}
<Section id="experience">
  <h2 className="section-title">Experience</h2>

  <div className="card-grid">
    <article className="card">
      <h3>Software Engineer — Anko GCC (Kmart Australia)</h3>
      <p className="muted">September 2024 – Present</p>

      <ul>
        <li>
          Integrated product lifecycle systems across Kmart, enabling reliable
          data flow and interoperability.
        </li>

        <li>
          Built fault-tolerant event-driven solutions with retry mechanisms,
          exponential backoff, and automated recovery.
        </li>

        <li>
          Developed a RAG-based incident management solution using Phi-3
          open-source LLM.
        </li>

        <li>
          Managed AWS infrastructure including ECS, Lambda, DynamoDB,
          CloudWatch, and Systems Manager.
        </li>

        <li>
          Built and maintained microservices using .NET Core and PostgreSQL,
          monitored via Sumo Logic.
        </li>

        <li>
          Automated CI/CD pipelines with GitHub Actions and implemented Redis
          caching, reducing API costs by 36%.
        </li>

        <li>
          Modernized enterprise applications by migrating from .NET Framework
          to .NET Core and upgrading from .NET 5 to .NET 10.
        </li>

        <li>
          Developed Angular applications with SignalR for real-time
          synchronization.
        </li>
      </ul>
    </article>

    <article className="card">
      <h3>Software Engineer Intern — Anko GCC (Kmart Australia)</h3>
      <p className="muted">February 2024 – August 2024</p>

      <ul>
        <li>
          Architected Kafka–RabbitMQ integration to distribute events across
          topics, boosting throughput by 40%.
        </li>

        <li>
          Migrated authentication from legacy sessions to Azure AD SSO,
          strengthening security and simplifying access.
        </li>

        <li>
          Built and maintained three microservices using .NET, Kafka, and
          Redis, improving throughput by 20%.
        </li>

        <li>
          Orchestrated CI/CD pipelines with GitHub Actions, achieving 80%
          test coverage and reducing failed merges by 25%.
        </li>
      </ul>
    </article>
  </div>
</Section>

        {/* PROJECTS */}
        <Section id="projects">
          <h2 className="section-title">Projects</h2>

          <div className="card-grid">
            <article className="card">
              <h3>Online Assessments System</h3>
              <p className="muted">React • Node.js • MongoDB</p>
              <p>
                Full-stack assessment platform serving 500+ students with
                automated evaluation, OAuth2/JWT authentication and automated
                notifications.
              </p>
              <a
                className="small-link"
                href="https://github.com/Aashutosh1512/online-assement-"
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
            </article>

            <article className="card">
              <h3>Complete 2-Factor Authentication System</h3>
              <p className="muted">React • NodeJs • MongoDB</p>
              <p>
                Comprehensive authentication system with 2FA, admin access token
                expiry management, forgot password, change password, and resend
                OTP functionality for enhanced security.
              </p>
              <a
                className="small-link"
                href="https://github.com/Aashutosh1512/two-authentication-reuseable"
                aria-hidden
              >
                (View on GitHub)
              </a>
            </article>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {[
              "React",
              "JavaScript",
              "HTML5",
              "CSS3",
              ".NET",
              "Node.js",
              "C#",
              "Java",
              "SQL / MySQL / PostgreSQL",
              "MongoDB",
              "Redis",
              "Docker",
              "Kafka",
              "Git / GitHub",
              "CI/CD",
            ].map((s) => (
              <span key={s} className="skill">
                {s}
              </span>
            ))}
          </div>
        </Section>

        {/* ACHIEVEMENTS */}
        <Section id="achievements">
          <h2 className="section-title">Achievements</h2>
          <ul className="achieve-list">
            <li>
              Ranked top 1.5% in TCS CodeVita Season (AIR 361, Global 2063).
            </li>
            <li>Solved 800+ DSA problems (leetcode: Aashutosh1512).</li>
            <li>Advanced .NET Development Certification — Microsoft (2023).</li>
          </ul>
        </Section>

        {/* CONTACT */}
        <Section id="contact">
          <h2 className="section-title">Contact</h2>
          <p className="lead">
            Email:{" "}
            <a href="mailto:aashutosh89660@gmail.com">
              aashutosh89660@gmail.com
            </a>
          </p>
          <p className="lead">
            Phone: <a href="tel:+918966098596">+91-89660-98596</a>
          </p>
          <div className="small">
            <a
              href="https://www.linkedin.com/in/aashutosh-goyal-91942a1ba/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>{" "}
            •
            <a
              href="https://github.com/Aashutosh1512"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              GitHub
            </a>{" "}
            •
            <a
              href="https://leetcode.com/Aashutosh1512"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              LeetCode
            </a>
          </div>
        </Section>

        {/* FOOTER */}
        <footer className="footer">
          © {new Date().getFullYear()} Aashutosh Goyal — Built with React &
          Framer Motion
        </footer>
      </motion.div>
    </>
  );
}
