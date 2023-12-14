import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import Header from './Header';
import PersonalDataSection from './PersonalDataSection';
import ContactDataSection from './ContactDataSection';
import AddressSection from './AddressSection';
import TimeAndServiceSection from './TimeAndServiceSection';
import dayjs from 'dayjs';
import { useImmer } from "use-immer";

export default function AddEventForm({ availableServices }) {

    const [appointment, updateAppointment] = useImmer({
        customer: {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        },
        address: {
            city: '',
            street: '',
            postalCode: ''
        },
        date: dayjs(),
        selectedServices: []
    });

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append("dateTime", appointment.date );

        formData.append("services", JSON.stringify( appointment.selectedServices ) );
        const jsonData = JSON.stringify( Object.fromEntries(formData) );
        console.log(jsonData);
        alert("submitted by box 2: \n" + jsonData);
    };

    const handleFirstNameChange = (name) => updateAppointment(draft => { draft.customer.firstName = name.target.value; });
    const handleLastNameChange = (name) => updateAppointment(draft => { draft.customer.lastName = name.target.value; });
    const handlePhoneChange = (phone) => updateAppointment(draft => { draft.customer.phone = phone.target.value; });
    const handleEmailChange = (email) => updateAppointment(draft => { draft.customer.email = email.target.value; });
    const handleCityChange = (city) => updateAppointment(draft => { draft.address.city = city.target.value; });
    const handleStreetChange = (street) => updateAppointment(draft => { draft.address.street = street.target.value; });
    const handlePostalCodeChange = (postalCode) => updateAppointment(draft => { draft.address.postalCode = postalCode.target.value; });
    const handleDateChange = (date) => updateAppointment(draft => { draft.date = date.target.value; });
    const handleServicesChange = (services) => updateAppointment(draft => { draft.selectedServices = services; });

    return (
        <>
            <Box
                component="form"
                sx={{'& .MuiTextField-root': { m: 1, width: '40ch' },}}
                noValidate
                autoComplete="off"
                onSubmit={submit}
            >
                <Header text="Utwórz zdarzenie" level={1} />
                <PersonalDataSection 
                    changeHandlers={[handleFirstNameChange, handleLastNameChange]} 
                    customer={ appointment.customer } />
                <ContactDataSection 
                    changeHandlers={[handlePhoneChange, handleEmailChange]} 
                    customer={ appointment.customer } />
                <AddressSection 
                    changeHandlers={[handleCityChange, handleStreetChange, handlePostalCodeChange]} 
                    address={ appointment.address } />
                <TimeAndServiceSection 
                    changeHandlers={[handleDateChange, handleServicesChange]} 
                    date={ appointment.date }
                    selectedServices={ appointment.selectedServices } 
                    services={ availableServices } />          
                <Button name='cancelButton' variant="warning" style={{ marginRight: '60px' }}>
                    Anuluj
                </Button>
                <Button name="submitButton" type="submit" variant="success">Zatwierdź</Button>        
            </Box>            
        </>
    );
}