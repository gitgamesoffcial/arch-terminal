import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import steamBg from "./assets/steam-bg.png";
const archLogo =
"data:image/svg+xml;utf8," +
encodeURIComponent(
''
);
const links = [
{ label: "GitHub", detail: "Code & projects", href: "github.com" },
{ label: "Instagram", detail: "Photos & updates", href: "https://instagram.com" },
{ label: "YouTube", detail: "Videos", href: "https://youtube.com" },
{ label: "Steam", detail: "My Steam profile", href: "steamcommunity.com" },
{ label: "Contact", detail: "Say hello", href: "mailto:durunda735@proton.me" },
];
const taskbarApps = [
{ icon: "GH", label: "GitHub", href: "github.com" },
{ icon: "ST", label: "Steam", href: "steamcommunity.com" },
{ icon: "GV", label: "GameVox", href: "gamevox.com" },
];
const workspaces = Array.from({ length: 4 }, (_, i) => i + 1);
export default function App() {
const screenRef = useRef(null);
const contentRef = useRef(null);
const [time, setTime] = useState("");
const [activeWorkspace, setActiveWorkspace] = useState(1);
const [isMinimized, setIsMinimized] = useState(false);
const [scrollPercent, setScrollPercent] = useState(0);
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
const updateScrollProgress = () => {
const el = contentRef.current;
if (!el) return;
const maxScroll = el.scrollHeight - el.clientHeight;
if (maxScroll <= 0) {
setScrollPercent(0);
return;
}
setScrollPercent(Math.round((el.scrollTop / maxScroll) * 100));
};
const handleScroll = (direction: "up" | "down") => {
const amount = direction === "up" ? -160 : 160;
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
const handleTrackClick = (e: React.MouseEvent) => {
const el = contentRef.current;
if (!el) return;
const rect = e.currentTarget.getBoundingClientRect();
const ratio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
const maxScroll = el.scrollHeight - el.clientHeight;
el.scrollTo({ top: ratio * maxScroll, behavior: "smooth" });
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
backgroundImage: linear-gradient(rgba(5, 8, 14, 0.72), rgba(5, 8, 14, 0.82)), url("${steamBg}"),
}}
>
{workspaces.map((ws) => (
<button
key={ws}
type="button"
className={ws-btn ${activeWorkspace === ws ? "active" : ""}}
onClick={() => setActiveWorkspace(ws)}
>
{ws}

))}

alacritty — ~/links
{time || "00:00:00"}
CPU 14%
RAM 3.2G
NET UP

{!isMinimized && (




~/links
arch btw
<div
className="avatar"
aria-label="Steam Avatar Profile Picture"
style={{ backgroundImage: url("${steamBg}") }}
/>
USER PROFILE

Nikita@arch

Designer, developer, and Linux enjoyer.
{links.map((link, index) => {
const isExternal = link.href.startsWith("https://");
return React.createElement(
"a",
{
className: "link-card",
href: link.href,
key: link.label,
target: isExternal ? "_blank" : undefined,
rel: isExternal ? "noreferrer" : undefined,
style: { animationDelay: ${index * 80}ms },
},
React.createElement("span", { className: "link-icon", "aria-hidden": "true" }, "↗"),
React.createElement(
"span",
{ className: "link-copy" },
React.createElement("strong", null, link.label),
React.createElement("small", null, link.detail)
),
React.createElement("span", { className: "link-arrow", "aria-hidden": "true" }, "→")
);
})}
SYSTEM ONLINE
powered by Linux



)}



~/wheel
{scrollPercent}%
<button
type="button"
className="wheel-btn"
onClick={() => handleScroll("up")}
title="Scroll up (Q or Up Arrow)"
aria-label="Scroll up"
>
▲ Q
<div
className="wheel-thumb"
style={{ top: ${Math.min(76, scrollPercent * 0.76)}% }}
/>
<button
type="button"
className="wheel-btn"
onClick={() => handleScroll("down")}
title="Scroll down (E or Down Arrow)"
aria-label="Scroll down"
>
▼ E




<button
type="button"
className={task-item ${!isMinimized ? "running" : ""}}
onClick={() => setIsMinimized((prev) => !prev)}
title="Toggle Terminal Window"
>
>_
Terminal
{taskbarApps.map((app) =>
React.createElement(
"a",
{
key: app.label,
className: "task-item",
href: app.href,
target: "_blank",
rel: "noreferrer",
title: app.label,
},
React.createElement("span", { className: "task-icon" }, app.icon),
React.createElement("span", { className: "task-label" }, app.label)
)
)}
);
}
