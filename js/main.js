// main.js

document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll(".language-switch button");
  const navButtons = document.querySelectorAll(".nav-links button");
  const mainContent = document.getElementById("main-content");

  function setActive(buttons, target) {
    buttons.forEach(btn => btn.classList.remove("active"));
    target.classList.add("active");
  }

  function loadPage(page) {
   fetch(`${currentLang}/${page}.html`)
  .then(res => res.ok ? res.text() : Promise.reject("Page load error"))
  .then(html => {
    mainContent.innerHTML = html;
    mainContent.focus();
  })
  .catch(() => {
    mainContent.innerHTML = "<p>Nie udało się załadować strony w tym języku.</p>";
  });
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      setActive(navButtons, btn);
      const page = btn.dataset.page;
      loadPage(page);
    });
  });

  langButtons.forEach(btn => {
  btn.addEventListener("click", async () => {
    setActive(langButtons, btn);
    const lang = btn.dataset.lang;

    await setLanguage(lang); // teraz czekamy na zakończenie ładowania tłumaczeń

    const activePage = document.querySelector(".nav-links button.active")?.dataset.page || "about";
    loadPage(activePage); // ładowanie po zmianie języka
  });
});



 // Domyślne ładowanie strony
document.querySelector('[data-page="about"]').click();

// Ustaw język i zaznacz aktywny przycisk
setLanguage("en");

const defaultLangButton = document.querySelector('[data-lang="en"]');
if (defaultLangButton) {
  setActive(document.querySelectorAll('.language-switch button'), defaultLangButton);
}
});
