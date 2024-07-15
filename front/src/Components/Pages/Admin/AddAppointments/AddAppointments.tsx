import React from "react";
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

export function AddAppointments(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Appointment>();

  const onSubmit = async (data: Appointment) => {
    const token = Store.getState().auth.token;
    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/appointment",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notify.success("Appointment created successfully");
      navigate("/appointments");
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
                label="Appointment Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("appointmentDate", { required: "Appointment date is required" })}
                error={!!errors.appointmentDate}
                helperText={errors.appointmentDate?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Doctor Type"
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
