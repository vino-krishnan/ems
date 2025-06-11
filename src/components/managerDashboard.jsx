// src/components/ManagerDashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee, updateEmployee, addEmployee } from '../actions/manager';
import {
    CircularProgress,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    MenuItem,
    Menu,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Container
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

const ManagerDashboard = () => {
    const dispatch = useDispatch();
    const { employees, error } = useSelector((state) => state.manager);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [updatedEmployee, setUpdatedEmployee] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        location: '',
        blood_group: '',
        gender: '',
        date_of_joining: '',
        id: ''
    });
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        location: '',
        blood_group: '',
        gender: '',
        date_of_joining: '',
    });
    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const empDetails = employees?.employees || [];

    if (error) return <Typography color="error">Error: {error}</Typography>;
    if (!empDetails.length) return <CircularProgress />;
    const handleDelete = () => {
        console.log("Delete", selectedEmployee);
        dispatch(deleteEmployee(selectedEmployee.user_id))
        handleMenuClose();
        window.location.reload();

    };
    const handleMenuClick = (event, employee) => {
        setAnchorEl(event.currentTarget);
        setSelectedEmployee(employee);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedEmployee(null);
    };

    const handleUpdate = () => {
        console.log("Update", selectedEmployee);
        // handleMenuClose();
        if (selectedEmployee.date_of_joining) {
            selectedEmployee.date_of_joining = selectedEmployee.date_of_joining.split('T')[0];
        }
        setUpdatedEmployee(selectedEmployee);
        setOpenUpdateDialog(true);
        handleMenuClose();

    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEmployee((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateSubmit = () => {
        const emId = updatedEmployee.user_id;
        dispatch(updateEmployee(emId, updatedEmployee))
            .then(() => {
                setOpenUpdateDialog(false);
                dispatch(fetchEmployees());
            });
    };


    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSubmit = () => {
        dispatch(addEmployee(newEmployee)).then(() => {
            setOpenAddDialog(false);
            setNewEmployee({
                full_name: '',
                email: '',
                phone_number: '',
                location: '',
                blood_group: '',
                gender: '',
                date_of_joining: '',
                // user_id: ''
            });
            dispatch(fetchEmployees());
        });
    };
    return (
        //   <Container maxWidth="lg" sx={{ py: 4 ,background: 'linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%)',}}>
        <Container
            maxWidth={false}
            disableGutters
            sx={{ minHeight: '100vh', width: '100%', py: 4, px: 3, background: 'linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%)' }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">My Employees</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{ background: 'linear-gradient(135deg, rgb(45, 47, 58) 0%, #3f51b5 100%)', }}

                    onClick={() => setOpenAddDialog(true)}
                >
                    Add Employee
                </Button>
            </Box>

            <Paper elevation={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Blood Group</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Date of Joining</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {empDetails.map((emp) => (
                                <TableRow key={emp.user_id} hover>
                                    <TableCell>{emp.user_id}</TableCell>
                                    <TableCell>{emp.full_name}</TableCell>
                                    <TableCell>{emp.email}</TableCell>
                                    <TableCell>{emp.phone_number}</TableCell>
                                    <TableCell>{emp.location}</TableCell>
                                    <TableCell>{emp.blood_group}</TableCell>
                                    <TableCell>{emp.gender}</TableCell>
                                    <TableCell>{emp.date_of_joining}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={(e) => handleMenuClick(e, emp)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleUpdate}>Update</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>

            {/* Update Dialog */}
            <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle>Update Employee</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="full_name"
                        label="Full Name"
                        type="text"
                        fullWidth
                        value={updatedEmployee.full_name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={updatedEmployee.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="phone_number"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        value={updatedEmployee.phone_number}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="location"
                        label="Location"
                        type="text"
                        fullWidth
                        value={updatedEmployee.location}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="blood_group"
                        label="Blood Group"
                        type="text"
                        fullWidth
                        value={updatedEmployee.blood_group}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="gender"
                        label="Gender"
                        type="text"
                        fullWidth
                        value={updatedEmployee.gender}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="date_of_joining"
                        label="Date of Joining"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={updatedEmployee.date_of_joining}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenUpdateDialog(false)}>Cancel</Button>
                    <Button onClick={handleUpdateSubmit} variant="contained" color="primary">Update</Button>
                </DialogActions>
            </Dialog>

            {/* Add Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="user_id"
                        label="User ID"
                        type="text"
                        fullWidth
                        value={newEmployee.user_id}
                        onChange={handleAddInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="full_name"
                        label="Full Name"
                        type="text"
                        fullWidth
                        value={newEmployee.full_name}
                        onChange={handleAddInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={newEmployee.email}
                        onChange={handleAddInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="phone_number"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        value={newEmployee.phone_number}
                        onChange={handleAddInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="location"
                        label="Location"
                        type="text"
                        fullWidth
                        value={newEmployee.location}
                        onChange={handleAddInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="blood_group"
                        label="Blood Group"
                        type="text"
                        fullWidth
                        value={newEmployee.blood_group}
                        onChange={handleAddInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="gender"
                        label="Gender"
                        type="text"
                        fullWidth
                        value={newEmployee.gender}
                        onChange={handleAddInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="date_of_joining"
                        label="Date of Joining"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={newEmployee.date_of_joining}
                        onChange={handleAddInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddSubmit} variant="contained" color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );

    // return (
    //     <div style={{ padding: '20px' }}>
    //         <Typography variant="h4" gutterBottom>My Employees</Typography>
    //         <Button
    //             variant="contained"
    //             color="primary"
    //             startIcon={<AddIcon />}
    //             onClick={() => setOpenAddDialog(true)}
    //             style={{ marginBottom: '20px' }}
    //         >
    //             Add Employee
    //         </Button>
    //         <TableContainer component={Paper}>
    //             <Table>
    //                 <TableHead>
    //                     <TableRow>
    //                         <TableCell><strong>ID</strong></TableCell>
    //                         <TableCell><strong>Full Name</strong></TableCell>
    //                         <TableCell><strong>Email</strong></TableCell>
    //                         <TableCell><strong>Phone Number</strong></TableCell>

    //                         <TableCell><strong>Location</strong></TableCell>
    //                         <TableCell><strong>Blood Group</strong></TableCell>
    //                         <TableCell><strong>Gender</strong></TableCell>
    //                         <TableCell><strong>Date of joining</strong></TableCell>
    //                         <TableCell><strong>Action</strong></TableCell>
    //                     </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                     {empDetails.map((emp) => (
    //                         <TableRow key={emp.id}>
    //                             <TableCell>{emp.user_id}</TableCell>
    //                             <TableCell>{emp.full_name}</TableCell>
    //                             <TableCell>{emp.email}</TableCell>
    //                             <TableCell>{emp.phone_number}</TableCell>

    //                             <TableCell>{emp.location}</TableCell>
    //                             <TableCell>{emp.blood_group}</TableCell>
    //                             <TableCell>{emp.gender}</TableCell>
    //                             <TableCell>{emp.date_of_joining}</TableCell>
    //                             <TableCell>
    //                                 <IconButton onClick={(e) => handleMenuClick(e, emp)}>
    //                                     <MoreVertIcon />
    //                                 </IconButton>
    //                             </TableCell>
    //                         </TableRow>
    //                     ))}
    //                 </TableBody>
    //             </Table>
    //             <Menu
    //                 anchorEl={anchorEl}
    //                 open={Boolean(anchorEl)}
    //                 onClose={handleMenuClose}
    //             >
    //                 <MenuItem onClick={handleUpdate}>Update</MenuItem>
    //                 <MenuItem onClick={handleDelete}>Delete</MenuItem>
    //             </Menu>
    //         </TableContainer>

    //         {/* update  */}
    //         <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} fullWidth maxWidth="sm">
    //             <DialogTitle>Update Employee</DialogTitle>
    //             <DialogContent>
    //                 <TextField
    //                     margin="dense"
    //                     label="Full Name"
    //                     name="full_name"
    //                     value={updatedEmployee.full_name}
    //                     onChange={handleInputChange}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     label="Email"
    //                     name="email"
    //                     value={updatedEmployee.email}
    //                     onChange={handleInputChange}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     label="Phone Number"
    //                     name="phone_number"
    //                     value={updatedEmployee.phone_number}
    //                     onChange={handleInputChange}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     label="Location"
    //                     name="location"
    //                     value={updatedEmployee.location}
    //                     onChange={handleInputChange}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     label="Blood Group"
    //                     name="blood_group"
    //                     value={updatedEmployee.blood_group}
    //                     onChange={handleInputChange}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     label="Gender"
    //                     name="gender"
    //                     value={updatedEmployee.gender}
    //                     onChange={handleInputChange}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     label="Date of Joining"
    //                     name="date_of_joining"
    //                     type="date"
    //                     value={updatedEmployee.date_of_joining}
    //                     onChange={handleInputChange}
    //                     fullWidth
    //                     InputLabelProps={{
    //                         shrink: true,
    //                     }}
    //                 />
    //             </DialogContent>
    //             <DialogActions>
    //                 <Button onClick={() => setOpenUpdateDialog(false)} color="secondary">Cancel</Button>
    //                 <Button onClick={handleUpdateSubmit} color="primary" variant="contained">Update</Button>
    //             </DialogActions>
    //         </Dialog>

    //         {/* add */}
    //         <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth maxWidth="sm">
    //             <DialogTitle>Add New Employee</DialogTitle>
    //             <DialogContent>
    //                 <TextField
    //                     margin="dense"
    //                     label="User ID"
    //                     name="user_id"
    //                     value={newEmployee.user_id}
    //                     onChange={handleAddInputChange}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     label="Full Name"
    //                     name="full_name"
    //                     value={newEmployee.full_name}
    //                     onChange={handleAddInputChange}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     label="Email"
    //                     name="email"
    //                     value={newEmployee.email}
    //                     onChange={handleAddInputChange}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     label="Phone Number"
    //                     name="phone_number"
    //                     value={newEmployee.phone_number}
    //                     onChange={handleAddInputChange}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     label="Location"
    //                     name="location"
    //                     value={newEmployee.location}
    //                     onChange={handleAddInputChange}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     label="Blood Group"
    //                     name="blood_group"
    //                     value={newEmployee.blood_group}
    //                     onChange={handleAddInputChange}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     label="Gender"
    //                     name="gender"
    //                     value={newEmployee.gender}
    //                     onChange={handleAddInputChange}
    //                     fullWidth
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     label="Date of Joining"
    //                     name="date_of_joining"
    //                     type="date"
    //                     value={newEmployee.date_of_joining}
    //                     onChange={handleAddInputChange}
    //                     fullWidth
    //                     InputLabelProps={{ shrink: true }}
    //                 />
    //             </DialogContent>
    //             <DialogActions>
    //                 <Button onClick={() => setOpenAddDialog(false)} color="secondary">Cancel</Button>
    //                 <Button onClick={handleAddSubmit} color="primary" variant="contained">Add</Button>
    //             </DialogActions>
    //         </Dialog>

    //     </div>
    // );
};

export default ManagerDashboard;
