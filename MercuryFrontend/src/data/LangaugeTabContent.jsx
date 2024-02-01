import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { TextField } from '@mui/material';

const LanguageTabContent = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const euLanguages = [
    { code: 'en', name: t('english') },
    { code: 'pl', name: t('polski') },
    { code: 'de', name: t('Deutsch') },
    { code: 'fr', name: t('français') },
    { code: 'es', name: t('español') },
    { code: 'it', name: t('italiano') },
    { code: 'nl', name: t('Nederlands') },
    { code: 'pt', name: t('português') },
    { code: 'sv', name: t('svenska') },
    { code: 'da', name: t('dansk') },
    { code: 'fi', name: t('suomi') },
    { code: 'el', name: t('ελληνικά (elliniká)') },
    { code: 'bg', name: t('български') },
    { code: 'hr', name: t('hrvatski') },
    { code: 'cs', name: t('čeština') },
    { code: 'hu', name: t('magyar') },
    { code: 'ga', name: t('Gaeilge') },
    { code: 'lv', name: t('latviešu') },
    { code: 'lt', name: t('lietuvių') },
    { code: 'mt', name: t('Malti') },
    { code: 'ro', name: t('română') },
    { code: 'sk', name: t('slovenčina') },
    { code: 'sl', name: t('slovenščina') },
  ];

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const changeLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
    console.log(`Changed language to: ${i18n.language}`);
  };

  const filteredLanguages = euLanguages.filter(
    (language) =>
      language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      language.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>{t('language')}</h3>
      <TextField
        label={t('search')}
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px' }}>
        {filteredLanguages.map((language) => (
          <Button
            key={language.code}
            variant="light"
            className="language-button"
            onClick={() => changeLanguage(language.code)}
            style={{
              textAlign: 'center',
              marginBottom: '10px',
              width: 'calc(25% - 10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {language.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageTabContent;