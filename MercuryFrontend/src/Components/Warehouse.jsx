import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Modal, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add as AddIcon, Edit as EditIcon, Print as PrintIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const Warehouse = () => {
  const [rows, setRows] = useState([
    { id: 1, firstName: 'Jan', lastName: 'Kowalski', phone: '123456789', email: 'jan.kowalski@example.com', city: 'Warsaw', street: 'Main St', postalCode: '00-001', services: 'Consulting', product: '' }
  ]);

  const [editRow, setEditRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [productDetails, setProductDetails] = useState({ name: '', barcode: '', height: '', width: '' });

  const handleEdit = (row) => {
    setEditRow(row);
    setOpenModal(true);
  };

  const handlePrint = (row) => {
  };

  const handleDeleteWithConfirmation = (id) => {
  };

  const handleAddProduct = (row) => {
    setEditRow(row);
    setOpenAddProductModal(true);
  
  if (!productDetails.name) newErrors.name = 'Product name is required';
  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    const updatedRows = rows.map(row =>
      row.id === editRow.id
        ? { ...row, product: productDetails.name }
        : row
    );

    setRows(updatedRows);
    setOpenAddProductModal(false);
  }
};

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditRow(null);
  };

  const handleCloseAddProductModal = () => {
    setOpenAddProductModal(false);
    setEditRow(null);
  };

  const handleSave = () => {
  };

  const handleAddSave = () => {
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: 600, width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Warehouse
        </Typography>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={[
              { field: 'firstName', headerName: 'First Name', width: 150 },
              { field: 'lastName', headerName: 'Last Name', width: 150 },
              { field: 'phone', headerName: 'Phone', width: 150 },
              { field: 'email', headerName: 'Email', width: 200 },
              { field: 'city', headerName: 'City', width: 150 },
              { field: 'street', headerName: 'Street', width: 150 },
              { field: 'postalCode', headerName: 'Postal Code', width: 150 },
              { field: 'services', headerName: 'Services', width: 150 },
              {
                field: 'product',
                headerName: 'Product',
                width: 150,
                renderCell: (params) => (
                  <IconButton onClick={() => handleAddProduct(params.row)}><AddIcon /></IconButton>
                ),
              },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 150,
                renderCell: (params) => (
                  <Box>
                    <IconButton onClick={() => handleEdit(params.row)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handlePrint(params.row)}><PrintIcon /></IconButton>
                    <IconButton onClick={() => handleDeleteWithConfirmation(params.row.id)}><DeleteIcon /></IconButton>
                  </Box>
                ),
              },
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
            <Typography variant="h6" component="h2">
              Edit Row
            </Typography>
            <TextField
              label="First Name"
              value={editRow?.firstName || ''}
              onChange={(e) => setEditRow({ ...editRow, firstName: e.target.value })}
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              label="Last Name"
              value={editRow?.lastName || ''}
              onChange={(e) => setEditRow({ ...editRow, lastName: e.target.value })}
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal open={openAddProductModal} onClose={handleCloseAddProductModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
            <Typography variant="h6" component="h2">
              Add New Product
            </Typography>
            <TextField
              label="Product Name"
              value={productDetails.name}
              onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleCloseAddProductModal} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleAddSave}>
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}

export default Warehouse;