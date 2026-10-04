"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BriefcaseBusiness, CalendarClock, ChartNoAxesColumnIncreasing, CircuitBoard, Globe2, Laptop, Lightbulb, ListChecks, Menu, Settings, ShieldCheck, Smartphone, Users, Wallet, X, CircleUserRound } from "lucide-react";
import { homeContent } from "@/lib/home-content";
import type { Language } from "@/lib/marketing";
import "@/app/reference-home.css";

function Mark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 30A18 18 0 0 1 31 7M40 18A18 18 0 0 1 17 41" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="m5 43 38-38" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="24" cy="24" r="5.5" fill="currentColor"/></svg>;
}

export function ReferenceHeader({ lang, onLanguage }: { lang: Language; onLanguage: (language: Language) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = homeContent[lang];
  useEffect(() => { const update = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", update); return () => window.removeEventListener("scroll", update); }, []);
  const routes = ["/", "/features", "/pricing", "/contact"];
  return <header className={`reference-header ${scrolled ? "is-scrolled" : ""}`}><div className="reference-header-inner">
    <Link href="/" className="reference-brand" aria-label="TumarSystem"><Mark/><span>Tumar<span>System</span></span></Link>
    <nav className={`reference-nav ${open ? "is-open" : ""}`} aria-label={t.navigation[0]}>{t.navigation.map((label, index) => <Link key={label} href={routes[index]} className={index === 0 ? "is-active" : ""} aria-current={index === 0 ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="reference-mobile-login" href="/login" onClick={() => setOpen(false)}>{t.login}</Link></nav>
    <div className="reference-header-actions"><span className="reference-online"><i/>{t.online}</span><div className="reference-languages" aria-label="Language">{(["ky", "ru", "en"] as Language[]).map(language => <button key={language} type="button" aria-pressed={lang === language} className={lang === language ? "is-active" : ""} onClick={() => onLanguage(language)}>{language === "ky" ? "KG" : language.toUpperCase()}</button>)}</div><Link className="reference-login" href="/login">{t.login}<ArrowRight size={18}/></Link><button type="button" className="reference-menu" aria-expanded={open} aria-label={t.navigation[0]} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div>
  </div></header>;
}

function RevenueChart({ lang }: { lang: Language }) {
  const t = homeContent[lang];
  return <svg className="reference-revenue-chart" viewBox="0 0 310 225" role="img" aria-label={t.weekly}><defs><linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#00efae" stopOpacity=".35"/><stop offset="1" stopColor="#00efae" stopOpacity=".02"/></linearGradient></defs>{[28,68,108,148,188].map((y, i) => <g key={y}><line x1="53" y1={y} x2="300" y2={y} stroke="#153229" strokeWidth=".6"/><text x="42" y={y+4} textAnchor="end" fill="#c9d3d0" fontSize="10">{["120 000","90 000","60 000","30 000","0"][i]}</text></g>)}{[53,90,127,164,201,238,275,300].map(x=><line key={x} x1={x} y1="25" x2={x} y2="188" stroke="#153229" strokeWidth=".6"/>)}<path d="M53 138 C67 128 77 101 90 104 S111 102 127 108 S150 73 164 78 S184 83 201 74 S224 31 238 39 S261 77 275 74 S292 74 300 70 L300 188 L53 188Z" fill="url(#revenue-fill)"/><path d="M53 138 C67 128 77 101 90 104 S111 102 127 108 S150 73 164 78 S184 83 201 74 S224 31 238 39 S261 77 275 74 S292 74 300 70" fill="none" stroke="#00efae" strokeWidth="1.6"/>{[[53,138],[90,104],[127,108],[164,78],[201,74],[238,39],[275,74],[300,70]].map(([x,y])=><circle key={x} cx={x} cy={y} r="3.2" fill="#00efae"/>)}{t.weekdays.map((day,i)=><text key={day} x={53+i*39} y="211" textAnchor="middle" fill="#c9d3d0" fontSize="10">{day}</text>)}</svg>;
}

function Dashboard({ lang }: { lang: Language }) {
  const t = homeContent[lang];
  const sidebarIcons = [Wallet, CalendarClock, BriefcaseBusiness, Users, ShieldCheck, Settings];
  return <div className="reference-dashboard" aria-label={`${t.analytics} · ${t.sample}`}><aside className="reference-dashboard-sidebar"><Mark className="reference-dashboard-mark"/><div>{t.sidebar.map((label,i)=>{const Icon=sidebarIcons[i];return <span className={i===0?"selected":""} key={label}><Icon size={17} strokeWidth={1.7}/>{label}</span>})}</div></aside><div className="reference-dashboard-main"><div className="reference-dashboard-top"><span>03.10.2026&nbsp;&nbsp; 18:42</span><CircleUserRound size={19}/><span>{t.operator}<small>admin</small></span></div><div className="reference-dashboard-content"><div className="reference-dashboard-title"><span>{t.sidebar[0]}</span><strong>{t.sale}</strong></div><div className="reference-stat-grid">{["24 800 ₸","8","3 100 ₸"].map((value,i)=><div className="reference-stat" key={value}><span>{t.metrics[i]}</span><strong>{value}</strong><small>↑ { [12,2,6][i] }%</small></div>)}</div><h2>{t.analytics}</h2><div className="reference-chart-grid"><div className="reference-chart-panel reference-revenue-panel"><h3>{t.weekly}</h3><RevenueChart lang={lang}/></div><div className="reference-chart-side"><div className="reference-chart-panel reference-attendance-panel"><h3>{t.attendance}</h3><div className="reference-bars"><div className="reference-bar-axis"><span>60</span><span>40</span><span>20</span><span>0</span></div>{[26,34,44,30,50,68,36].map((height,i)=><div className="reference-bar-column" key={i}><div style={{height:`${height}%`}}/><span>{t.weekdays[i]}</span></div>)}</div></div><div className="reference-chart-panel reference-occupancy-panel"><h3>{t.occupancy}</h3><div><div className="reference-donut"><span>68%</span></div><ul>{t.legend.map((label,i)=><li key={label}><i/>{label}<strong>{[6,3,9][i]}</strong></li>)}</ul></div></div></div></div></div></div></div>;
}

export function ReferenceHero({ lang }: { lang: Language }) {
  const t = homeContent[lang];
  return <section className="reference-hero"><div className="reference-photo" aria-hidden="true"/><div className="reference-photo-detail" aria-hidden="true"/><div className="reference-sweep" aria-hidden="true"/><div className="reference-hero-inner"><div className="reference-hero-copy"><h1><span>TumarSystem —</span>{t.heading.map(line=><span key={line}>{line}</span>)}</h1><p>{t.description.map(line=><span key={line}>{line}</span>)}</p><Link className="reference-start" href="/register">{t.start}<ArrowRight size={21}/></Link></div><div className="reference-dashboard-wrap"><Dashboard lang={lang}/><span className="reference-demo-label">{t.sample}</span></div><div className="reference-platforms">{t.platforms.map(([title,description],i)=><Link key={title} href={i===3?"/smart":"/features"}><div className="reference-platform-icon">{i===0?<><Smartphone/><ListChecks className="phone-list"/></>:i===1?<><div className="platform-browser"><i/><i/><i/></div><Globe2 className="browser-globe"/></>:i===2?<><Laptop/><ChartNoAxesColumnIncreasing className="laptop-chart"/></>:<><CircuitBoard/><Lightbulb className="board-light"/></>}</div><strong>{title}</strong><span>{description}</span></Link>)}</div></div></section>;
}
