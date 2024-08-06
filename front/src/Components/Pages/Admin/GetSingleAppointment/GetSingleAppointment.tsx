import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Appointment } from "../../../../Models/Appointment";
import { deleteAppointmentAction } from "../../../../Redux/AdminReducer";
import { Store } from "../../../../Redux/Store";
import axiosJWT from "../../../../Utils/axiosJWT";
import { notify } from "../../../../Utils/notif";
import "./GetSingleAppointment.css";

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
          <p>
            When?{" "}
            {new Date(props.appointment.appointmentDateTime).toLocaleString()}
          </p>
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
        <div
          className="addToPatient"
          onClick={() => {
            navigate(`/add/appointment/to/patients/${props.appointment.id}`);
          }}
        >
          <Button variant="contained" color="success">
            Add Appointment to Patient
          </Button>
        </div>
      </div>
    </div>
  );
}
