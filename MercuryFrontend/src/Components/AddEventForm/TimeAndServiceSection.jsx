import Header from "./Header";
import { TextField, Autocomplete } from "@mui/material";
import { LocalizationProvider, TimePicker, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function TimeAndServiceSection({ date, selectedServices, services, changeHandlers }) {
    const renderInput = (params) => (<TextField {...params} label="Usługa" placeholder="Usługa" />);

    return (
        <>
            <Header text="Czas" level={6} />
            <LocalizationProvider dateAdapter={AdapterDayjs}> 
                <TimePicker 
                    id="time" 
                    name="time" 
                    label="Godzina"
                    inputFormat="hh:mm a"
                    value={date}
                    onChange={ (newValue) => changeHandlers[0]({target : { name: "time", value: newValue }})}
                />
                <DatePicker
                    id="date" 
                    label="Dzień"
                    name="date"
                    inputFormat="dd/MM/yyyy" 
                    firstDayOfWeek={1}
                    value={date}
                    onChange={ (newValue) => changeHandlers[0]({target : { name: "date", value: newValue }})}
                />
            </LocalizationProvider>
            <Header text="Rodzaj Usługi" level={6} />
            <Autocomplete
                multiple
                size='small'
                limitTags={2}
                id="multiple-limit-tags"
                name="servicesPicker"
                options={services}
                value={ selectedServices }
                onChange={ (event, newValue) => changeHandlers[1](newValue) }
                getOptionLabel={(option) => option.title}
                renderInput={renderInput}
            />        
        </>
    );
}