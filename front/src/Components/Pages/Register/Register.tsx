import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, TextField, Typography, MenuItem, Select } from '@mui/material';
import { notify } from '../../../Utils/notif';
import './Register.css';

type UserDetails = {
    email: string;
    password: string;
    userType: 'PATIENT' | 'ADMIN';
};

const REGISTER_URL = "http://localhost:8080/auth/register";

export function Register(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<UserDetails>();

    const onSubmit: SubmitHandler<UserDetails> = (data) => {
        axios.post(REGISTER_URL, data)
            .then(response => {
                const token = response.data;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                notify.success("Registration successful");
                navigate("/login");
            })
            .catch(error => {
                console.error(error);
                if (axios.isAxiosError(error) && error.response) {
                    notify.error(`Registration failed: ${error.response.data}`);
                } else {
                    notify.error("Registration failed: An unexpected error occurred.");
                }
            });
    };

    return (
        <div className="Register Box">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" className="HeadLine">User Registration</Typography>
                <hr />
                <TextField
                    label="Email"
                    variant="outlined"
                    {...register("email", { required: "Email is required" })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    className="MuiTextField-root"
                /><br /><br />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    className="MuiTextField-root"
                /><br /><br />
                <Select
                    fullWidth
                    defaultValue=""
                    {...register("userType", { required: "User type is required" })}
                    error={!!errors.userType}
                    className="MuiSelect-root"
                >
                    <MenuItem value="" disabled>Select User Type</MenuItem>
                    <MenuItem value="PATIENT">Patient</MenuItem>
                    <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
                {errors.userType && <p className="error">{errors.userType.message}</p>}
                <hr />
                <ButtonGroup variant="contained" fullWidth className="MuiButtonGroup-root">
                    <Button type="submit" color="primary" className="MuiButton-containedPrimary">Register</Button>
                    <Button color="secondary" className="MuiButton-containedSecondary" onClick={() => navigate("/login")}>Cancel</Button>
                </ButtonGroup>
            </form>
        </div>
    );
}
