import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "./UpdateAppointment.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField, Typography, Button, Grid, MenuItem, Container, Box } from "@mui/material";
import { Appointment } from "../../../../Models/Appointment";
import { Store } from "../../../../Redux/Store";
import { notify } from "../../../../Utils/notif";
import { DoctorType } from "../../../../Models/DoctorType";
import { AppointmentStatus } from "../../../../Models/AppointmentStatus";
import { UserType } from "../../../../Models/UserType";
import axiosJWT from "../../../../Utils/axiosJWT";
import { checkData } from "../../../../Utils/checkData";
import { updateAppointmentAction } from "../../../../Redux/AdminReducer";

export function UpdateAppointment(): JSX.Element {
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const { id } = useParams();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Appointment>();

    useEffect(() => {
        checkData();
        if (Store.getState().auth.userType !== UserType.ADMIN) {
            navigate("/Page404");
            notify.error("No Acess!!!!!");

        }
        if (id) {
            const singleAppointment = Store.getState().admin.appointments.find(item => item.id === +id);
            if (singleAppointment) {
                setAppointment({ ...singleAppointment, formatAppointmentDate: () => singleAppointment.appointmentDate.toISOString() });
                reset(singleAppointment);
            }
        }
        if (Store.getState().auth.token.length < 10) {
            navigate("/login");
        }
    }, [id, reset, navigate]);

    const onSubmit: SubmitHandler<Appointment> = (data) => {
        console.log(data);
        data.id = 0;
        axiosJWT.put("http://localhost:8080/api/admin/update/appointment", data, {

        })
            .then(res => {
                Store.dispatch(updateAppointmentAction(data));
                notify.success("Appointment updated successfully!");
                navigate("/");
            })
            .catch(err => {
                console.error("Failed to update appointment:", err.response ? err.response.data : err);
                notify.error("Failed to update the appointment. " + (err.response ? err.response.data.message : ""));
            });
    };

    return (
        <div className="updateAppointment">
            <form onSubmit={handleSubmit(onSubmit)}>
            <Container maxWidth="sm" className="UpdateCompany">
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom> Update Appointment</Typography>
                    <TextField
                        label="ID"
                        type="number"
                        defaultValue={appointment?.id}
                        {...register("id", { required: "ID is required" })}
                        error={!!errors.id}
                        helperText={errors.id?.message}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Appointment Date"
                        type="datetime-local"
                        defaultValue={appointment?.appointmentDate}
                        {...register("appointmentDate", { required: "Date is required" })}
                        error={!!errors.appointmentDate}
                        helperText={errors.appointmentDate?.message}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        label="Appointment Status"
                        defaultValue={AppointmentStatus.AVAILABLE}
                        fullWidth
                        {...register("appointmentStatus", { required: "This field is required!" })}
                        error={Boolean(errors.appointmentStatus)}
                        helperText={errors.appointmentStatus?.message}
                    >
                        {Object.values(AppointmentStatus).map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>
                    <br />
                    <TextField
                        select
                        label="Doctor Type"
                        defaultValue={DoctorType.FAMILY_MEDICINE}
                        fullWidth
                        {...register("doctorType", { required: "This field is required!" })}
                        error={Boolean(errors.doctorType)}
                        helperText={errors.doctorType?.message}
                        SelectProps={{
                            native: true,
                        }}

                    > <br />
                        {Object.values(DoctorType).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </TextField>

                    <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                            </Grid>
                </Box>
            </Container>
            </form>
        </div>
       
    );
}