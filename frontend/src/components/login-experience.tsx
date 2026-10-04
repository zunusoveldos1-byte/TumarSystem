"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LoginForm } from "@/components/login-form";
import type { Language } from "@/lib/marketing";

const text = {
  ru: { title: "Вход в систему", subtitle: "Войдите, чтобы начать рабочую смену.", image: "Бильярдный стол с зелёным сукном в вечернем свете" },
  ky: { title: "Системага кирүү", subtitle: "Иш сменасын баштоо үчүн кириңиз.", image: "Жашыл сукно менен бильярд столу" },
  en: { title: "Sign in", subtitle: "Sign in to start your shift.", image: "Billiard table with green cloth in evening light" },
};

export function LoginExperience() {
  const [lang, setLang] = useState<Language>("ru");
  useEffect(() => { const saved = localStorage.getItem("tumar-lang"); if (saved === "ru" || saved === "ky" || saved === "en") { const frame = requestAnimationFrame(() => setLang(saved)); return () => cancelAnimationFrame(frame); } }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const changeLanguage = (next: Language) => { setLang(next); localStorage.setItem("tumar-lang", next); };
  return <main className="login-layout"><section className="auth-panel" aria-labelledby="welcome-title"><div className="auth-content"><div className="login-languages">{(["ru", "ky", "en"] as Language[]).map(item => <button type="button" key={item} className={lang === item ? "selected" : ""} aria-pressed={lang === item} onClick={() => changeLanguage(item)}>{item.toUpperCase()}</button>)}</div><h1 id="welcome-title">{text[lang].title}</h1><p className="auth-subtitle">{text[lang].subtitle}</p><LoginForm lang={lang}/></div></section><section className="visual-panel" aria-label={text[lang].image}><Image src="/images/login-billiards-reference-hero.png" alt={text[lang].image} fill priority sizes="(max-width: 760px) 100vw, 53vw" className="billiards-image"/><div className="visual-shade"/></section></main>;
}
