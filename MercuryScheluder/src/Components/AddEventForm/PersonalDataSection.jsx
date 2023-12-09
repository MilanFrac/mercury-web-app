import Header from "./Header";
import { TextField } from "@mui/material";

export default function PersonalDataSection({ customer, changeHandlers }) {
    return (
        <>
            <Header text="Dane Personalne" level={6} />
            <TextField
                id="outlined-required-imie"
                name="firstName"
                label="Imie"
                value={ customer.firstName }
                style={{ marginRight:'40px'}}
                onChange={ changeHandlers[0] }
            />
            <TextField
                id="outlined-required-nazwisko"
                name="lastName"
                label="Nazwisko"
                value={ customer.lastName }
                onChange={ changeHandlers[1] }
            />
        </>
    );
}