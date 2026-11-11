import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import steamBg from "./assets/steam-bg.png";
const archLogo =
"data:image/svg+xml;utf8," +
encodeURIComponent(
"\x3Csvg xmlns='w3.org' viewBox='0 0 24 24' fill='white'\x3E\x3Cpath d='M12 2C11.12 4.15 10.58 5.56 9.6 7.67C10.2 8.31 10.94 9.05 12.14 9.89C10.85 9.36 9.97 8.83 9.31 8.27C8.05 10.9 6.08 14.65 2.08 21.84C5.22 20.03 7.66 18.91 9.93 18.49C9.83 18.07 9.78 17.61 9.78 17.13L9.79 17.03C9.84 15.05 10.87 13.52 12.09 13.62C13.31 13.73 14.26 15.42 14.21 17.4C14.2 17.77 14.16 18.13 14.08 18.46C16.33 18.9 18.74 20.01 21.84 21.8C21.23 20.67 20.68 19.66 20.16 18.7C19.34 18.06 18.48 17.24 16.73 16.34C17.93 16.65 18.79 17.01 19.46 17.41C14.17 7.56 13.74 6.24 12 2Z'/\x3E\x3C/svg\x3E"
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
const h = React.createElement;
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
const el = contentRef.current as HTMLDivElement | null;
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
const contentEl = contentRef.current as HTMLDivElement | null;
const screenEl = screenRef.current as HTMLElement | null;
if (contentEl && contentEl.scrollHeight - contentEl.clientHeight > 0) {
contentEl.scrollBy({ top: amount, behavior: "smooth" });
} else if (screenEl && screenEl.scrollHeight - screenEl.clientHeight > 0) {
screenEl.scrollBy({ top: amount, behavior: "smooth" });
} else {
window.scrollBy({ top: amount, behavior: "smooth" });
}
};
const handleTrackClick = (e: React.MouseEvent) => {
const el = contentRef.current as HTMLDivElement | null;
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
return h(
"main",
{
ref: screenRef,
className: "screen crt",
style: {
backgroundImage: linear-gradient(rgba(5, 8, 14, 0.72), rgba(5, 8, 14, 0.82)), url("${steamBg}"),
},
},
h(
"header",
{ className: "arch-topbar" },
h(
"div",
{ className: "topbar-left" },
h(
"span",
{ className: "arch-logo", title: "Arch Linux" },
h("img", { src: archLogo, alt: "Arch Linux" })
),
h(
"div",
{ className: "workspaces" },
workspaces.map((ws) =>
h(
"button",
{
key: ws,
type: "button",
className: ws-btn ${activeWorkspace === ws ? "active" : ""},
onClick: () => setActiveWorkspace(ws),
},
ws
)
)
),
h("span", { className: "active-window" }, "alacritty — ~/links")
),
h(
"div",
{ className: "topbar-center" },
h("span", { className: "topbar-clock" }, time || "00:00:00")
),
h(
"div",
{ className: "topbar-right" },
h("span", { className: "sys-pill" }, "CPU 14%"),
h("span", { className: "sys-pill" }, "RAM 3.2G"),
h("span", { className: "sys-pill net-pill" }, "NET UP")
)
),
h(
"div",
{ className: "desktop-grid" },
!isMinimized &&
h(
"div",
{ className: "crt-bezel" },
h(
"section",
{ className: "card" },
h(
"header",
{ className: "window-bar" },
h(
"span",
{ className: "dots", "aria-hidden": "true" },
h("i", null),
h("i", null),
h("i", null)
),
h("span", null, "~/links"),
h("span", { className: "bar-right" }, "arch btw")
),
h(
"div",
{
className: "content",
ref: contentRef,
onScroll: updateScrollProgress,
},
h("div", {
className: "avatar",
"aria-label": "Steam Avatar Profile Picture",
style: { backgroundImage: url("${steamBg}") },
}),
h("p", { className: "eyebrow" }, "USER PROFILE"),
h("h1", null, "Nikita", h("span", null, "@arch")),
h("p", { className: "bio" }, "Designer, developer, and Linux enjoyer."),
h(
"nav",
{ className: "links", "aria-label": "My links" },
links.map((link, index) => {
const isExternal = link.href.startsWith("https://");
return h(
"a",
{
className: "link-card",
href: link.href,
key: link.label,
target: isExternal ? "blank" : undefined,
rel: isExternal ? "noreferrer" : undefined,
style: { animationDelay: ${index * 80}ms },
},
h("span", { className: "link-icon", "aria-hidden": "true" }, "↗"),
h(
"span",
{ className: "link-copy" },
h("strong", null, link.label),
h("small", null, link.detail)
),
h("span", { className: "link-arrow", "aria-hidden": "true" }, "→")
);
})
),
h(
"footer",
null,
h("span", { className: "status-dot" }),
h("span", null, "SYSTEM ONLINE"),
h("span", { className: "footer-right" }, "powered by Linux")
)
)
)
),
h(
"aside",
{ className: "scroll-window-bezel", "aria-label": "Scroll Controller Window" },
h(
"div",
{ className: "scroll-window" },
h(
"header",
{ className: "window-bar mini-bar" },
h(
"span",
{ className: "dots", "aria-hidden": "true" },
h("i", null),
h("i", null)
),
h("span", null, "~/wheel"),
h("span", { className: "bar-right" }, ${scrollPercent}%)
),
h(
"div",
{ className: "wheel-body" },
h(
"button",
{
type: "button",
className: "wheel-btn",
onClick: () => handleScroll("up"),
title: "Scroll up (Q or Up Arrow)",
"aria-label": "Scroll up",
},
"▲ ",
h("kbd", null, "Q")
),
h(
"div",
{
className: "wheel-track",
onClick: handleTrackClick,
title: "Click anywhere on wheel track to jump",
},
h("div", { className: "wheel-ridges" }),
h("div", {
className: "wheel-thumb",
style: { top: ${Math.min(76, scrollPercent * 0.76)}% },
})
),
h(
"button",
{
type: "button",
className: "wheel-btn",
onClick: () => handleScroll("down"),
title: "Scroll down (E or Down Arrow)",
"aria-label": "Scroll down",
},
"▼ ",
h("kbd", null, "E")
)
)
)
)
),
h(
"nav",
{ className: "arch-taskbar", "aria-label": "Desktop Taskbar" },
h(
"button",
{
type: "button",
className: task-item ${!isMinimized ? "running" : ""},
onClick: () => setIsMinimized((prev) => !prev),
title: "Toggle Terminal Window",
},
h("span", { className: "task-icon" }, "\x3E"),
h("span", { className: "task-label" }, "Terminal")
),
taskbarApps.map((app) =>
h(
"a",
{
key: app.label,
className: "task-item",
href: app.href,
target: "_blank",
rel: "noreferrer",
title: app.label,
},
h("span", { className: "task-icon" }, app.icon),
h("span", { className: "task-label" }, app.label)
)
)
),
h("div", { className: "scanlines", "aria-hidden": "true" })
);
}
