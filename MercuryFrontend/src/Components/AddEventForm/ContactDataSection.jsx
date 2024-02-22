import Header from './Header';
import { TextField } from '@mui/material';

export default function ContactDataSection({ customer, changeHandlers }) {
  return (
    <>
      <Header text="Dane Kontaktowe" level={6} />
      <TextField
        id="outlined-required-numer-telefonu"
        name="phone"
        label="Numer* Telefonu"
        value={customer.phone}
        style={{ marginRight: '40px' }}
        onChange={changeHandlers[0]}
      />
      <TextField
        id="outlined-required-adres-mailowy"
        name="email"
        label="Adres Mailowy"
        value={customer.email}
        onChange={changeHandlers[1]}
      />
    </>
  );
}
