// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchManager, fetchProfile } from '../actions/employee';
// import { CircularProgress, Card, CardContent, Typography, Button } from '@mui/material';

// const EmployeeDashboard = () => {
//     const dispatch = useDispatch();
//     const { profileInfo, error,managerInfo } = useSelector(state => state.employee);
//   const [showManager, setShowManager] = useState(false);
//     useEffect(() => {
//         dispatch(fetchProfile());
//     }, [dispatch]);

//     console.log(profileInfo);
//     let profile = profileInfo?.employee


//     const handleManagerDetails = () => {
//         dispatch(fetchManager());
//         setShowManager(true);
//     };
//     console.log(managerInfo);

//     if (!profileInfo && !error) return <CircularProgress />;
//     if (error) return <Typography color="error">Error: {error}</Typography>;

//     return (
//         <>

//             <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
//                 <CardContent>
//                     <Typography variant="h5">Manager Info</Typography>
//                     <Typography>Name: {profile.full_name}</Typography>
//                     <Typography>Email: {profile.email}</Typography>
//                     <Typography>Phone: {profile.phone_number}</Typography>
//                     <Typography>Name: {profile.gender}</Typography>
//                     <Typography>Email: {profile.location}</Typography>
//                     <Typography>Phone: {profile.blood_group}</Typography>
//                 </CardContent>
//             </Card>
//             {/* <Button onClick={}>Manager Details</Button> */}
//             <Button variant="contained" onClick={handleManagerDetails} sx={{ display: 'block', mx: 'auto', mt: 2 }}>
//                 Manager Details
//             </Button>

//             {showManager && managerInfo && (
//                 <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
//                     <CardContent>
//                         <Typography variant="h5">Manager Info</Typography>
//                         <Typography>Name: {managerInfo.profile.manager.name}</Typography>
//                         <Typography>Email: {managerInfo.profile.manager.email}</Typography>
//                         <Typography>Phone: {managerInfo.profile.manager.phone}</Typography>
//                     </CardContent>
//                 </Card>
//             )}
//         </>
//     );
// };

// export default EmployeeDashboard;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchManager, fetchProfile } from '../actions/employee';
import {
    CircularProgress,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Container,
    Divider
} from '@mui/material';

const EmployeeDashboard = () => {
    const dispatch = useDispatch();
    const { profileInfo, error, managerInfo } = useSelector((state) => state.employee);
    const [showManager, setShowManager] = useState(false);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    const handleManagerDetails = () => {
        dispatch(fetchManager());
        setShowManager(true);
    };

    const profile = profileInfo?.employee;

    if (!profileInfo && !error) return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%)',
            }}
        >
            <CircularProgress />
        </Box>
    );

    if (error)
        return (
            <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>
                Error: {error}
            </Typography>
        );

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%)',
                py: 6,
            }}
        >
            <Container maxWidth="sm">
                <Card
                    sx={{
                        mb: 4,
                        borderRadius: 4,
                        boxShadow: 5,
                        overflow: 'hidden',
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <Box
                        sx={{
                            background: 'linear-gradient(135deg,rgb(45, 47, 58) 0%, #00bcd4 100%)',
                            px: 3,
                            py: 2,
                        }}
                    >
                        <Typography variant="h5" sx={{ color: '#fff' }}>
                            Employee Info
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                        <Typography sx={{ mb: 1 }}><strong>Full Name:</strong> {profile?.full_name}</Typography>
                        <Typography sx={{ mb: 1 }}><strong>Email:</strong> {profile?.email}</Typography>
                        <Typography sx={{ mb: 1 }}><strong>Phone:</strong> {profile?.phone_number}</Typography>
                        <Typography sx={{ mb: 1 }}><strong>Gender:</strong> {profile?.gender}</Typography>
                        <Typography sx={{ mb: 1 }}><strong>Location:</strong> {profile?.location}</Typography>
                        <Typography><strong>Blood Group:</strong> {profile?.blood_group}</Typography>
                    </CardContent>
                </Card>


                <Button
                    variant="contained"
                    onClick={handleManagerDetails}
                    fullWidth
                    sx={{ mb: 3, bgcolor: '#ffffff', color: '#3f51b5', fontWeight: 'bold' }}
                >
                    Show Manager Details
                </Button>

                {showManager && managerInfo && (
                    <Card
                        sx={{
                            borderRadius: 4,
                            boxShadow: 5,
                            overflow: 'hidden',
                            backgroundColor: '#f5f5f5',
                        }}
                    >
                        <Box
                            sx={{
                                background: 'linear-gradient(135deg, rgb(45, 47, 58) 0%, #3f51b5 100%)',
                                px: 3,
                                py: 2,
                            }}
                        >
                            <Typography variant="h5" sx={{ color: '#fff' }}>
                                👨‍💼 Manager Info
                            </Typography>
                        </Box>
                        <CardContent sx={{ p: 3 }}>
                            <Typography sx={{ mb: 1 }}><strong>Name:</strong> {managerInfo.profile.manager.name}</Typography>
                            <Typography sx={{ mb: 1 }}><strong>Email:</strong> {managerInfo.profile.manager.email}</Typography>
                            <Typography><strong>Phone:</strong> {managerInfo.profile.manager.phone}</Typography>
                        </CardContent>
                    </Card>

                )}
            </Container>
        </Box>
    );
};

export default EmployeeDashboard;
