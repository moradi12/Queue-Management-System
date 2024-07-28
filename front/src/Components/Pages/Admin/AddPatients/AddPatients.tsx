import { useNavigate } from "react-router-dom";
import "./AddPatients.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { PatientModel } from "../../../../Models/PatientModel";
import { Box, TextField, Typography, Grid, Button } from "@mui/material";
import { notify } from "../../../../Utils/notif";
import axiosJWT from "../../../../Utils/axiosJWT";
import { addPatientAction } from "../../../../Redux/AdminReducer";
import { Store } from "../../../../Redux/Store";
import { checkData } from "../../../../Utils/checkData";
import { UserType } from "../../../../Models/UserType";
import { useEffect } from "react";

export function AddPatients(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<PatientModel>();

    useEffect(() => {
        checkData();
        if (Store.getState().auth.userType !== UserType.ADMIN) {
            navigate("/all");
            notify.error("You are not authorized to view this page.");
        }
    }, [navigate]);

    const onSubmit: SubmitHandler<PatientModel> = (data) => {
        console.log(data);
        data.id = 0;

        axiosJWT.post(`http://localhost:8080/api/admin/add/patient`, data)
            .then((res) => {
                data.id = res.data;
                Store.dispatch(addPatientAction(data));
                notify.success("Patient added successfully.");
                navigate("/all");
            })
            .catch((error) => {
                console.error("Error adding patient:", error);
                notify.error("Error adding patient.");
            });
    }

    return (
        <div className="AddPatient">
            <Box className="box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h6" gutterBottom>
                        Add Patient
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="First Name"
                                fullWidth
                                {...register("firstName", { required: true })}
                                error={Boolean(errors.firstName)}
                                helperText={errors.firstName ? "First name is required" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Last Name"
                                fullWidth
                                {...register("lastName", { required: true })}
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName ? "Last name is required" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                fullWidth
                                {...register("email", { required: true, minLength: 5 })}
                                error={Boolean(errors.email)}
                                helperText={errors.email ? "Email is required and should be at least 5 characters long" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone"
                                fullWidth
                                {...register("phone", { required: true, minLength: 10, maxLength: 10 })}
                                error={Boolean(errors.phone)}
                                helperText={errors.phone ? "Phone number is required and should be 10 digits long" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                {...register("password", { required: true, minLength: 5 })}
                                error={Boolean(errors.password)}
                                helperText={errors.password ? "Password is required and should be at least 5 characters long" : ""}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: "16px" }}>
                        Submit
                    </Button>
                </form>
            </Box>
        </div>
    );
}
