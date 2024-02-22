import Header from './Header';
import { TextField } from '@mui/material';

export default function AddressSection({ address, changeHandlers }) {
  return (
    <>
      <Header text="Adres" level={6} />
      <TextField
        id="outlined-required-miasto"
        name="city"
        label="Miasto"
        value={address.city}
        style={{ marginRight: '40px' }}
        onChange={changeHandlers[0]}
      />
      <TextField
        id="outlined-required-ulica"
        name="street"
        label="Ulica"
        value={address.street}
        onChange={changeHandlers[1]}
      />
      <TextField
        id="outlined-required-kod-pocztowy"
        name="postalCode"
        label="Kod Pocztowy"
        value={address.postalCode}
        onChange={changeHandlers[2]}
      />
    </>
  );
}
