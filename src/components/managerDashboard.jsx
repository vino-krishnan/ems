
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee, updateEmployee, addEmployee, getUserProfile } from '../actions/manager';
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
    Container,
    AppBar,
    Toolbar
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { logout } from '../actions/loginpage';
import { useNavigate } from 'react-router-dom';
import { getMyProfile } from '../services/managerService';
import tableBg from './managerimage.jpg'
const ManagerDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    // const [profileData, setProfileData] = useState(null);
    const [openProfileDialog, setOpenProfileDialog] = useState(false);


    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const empDetails = employees?.employees || [];
    const profileData = useSelector((state) => state?.manager?.profile);

    console.log(profileData, "dasssssss");

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

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleProfileClick = () => {
        dispatch(getUserProfile());
        setOpenProfileDialog(true);
    };
    return (
        //   <Container maxWidth="lg" sx={{ py: 4 ,background: 'linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%)',}}>
        <Container
            maxWidth={false}
            disableGutters
            sx={{ minHeight: '100vh', width: '100%',  background: 'linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%)' }}
        >
            <AppBar position="static" >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: 'black' }}>Employee Management</Typography>
                    <Box>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#607d8b',
                                color: '#fff',
                                fontWeight: 'bold',
                                mr: 2,
                                '&:hover': { backgroundColor: '#455a64' },
                            }}
                            onClick={handleProfileClick}
                        >
                            My Profile
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#f44336',
                                color: '#fff',
                                fontWeight: 'bold',
                                mr: 2,
                                '&:hover': { backgroundColor: '#d32f2f' },
                            }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                background: 'linear-gradient(135deg, rgb(45, 47, 58) 0%, #3f51b5 100%)',
                                color: '#fff',
                                fontWeight: 'bold',
                            }}
                            onClick={() => setOpenAddDialog(true)}
                        >
                            Add Employee
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>


            <Paper elevation={3}>
                <Box
                    sx={{
                        background: 'linear-gradient(135deg,rgb(210, 212, 223) 0%,rgb(174, 210, 215) 100%)' ,
                        // backgroundImage: `url(${tableBg})`,
                        // backgroundSize: 'cover',
                        // backgroundPosition: 'center',
                        // backgroundRepeat: 'no-repeat',
                        p: 2,
                    }}
                >
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ backgroundColor: 'rgba(128,128,128, 0.8)' ,color:'white' }}>
                                <TableRow >
                                    <TableCell sx={{ fontWeight: 'bold',}}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Blood Group</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Date of Joining</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
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
                </Box>
            </Paper>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleUpdate}>Update</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>

            {/* Update Dialog */}
            <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} fullWidth maxWidth="sm" PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: 10,
                },
            }}>
                <DialogTitle sx={{
                    background: 'linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%)',
                    color: '#fff',
                    fontWeight: 'bold',
                }}>Update Employee</DialogTitle>
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
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth maxWidth="sm" PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: 10,
                },
            }}>
                <DialogTitle sx={{
                    background: 'linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%)',
                    color: '#fff',
                    fontWeight: 'bold',
                }}>Add New Employee</DialogTitle>
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

            <Dialog
                open={openProfileDialog}
                onClose={() => setOpenProfileDialog(false)}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        boxShadow: 10,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        background: 'linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%)',
                        color: '#fff',
                        fontWeight: 'bold',
                    }}
                >
                    My Profile
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#f5f5f5', py: 2 }}>
                    {profileData ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography><strong>ID:</strong> {profileData.user_id}</Typography>
                            <Typography><strong>Name:</strong> {profileData.full_name}</Typography>
                            <Typography><strong>Email:</strong> {profileData.email}</Typography>
                            <Typography><strong>Phone:</strong> {profileData.phone_number}</Typography>
                            <Typography><strong>Location:</strong> {profileData.location}</Typography>
                            <Typography><strong>Team name:</strong> {profileData.team_name}</Typography>
                            <Typography><strong>department:</strong> {profileData.department}</Typography>
                            <Typography><strong>Date of Joining:</strong> {profileData.date_of_joining}</Typography>
                        </Box>
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenProfileDialog(false)} variant="contained" color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


        </Container>

    );


};

export default ManagerDashboard;
