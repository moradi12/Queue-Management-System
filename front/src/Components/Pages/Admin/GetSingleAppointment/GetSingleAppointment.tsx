import { Appointment } from "../../../../Models/Appointment";
import logo from "../../../../../Asset/doctor.jpg";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import "./GetSingleAppointment.css";
import axiosJWT from "../../../../Utils/axiosJWT";
import { deleteAppointmentAction } from "../../../../Redux/AdminReducer";
import { Store } from "../../../../Redux/Store";
import { notify } from "../../../../Utils/notif";

interface AppointmentProps {
  appointment: Appointment; // Fixed prop name
}

export function GetSingleAppointment(props: AppointmentProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="GetSingleAppointment Box">
      <div className="Grid-Parent">
        <div className="Grid-Child">{/* <img src={logo} width={100}/> */}</div>
        <div className="Grid-Child">
          <h1>
            {props.appointment.id}. {props.appointment.doctorType}
          </h1>
          <p>When? {new Date(props.appointment.appointmentDateTime).toLocaleString()}</p>
          <p>Status? {props.appointment.appointmentStatus}</p>
        </div>
        <div
          className="updateAppointment"
          onClick={() => {
            navigate(`/update/appointment/${props.appointment.id}`);
          }}
        >
          <Button variant="contained" color="info">
            Update Appointment
          </Button>
        </div>
        <br />
        <div
          className="delete"
          onClick={() => {
            axiosJWT
              .delete(`/api/admin/delete/appointment/${props.appointment.id}`)
              .then(() => {
                Store.dispatch(deleteAppointmentAction(props.appointment.id));
                notify.success("Appointment deleted successfully!");
                navigate("/");
              })
              .catch((err) => {
                notify.error("Cannot delete appointment");
              });
          }}
        >
          <Button variant="contained" color="error">
            Delete Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}
