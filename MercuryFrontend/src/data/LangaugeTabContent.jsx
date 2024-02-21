import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { TextField } from '@mui/material';

const LanguageTabContent = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const euLanguages = [
    { code: 'en', name: 'english' },
    { code: 'pl', name: 'polski' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'français' },
    { code: 'es', name: 'español' },
    { code: 'it', name: 'italiano' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'pt', name: 'português' },
    { code: 'sv', name: 'svenska' },
    { code: 'da', name: 'dansk' },
    { code: 'fi', name: 'suomi' },
    { code: 'el', name: 'ελληνικά (elliniká)' },
    { code: 'bg', name: 'български' },
    { code: 'hr', name: 'hrvatski' },
    { code: 'cs', name: 'čeština' },
    { code: 'hu', name: 'magyar' },
    { code: 'ga', name: 'Gaeilge' },
    { code: 'lv', name: 'latviešu' },
    { code: 'lt', name: 'lietuvių' },
    { code: 'mt', name: 'Malti' },
    { code: 'ro', name: 'română' },
    { code: 'sk', name: 'slovenčina' },
    { code: 'sl', name: 'slovenščina' },
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
      t(language.name.toLowerCase()).includes(searchTerm.toLowerCase()) ||
      t(language.code.toLowerCase()).includes(searchTerm.toLowerCase())
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
              aspectRatio: '1 / 1',
              width: 'calc(25% - 10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {t(language.name)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageTabContent;
