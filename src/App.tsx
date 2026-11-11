import { useEffect, useRef } from "react";
import "./App.css";
import steamBg from "./assets/steam-bg.png";

const links = [
  { label: "GitHub", detail: "Code & projects", href: "https://github.com/gitgamesoffcial" },
  { label: "Instagram", detail: "Photos & updates", href: "https://instagram.com" },
  { label: "YouTube", detail: "Videos", href: "https://youtube.com" },
  { label: "Steam", detail: "My Steam profile", href: "https://steamcommunity.com/profiles/76561198634497466" },
  { label: "Contact", detail: "Say hello", href: "mailto:durunda735@proton.me" },
];

export default function App() {
  const screenRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "up" | "down") => {
    const amount = direction === "up" ? -180 : 180;
    const contentEl = contentRef.current;
    const screenEl = screenRef.current;

    if (contentEl && contentEl.scrollHeight > contentEl.clientHeight) {
      contentEl.scrollBy({ top: amount, behavior: "smooth" });
    } else if (screenEl && screenEl.scrollHeight > screenEl.clientHeight) {
      screenEl.scrollBy({ top: amount, behavior: "smooth" });
    } else {
      window.scrollBy({ top: amount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === "q" || e.key === "ArrowUp") {
        e.preventDefault();
        handleScroll("up");
      } else if (key === "e" || e.key === "ArrowDown") {
        e.preventDefault();
        handleScroll("down");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main
      ref={screenRef}
      className="screen crt"
      style={{
        backgroundImage: `linear-gradient(rgba(5, 8, 14, 0.72), rgba(5, 8, 14, 0.82)), url("${steamBg}")`,
      }}
    >
      <div className="crt-bezel">
        <section className="card">
          <header className="window-bar">
            <span className="dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>~/links</span>
            <span className="bar-right">arch btw</span>
          </header>

          <div className="content" ref={contentRef}>
            <div
              className="avatar"
              aria-label="Steam Avatar Profile Picture"
              style={{ backgroundImage: `url("${steamBg}")` }}
            />

            <p className="eyebrow">USER PROFILE</p>
            <h1>
              Nikita<span>@arch</span>
            </h1>
            <p className="bio">Designer, developer, and Linux enjoyer.</p>

            <nav className="links" aria-label="My links">
              {links.map((link, index) => {
                const isExternal = link.href.startsWith("https://");

                return (
                  <a
                    className="link-card"
                    href={link.href}
                    key={link.label}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <span className="link-icon" aria-hidden="true">↗</span>
                    <span className="link-copy">
                      <strong>{link.label}</strong>
                      <small>{link.detail}</small>
                    </span>
                    <span className="link-arrow" aria-hidden="true">→</span>
                  </a>
                );
              })}
            </nav>

            <footer>
              <span className="status-dot" />
              <span>SYSTEM ONLINE</span>
              <span className="footer-right">powered by Linux</span>
            </footer>
          </div>
        </section>
      </div>

      <div className="scroll-controls" aria-label="Scroll controls">
        <button
          type="button"
          className="scroll-btn"
          onClick={() => handleScroll("up")}
          title="Scroll up (Q or Up Arrow)"
          aria-label="Scroll up"
        >
          ▲ <kbd>Q</kbd>
        </button>
        <button
          type="button"
          className="scroll-btn"
          onClick={() => handleScroll("down")}
          title="Scroll down (E or Down Arrow)"
          aria-label="Scroll down"
        >
          ▼ <kbd>E</kbd>
        </button>
      </div>

      <div className="scanlines" aria-hidden="true" />
    </main>
  );
}
