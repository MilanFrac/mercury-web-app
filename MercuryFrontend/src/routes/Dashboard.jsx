import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import plLocale from 'date-fns/locale/pl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import VisibilityIcon from '@mui/icons-material/Visibility';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const initialRows = [
  { id: 1, firstName: 'Snow', lastName: 'Jon', phone: "123123123", email: "milan@gmail.com", city: "Gdańsk", street: "wyspianskiego 79", postalCode: "83-000", services: "montaż", description: "opis zdarzeń lorem ipsum jaja w ciul", date: "2001-01-20", time: "12:12", status: 'Pending' },
  { id: 2, firstName: 'Stark', lastName: 'Arya', phone: "456456456", email: "arya.stark@example.com", city: "Winterfell", street: "Main Street", postalCode: "W1N73RF3LL", services: "security", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date: "2024-02-01", time: "15:30", status: 'Completed' },
  { id: 3, firstName: 'Lannister', lastName: 'Tyrion', phone: "789789789", email: "tyrion.lannister@example.com", city: "King's Landing", street: "Lion's Roar", postalCode: "KL1234", services: "consultation", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date: "2024-03-05", time: "10:00", status: 'In Progress' },
  // ... other rows
];

const statuses = ['Pending', 'In Progress', 'Completed'];

const handleEdit = (row, setEditRow, setOpenModal) => {
  setEditRow({
    ...row,
    date: new Date(row.date),
    time: new Date(`1970-01-01T${row.time}:00`),
  });
  setOpenModal(true);
};

const handlePrint = (row) => {
  const printContent = `
    ID: ${row.id}
    First Name: ${row.firstName}
    Last Name: ${row.lastName}
    Phone: ${row.phone}
    Email: ${row.email}
    City: ${row.city}
    Street: ${row.street}
    Postal Code: ${row.postalCode}
    Services: ${row.services}
    Description: ${row.description}
    Date: ${new Date(row.date).toLocaleDateString()}
    Time: ${row.time}
    Status: ${row.status}
  `;
  const printWindow = window.open('', '', 'width=600,height=400');
  printWindow.document.write(`<pre>${printContent}</pre>`);
  printWindow.document.close();
  printWindow.print();
};

const handleView = (row, setViewRow, setOpenViewModal) => {
  setViewRow(row);
  setOpenViewModal(true);
};

const handleDeleteWithConfirmation = (id, rows, setRows) => {
  if (window.confirm('Are you sure you want to delete this record?')) {
    handleDelete(id, rows, setRows);
  }
};

