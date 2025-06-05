let currentLang = 'en';
let translations = {};

async function loadLanguage(lang) {
  const response = await fetch(`./locales/${lang}.json`);
  translations = await response.json();
  currentLang = lang;
  updateTexts();
}

function updateTexts() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}

async function setLanguage(lang) {
  await loadLanguage(lang);
}

