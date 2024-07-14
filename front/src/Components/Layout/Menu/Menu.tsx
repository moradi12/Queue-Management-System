import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu(): JSX.Element {
  return (
    <div className="Menu">
      | <NavLink to="/">All Appointments</NavLink> |
      <NavLink to="/add">Add Appointments</NavLink> |
      <NavLink to="/add/appointment/to/patients">Add Appointment to Patients</NavLink> |
      <NavLink to="/add/patients">Add Patients</NavLink> |
      <NavLink to="/all/patients">All Patients</NavLink> |
      <NavLink to="/all/appointments/by/doctor">Appointments by Doctor</NavLink> |
      <NavLink to="/delete/appointment/:id">Delete Appointment</NavLink> |
      <NavLink to="/delete/patients/:id">Delete Patients</NavLink> |
      <NavLink to="/get/single/appointment/:id">Get Single Appointment</NavLink> |
      <NavLink to="/get/single/patient/:id">Get Single Patient</NavLink> |
      <NavLink to="/update/appointments/:id">Update Appointments</NavLink>
    </div>
  );
}
