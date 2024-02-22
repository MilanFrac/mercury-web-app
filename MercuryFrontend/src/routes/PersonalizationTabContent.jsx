import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function PersonalizationTabContent() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    // Dodaj kod do zmiany klasy na cały korzeń aplikacji lub odpowiednich komponentów
    // Przykład użycia klasy na całej stronie:
    const rootElement = document.documentElement;
    rootElement.classList.toggle('dark-mode', darkMode);
  };

  return (
    <div>
      <h3>{t('customization')}</h3>
      <div>
        <label htmlFor="darkModeToggle">{t('darkMode')}</label>
        <input type="checkbox" id="darkModeToggle" checked={darkMode} onChange={toggleDarkMode} />
      </div>
    </div>
  );
}

export default PersonalizationTabContent;
