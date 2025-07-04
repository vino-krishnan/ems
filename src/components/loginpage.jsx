
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/loginpage';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert
} from '@mui/material';
import image from './Work-from-home.jpg'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authError = useSelector((state) => state.auth.error);

    const handleLogin = async () => {
        await dispatch(loginUser({ username, password }));
        const role = localStorage.getItem('role');
        if (role === 'manager') navigate('/manager-dashboard');
        else if (role === 'employee') navigate('/employee-dashboard');
    };

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 5,
                    borderRadius: 4,
                    width: '100%',
                    maxWidth: 400,
                    backgroundColor: '#ffffffee',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Sign In
                </Typography>

                {authError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {authError}
                    </Alert>
                )}

                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleLogin}
                        sx={{ mt: 1, bgcolor: '#1976d2' }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginPage;
