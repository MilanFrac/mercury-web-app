import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LanguageTabContent from '../data/LangaugeTabContent';
import i18n from '../data/i18n';
import PersonalizationTabContent from './PersonalizationTabContent';
import AccountTabContent from './AccountTabContent';
import PropTypes from 'prop-types';

export default function Settings({ showModal, handleModalClose }) {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
}

Settings.propTypes = {
  showModal: PropTypes.bool,
  handleModalClose: PropTypes.func
};
