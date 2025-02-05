import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "./AddAppointments.css";
import { useForm } from "react-hook-form";
import { TextField, Typography, Button, Grid, MenuItem } from "@mui/material";
import { Appointment } from "../../../../Models/Appointment";
import { Store } from "../../../../Redux/Store";
import { notify } from "../../../../Utils/notif";
import { DoctorType } from "../../../../Models/DoctorType";
import { AppointmentStatus } from "../../../../Models/AppointmentStatus";
import { UserType } from "../../../../Models/UserType";

export function AddAppointments(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Appointment>();

  useEffect(() => {
    if (Store.getState().auth.userType !== UserType.ADMIN && Store.getState().auth.userType !== UserType.PATIENT) {
      navigate("/all");
      notify.error("You are not authorized to view this page.");
      return;
    }
  }, [navigate]);

  const onSubmit = async (data: Appointment) => {
    const token = Store.getState().auth.token;
    try {
      await axios.post(
        "http://localhost:8080/api/admin/appointment",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notify.success("Appointment created successfully");
      navigate("/");
    } catch (error) {
      const typedError = error as AxiosError;
      notify.error(typedError.response?.data as string || "Something went wrong");
    }
  };

  return (
    <div className="add-appointments">
      <div className="box">
        <Typography variant="h6" gutterBottom>
          Add Appointment
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Appointment Date & Time"
                type="datetime-local" // Updated to datetime-local
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("appointmentDateTime", { required: "Appointment date and time are required" })} // Updated field name
                error={!!errors.appointmentDateTime}
                helperText={errors.appointmentDateTime?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Doctor Type"
                defaultValue={DoctorType.FAMILY_MEDICINE}
                fullWidth
                {...register("doctorType", { required: "Doctor type is required" })}
                error={!!errors.doctorType}
                helperText={errors.doctorType?.message}
              >
                {Object.values(DoctorType).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Appointment Status"
                defaultValue={AppointmentStatus.AVAILABLE}
                fullWidth
                {...register("appointmentStatus", { required: "Appointment status is required" })}
                error={!!errors.appointmentStatus}
                helperText={errors.appointmentStatus?.message}
              >
                {Object.values(AppointmentStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