const handleDelete = (id, rows, setRows) => {
  const newRows = rows.filter((row) => row.id !== id);
  setRows(newRows);
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [viewRow, setViewRow] = useState(null);
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState(initialRows);
  const [searchText, setSearchText] = useState('');

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditRow(null);
    setErrors({});
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setViewRow(null);
  };

  const handleSave = () => {
    const newErrors = {};

    if (!editRow.firstName) newErrors.firstName = 'First name is required';
    if (!editRow.lastName) newErrors.lastName = 'Last name is required';
    if (!editRow.phone) newErrors.phone = 'Phone number is required';
    if (!editRow.email) newErrors.email = 'Email is required';
    if (!editRow.city) newErrors.city = 'City is required';
    if (!editRow.street) newErrors.street = 'Street is required';
    if (!editRow.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!editRow.services) newErrors.services = 'Services are required';
    if (!editRow.description) newErrors.description = 'Description is required';
    if (!editRow.date) newErrors.date = 'Date is required';
    if (!editRow.time) newErrors.time = 'Time is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const updatedRows = rows.map((row) =>
        row.id === editRow.id ? {
          ...editRow,
          date: editRow.date.toISOString().split('T')[0],
          time: editRow.time.toTimeString().substring(0, 5),
        } : row
      );
      setRows(updatedRows);
      handleCloseModal();
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    const searchTerm = searchText.toLowerCase();
    return (
      row.firstName.toLowerCase().includes(searchTerm) ||
      row.lastName.toLowerCase().includes(searchTerm) ||
      row.city.toLowerCase().includes(searchTerm) ||
      row.phone.includes(searchTerm) ||
      row.email.toLowerCase().includes(searchTerm) ||
      row.street.toLowerCase().includes(searchTerm) ||
      row.postalCode.includes(searchTerm) ||
      row.services.toLowerCase().includes(searchTerm) ||
      row.description.toLowerCase().includes(searchTerm) ||
      row.status.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={handleSearchChange}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <Box sx={{ height: '70vh', width: '180%' }}>
          <DataGrid
            rows={filteredRows}
            columns={[
              { field: 'id', headerName: 'ID', width:40, flex: 0.1 },
              { field: 'firstName', headerName: 'First name', width: 150, flex: 0.8 },
              { field: 'lastName', headerName: 'Last name', width: 150, flex: 0.9 },
              { field: 'phone', headerName: 'Phone', width: 130, flex: 1 },
              { field: 'email', headerName: 'Email', width: 200, flex: 1.5 },
              { field: 'city', headerName: 'City', width: 120, flex: 0.7 },
              { field: 'street', headerName: 'Street', width: 150, flex: 1 },
              { field: 'postalCode', headerName: 'Postal Code', width: 100, flex: 0.7 },
              { field: 'services', headerName: 'Services', width: 150, flex: 0.8 },
              { field: 'description', headerName: 'Description', width: 200, flex: 2 },
              { field: 'date', headerName: 'Date', width: 110, flex: 0.7 },
              { field: 'time', headerName: 'Time', width: 100, flex: 0.5 },
              {
                field: 'status', headerName: 'Status', width: 120, flex: 1.2, renderCell: (params) => (
                  <Select
                    value={params.row.status}
                    onChange={(event) => {
                      const newStatus = event.target.value;
                      const updatedRows = rows.map((row) =>
                        row.id === params.row.id ? { ...row, status: newStatus } : row
                      );
                      setRows(updatedRows);
                    }}
                    fullWidth
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                ),
              },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 150,
                flex: 1.2,
                sortable: false,
                renderCell: (params) => (
                  <div>
                    <IconButton onClick={() => handleView(params.row, setViewRow, setOpenViewModal)} color="info">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(params.row, setEditRow, setOpenModal)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handlePrint(params.row)} color="secondary">
                      <PrintIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteWithConfirmation(params.row.id, rows, setRows)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ),
              },
            ]}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            disableSelectionOnClick
          />
        </Box>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{ ...style, width: 400 }}>
            <Typography variant="h6" component="h2">
              Edit Row
            </Typography>
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              value={editRow?.firstName || ''}
              onChange={(e) => setEditRow({ ...editRow, firstName: e.target.value })}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              value={editRow?.lastName || ''}
              onChange={(e) => setEditRow({ ...editRow, lastName: e.target.value })}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              value={editRow?.phone || ''}
              onChange={(e) => setEditRow({ ...editRow, phone: e.target.value })}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={editRow?.email || ''}
              onChange={(e) => setEditRow({ ...editRow, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="City"
              margin="normal"
              value={editRow?.city || ''}
              onChange={(e) => setEditRow({ ...editRow, city: e.target.value })}
              error={!!errors.city}
              helperText={errors.city}
            />
            <TextField
              fullWidth
              label="Street"
              margin="normal"
              value={editRow?.street || ''}
              onChange={(e) => setEditRow({ ...editRow, street: e.target.value })}
              error={!!errors.street}
              helperText={errors.street}
            />
            <TextField
              fullWidth
              label="Postal Code"
              margin="normal"
              value={editRow?.postalCode || ''}
              onChange={(e) => setEditRow({ ...editRow, postalCode: e.target.value })}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
            />
            <TextField
              fullWidth
              label="Services"
              margin="normal"
              value={editRow?.services || ''}
              onChange={(e) => setEditRow({ ...editRow, services: e.target.value })}
              error={!!errors.services}
              helperText={errors.services}
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              value={editRow?.description || ''}
              onChange={(e) => setEditRow({ ...editRow, description: e.target.value })}
              error={!!errors.description}
              helperText={errors.description}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
              <DatePicker
                label="Date"
                value={editRow?.date || null}
                onChange={(newValue) => setEditRow({ ...editRow, date: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" error={!!errors.date} helperText={errors.date} />}
              />
              <TimePicker
                label="Time"
                value={editRow?.time || null}
                onChange={(newValue) => setEditRow({ ...editRow, time: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" error={!!errors.time} helperText={errors.time} />}
              />
            </LocalizationProvider>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleSave} variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal open={openViewModal} onClose={handleCloseViewModal}>
          <Box sx={{ ...style, width: 400 }}>
            <Typography variant="h6" component="h2">
              View Row
            </Typography>
            <Typography variant="body1" gutterBottom>
              First Name: {viewRow?.firstName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Last Name: {viewRow?.lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Phone: {viewRow?.phone}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {viewRow?.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              City: {viewRow?.city}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Street: {viewRow?.street}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Postal Code: {viewRow?.postalCode}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Services: {viewRow?.services}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Description: {viewRow?.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Date: {new Date(viewRow?.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Time: {viewRow?.time}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Status: {viewRow?.status}
            </Typography>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
