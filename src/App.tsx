import { useEffect, useRef, useState } from "react";
import "./App.css";
import steamBg from "./assets/steam-bg.png";

const archLogo =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="white"><path d="M12 2C11.12 4.15 10.58 5.56 9.6 7.67C10.2 8.31 10.94 9.05 12.14 9.89C10.85 9.36 9.97 8.83 9.31 8.27C8.05 10.9 6.08 14.65 2.08 21.84C5.22 20.03 7.66 18.91 9.93 18.49C9.83 18.07 9.78 17.61 9.78 17.13L9.79 17.03C9.84 15.05 10.87 13.52 12.09 13.62C13.31 13.73 14.26 15.42 14.21 17.4C14.2 17.77 14.16 18.13 14.08 18.46C16.33 18.9 18.74 20.01 21.84 21.8C21.23 20.67 20.68 19.66 20.16 18.7C19.34 18.06 18.48 17.24 16.73 16.34C17.93 16.65 18.79 17.01 19.46 17.41C14.17 7.56 13.74 6.24 12 2Z"/></svg>'
  );

const links = [
  { label: "GitHub", detail: "Code & projects", href: "https://github.com" },
  { label: "Instagram", detail: "Photos & updates", href: "https://instagram.com" },
  { label: "YouTube", detail: "Videos", href: "https://youtube.com" },
  { label: "Steam", detail: "My Steam profile", href: "https://steamcommunity.com" },
  { label: "Contact", detail: "Say hello", href: "mailto:durunda735@proton.me" },
];

const workspaces = Array.from({ length: 4 }, (_, i) => i + 1);

export default function App() {
  const screenRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<string>("");
  const [activeWorkspace, setActiveWorkspace] = useState<number>(1);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

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
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) {
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
      <header className="arch-topbar">
        <div className="topbar-left">
          <span className="arch-logo" title="Arch Linux">
            <img src={archLogo} alt="Arch Linux" />
          </span>
          <div className="workspaces">
            {workspaces.map((ws) => (
              <button
                key={ws}
                type="button"
                className={`ws-btn ${activeWorkspace === ws ? "active" : ""}`}
                onClick={() => setActiveWorkspace(ws)}
              >
                {ws}
              </button>
            ))}
          </div>
          <span className="active-window">alacritty — ~/links</span>
        </div>

        <div className="topbar-center">
          <span className="topbar-clock">{time || "00:00:00"}</span>
        </div>

        <div className="topbar-right">
          <span className="sys-pill">CPU 14%</span>
          <span className="sys-pill">RAM 3.2G</span>
          <span className="sys-pill net-pill">NET UP</span>
        </div>
      </header>

      {!isMinimized && (
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
      )}

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

      <nav className="arch-taskbar" aria-label="Desktop Taskbar">
        <button
          type="button"
          className={`task-item ${!isMinimized ? "running" : ""}`}
          onClick={() => setIsMinimized((prev) => !prev)}
          title="Toggle Terminal Window"
        >
          <span className="task-icon">&gt;_</span>
          <span className="task-label">Terminal</span>
        </button>

        <a
          className="task-item"
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          title="GitHub"
        >
          <span className="task-icon">GH</span>
          <span className="task-label">GitHub</span>
        </a>

        <a
          className="task-item"
          href="https://steamcommunity.com"
          target="_blank"
          rel="noreferrer"
          title="Steam"
        >
          <span className="task-icon">ST</span>
          <span className="task-label">Steam</span>
        </a>

        <a
          className="task-item"
          href="https://gamevox.com"
          target="_blank"
          rel="noreferrer"
          title="GameVox Voice Server"
        >
          <span className="task-icon">GV</span>
          <span className="task-label">GameVox</span>
        </a>
      </nav>

      <div className="scanlines" aria-hidden="true" />
    </main>
  );
}
