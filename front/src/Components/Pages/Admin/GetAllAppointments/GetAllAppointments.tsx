import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { Appointment } from "../../../../Models/Appointment";
import { AppointmentStatus } from "../../../../Models/AppointmentStatus";
import { DoctorType } from "../../../../Models/DoctorType";
import "./GetAllAppointments.css";

export function GetAllAppointments(): JSX.Element {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/appointments');
        const appointmentsData = response.data.map((appointment: any) =>
          Appointment.parseDateString(
            appointment.id,
            appointment.appointmentDate,
            appointment.appointmentStatus as AppointmentStatus,
            appointment.doctorType as DoctorType
          )
        );
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="GetAllAppointments">
      <Typography variant="h4">All Appointments</Typography>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={appointment.id}>
            <ListItemText
              primary={
                <>
                  Appointment with Dr. {appointment.doctorType}
                  <span className="appointment-status">{appointment.appointmentStatus}</span>
                </>
              }
              secondary={`Scheduled for ${appointment.formatAppointmentDate()}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
