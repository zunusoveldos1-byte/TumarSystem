import type { Language } from "./marketing";

export const homeContent: Record<Language, {
  navigation: string[]; online: string; login: string; heading: string[]; description: string[]; start: string;
  platforms: string[][]; sidebar: string[]; sale: string; metrics: string[]; analytics: string; weekly: string;
  attendance: string; occupancy: string; legend: string[]; weekdays: string[]; operator: string; sample: string;
}> = {
  ru: {
    navigation: ["Главная", "Возможности", "Цены", "Контакты"], online: "Система онлайн", login: "Войти",
    heading: ["умная система", "для бильярдных клубов"], description: ["Касса, смены, клуб и CRM — всё в одном.", "Работает на телефоне, планшете, ноутбуке и Arduino."], start: "Начать",
    platforms: [["Телефон", "Управление с телефона"], ["Сайт", "Доступ через браузер"], ["Ноутбук", "Касса и аналитика"], ["Arduino", "Управление светом"]],
    sidebar: ["Касса", "Смена", "Клуб", "Клиенты", "CRM", "Настройки"], sale: "Продажа", metrics: ["Сумма", "Посетители", "Средний чек"],
    analytics: "Аналитика", weekly: "Выручка за неделю", attendance: "Посещаемость", occupancy: "Загрузка клуба",
    legend: ["Заняты", "Свободны", "Всего"], weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"], operator: "Оператор", sample: "Демонстрационные данные",
  },
  ky: {
    navigation: ["Башкы бет", "Мүмкүнчүлүктөр", "Баалар", "Байланыш"], online: "Система онлайн", login: "Кирүү",
    heading: ["акылдуу система", "бильярд клубдары үчүн"], description: ["Касса, сменалар, клуб жана CRM — бир жерде.", "Телефон, планшет, ноутбук жана Arduino менен иштейт."], start: "Баштоо",
    platforms: [["Телефон", "Телефондон башкаруу"], ["Сайт", "Браузер аркылуу кирүү"], ["Ноутбук", "Касса жана аналитика"], ["Arduino", "Жарыкты башкаруу"]],
    sidebar: ["Касса", "Смена", "Клуб", "Кардарлар", "CRM", "Жөндөөлөр"], sale: "Сатуу", metrics: ["Сумма", "Коноктор", "Орточо чек"],
    analytics: "Аналитика", weekly: "Апталык киреше", attendance: "Келүүлөр", occupancy: "Клубдун жүктөлүшү",
    legend: ["Бош эмес", "Бош", "Бардыгы"], weekdays: ["Дш", "Шш", "Шр", "Бш", "Жм", "Иш", "Жш"], operator: "Оператор", sample: "Мисал маалыматтар",
  },
  en: {
    navigation: ["Home", "Features", "Pricing", "Contact"], online: "System online", login: "Sign in",
    heading: ["a smart system", "for billiard clubs"], description: ["Payments, shifts, club and CRM — all in one.", "Works on phones, tablets, laptops and with Arduino."], start: "Get started",
    platforms: [["Phone", "Manage from your phone"], ["Website", "Access in your browser"], ["Laptop", "Payments and analytics"], ["Arduino", "Lighting control"]],
    sidebar: ["Payments", "Shift", "Club", "Guests", "CRM", "Settings"], sale: "Sales", metrics: ["Total", "Visitors", "Average bill"],
    analytics: "Analytics", weekly: "Weekly revenue", attendance: "Attendance", occupancy: "Club occupancy",
    legend: ["Occupied", "Available", "Total"], weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"], operator: "Operator", sample: "Sample data",
  },
};
