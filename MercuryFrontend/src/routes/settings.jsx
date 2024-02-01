import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import i18n from '../data/i18n';
import LanguageTabContent from '../data/LangaugeTabContent';
import PersonalizationTabContent from './Personalization';
const Settings = ({ showModal, handleModalClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);

    // Otwieranie modalu po naciśnięciu zakładki "Customization" (1)
    if (newValue === 1) {
      handleModalOpen();
    }
  };

  const handleModalOpen = () => {
    // Otwieranie modalu
    // Tutaj możesz umieścić kod, który otwiera modal
  };

  return (
    <Modal show={showModal} onHide={handleModalClose} dialogClassName={{ maxWidth: '70vw' }}>
      <Modal.Header closeButton>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label={i18n.t('language')} />
          <Tab label={i18n.t('customization')} />
          <Tab label={i18n.t('account')} />
        </Tabs>
      </Modal.Header>
      <Modal.Body>
        {activeTab === 0 && <LanguageTabContent />}
        {activeTab === 1 && <PersonalizationTabContent />}
        {activeTab === 2 && <AccountTabContent />}
      </Modal.Body>
    </Modal>
  );
};

export default Settings;
